from fastapi import APIRouter

from app.models import ChatRequest
from app.services.chat_service import chat_with_repo

router = APIRouter()


@router.post("/chat-repo")
def chat_repo(req: ChatRequest):
    return chat_with_repo(
        repo_name=req.repo_name,
        question=req.question,
    )