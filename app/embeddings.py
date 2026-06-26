import os

import requests


OLLAMA_URL = os.getenv(
    "OLLAMA_URL",
    "http://localhost:11434",
)

EMBED_MODEL = os.getenv(
    "EMBED_MODEL",
    "nomic-embed-text",
)


def get_embedding(text: str) -> list[float]:
    """
    Generate an embedding for the given text using Ollama.
    """

    response = requests.post(
        f"{OLLAMA_URL}/api/embeddings",
        json={
            "model": EMBED_MODEL,
            "prompt": text,
        },
        timeout=120,
    )

    response.raise_for_status()

    return response.json()["embedding"]