# AgriXAI — AI-Based Crop Recommendation System

> An end-to-end ML system that helps Indian farmers choose the right crop based on soil images or manual NPK input, with explainable AI recommendations.

---

## System Architecture

```
Farmer has two input options:
                    
┌─────────────────────────────────┐     ┌──────────────────────────────────┐
│   OPTION 1: Upload Soil Photo   │     │  OPTION 2: Enter Values Manually │
│                                 │     │                                  │
│   MobileNetV3Large (4-class)    │     │  Enter: N, P, K, pH,             │
│   ├── Black_Soil   → NPK lookup │     │  temperature, humidity, rainfall  │
│   ├── Laterite_Soil→ NPK lookup │     │                                  │
│   ├── Yellow_Soil  → NPK lookup │     └────────────────┬─────────────────┘
│   └── Non_Soil     → REJECTED   │                      │
│           ↓                     │                      │
└───────────┬─────────────────────┘                      │
            │                                            │
            └─────────────────┬──────────────────────────┘
                              ↓
                   XGBoost Classifier (22 crops)
                   Input: N, P, K, temperature,
                   humidity, pH, rainfall,
                   NPK_sum, NP_ratio
                              ↓
                   Top 3 crop recommendations
                     + SHAP feature explanation
                     + Growing instructions
                     + Fertilizer suggestions
                     + AI Chatbot (Gemini)
```

---

## Results at a Glance

| Model | Task | Metric | Value |
|---|---|---|---|
| MobileNetV3Large | Soil Image Classification | Test Accuracy | **95.21%** |
| MobileNetV3Large | Soil Image Classification | Macro F1-Score | **0.95** |
| MobileNetV3Large | Non-Soil Rejection | Recall | **95%** |
| MobileNetV3Large | Yellow Soil | Recall | **96%** |
| XGBoost | Crop Recommendation (22 crops) | Test Accuracy | **99.09%** |
| XGBoost | Crop Recommendation (22 crops) | Macro F1-Score | **0.99** |
| XGBoost | Overfitting Check (permutation test) | Shuffled Accuracy | **4.5%** |
| XGBoost | Generalisation | Train-Test Gap | **0.91%** |

---

## Key ML Decisions

### Why MobileNetV3Large?
Optimised for mobile inference — important because farmers use low-end smartphones.
Achieves near-ResNet accuracy at 4x less compute. Two-phase transfer learning:
freeze base → train head → unfreeze top 40 layers with lower LR (1e-5).

### Why a Non-Soil rejection class?
A 3-class model forces every image into a soil category. A photo of dry grass
would confidently return "Yellow Soil". Adding a 4th Non-Soil class (trained on
Mountain, Red, Alluvial, Arid soil images) gives the model a safe exit for
ambiguous or invalid inputs — critical for a farmer-facing application.

### Why XGBoost over Neural Networks for tabular data?
With only 2,200 samples and 9 features, gradient boosted trees consistently
outperform deep learning on small structured datasets. XGBoost also natively
supports SHAP explainability, which is essential for farmer trust.

### Why SHAP?
Farmers need to trust the recommendation. SHAP provides per-prediction feature
attribution — the system tells a farmer exactly which factor (rainfall, pH, NPK)
drove each crop recommendation.

### Why dual-gate rejection for image inference?
Single confidence threshold can be fooled (70% confidence, 65% runner-up = still
uncertain). Two gates: confidence ≥ 65% AND margin between top-1 and top-2 ≥ 15%.

---

## Dataset

### Soil Image Dataset
| Class | Source | Count |
|---|---|---|
| Black_Soil | Phantom-fs/Soil-Classification-Dataset (Original + CyAUG) | 500 |
| Laterite_Soil | Phantom-fs/Soil-Classification-Dataset (Original + CyAUG) | 438 |
| Yellow_Soil | Phantom-fs/Soil-Classification-Dataset (Original + CyAUG) | 500 |
| Non_Soil | Mountain, Red, Alluvial, Arid soil classes (Original only) | 645 |

Split: 70% train / 15% val / 15% test

