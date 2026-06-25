# Personal AI Engineer

A local AI-powered developer assistant that can ingest GitHub repositories, index code with embeddings, and answer questions about the codebase using Ollama + ChromaDB.

## Features

- FastAPI backend
- Local Ollama LLM support
- GitHub repository ingestion
- Code chunking
- ChromaDB vector storage
- Semantic repository chat
- Source citations
- Incremental indexing with file hashes
- Explain specific files
- Semantic code search
- Clean router + service architecture

## Tech Stack

- Python
- FastAPI
- Ollama
- ChromaDB
- GitPython
- uv

## Project Structure

```text
app/
├── main.py
├── models.py
├── routers/
│   ├── health.py
│   ├── ingest.py
│   ├── chat.py
│   ├── explain.py
│   └── search.py
├── services/
│   ├── ingest_service.py
│   ├── chat_service.py
│   ├── explain_service.py
│   └── search_service.py
├── embeddings.py
├── vector_store.py
├── github_loader.py
├── indexer.py
├── file_reader.py
├── file_hash.py
└── index_metadata.py

Setup
uv sync

Start Ollama:

ollama serve

Run the API:

uv run uvicorn app.main:app --reload

Open docs:

http://127.0.0.1:8000/docs
API Examples
Health
curl http://127.0.0.1:8000/health
Ingest Repository
curl -X POST http://127.0.0.1:8000/ingest-repo \
-H "Content-Type: application/json" \
-d '{"repo_url":"https://github.com/facebook/react","repo_name":"react"}'
Chat with Repository
curl -X POST http://127.0.0.1:8000/chat-repo \
-H "Content-Type: application/json" \
-d '{"repo_name":"react","question":"What does React do?"}'
Explain File
curl -X POST http://127.0.0.1:8000/explain-file \
-H "Content-Type: application/json" \
-d '{"repo_name":"react","file_path":".eslintrc.js"}'
Semantic Code Search
curl -X POST http://127.0.0.1:8000/search-code \
-H "Content-Type: application/json" \
-d '{"repo_name":"react","query":"Find ESLint configuration","n_results":3}'
Releases
v0.2.0 — RAG + ChromaDB
v0.3.0 — Incremental indexing
v0.4.0 — Source citations
v0.5.0 — Router + service architecture
v0.6.0 — Semantic code search
Roadmap
v0.7.0 — Repository explorer
v0.8.0 — React frontend
v0.9.0 — Docker deployment
v1.0.0 — Production-ready release
Notes

This project runs locally and can use Ollama models such as:

qwen2.5-coder:1.5b
nomic-embed-text
