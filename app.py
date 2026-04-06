from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os

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
    user_msg = data.get("message", "").lower()
    analysis_done = data.get("analysisDone", False)

    if "hello" in user_msg or "hi" in user_msg:
        reply = "Hello! I am AgriBot 🌱. I can guide you through soil analysis and crop recommendations."
    elif "crop" in user_msg and not analysis_done:
        reply = "Please analyze your soil first to get crop recommendations."
    elif "how" in user_msg and "use" in user_msg:
        reply = "Upload a soil image or enter N, P, K, and pH values. Then click analyze."
    elif "input" in user_msg or "enter" in user_msg:
        reply = "You can upload a soil image or manually enter nitrogen, phosphorus, potassium, and pH values."
    elif "npk" in user_msg or "nitrogen" in user_msg:
        reply = "Nitrogen supports leaf growth, phosphorus helps roots, and potassium improves plant health."
    elif "ph" in user_msg:
        reply = "pH shows soil acidity. Most crops grow well between 6 and 7.5."
    elif "crop" in user_msg and analysis_done:
        reply = "Top 3 crops are shown after analysis along with reasons based on your soil nutrients."
    elif "why" in user_msg:
        reply = "We compare your soil nutrients with crop requirements to generate recommendations."
    elif "suggestion" in user_msg:
        reply = "Farmers can share tips and ideas in the suggestion page."
    else:
        reply = "Ask me about soil inputs, crop recommendations, or how to use the app."

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
