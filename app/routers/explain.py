from fastapi import APIRouter

from app.models import ExplainFileRequest
from app.services.explain_service import explain_repository_file

router = APIRouter()


@router.post("/explain-file")
def explain_file(req: ExplainFileRequest):
    return explain_repository_file(
        repo_name=req.repo_name,
        file_path=req.file_path,
    )