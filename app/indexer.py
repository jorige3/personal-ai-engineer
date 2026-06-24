from app.github_loader import read_repo_files, chunk_text
from app.embeddings import get_embedding
from app.vector_store import add_chunk


def index_repository(repo_path: str, repo_name: str):
    files = read_repo_files(repo_path)

    total_chunks = 0

    for file in files:
        chunks = chunk_text(file["content"])

        for i, chunk in enumerate(chunks):
            embedding = get_embedding(chunk)

            add_chunk(
                chunk_id=f"{repo_name}_{file['file']}_{i}",
                text=chunk,
                file_name=file["file"],
                embedding=embedding,
            )

            total_chunks += 1

    print(f"[✓] Indexed {total_chunks} chunks")