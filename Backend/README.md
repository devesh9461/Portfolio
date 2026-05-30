# Portfolio Backend (Python FastAPI)

This backend powers dynamic portfolio content, projects database, and contact forms with local JSON persistence, migrated from Express to Python FastAPI.

## Tech Stack
- **FastAPI**: Modern, fast web framework for building APIs with Python.
- **Pydantic v2**: Data validation and settings management using python type annotations.
- **Uvicorn**: Lightning-fast ASGI server implementation.
- **Aiofiles**: Asynchronous file system access for non-blocking local JSON read/write operations.

---

## Local Setup

### 1. Setup Virtual Environment
Run the following commands in the `Backend` directory:

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows (PowerShell):
.venv\Scripts\Activate.ps1
# On Windows (CMD):
.venv\Scripts\activate.bat
# On macOS/Linux:
source .venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Create Environment File
Make a copy of `.env.example` as `.env`:
```bash
copy .env.example .env
```

---

## Running the Server

Start the development server with hot-reload enabled:

```bash
python -m uvicorn app.main:app --port 5000 --reload
```

*   **API Base URL**: `http://localhost:5000`
*   **Interactive Swagger Documentation**: `http://localhost:5000/docs`
*   **ReDoc Alternative Documentation**: `http://localhost:5000/redoc`

---

## API Endpoints

- `GET /api/health` — Checks api health.
- `GET /api/content` — Fetches portfolio website content merged with the projects list.
- `PUT /api/content` — Updates dynamic portfolio settings.
- `GET /api/projects` — Fetches the list of featured projects.
- `POST /api/projects` — Appends a new project.
- `GET /api/contact` — Retrieves form submissions.
- `POST /api/contact` — Submits contact form data.

---

## Frontend Integration

*   Vite frontend proxies `/api/*` requests directly to `http://localhost:5000`.
*   CORS headers are controlled via `FRONTEND_URLS` in `.env` (comma-separated).
