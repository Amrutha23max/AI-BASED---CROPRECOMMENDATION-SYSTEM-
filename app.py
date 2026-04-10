from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os
import google.generativeai as genai

genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def get_db_connection():
    db_url = os.environ.get("DATABASE_URL", "")
    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)
    return psycopg2.connect(db_url, sslmode="require")

app = Flask(__name__)
CORS(app)

def init_db():
    conn = get_db_connection()
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
    conn.close()

init_db()

@app.route('/')
def home():
    return jsonify({"status": "Backend is running!"})

@app.route('/get-suggestions', methods=['GET'])
def get_suggestions():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name, text FROM suggestions ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"name": r[0], "text": r[1]} for r in rows])

@app.route('/add-suggestion', methods=['POST'])
def add_suggestion():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO suggestions (name, text) VALUES (%s, %s)",
        (data['name'], data['text'])
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Saved"})

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_msg = data.get("message", "")
    analysis_done = data.get("analysisDone", False)

    system_prompt = f"""You are AgriBot, an AI assistant for AgriXAI — an Indian agriculture platform.
You help farmers with crop recommendations, soil health, fertilizers, weather, and farming tips.
Always answer in simple, friendly language a farmer can understand.
Keep answers short — maximum 3 sentences.
If asked anything unrelated to agriculture, politely say you only help with farming topics.
Analysis done: {analysis_done}. If analysis is not done and user asks about their crop result, tell them to complete soil analysis first."""

    try:
        response = model.generate_content(system_prompt + "\n\nUser: " + user_msg)
        reply = response.text
    except Exception as e:
        reply = "Sorry, I'm having trouble responding right now. Please try again."

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
