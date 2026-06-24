import os
import git

REPO_DIR = "data/repos"


def clone_repo(repo_url: str, repo_name: str):
    """
    Clone GitHub repo locally
    """
    os.makedirs(REPO_DIR, exist_ok=True)

    path = os.path.join(REPO_DIR, repo_name)

    if os.path.exists(path) and len(os.listdir(path)) > 0:
        print(f"[✓] Repo already exists: {path}")
        return path

    print(f"[↓] Cloning repo: {repo_url}")

    git.Repo.clone_from(repo_url, path)

    print(f"[✓] Repo cloned at: {path}")
    return path


def read_repo_files(repo_path: str, max_files: int = 5):
    """
    Read code files from repo (MVP version)
    """
    code_data = []

    if not os.path.exists(repo_path):
        print(f"[!] Repo path does not exist: {repo_path}")
        return []

    for root, _, files in os.walk(repo_path):
        for file in files:

            if file.endswith((".py", ".js", ".ts", ".java", ".md")):
                file_path = os.path.join(root, file)

                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()

                    code_data.append({
                        "file": file_path.replace(repo_path, ""),
                        "content": content[:1000]
                    })

                    if len(code_data) >= max_files:
                        print(f"[✓] Loaded {len(code_data)} files")
                        return code_data

                except Exception:
                    continue

    print(f"[✓] Total files loaded: {len(code_data)}")
    return code_data

def chunk_text(text: str, chunk_size: int = 1000):
    chunks = []

    for i in range(0, len(text), chunk_size):
        chunks.append(text[i:i + chunk_size])

    return chunks