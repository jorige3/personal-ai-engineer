from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def health():
    return {
        "status": "healthy",
        "project": "Personal AI Engineer",
        "version": "0.5.0-dev",
        "llm": "Ollama",
        "vector_store": "ChromaDB",
    }