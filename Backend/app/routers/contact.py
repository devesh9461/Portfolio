import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, status
from app.utils.file_store import CONTACTS_FILE, read_json, write_json
from app.schemas.contact import ContactInput

router = APIRouter()

@router.get("")
@router.get("/")
async def get_contacts():
    contacts = await read_json(CONTACTS_FILE, [])
    return {
        "count": len(contacts),
        "contacts": contacts
    }

@router.post("", status_code=status.HTTP_201_CREATED)
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_contact(payload: ContactInput):
    contacts = await read_json(CONTACTS_FILE, [])
    
    submission_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    
    submission = {
        "id": submission_id,
        "name": payload.name,
        "email": payload.email,
        "subject": payload.subject,
        "message": payload.message,
        "createdAt": created_at
    }
    
    # Include optional metadata fields only when provided
    if payload.startDate:
        submission["startDate"] = payload.startDate
    if payload.contractType:
        submission["contractType"] = payload.contractType
    if payload.decisionWindow:
        submission["decisionWindow"] = payload.decisionWindow
    if payload.projectScope:
        submission["projectScope"] = payload.projectScope
    
    # Prepend to mimic unshift
    contacts.insert(0, submission)
    await write_json(CONTACTS_FILE, contacts)
    
    return {
        "message": "Contact form submitted successfully.",
        "submission": {
            "id": submission_id,
            "createdAt": created_at
        }
    }
