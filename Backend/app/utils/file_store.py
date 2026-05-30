import json
import aiofiles
from pathlib import Path
from app.config import DATA_DIR

CONTACTS_FILE = DATA_DIR / "contactSubmissions.json"
PROJECTS_FILE = DATA_DIR / "projects.json"
CONTENT_FILE = DATA_DIR / "portfolioContent.json"

async def read_json(file_path: Path, fallback_value = None):
    """
    Asynchronously reads JSON from a file, returning the fallback_value if the file does not exist.
    """
    if fallback_value is None:
        fallback_value = []
        
    try:
        if not file_path.exists():
            return fallback_value
            
        async with aiofiles.open(file_path, mode="r", encoding="utf-8") as f:
            content = await f.read()
            if not content.strip():
                return fallback_value
            return json.loads(content)
    except Exception as e:
        print(f"Error reading JSON from {file_path}: {e}")
        return fallback_value

async def write_json(file_path: Path, data) -> None:
    """
    Asynchronously writes data as formatted JSON to a file.
    """
    try:
        file_path.parent.mkdir(parents=True, exist_ok=True)
        async with aiofiles.open(file_path, mode="w", encoding="utf-8") as f:
            await f.write(json.dumps(data, indent=2, ensure_ascii=False))
    except Exception as e:
        print(f"Error writing JSON to {file_path}: {e}")
        raise e
