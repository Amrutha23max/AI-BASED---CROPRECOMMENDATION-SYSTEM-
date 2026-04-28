from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os
from google import genai
from google.genai import types
import xgboost as xgb
import pickle
import json
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet_v3 import preprocess_input
from PIL import Image
import shap

from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))


SYSTEM_PROMPT = """You are AgriBot, an AI assistant for AgriXAI — an Indian agriculture platform.
You help farmers with crop recommendations, soil health, fertilizers, weather, and farming tips.
Always answer in simple, friendly language a farmer can understand.
Keep answers short — maximum 3 sentences.
If asked anything unrelated to agriculture, politely say you only help with farming topics."""

def get_db_connection():
    db_url = os.environ.get("DATABASE_URL", "")
    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)
    return psycopg2.connect(db_url, sslmode="require")

app = Flask(__name__)
CORS(app)

model = xgb.XGBClassifier()
model.load_model("crop_xgb_model.json")
shap_explainer = shap.TreeExplainer(model)
soil_model = load_model("best_soil_model_v3.keras", compile=False)


with open("crop_label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)

with open("xgb_feature_names.json", "r") as f:
    feature_names = json.load(f)
with open("class_indices.json", "r") as f:
    class_indices = json.load(f)

soil_classes = {v: k for k, v in class_indices.items()}


try:
    with open("soil_npk_map.json", "r") as f:
        soil_map = json.load(f)
except FileNotFoundError:
    soil_map = {}

def get_top_3(proba):
    top_idx = np.argsort(proba)[::-1][:3]

    results = []
    for i in top_idx:
        results.append({
            "crop": label_encoder.inverse_transform([i])[0],
            "confidence": round(float(proba[i]) * 100, 2)
        })
    return results
def get_shap_explanation(input_array, predicted_crop):
    shap_values = shap_explainer.shap_values(input_array)
    crop_index = label_encoder.transform([predicted_crop])[0]

    if isinstance(shap_values, list):
        values = shap_values[crop_index][0]
    elif len(np.array(shap_values).shape) == 3:
        values = shap_values[0, :, crop_index]
    else:
        values = shap_values[0]

    explanation = []
    for feature, value, impact in zip(feature_names, input_array[0], values):
        explanation.append({
            "feature": feature,
            "value": round(float(value), 3),
            "impact": round(float(impact), 4),
            "effect": "positive" if impact > 0 else "negative"
        })

    explanation.sort(key=lambda x: abs(x["impact"]), reverse=True)
    return explanation[:5]
    

    
def preprocess_soil_image(image):
    image = image.convert("RGB")
    image = image.resize((224, 224))
    image = np.array(image)
    image = preprocess_input(image)
    image = np.expand_dims(image, axis=0)
    return image


def predict_soil_type(image):
    processed = preprocess_soil_image(image)
    preds = soil_model.predict(processed)

    class_idx = int(np.argmax(preds))
    confidence = round(float(preds[0][class_idx]) * 100, 2)
    return soil_classes[class_idx], confidence

def init_db():
    conn = get_db_connection()
    try:
        cur = conn.cursor()
        cur.execute('''
            CREATE TABLE IF NOT EXISTS suggestions (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                text TEXT
            )
        ''')
        conn.commit()
        cur.close()
    finally:
        conn.close()

#init_db()

@app.route('/')
def home():
    return jsonify({"status": "Backend is running!"})

@app.route('/get-suggestions', methods=['GET'])
def get_suggestions():
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT name, text FROM suggestions ORDER BY id DESC")
        rows = cursor.fetchall()
    finally:
        conn.close()
    return jsonify([{"name": r[0], "text": r[1]} for r in rows])

@app.route('/add-suggestion', methods=['POST'])
def add_suggestion():
    data = request.get_json(silent=True) or {}
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO suggestions (name, text) VALUES (%s, %s)",
            (data.get('name', ''), data.get('text', ''))
        )
        conn.commit()
    finally:
        conn.close()
    return jsonify({"message": "Saved"})

# @app.route('/chat', methods=['POST'])
# def chat():
#   data = request.get_json(silent=True) or {}
#    user_msg = data.get("message", "").strip()
#    lang = data.get("lang", "en")
#    if not user_msg:
#        return jsonify({"reply": "Please enter a valid message."})

