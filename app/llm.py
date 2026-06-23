import os
import requests

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "ollama")
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5-coder:1.5b")


def ask_llm(question: str, context: str = ""):
    prompt = f"""
You are a senior software engineer AI.

Context:
{context}

Question:
{question}
"""

    if LLM_PROVIDER == "ollama":
        try:
            response = requests.post(
                f"{OLLAMA_URL}/api/generate",
                json={
                    "model": OLLAMA_MODEL,
                    "prompt": prompt,
                    "stream": False
                },
                timeout=300
            )
            
            
            response.raise_for_status()
            return response.json().get("response", "")

        except requests.exceptions.RequestException as e:
            return f"Ollama error: {str(e)}"

    raise ValueError("Unsupported LLM provider")