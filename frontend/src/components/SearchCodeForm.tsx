import { useState } from "react";
import api from "../api/api";

type SearchResult = {
  file: string;
  content: string;
  distance: number;
};

type SearchResponse = {
  query: string;
  results_count: number;
  results: SearchResult[];
};

export default function SearchCodeForm() {
  const [repoName, setRepoName] = useState("python-file-organizer");
  const [query, setQuery] = useState("duplicate file handling");
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchCode() {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await api.post<SearchResponse>("/search-code", {
        repo_name: repoName,
        query,
        n_results: 3,
      });

      setResponse(res.data);
    } catch (err: any) {
      console.error("Search error:", err);
      setError(err.message || "Failed to search code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Semantic Code Search</h2>

      <label>Repository Name</label>
      <br />

      <input
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        style={{ width: "300px", padding: 8, marginBottom: 10 }}
      />

      <br />

      <label>Search Query</label>
      <br />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "500px", padding: 8, marginBottom: 10 }}
      />

      <br />

      <button onClick={searchCode} disabled={loading || !repoName || !query}>
        {loading ? "Searching..." : "Search Code"}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: 20 }}>
          <pre>{error}</pre>
        </div>
      )}

      {response && (
        <div style={{ marginTop: 30 }}>
          <h3>Results ({response.results_count})</h3>

          {response.results.map((item) => (
            <div
              key={item.file}
              style={{
                border: "1px solid #ddd",
                padding: 15,
                marginBottom: 15,
                borderRadius: 8,
              }}
            >
              <h4>{item.file}</h4>
              <p>
                <strong>Distance:</strong> {item.distance.toFixed(2)}
              </p>
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {item.content}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}