#     analysis_done = data.get("analysisDone", False)
#     lang_instruction = {
#        "te": "Always reply in Telugu (తెలుగు).",
#        "hi": "Always reply in Hindi (हिन्दी).",
#        "en": "Always reply in English."
#     }.get(lang, "Always reply in English.")
    
    
#     if not analysis_done:
     
#        user_msg += "\n\n[Note: Soil analysis has NOT been completed yet. If user asks about crop results, remind them to complete soil analysis first.]"

#     try:
#        response = client.models.generate_content(
#            model="gemini-2.5-flash-lite",
#            config=types.GenerateContentConfig(
#                system_instruction=SYSTEM_PROMPT + " " + lang_instruction
#            ),
#            contents=user_msg
#         )
#         reply = response.text
#     except Exception as e:
#        print("Gemini ERROR:", str(e))
#        reply = f"AI error: {str(e)}"

#     return jsonify({"reply": reply})
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json(silent=True) or {}
    user_msg = data.get("message", "").strip()
    lang = data.get("lang", "en")

    if not user_msg:
        return jsonify({"reply": "Please enter a valid message."})

    analysis_done = data.get("analysisDone", False)

    lang_instruction = {
        "te": "Always reply in Telugu (తెలుగు).",
        "hi": "Always reply in Hindi (हिन्दी).",
        "en": "Always reply in English."
    }.get(lang, "Always reply in English.")

    if not analysis_done:
        user_msg += "\n\n[Note: Soil analysis has NOT been completed yet. If user asks about crop results, remind them to complete soil analysis first.]"

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT + " " + lang_instruction
            ),
            contents=user_msg
        )
        reply = response.text

    except Exception as e:
        print("Gemini ERROR:", str(e))
        reply = f"AI error: {str(e)}"

    return jsonify({"reply": reply})
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(silent=True) or {}

    try:
        input_data = [data[feature] for feature in feature_names]
        input_array = np.array(input_data).reshape(1, -1)

        proba = model.predict_proba(input_array)[0]
        top3 = get_top_3(proba)

        explanation = get_shap_explanation(
            input_array,
            top3[0]["crop"]
        )

        return jsonify({
            "best_crop": top3[0],
            "top_3_crops": top3,
            "explanation": explanation
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/predict-image', methods=['POST'])
def predict_image():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image uploaded"}), 400

        image_file = request.files["image"]
        image = Image.open(image_file)

        temperature = float(request.form.get("temperature", 25))
        humidity = float(request.form.get("humidity", 80))
        rainfall = float(request.form.get("rainfall", 200))

        # soil_type, soil_confidence = predict_soil_type(image)

        # if soil_type not in soil_map:
        #     return jsonify({
        #         "error": f"Soil type '{soil_type}' not found in soil_npk_map.json"
        #     }), 400
        soil_type, soil_confidence = predict_soil_type(image)

        if soil_confidence < 60:
          return jsonify({
            "error": "Low confidence. Please upload a clearer soil image.",
            "soil_type": soil_type,
            "soil_confidence": soil_confidence
          }), 400

        if soil_type not in soil_map:
           return jsonify({
           "error": f"Soil type '{soil_type}' not found in soil_npk_map.json"
        }), 400

        soil_vals = soil_map[soil_type]

        N = soil_vals["N"]
        P = soil_vals["P"]
        K = soil_vals["K"]
        ph = soil_vals["ph"]

        NPK_sum = N + P + K
        NP_ratio = N / (P + 1)
        input_array = np.array([[
            N, P, K,
            temperature, humidity, ph,
            rainfall, NPK_sum, NP_ratio
        ]])

        proba = model.predict_proba(input_array)[0]
        top3 = get_top_3(proba)
        explanation = get_shap_explanation(input_array, top3[0]["crop"])

        return jsonify({
            "soil_type": soil_type,
            "soil_confidence": soil_confidence,
            "estimated_values": {
                "N": N,
                "P": P,
                "K": K,
                "ph": ph,
                "NPK_sum": NPK_sum,
                "NP_ratio": NP_ratio
            },
            "best_crop": top3[0],
            "top_3_crops": top3,
            "explanation": explanation
        })


    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
