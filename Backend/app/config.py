import os
from pathlib import Path
from dotenv import load_dotenv

# Load env variables from .env
load_dotenv()

# Backend project root directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Data storage directory
DATA_DIR = Path(os.getenv("DATA_DIR", str(BASE_DIR / "data")))

# Ensure DATA_DIR exists
DATA_DIR.mkdir(parents=True, exist_ok=True)

# Port configuration
PORT = int(os.getenv("PORT", 5000))

# CORS allowed origins
FRONTEND_URLS_RAW = os.getenv(
    "FRONTEND_URLS",
    "http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173"
)
ALLOWED_ORIGINS = [
    origin.strip() for origin in FRONTEND_URLS_RAW.split(",") if origin.strip()
]
