from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.chat import router as chat_router
from app.routers.explain import router as explain_router
from app.routers.health import router as health_router
from app.routers.ingest import router as ingest_router
from app.routers.repo_explorer import router as repo_explorer_router
from app.routers.search import router as search_router

app = FastAPI(title="Personal AI Engineer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(ingest_router)
app.include_router(chat_router)
app.include_router(explain_router)
app.include_router(search_router)
app.include_router(repo_explorer_router)


@app.get("/")
def home():
    return {"message": "Personal AI Engineer is running 🚀"}
