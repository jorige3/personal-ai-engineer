from app.file_reader import read_specific_file
from app.llm import ask_llm


def explain_repository_file(repo_name: str, file_path: str):
    """
    Explain a specific file from an indexed repository.
    """

    content = read_specific_file(
        repo_name=repo_name,
        file_path=file_path,
    )

    if content is None:
        return {
            "error": "File not found",
            "file_path": file_path,
        }

    answer = ask_llm(
        question=f"Explain this file: {file_path}",
        context=content[:500],
    )

    return {
        "file": file_path,
        "summary": answer,
        "sources": [file_path],
    }