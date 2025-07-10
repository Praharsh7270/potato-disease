# 🥔 Potato Disease Classifier

A machine learning application that uses deep learning to classify potato leaf diseases. The application consists of a FastAPI backend with a React frontend for easy image upload and disease prediction.

## Features

- **Image Upload**: Drag and drop or click to upload potato leaf images
- **Real-time Prediction**: Get instant disease classification results
- **Confidence Scoring**: See prediction confidence percentages
- **Beautiful UI**: Modern, responsive design with color-coded results
- **Disease Information**: Educational content about different potato diseases

## Supported Diseases

- **Early Blight**: Fungal disease causing brown spots with concentric rings
- **Late Blight**: Serious disease causing rapid leaf death
- **Healthy**: No disease detected

## Project Structure

```
potato-disease/
├── api/                 # FastAPI backend
│   ├── main.py         # Main API server
│   └── requirements.txt # Python dependencies
├── frontend/           # React frontend
│   ├── src/
│   │   ├── App.jsx     # Main React component
│   │   └── App.css     # Styles
│   └── package.json    # Node.js dependencies
├── models/             # Trained ML models
│   └── 1.keras        # Potato disease classification model
└── Training/          # Training notebooks and data
```

## Quick Start

### Prerequisites

- Python 3.10+ (for TensorFlow compatibility)
- Node.js 16+ and npm
- Conda or virtual environment (recommended)

### 1. Setup Python Environment

```bash
# Create and activate conda environment
conda create -n tfenv python=3.10
conda activate tfenv

# Install Python dependencies
pip install tensorflow==2.16.1 fastapi uvicorn pillow numpy python-multipart
```

### 2. Setup Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install
```

### 3. Start the Application

#### Option A: Using the startup script
```bash
# From project root
python start_app.py
```

#### Option B: Manual startup

**Terminal 1 - Backend:**
```bash
# Activate your conda environment
conda activate tfenv

# Start FastAPI server
cd api
python main.py
```

**Terminal 2 - Frontend:**
```bash
# Start React development server
cd frontend
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173 (or URL shown by Vite)
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Usage

1. **Upload Image**: Click the upload area or drag and drop a potato leaf image
2. **Analyze**: Click "Analyze Image" to process the image
3. **View Results**: See the disease classification with confidence score
4. **Learn More**: Read about different potato diseases in the info section

## API Endpoints

- `GET /ping` - Health check
- `POST /predict` - Upload image and get disease prediction

### Example API Response

```json
{
  "class": "Early Blight",
  "confidence": 0.95
}
```

## Troubleshooting

### Model Loading Issues

If you see "Model failed to load" errors:

1. **Check TensorFlow version compatibility**
   ```bash
   pip install tensorflow==2.16.1
   ```

2. **Verify model file exists**
   ```bash
   ls models/1.keras
   ```

3. **Check Python version**
   ```bash
   python --version  # Should be 3.10+
   ```

### CORS Issues

If the frontend can't connect to the backend:

1. Make sure the backend is running on port 8000
2. Check that CORS middleware is enabled in `api/main.py`
3. Verify the frontend is making requests to `http://localhost:8000`

### Image Upload Issues

- Supported formats: JPG, PNG, GIF
- Maximum file size: 10MB (configurable)
- Ensure images are clear potato leaf photos

## Development

### Backend Development

The FastAPI backend is located in `api/main.py`. Key features:

- CORS enabled for frontend communication
- Image preprocessing for model input
- Error handling and logging
- Model loading with fallback options

### Frontend Development

The React frontend uses:

- Vite for fast development
- Modern CSS with responsive design
- File upload with preview
- Real-time API communication

## Model Information

- **Architecture**: Convolutional Neural Network (CNN)
- **Input**: 256x256 RGB images
- **Output**: 3 classes (Early Blight, Late Blight, Healthy)
- **Format**: Keras model (.keras)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and research purposes.

## Acknowledgments

- PlantVillage dataset for training data
- TensorFlow/Keras for deep learning framework
- FastAPI for backend API
- React for frontend framework 