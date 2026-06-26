from fastapi import APIRouter

from app.services.repo_explorer_service import get_repo_tree

router = APIRouter()


@router.get("/repo-tree/{repo_name}")
def repo_tree(repo_name: str):
    return get_repo_tree(repo_name)
