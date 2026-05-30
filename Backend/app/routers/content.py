from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, status
from app.utils.file_store import CONTENT_FILE, PROJECTS_FILE, read_json, write_json

router = APIRouter()

@router.get("")
@router.get("/")
async def get_content():
    content = await read_json(CONTENT_FILE, {})
    projects = await read_json(PROJECTS_FILE, [])
    
    response_data = {**content}
    response_data["projects"] = projects
    return response_data

@router.put("")
@router.put("/")
async def update_content(payload: dict):
    if not isinstance(payload, dict):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid payload. Send an object with portfolio sections."
        )
        
    existing_content = await read_json(CONTENT_FILE, {})
    
    # Merge dicts
    next_content = {**existing_content, **payload}
    next_content["updatedAt"] = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    
    # Remove projects key to keep it clean and managed by /api/projects
    if "projects" in next_content:
        del next_content["projects"]
        
    await write_json(CONTENT_FILE, next_content)
    
    return {
        "message": "Portfolio content updated successfully.",
        "content": next_content
    }
