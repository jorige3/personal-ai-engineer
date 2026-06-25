import os


def read_specific_file(repo_name: str, file_path: str):
    """
    Read a single file from an indexed repository.
    """

    repo_root = os.path.join("data", "repos", repo_name)

    file_path = file_path.lstrip("/")

    full_path = os.path.join(repo_root, file_path)

    if not os.path.exists(full_path):
        return None

    try:
        with open(full_path, "r", encoding="utf-8") as f:
            return f.read()

    except Exception:
        return None