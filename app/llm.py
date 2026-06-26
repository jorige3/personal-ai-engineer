import os

import requests


LLM_PROVIDER = os.getenv(
    "LLM_PROVIDER",
    "ollama",
)

OLLAMA_URL = os.getenv(
    "OLLAMA_URL",
    "http://localhost:11434",
)

OLLAMA_MODEL = os.getenv(
    "OLLAMA_MODEL",
    "qwen2.5-coder:1.5b",
)


def ask_llm(question: str, context: str = "") -> str:
    """
    Ask the configured LLM provider a question with optional context.
    """

    prompt = f"""
You are a senior software engineer AI.

Use the provided context to answer the question.
If the context is not enough, say what is missing.

Context:
{context}

Question:
{question}
"""

    if LLM_PROVIDER == "ollama":
        return _ask_ollama(prompt)

    raise ValueError(f"Unsupported LLM provider: {LLM_PROVIDER}")


def _ask_ollama(prompt: str) -> str:
    """
    Send a prompt to Ollama and return the generated response.
    """

    try:
        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": OLLAMA_MODEL,
                "prompt": prompt,
                "stream": False,
            },
            timeout=300,
        )

        response.raise_for_status()

        return response.json().get("response", "")

    except requests.exceptions.RequestException as error:
        return f"Ollama error: {error}"