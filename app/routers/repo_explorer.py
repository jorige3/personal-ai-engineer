from fastapi import APIRouter

from app.services.repo_explorer_service import get_repo_tree

from app.services.repo_explorer_service import (
    get_repo_tree,
    get_repo_stats,
)

router = APIRouter()


@router.get("/repo-tree/{repo_name}")
def repo_tree(repo_name: str):
    return get_repo_tree(repo_name)

@router.get("/repo-stats/{repo_name}")
def repo_stats(repo_name: str):
    return get_repo_stats(repo_name)
