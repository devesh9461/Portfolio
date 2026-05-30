import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, status
from app.utils.file_store import PROJECTS_FILE, read_json, write_json
from app.schemas.project import ProjectInput

router = APIRouter()

@router.get("")
@router.get("/")
async def get_projects():
    projects = await read_json(PROJECTS_FILE, [])
    return {
        "count": len(projects),
        "projects": projects
    }

@router.post("", status_code=status.HTTP_201_CREATED)
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_project(payload: ProjectInput):
    projects = await read_json(PROJECTS_FILE, [])
    
    now = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    project_id = str(uuid.uuid4())
    
    new_project = {
        "id": project_id,
        "title": payload.title,
        "description": payload.description,
        "image": payload.image,
        "github": payload.github,
        "live": payload.live,
        "tags": payload.tags,
        "featured": payload.featured,
        "createdAt": now,
        "updatedAt": now
    }
    
    # Prepend project to mimics unshift
    projects.insert(0, new_project)
    await write_json(PROJECTS_FILE, projects)
    
    return {
        "message": "Project created successfully.",
        "project": new_project
    }
