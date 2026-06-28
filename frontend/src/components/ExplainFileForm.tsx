import { useState } from "react";
import api from "../api/api";

type ExplainResponse = {
  file: string;
  summary: string;
  sources: string[];
};

export default function ExplainFileForm() {
  const [repoName, setRepoName] = useState("python-file-organizer");
  const [filePath, setFilePath] = useState("README.md");
  const [response, setResponse] = useState<ExplainResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function explainFile() {
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await api.post<ExplainResponse>("/explain-file", {
        repo_name: repoName,
        file_path: filePath,
      });

      setResponse(res.data);
    } catch (err: any) {
      console.error("Explain file error:", err);

      if (err.response?.data) {
        setError(JSON.stringify(err.response.data, null, 2));
      } else {
        setError(err.message || "Failed to explain file");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">📄 Explain File</h2>
      <p className="mt-1 text-slate-500">
        Ask the AI to explain a specific file from an indexed repository.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Repository Name
          </label>
          <input
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">
            File Path
          </label>
          <input
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
      </div>

      <button
        onClick={explainFile}
        disabled={loading || !repoName || !filePath}
        className="mt-5 rounded-xl bg-cyan-600 px-5 py-2 font-semibold text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Explaining..." : "Explain File"}
      </button>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <pre className="whitespace-pre-wrap text-sm">{error}</pre>
        </div>
      )}

      {response && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="font-bold text-slate-900">{response.file}</h3>

          <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-700">
            {response.summary}
          </p>

          <h4 className="mt-5 font-semibold text-slate-900">Sources</h4>

          <ul className="mt-2 list-disc pl-6 text-slate-600">
            {response.sources?.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}