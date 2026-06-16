from pydantic import BaseModel, Field


class NoteRequest(BaseModel):
    note: str = Field(
        ...,
        min_length=10,
        description="Clinical note entered by the user"
    )