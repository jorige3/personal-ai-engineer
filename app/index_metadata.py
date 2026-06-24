import json
import os

METADATA_FILE = "data/index_metadata.json"


def load_metadata():
    if not os.path.exists(METADATA_FILE):
        return {}

    with open(METADATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_metadata(metadata: dict):
    os.makedirs(os.path.dirname(METADATA_FILE), exist_ok=True)

    with open(METADATA_FILE, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)


def is_file_indexed(repo_name: str, file_path: str, file_hash: str) -> bool:
    metadata = load_metadata()

    key = f"{repo_name}:{file_path}"

    return metadata.get(key) == file_hash


def mark_file_indexed(repo_name: str, file_path: str, file_hash: str):
    metadata = load_metadata()

    key = f"{repo_name}:{file_path}"
    metadata[key] = file_hash

    save_metadata(metadata)