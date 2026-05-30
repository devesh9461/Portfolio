from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.config import ALLOWED_ORIGINS
from app.routers import health, contact, content, projects

app = FastAPI(
    title="Portfolio Backend",
    description="Python FastAPI backend for contact forms, dynamic sections, and projects database.",
    version="1.0.0"
)

origins = [
    "https://github.com/devesh9461.github.io",
    "http://localhost:5173", # Vite dev server
]

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api/health", tags=["Health"])
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])
app.include_router(content.router, prefix="/api/content", tags=["Content"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])

@app.get("/")
async def root():
    return {
        "message": "Portfolio backend is running.",
        "endpoints": ["/api/health", "/api/contact", "/api/content", "/api/projects"]
    }

# Exception handler for Pydantic validation errors (matches legacy Express responses)
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = []
    for error in exc.errors():
        loc = error.get("loc", [])
        # Extract the field name from location tuple (e.g. ('body', 'email') -> 'email')
        field = str(loc[-1]) if loc else "field"
        
        # Clean up message (Pydantic validation messages contain 'Value error, ' prefix on custom validators)
        msg = error.get("msg", "invalid value")
        if msg.startswith("Value error, "):
            msg = msg[13:]
            
        errors.append(f"{field.capitalize()}: {msg}")
        
    return JSONResponse(
        status_code=400,
        content={
            "message": "Validation failed.",
            "errors": errors
        }
    )

# Exception handler for standard HTTP exceptions (handles custom 404s)
@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    if exc.status_code == 404:
        return JSONResponse(
            status_code=404,
            content={"message": "Route not found."}
        )
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail}
    )

# Global internal server error handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"Unhandled system error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error."}
    )

if __name__ == "__main__":
    import uvicorn
    from app.config import PORT
    uvicorn.run("app.main:app", host="0.0.0.0", port=PORT, reload=True)
