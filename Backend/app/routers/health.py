from datetime import datetime, timezone
from fastapi import APIRouter

router = APIRouter()

@router.get("")
@router.get("/")
async def get_health():
    return {
        "ok": True,
        "service": "portfolio-backend",
        "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    }
