from pydantic import BaseModel


class SummaryResponse(BaseModel):
    success: bool
    summary: dict | None = None
    error: str | None = None