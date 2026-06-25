from app.github_loader import clone_repo, read_repo_files
from app.indexer import index_repository


def ingest_repository(repo_url: str, repo_name: str):
    """
    Clone and index a GitHub repository.
    """

    repo_path = clone_repo(repo_url, repo_name)

    files = read_repo_files(repo_path)

    stats = index_repository(
        repo_name=repo_name,
        repo_path=repo_path,
    )

    return {
        "message": "Repo ingested and indexed successfully",
        "repo_name": repo_name,
        "files_loaded": len(files),
        "indexed_chunks": stats["indexed_chunks"],
        "skipped_files": stats["skipped_files"],
    }