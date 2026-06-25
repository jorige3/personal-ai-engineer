from app.embeddings import get_embedding
from app.vector_store import search_chunks


def search_code(query: str, n_results: int = 5):
    query_embedding = get_embedding(query)

    results = search_chunks(
        embedding=query_embedding,
        n_results=n_results,
    )

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]
    distances = results.get("distances", [[]])[0]

    search_results = []

    for document, metadata, distance in zip(documents, metadatas, distances):
        search_results.append(
            {
                "file": metadata.get("file"),
                "content": document[:1000],
                "distance": distance,
            }
        )

    return {
        "query": query,
        "results_count": len(search_results),
        "results": search_results,
    }