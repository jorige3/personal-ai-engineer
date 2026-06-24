from fastapi import FastAPI
from pydantic import BaseModel

from app.embeddings import get_embedding
from app.github_loader import clone_repo, read_repo_files
from app.indexer import index_repository
from app.llm import ask_llm
from app.vector_store import search_chunks

app = FastAPI(title="Personal AI Engineer")


class RepoRequest(BaseModel):
    repo_url: str
    repo_name: str


class ChatRequest(BaseModel):
    repo_name: str
    question: str


@app.get("/")
def home():
    return {"message": "Personal AI Engineer is running 🚀"}


@app.post("/ingest-repo")
def ingest_repo(req: RepoRequest):
    repo_path = clone_repo(req.repo_url, req.repo_name)

    files = read_repo_files(repo_path)

    index_repository(
        repo_path=repo_path,
        repo_name=req.repo_name,
    )

    return {
        "message": "Repo ingested and indexed successfully",
        "repo_name": req.repo_name,
        "files_loaded": len(files),
    }


@app.post("/chat-repo")
def chat_repo(req: ChatRequest):
    question_embedding = get_embedding(req.question)

    results = search_chunks(
        embedding=question_embedding,
        n_results=5,
    )

    documents = results.get("documents", [[]])[0]

    context = "\n\n".join(documents)

    answer = ask_llm(
        question=req.question,
        context=context,
    )

    return {
        "question": req.question,
        "answer": answer,
        "chunks_used": len(documents),
    }