from fastapi import APIRouter

from app.file_reader import read_specific_file
from app.llm import ask_llm
from app.models import ExplainFileRequest

router = APIRouter()


@router.post("/explain-file")
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