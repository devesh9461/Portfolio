import re
from typing import Optional
from pydantic import BaseModel, Field, field_validator

EMAIL_REGEX = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
DATE_REGEX = re.compile(r"^\d{2}-\d{2}-\d{4}$")

VALID_CONTRACT_TYPES = ["Internship", "Full-time", "Contract", "Remote Project"]
VALID_DECISION_WINDOWS = ["This Week", "2 Weeks", "This Month", "Flexible"]
VALID_PROJECT_SCOPES = ["AI Integration", "API Build", "Full-stack MVP", "Automation"]

class ContactInput(BaseModel):
    name: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    subject: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)
    startDate: Optional[str] = Field(None)
    contractType: Optional[str] = Field(None)
    decisionWindow: Optional[str] = Field(None)
    projectScope: Optional[str] = Field(None)

    @field_validator("name", "email", "subject", "message", mode="before")
    @classmethod
    def trim_strings(cls, v):
        if isinstance(v, str):
            return v.strip()
        return v

    @field_validator("startDate", "contractType", "decisionWindow", "projectScope", mode="before")
    @classmethod
    def trim_optional_strings(cls, v):
        if isinstance(v, str):
            v = v.strip()
            return v if v else None
        return v

    @field_validator("email")
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        if not EMAIL_REGEX.match(v):
            raise ValueError("Email format is invalid.")
        return v

    @field_validator("startDate")
    @classmethod
    def validate_start_date(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and not DATE_REGEX.match(v):
            raise ValueError("Start date must be in dd-mm-yyyy format.")
        return v

    @field_validator("contractType")
    @classmethod
    def validate_contract_type(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in VALID_CONTRACT_TYPES:
            raise ValueError(f"Contract type must be one of: {', '.join(VALID_CONTRACT_TYPES)}.")
        return v

    @field_validator("decisionWindow")
    @classmethod
    def validate_decision_window(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in VALID_DECISION_WINDOWS:
            raise ValueError(f"Decision window must be one of: {', '.join(VALID_DECISION_WINDOWS)}.")
        return v

    @field_validator("projectScope")
    @classmethod
    def validate_project_scope(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in VALID_PROJECT_SCOPES:
            raise ValueError(f"Project scope must be one of: {', '.join(VALID_PROJECT_SCOPES)}.")
        return v

