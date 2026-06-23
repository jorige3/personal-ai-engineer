from fastapi import FastAPI
from pydantic import BaseModel

from app.github_loader import clone_repo, read_repo_files
from app.llm import ask_llm

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
    path = clone_repo(req.repo_url, req.repo_name)
    files = read_repo_files(path)

    return {
        "message": "Repo ingested successfully",
        "files_loaded": len(files)
    }


@app.post("/chat-repo")
def chat_repo(req: ChatRequest):
    repo_path = f"data/repos/{req.repo_name}"
    files = read_repo_files(repo_path)

    context = "\n\n".join(
        [f"File: {f['file']}\n{f['content']}" for f in files]
    )

    answer = ask_llm(req.question, context)

    return {
        "question": req.question,
        "answer": answer
    }