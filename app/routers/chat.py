from fastapi import APIRouter

from app.embeddings import get_embedding
from app.llm import ask_llm
from app.models import ChatRequest
from app.vector_store import search_chunks

router = APIRouter()


@router.post("/chat-repo")
def chat_repo(req: ChatRequest):
    question_embedding = get_embedding(req.question)

    results = search_chunks(
        embedding=question_embedding,
        n_results=5,
    )

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]

    sources = list({
        item.get("file")
        for item in metadatas
        if item.get("file")
    })

    context = "\n\n".join(documents)

    answer = ask_llm(
        question=req.question,
        context=context,
    )

    return {
        "question": req.question,
        "answer": answer,
        "chunks_used": len(documents),
        "sources": sources,
    }