### Crop Recommendation Dataset
- Source: Crop_recommendation.csv (Kaggle)
- 2,200 samples, 22 crop classes, 100 samples per class (balanced)
- Features: N, P, K, temperature, humidity, pH, rainfall
- Engineered features added: NPK_sum, NP_ratio

---

## Model Training

### Soil Classifier (MobileNetV3Large)
```
Phase 1 — Head training (base frozen)
  Optimizer : Adam (lr=1e-3)
  Loss      : CategoricalCrossentropy (label_smoothing=0.1)
  Epochs    : 25 (early stopping, patience=6)
  Best val  : 93.93% at epoch 10

Phase 2 — Fine-tuning (top 40 layers unfrozen)
  Optimizer : Adam (lr=1e-5)
  Loss      : CategoricalCrossentropy (label_smoothing=0.1)
  Epochs    : 30 (early stopping, patience=10)
  Best val  : 95.21%
```

### Crop Recommender (XGBoost)
```
n_estimators         : 300
max_depth            : 6
learning_rate        : 0.1
eval_metric          : mlogloss
early_stopping_rounds: 20
Train/Test split     : 80/20 stratified
```

---

## Per-Class Results

### Soil Classifier
```
               precision  recall  f1-score  support
Black_Soil        1.00    0.99      0.99       75
Laterite_Soil     0.91    0.91      0.91       66
Non_Soil          0.91    0.95      0.93       97
Yellow_Soil       1.00    0.96      0.98       75

accuracy                            0.95      313
macro avg         0.95    0.95      0.95      313
```

### Crop Recommender
```
Test Accuracy   : 99.09%
Train Accuracy  : 100.00%
Overfitting gap : 0.91%
Permutation test: 4.5% (confirms real learning, not memorisation)
```

---

## Project Structure

```
agriXAI/
├── app.py                     # Flask REST API
├── image_classifier.py        # Soil image inference module
├── best_soil_model_v4.h5      # Trained MobileNetV3 (4-class)
├── crop_xgb_model.json        # Trained XGBoost model
├── crop_label_encoder.pkl     # Label encoder for 22 crops
├── xgb_feature_names.json     # Feature order for inference
├── class_indices.json         # Soil class index map (4 classes)
├── soil_npk_map.json          # Soil type → NPK value mapping
├── crop_guides.json           # Growing instructions per crop
├── fertilizer_rules.json      # Fertilizer suggestion rules
├── requirements.txt           # Python dependencies
├── MODEL_CARD.md              # Full ML decision documentation
└── notebooks/
    ├── soil_classifier_v4.ipynb   # Image model training (Kaggle)
    └── xgboost_crop.ipynb         # Crop model training
```

---

## API Endpoints

### `POST /predict` — Manual NPK input
```json
Request:
{
  "N": 90, "P": 42, "K": 43,
  "temperature": 20.8, "humidity": 82,
  "ph": 6.5, "rainfall": 202.9,
  "mode": "mixed"
}

Response:
{
  "best_crop": {"crop": "rice", "confidence": 99.88},
  "top_3_crops": [...],
  "explanation": [...],
  "crop_guidance": [...],
  "fertilizer_suggestions": [...]
}
```

### `POST /predict-image` — Soil photo input
```
multipart/form-data:
  image      : <soil photo file>
  temperature: 25
  humidity   : 80
  rainfall   : 200

Response: same as /predict + soil_type + soil_confidence
Error   : returns reason + photo tips if image is rejected
```

### `POST /chat` — AI chatbot
```json
Request : {"message": "What fertilizer for rice?", "lang": "te"}
Response: {"reply": "..."}   // replies in Telugu, Hindi, or English
```

---

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/agriXAI.git
cd agriXAI
pip install -r requirements.txt

# Add your .env file with:
# GOOGLE_API_KEY=your_gemini_key
# DATABASE_URL=your_postgres_url

python app.py
```

---

## Tech Stack

| Component | Technology |
|---|---|
| Image Classification | TensorFlow / Keras, MobileNetV3Large |
| Crop Recommendation | XGBoost |
| Explainability | SHAP |
| Backend API | Flask, Flask-CORS |
| Database | PostgreSQL |
| AI Chatbot | Google Gemini 2.5 Flash Lite |
| Deployment | Gunicorn |
