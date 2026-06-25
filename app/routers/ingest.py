from fastapi import APIRouter

from app.github_loader import clone_repo, read_repo_files
from app.indexer import index_repository
from app.models import RepoRequest

router = APIRouter()


@router.post("/ingest-repo")
def ingest_repo(req: RepoRequest):
    repo_path = clone_repo(req.repo_url, req.repo_name)

    files = read_repo_files(repo_path)

    index_stats = index_repository(
        repo_path=repo_path,
        repo_name=req.repo_name,
    )

    return {
        "message": "Repo ingested and indexed successfully",
        "repo_name": req.repo_name,
        "files_loaded": len(files),
        "indexed_chunks": index_stats["indexed_chunks"],
        "skipped_files": index_stats["skipped_files"],
    }