import re
from pydantic import BaseModel, Field, field_validator

EMAIL_REGEX = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")

class ContactInput(BaseModel):
    name: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    subject: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)

    @field_validator("name", "email", "subject", "message", mode="before")
    @classmethod
    def trim_strings(cls, v):
        if isinstance(v, str):
            return v.strip()
        return v

    @field_validator("email")
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        if not EMAIL_REGEX.match(v):
            raise ValueError("Email format is invalid.")
        return v
