import { useState } from 'react'
import './App.css'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file')
        return
      }
      
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size must be less than 10MB')
        return
      }

      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setPrediction(null)
      setError(null)
    }
  }

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError('Please select an image first')
      return
    }

    setLoading(true)
    setError(null)
    setPrediction(null)

    const formData = new FormData()
    formData.append('file', selectedImage)

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.error) {
        setError(result.error)
      } else {
        setPrediction(result)
        // Scroll to results
        setTimeout(() => {
          document.querySelector('.prediction-section')?.scrollIntoView({ 
            behavior: 'smooth' 
          })
        }, 100)
      }
    } catch (err) {
      setError(`Connection error: ${err.message}. Make sure the backend server is running.`)
    } finally {
      setLoading(false)
    }
  }

  const getDiseaseColor = (disease) => {
    switch (disease) {
      case 'Healthy':
        return '#10b981' // green
      case 'Early Blight':
        return '#f59e0b' // amber
      case 'Late Blight':
        return '#ef4444' // red
      default:
        return '#6b7280' // gray
    }
  }

  const getDiseaseIcon = (disease) => {
    switch (disease) {
      case 'Healthy':
        return '✅'
      case 'Early Blight':
        return '⚠️'
      case 'Late Blight':
        return '🚨'
      default:
        return '❓'
    }
  }

  const getDiseaseDescription = (disease) => {
    switch (disease) {
      case 'Healthy':
        return 'This potato leaf appears to be healthy with no signs of disease. Continue regular monitoring and good agricultural practices to maintain plant health.'
      case 'Early Blight':
        return 'Early blight detected. This fungal disease causes brown spots with concentric rings. Can be managed with fungicides and improved air circulation.'
      case 'Late Blight':
        return 'Late blight detected! This is a serious disease that can quickly destroy crops. Requires immediate treatment to prevent crop loss and spread.'
      default:
        return 'Unable to determine disease status. Please try with a clearer image.'
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🥔 Potato Disease Classifier</h1>
          <p>Upload an image of a potato leaf to detect diseases using AI</p>
        </header>

        <div className="upload-section">
          <div className="upload-area">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="image-upload"
              className="file-input"
            />
            <label htmlFor="image-upload" className="upload-label">
              {previewUrl ? (
                <div className="image-preview">
                  <img src={previewUrl} alt="Preview" />
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📁</div>
                  <p>Click to select an image</p>
                  <p className="upload-hint">Supports: JPG, PNG, GIF (Max 10MB)</p>
                </div>
              )}
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedImage || loading}
            className="submit-button"
          >
            {loading ? (
              <>
                <span className="loading"></span>
                Analyzing Image...
              </>
            ) : (
              'Analyze Image'
            )}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
          </div>
        )}

        {prediction && (
          <div className="prediction-section">
            <h2>Analysis Results</h2>
            <div 
              className="prediction-card"
              style={{ borderColor: getDiseaseColor(prediction.class) }}
            >
              <div className="prediction-header">
                <h3>
                  {getDiseaseIcon(prediction.class)} {prediction.class}
                </h3>
                <div 
                  className="confidence-badge"
                  style={{ backgroundColor: getDiseaseColor(prediction.class) }}
                >
                  {Math.round(prediction.confidence * 100)}% Confidence
                </div>
              </div>
              
              <div className="prediction-details">
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill"
                    style={{ 
                      width: `${prediction.confidence * 100}%`,
                      backgroundColor: getDiseaseColor(prediction.class)
                    }}
                  ></div>
                </div>
                
                <div className="disease-info">
                  <p>{getDiseaseDescription(prediction.class)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="info-section">
          <h3>About Potato Diseases</h3>
          <div className="disease-types">
            <div className="disease-type">
              <h4>🟢 Healthy</h4>
              <p>No disease detected. Continue regular monitoring and good agricultural practices to maintain plant health.</p>
            </div>
            <div className="disease-type">
              <h4>🟡 Early Blight</h4>
              <p>Fungal disease causing brown spots with concentric rings. Can be managed with fungicides and improved air circulation.</p>
            </div>
            <div className="disease-type">
              <h4>🔴 Late Blight</h4>
              <p>Serious disease causing rapid leaf death. Requires immediate treatment to prevent crop loss and spread.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
