import { useState } from "react";
import api from "../api/api";

export default function IngestForm() {
  const [repoUrl, setRepoUrl] = useState("");
  const [repoName, setRepoName] = useState("");
  const [result, setResult] = useState<any>(null);

  async function ingest() {
    const response = await api.post("/ingest-repo", {
      repo_url: repoUrl,
      repo_name: repoName,
    });

    setResult(response.data);
  }

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Repository Ingest</h2>

      <input
        placeholder="Repository URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ width: "500px", marginBottom: 10 }}
      />

      <br />

      <input
        placeholder="Repository Name"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        style={{ width: "300px", marginBottom: 20 }}
      />

      <br />

      <button onClick={ingest}>
        Ingest Repository
      </button>

      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>Success ✅</h3>

          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
