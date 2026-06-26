import os
from collections import Counter


def get_repo_tree(repo_name: str, max_items: int = 100):
    repo_path = os.path.join("data", "repos", repo_name)

    if not os.path.exists(repo_path):
        return {
            "error": "Repository not found",
            "repo_name": repo_name,
        }

    items = []

    for root, dirs, files in os.walk(repo_path):
        # Skip .git folder
        if ".git" in root:
            continue

        for name in dirs + files:
            full_path = os.path.join(root, name)

            if ".git" in full_path:
                continue

            relative_path = full_path.replace(repo_path, "").lstrip("/")

            items.append(relative_path)

            if len(items) >= max_items:
                return {
                    "repo_name": repo_name,
                    "items_count": len(items),
                    "tree": items,
                }

    return {
        "repo_name": repo_name,
        "items_count": len(items),
        "tree": items,
    }


def get_repo_stats(repo_name: str):
    repo_path = os.path.join("data", "repos", repo_name)

    if not os.path.exists(repo_path):
        return {
            "error": "Repository not found",
            "repo_name": repo_name,
        }

    total_files = 0
    total_dirs = 0
    extensions = Counter()

    for root, dirs, files in os.walk(repo_path):

        if ".git" in root:
            continue

        total_dirs += len(dirs)

        for file in files:

            total_files += 1

            ext = os.path.splitext(file)[1]

            if ext:
                extensions[ext] += 1

    return {
        "repo_name": repo_name,
        "total_files": total_files,
        "total_directories": total_dirs,
        "file_extensions": dict(
            extensions.most_common(10)
        ),
    }
    
def get_repo_files(repo_name: str, max_files: int = 100):
    repo_path = os.path.join("data", "repos", repo_name)

    if not os.path.exists(repo_path):
        return {
            "error": "Repository not found",
            "repo_name": repo_name,
        }

    files_list = []

    for root, _, files in os.walk(repo_path):
        if ".git" in root:
            continue

        for file in files:
            full_path = os.path.join(root, file)

            if ".git" in full_path:
                continue

            relative_path = full_path.replace(repo_path, "").lstrip("/")

            files_list.append(relative_path)

            if len(files_list) >= max_files:
                return {
                    "repo_name": repo_name,
                    "count": len(files_list),
                    "files": files_list,
                }

    return {
        "repo_name": repo_name,
        "count": len(files_list),
        "files": files_list,
    }