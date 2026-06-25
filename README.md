# Personal AI Engineer

An open-source AI coding assistant that helps developers understand GitHub repositories using local Large Language Models (LLMs). It can ingest repositories, index source code with embeddings, perform semantic code search, explain source files, and answer questions about codebases using **Ollama** and **ChromaDB**.

## Why this project?

Modern codebases can contain thousands of files, making them difficult to navigate and understand. Personal AI Engineer acts as an intelligent assistant that enables developers to:

* 📂 Ingest GitHub repositories
* 🧠 Build a semantic vector index of source code
* 💬 Chat with an entire codebase
* 🔎 Search code using natural language
* 📖 Explain individual source files
* 📌 Return source citations for every answer
* ⚡ Incrementally index only changed files for faster updates

The project is designed to run **100% locally**, keeping your source code private while leveraging local AI models powered by Ollama.


# Features

* 🚀 FastAPI backend
* 🤖 Local Ollama LLM integration
* 📂 GitHub repository ingestion
* ✂️ Automatic code chunking
* 🧠 ChromaDB vector storage
* 💬 Semantic repository chat
* 📖 Explain individual source files
* 🔎 Semantic code search
* 📌 Source citations
* ⚡ Incremental indexing using file hashes
* 🏗 Clean Router + Service architecture

---

# Tech Stack

* Python 3.11+
* FastAPI
* Ollama
* ChromaDB
* GitPython
* uv

---

# Project Structure

```text
app/
├── main.py
├── models.py
├── embeddings.py
├── vector_store.py
├── github_loader.py
├── indexer.py
├── file_reader.py
├── file_hash.py
├── index_metadata.py
├── llm.py
│
├── routers/
│   ├── health.py
│   ├── ingest.py
│   ├── chat.py
│   ├── explain.py
│   └── search.py
│
└── services/
    ├── ingest_service.py
    ├── chat_service.py
    ├── explain_service.py
    └── search_service.py
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/jorige3/personal-ai-engineer.git
cd personal-ai-engineer
```

Install dependencies:

```bash
uv sync
```

---

# Start Ollama

```bash
ollama serve
```

Example models:

```bash
ollama pull qwen2.5-coder:1.5b
ollama pull nomic-embed-text
```

---

# Run the API

```bash
uv run uvicorn app.main:app --reload
```

---

# API Documentation

Open your browser:

```text
http://127.0.0.1:8000/docs
```

---

# API Examples

## Health Check

```bash
curl http://127.0.0.1:8000/health
```

---

## Ingest Repository

```bash
curl -X POST http://127.0.0.1:8000/ingest-repo \
-H "Content-Type: application/json" \
-d '{
  "repo_url":"https://github.com/facebook/react",
  "repo_name":"react"
}'
```

---

## Chat with Repository

```bash
curl -X POST http://127.0.0.1:8000/chat-repo \
-H "Content-Type: application/json" \
-d '{
  "repo_name":"react",
  "question":"What does React do?"
}'
```

---

## Explain a File

```bash
curl -X POST http://127.0.0.1:8000/explain-file \
-H "Content-Type: application/json" \
-d '{
  "repo_name":"react",
  "file_path":".eslintrc.js"
}'
```

---

## Semantic Code Search

```bash
curl -X POST http://127.0.0.1:8000/search-code \
-H "Content-Type: application/json" \
-d '{
  "repo_name":"react",
  "query":"Find ESLint configuration",
  "n_results":3
}'
```

---

# Releases

| Version | Description                   |
| ------- | ----------------------------- |
| v0.2.0  | RAG + ChromaDB                |
| v0.3.0  | Incremental Indexing          |
| v0.4.0  | Source Citations              |
| v0.5.0  | Router + Service Architecture |
| v0.6.0  | Semantic Code Search          |

---

# Roadmap

* ✅ Repository Ingestion
* ✅ Vector Database
* ✅ Repository Chat
* ✅ Explain File
* ✅ Semantic Code Search

### Upcoming

* Repository Explorer
* Repository Statistics
* Project Tree API
* React Frontend
* Docker Deployment
* Authentication
* Production Deployment

---

# License

This project is released under the MIT License.

---

## Author

**Kishore Kumar J**

📧 **Email:** [jorige369@gmail.com](mailto:jorige369@gmail.com)

🐙 **GitHub:** https://github.com/jorige3

💼 **LinkedIn:** *(Coming Soon)*

🌐 **Portfolio:** *(Coming Soon)*

---

## Available for Freelance Work

I can help with:

* Python Development
* FastAPI Backend Development
* AI & LLM Applications
* RAG (Retrieval-Augmented Generation) Systems
* AI Automation & Workflow Development
* REST API Development
* Docker & Deployment
* GitHub Automation

If you're interested in working together, feel free to reach out via email.

---

## Acknowledgements

Built with:

* FastAPI
* Ollama
* ChromaDB
* GitPython
* uv
