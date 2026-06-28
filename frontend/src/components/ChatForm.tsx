import { useState } from "react";
import api from "../api/api";

type ChatResponse = {
  question: string;
  answer: string;
  chunks_used: number;
  sources: string[];
};

export default function ChatForm() {
  const [repoName, setRepoName] = useState("python-file-organizer");
  const [question, setQuestion] = useState("What does this project do?");
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await api.post<ChatResponse>("/chat-repo", {
        repo_name: repoName,
        question,
      });

      setResponse(res.data);
    } catch (err: any) {
      console.error("Chat error:", err);

      if (err.response?.data) {
        setError(JSON.stringify(err.response.data, null, 2));
      } else {
        setError(err.message || "Failed to get AI response");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Repository Chat</h2>

      <label>Repository Name</label>
      <br />

      <input
        placeholder="Repository Name"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        style={{
          width: "300px",
          marginBottom: 10,
          padding: 8,
        }}
      />

      <br />

      <label>Question</label>
      <br />

      <textarea
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={4}
        style={{
          width: "500px",
          padding: 8,
        }}
      />

      <br />
      <br />

      <button
        onClick={askAI}
        disabled={loading || !repoName || !question}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {error && (
        <div style={{ marginTop: 20, color: "red" }}>
          <h3>Error</h3>
          <pre>{error}</pre>
        </div>
      )}

      {response && (
        <div style={{ marginTop: 30 }}>
          <h3>Answer</h3>

          <p>{response.answer}</p>

          <p>
            <strong>Chunks Used:</strong> {response.chunks_used}
          </p>

          <h4>Sources</h4>

          <ul>
            {response.sources?.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}