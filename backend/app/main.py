from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas.note_schema import NoteRequest
from app.services.ai_service import summarize_clinical_note
from app.schemas.response_schema import SummaryResponse


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Clinical Note Summarizer API"
    }


@app.post("/summarize", response_model=SummaryResponse)
def summarize(request: NoteRequest):

    try:

        summary = summarize_clinical_note(
            request.note
        )

        return {
            "success": True,
            "summary": summary,
            "error": None
        }

    except Exception as e:

        return {
            "success": False,
            "summary": None,
            "error": str(e)
        }