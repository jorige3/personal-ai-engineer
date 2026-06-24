import chromadb

client = chromadb.PersistentClient(
    path="data/chroma"
)

collection = client.get_or_create_collection(
    name="repo_chunks"
)


def add_chunk(chunk_id, text, file_name, embedding):
    collection.add(
        ids=[chunk_id],
        documents=[text],
        metadatas=[{"file": file_name}],
        embeddings=[embedding]
    )


def search_chunks(embedding, n_results=5):
    results = collection.query(
        query_embeddings=[embedding],
        n_results=n_results
    )

    return results