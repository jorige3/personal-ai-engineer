from fastapi import FastAPI

from app.embeddings import get_embedding
from app.github_loader import clone_repo, read_repo_files
from app.indexer import index_repository
from app.llm import ask_llm
from app.vector_store import search_chunks
from app.file_reader import read_specific_file

app = FastAPI(title="Personal AI Engineer")

from app.models import (
    RepoRequest,
    ChatRequest,
    ExplainFileRequest,
)

@app.get("/")
def home():
    return {"message": "Personal AI Engineer is running 🚀"}

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "project": "Personal AI Engineer",
        "version": "0.5.0-dev",
        "llm": "Ollama",
        "vector_store": "ChromaDB",
    }


@app.post("/ingest-repo")
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


@app.post("/chat-repo")
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
    
@app.post("/explain-file")
def explain_file(req: ExplainFileRequest):
    content = read_specific_file(
        repo_name=req.repo_name,
        file_path=req.file_path,
    )

    if content is None:
        return {
            "error": "File not found",
            "file_path": req.file_path,
        }

    answer = ask_llm(
        question=f"Explain this file: {req.file_path}",
        context=content[:6000],
    )

    return {
        "file": req.file_path,
        "summary": answer,
        "sources": [req.file_path],
    }
    
