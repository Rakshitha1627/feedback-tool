from pydantic import BaseModel
from datetime import datetime

class FeedbackCreate(BaseModel):
    strengths: str
    improvements: str
    sentiment: str
    comment: str | None = None

class FeedbackOut(FeedbackCreate):
    id: int
    manager_id: int
    employee_id: int
    created_at: datetime

    class Config:
        from_attributes = True
