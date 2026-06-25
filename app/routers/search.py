from fastapi import APIRouter

from app.models import SearchCodeRequest
from app.services.search_service import search_code

router = APIRouter()


@router.post("/search-code")
def search_code_endpoint(req: SearchCodeRequest):
    return search_code(
        query=req.query,
        n_results=req.n_results,
    )