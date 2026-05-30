from typing import List, Optional
from pydantic import BaseModel, Field, field_validator

class ProjectInput(BaseModel):
    title: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    image: str = Field(..., min_length=1)
    github: str = Field(default="#")
    live: str = Field(default="#")
    tags: List[str] = Field(..., min_length=1)
    featured: bool = Field(default=True)

    @field_validator("title", "description", "image", "github", "live", mode="before")
    @classmethod
    def trim_strings(cls, v):
        if isinstance(v, str):
            return v.strip()
        return v

    @field_validator("tags", mode="before")
    @classmethod
    def clean_tags(cls, v):
        if isinstance(v, list):
            cleaned = [item.strip() for item in v if isinstance(item, str) and item.strip()]
            return cleaned
        return v
