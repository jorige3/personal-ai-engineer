from fastapi import APIRouter

from app.models import RepoRequest
from app.services.ingest_service import ingest_repository

router = APIRouter()


@router.post("/ingest-repo")
def ingest_repo(req: RepoRequest):
    return ingest_repository(
        repo_url=req.repo_url,
        repo_name=req.repo_name,
    )