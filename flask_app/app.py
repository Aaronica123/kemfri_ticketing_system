from flask import Flask, request, jsonify
from joblib import load

app = Flask(__name__)

# Load once at startup
tfidf    = load("tfidf_vectorizer.joblib")
model_rf = load("my_model.joblib")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True) or {}
    text = data.get("text", "").strip()
    if not text:
        return jsonify({"error": "Missing 'text' field"}), 400

    X      = tfidf.transform([text])
    pred   = model_rf.predict(X)[0]
    proba  = model_rf.predict_proba(X)[0].max()

    return jsonify({
        "text":       text,
        "priority":   pred,
        "confidence": round(float(proba), 4),
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)