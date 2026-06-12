# AgriXAI — AI-Based Crop Recommendation System

> An end-to-end ML system that helps Indian farmers choose the right crop based on soil images or manual NPK input, with explainable AI recommendations.

---

## Results at a Glance

| Model | Task | Metric | Value |
|---|---|---|---|
| MobileNetV3Large | Soil Image Classification | Test Accuracy | **95.21%** |
| MobileNetV3Large | Soil Image Classification | Macro F1-Score | **0.95** |
| MobileNetV3Large | Non-Soil Rejection | Recall | **95%** |
| XGBoost | Crop Recommendation (22 crops) | Test Accuracy | **99.09%** |
| XGBoost | Crop Recommendation (22 crops) | Macro F1-Score | **0.99** |
| XGBoost | Overfitting Check (permutation test) | Shuffled Accuracy | **4.5%**  |

---

## System Architecture

```
Farmer uploads soil photo
        ↓
MobileNetV3Large (4-class classifier)
  ├── Black_Soil   → NPK: N=80, P=60, K=45, pH=8.1
  ├── Laterite_Soil→ NPK: N=20, P=15, K=35, pH=5.5
  ├── Yellow_Soil  → NPK: N=35, P=30, K=30, pH=6.5
  └── Non_Soil     → REJECTED with helpful message
        ↓
XGBoost Classifier (22 crops)
  Input: N, P, K, temperature, humidity, pH,
         rainfall, NPK_sum, NP_ratio
        ↓
Top 3 crop recommendations
  + SHAP feature importance explanation
  + Growing instructions (crop_guides.json)
  + Fertilizer suggestions
```

---

## Key ML Decisions

### Why MobileNetV3Large?
Optimized for mobile/edge inference — important because farmers use low-end smartphones. Achieves near-ResNet accuracy at 4x less compute. Two-phase transfer learning: freeze base → train head → unfreeze top 40 layers.

### Why XGBoost over Neural Networks for tabular data?
Tabular crop data has only 9 features across 2200 samples. XGBoost consistently outperforms deep learning on small structured datasets (see: [Grinsztajn et al., 2022](https://arxiv.org/abs/2207.08815)). Also natively supports SHAP explainability.

### Why a Non-Soil rejection class?
A 3-class model forces every image into a soil category — a photo of dry grass or red brick would confidently return "Yellow Soil" or "Laterite Soil". Adding a 4th Non-Soil class (trained on Mountain Soil, Red Soil, Alluvial Soil, Arid Soil) gives the model a safe exit for ambiguous inputs.

### Why SHAP?
Farmers need to trust the recommendation. SHAP provides per-prediction feature attribution — the system can tell a farmer "rainfall was the biggest reason we recommended rice, not wheat."

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
- Source: [Crop Recommendation Dataset](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset)
- 2200 samples, 22 crop classes, 100 samples per class
- Features: N, P, K, temperature, humidity, pH, rainfall
- Engineered features: NPK_sum, NP_ratio

---

## Model Training

### Soil Classifier (MobileNetV3Large)
```
Phase 1 — Head training (base frozen)
  Optimizer: Adam (lr=1e-3)
  Loss: CategoricalCrossentropy (label_smoothing=0.1)
  Epochs: 25 (early stopping, patience=6)
  Best val_accuracy: 93.93% at epoch 10

Phase 2b — Fine-tuning (top 40 layers unfrozen)
  Optimizer: Adam (lr=1e-5)
  Loss: CategoricalCrossentropy (label_smoothing=0.1)
  Epochs: 30 (early stopping, patience=10)
  Best val_accuracy: 95.21% at epoch 1
```

### Crop Recommender (XGBoost)
```
n_estimators: 300
max_depth: 6
learning_rate: 0.1
eval_metric: mlogloss
early_stopping_rounds: 20
Train/Test split: 80/20, stratified
```

---

## Per-Class Results

### Soil Classifier
```
              precision  recall  f1-score  support
Black_Soil       1.00    0.99      0.99       75
Laterite_Soil    0.91    0.91      0.91       66
Non_Soil         0.91    0.95      0.93       97
Yellow_Soil      1.00    0.96      0.98       75

accuracy                           0.95      313
macro avg        0.95    0.95      0.95      313
```

### Crop Recommender
```
Test Accuracy:  99.09%
Train Accuracy: 100.00%
Overfitting gap: 0.91%
Permutation test (shuffled labels): 4.5% 
```

---

## Project Structure

```
agriXAI/
├── app.py                    # Flask REST API
├── image_classifier.py       # Soil image inference module
├── best_soil_model_v4.h5     # Trained MobileNetV3 (4-class)
├── crop_xgb_model.json       # Trained XGBoost model
├── crop_label_encoder.pkl    # Label encoder for 22 crops
├── xgb_feature_names.json    # Feature order for inference
├── class_indices.json        # Soil class index map
├── soil_npk_map.json         # Soil → NPK value mapping
├── crop_guides.json          # Growing instructions per crop
├── fertilizer_rules.json     # Fertilizer suggestion rules
├── requirements.txt          # Python dependencies
├── notebooks/
│   ├── soil_classifier_v4.ipynb   # Image model training
│   └── xgboost_crop.ipynb         # Crop model training
└── MODEL_CARD.md             # Full model documentation
```

---

## API Endpoints

### `POST /predict` — Manual input
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
  "explanation": [...],       // SHAP feature attributions
  "crop_guidance": [...],     // Growing instructions
  "fertilizer_suggestions": [...]
}
```

### `POST /predict-image` — Soil photo input
```
multipart/form-data:
  image: <soil photo>
  temperature: 25
  humidity: 80
  rainfall: 200

Response: same as /predict + soil_type + soil_confidence
```

---

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/agriXAI.git
cd agriXAI
pip install -r requirements.txt
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
| AI Chatbot | Google Gemini 2.5 Flash |
| Deployment | Gunicorn |
