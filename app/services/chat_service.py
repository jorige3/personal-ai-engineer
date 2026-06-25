from app.embeddings import get_embedding
from app.llm import ask_llm
from app.vector_store import search_chunks


def chat_with_repo(repo_name: str, question: str):
    """
    Chat with an indexed repository using RAG.
    """

    question_embedding = get_embedding(question)

    results = search_chunks(
        embedding=question_embedding,
        n_results=5,
    )

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]

    sources = list({
        item.get("file")
        for item in metadatas
        if item.get("file")
    })

    context = "\n\n".join(documents)

    answer = ask_llm(
        question=question,
        context=context,
    )

    return {
        "question": question,
        "answer": answer,
        "chunks_used": len(documents),
        "sources": sources,
    }