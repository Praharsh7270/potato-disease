from fastapi import FastAPI,File, UploadFile
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import sys
import tensorflow as tf
keras = tf.keras
import os


app = FastAPI()
print("Starting model loading...")
try:
    # Get the absolute path to the model file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, "..", "models", "1.keras")
    print(f"Attempting to load model from: {model_path}")
    print(f"File exists: {os.path.exists(model_path)}")
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at: {model_path}")
    model = keras.models.load_model(model_path, compile=False)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Failed to load model: {e}")
    print(f"Error type: {type(e).__name__}")
    import traceback
    traceback.print_exc()
    model = None
print(f"Model loading complete. Model is None: {model is None}")
className = ["Early Blight", "Late Blight", "Healthy"]
@app.get("/ping")
async def ping():
    return "Hello ia api"


def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    print(f"Model is None: {model is None}")
    if model is None:
        return {"error": "Model failed to load. Check server logs for details."}
    
    try:
        image = read_file_as_image(await file.read())
        image_batch = np.expand_dims(image, axis=0)
        print(f"Image shape: {image_batch.shape}")
        predictions = model.predict(image_batch)
        print(f"Predictions shape: {predictions.shape}")
        index = np.argmax(predictions[0])
        predicted_class = className[index]
        confidence = float(np.max(predictions[0]))

        return {
            "class": predicted_class,
            "confidence": confidence
        }
    except Exception as e:
        print(f"Error in prediction: {e}")
        import traceback
        traceback.print_exc()
        return {"error": f"Prediction failed: {str(e)}"}



if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)