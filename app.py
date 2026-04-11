from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os
import google.generativeai as genai

# ── Gemini setup ──────────────────────────────────────────────
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

SYSTEM_PROMPT = """You are AgriBot, an AI assistant for AgriXAI — an Indian agriculture platform.
You help farmers with crop recommendations, soil health, fertilizers, weather, and farming tips.
Always answer in simple, friendly language a farmer can understand.
Keep answers short — maximum 3 sentences.
If asked anything unrelated to agriculture, politely say you only help with farming topics."""

# Use system_instruction properly instead of string concatenation
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction=SYSTEM_PROMPT
)

# ── DB ────────────────────────────────────────────────────────
def get_db_connection():
    db_url = os.environ.get("DATABASE_URL", "")
    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)
    return psycopg2.connect(db_url, sslmode="require")

# ── App ───────────────────────────────────────────────────────
app = Flask(__name__)
CORS(app)

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

init_db()

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

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json(silent=True) or {}
    user_msg = data.get("message", "").strip()

    if not user_msg:
        return jsonify({"reply": "Please enter a valid message."})

    analysis_done = data.get("analysisDone", False)

    # Inject analysis context into the user turn, not the system prompt
    if not analysis_done:
        user_msg += "\n\n[Note: Soil analysis has NOT been completed yet. If user asks about crop results, remind them to complete soil analysis first.]"

    try:
        response = model.generate_content(user_msg)
        reply = response.text if response.text else "Sorry, I couldn't generate a response."
    except Exception as e:
        print("Gemini ERROR:", str(e))
        reply = f"AI error: {str(e)}"

    return jsonify({"reply": reply})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
