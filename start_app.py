#!/usr/bin/env python3
"""
Startup script for Potato Disease Classifier
This script starts the FastAPI backend and provides instructions for the React frontend.
"""

import subprocess
import sys
import os
import time
from pathlib import Path

def check_dependencies():
    """Check if required dependencies are installed."""
    try:
        import fastapi
        import uvicorn
        import tensorflow
        import numpy
        import PIL
        print("✅ All Python dependencies are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Please install missing dependencies:")
        print("pip install fastapi uvicorn tensorflow pillow numpy python-multipart")
        return False

def start_backend():
    """Start the FastAPI backend server."""
    print("\n🚀 Starting FastAPI Backend...")
    print("Backend will be available at: http://localhost:8000")
    print("API Documentation: http://localhost:8000/docs")
    
    api_dir = Path("api")
    if not api_dir.exists():
        print("❌ API directory not found!")
        return False
    
    try:
        # Start the FastAPI server
        subprocess.run([
            sys.executable, 
            str(api_dir / "main.py")
        ], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Backend stopped by user")
    except subprocess.CalledProcessError as e:
        print(f"❌ Backend failed to start: {e}")
        return False
    
    return True

def main():
    """Main function to start the application."""
    print("🥔 Potato Disease Classifier")
    print("=" * 40)
    
    # Check dependencies
    if not check_dependencies():
        return
    
    # Check if frontend exists
    frontend_dir = Path("frontend")
    if not frontend_dir.exists():
        print("❌ Frontend directory not found!")
        print("Please make sure you're in the project root directory.")
        return
    
    print("\n📋 Instructions:")
    print("1. This script will start the FastAPI backend")
    print("2. In a separate terminal, start the React frontend:")
    print("   cd frontend")
    print("   npm run dev")
    print("3. Open your browser to the URL shown by the React dev server")
    print("4. Upload potato leaf images to test the classifier!")
    
    print("\n" + "=" * 40)
    
    # Start backend
    start_backend()

if __name__ == "__main__":
    main() 