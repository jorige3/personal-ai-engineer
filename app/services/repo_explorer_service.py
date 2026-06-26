import os


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
