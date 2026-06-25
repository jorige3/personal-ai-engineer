from fastapi import FastAPI

from app.file_reader import read_specific_file
from app.llm import ask_llm
from app.models import ExplainFileRequest
from app.routers.chat import router as chat_router
from app.routers.health import router as health_router
from app.routers.ingest import router as ingest_router

app = FastAPI(title="Personal AI Engineer")

app.include_router(health_router)
app.include_router(ingest_router)
app.include_router(chat_router)


@app.get("/")
def home():
    return {"message": "Personal AI Engineer is running 🚀"}


@app.post("/explain-file")
def explain_file(req: ExplainFileRequest):
    content = read_specific_file(
        repo_name=req.repo_name,
        file_path=req.file_path,
    )

    if content is None:
        return {
            "error": "File not found",
            "file_path": req.file_path,
        }

    answer = ask_llm(
        question=f"Explain this file: {req.file_path}",
        context=content[:3000],
    )

    return {
        "file": req.file_path,
        "summary": answer,
        "sources": [req.file_path],
    }