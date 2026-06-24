from app.github_loader import read_repo_files, chunk_text
from app.embeddings import get_embedding
from app.vector_store import add_chunk

from app.file_hash import file_hash
from app.index_metadata import (
    is_file_indexed,
    mark_file_indexed,
)


def index_repository(repo_path: str, repo_name: str):
    """
    Index repository files into ChromaDB.

    Skip files that have already been indexed and
    have not changed.
    """

    files = read_repo_files(repo_path)

    total_chunks = 0
    skipped_files = 0

    for file in files:

        current_hash = file_hash(file["content"])

        if is_file_indexed(
            repo_name,
            file["file"],
            current_hash,
        ):
            print(f"[SKIP] {file['file']}")

            skipped_files += 1
            continue

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

        mark_file_indexed(
            repo_name,
            file["file"],
            current_hash,
        )

        print(f"[INDEXED] {file['file']}")

    print(
        f"[✓] Indexed {total_chunks} chunks | "
        f"Skipped {skipped_files} files"
    )
    
    return {
        "indexed_chunks": total_chunks,
        "skipped_files": skipped_files,
    }