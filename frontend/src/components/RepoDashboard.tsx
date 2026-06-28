import { useState } from "react";
import api from "../api/api";

type RepoSummary = {
  repo_name: string;
  total_files: number;
  total_directories: number;
  top_extensions: Record<string, number>;
  readme_exists: boolean;
  license_exists: boolean;
  package_json_exists: boolean;
};

export default function RepoDashboard() {
  const [repoName, setRepoName] = useState("python-file-organizer");
  const [summary, setSummary] = useState<RepoSummary | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadSummary() {
    setLoading(true);
    setError("");
    setSummary(null);

    try {
      const res = await api.get<RepoSummary>(`/repo-summary/${repoName}`);
      setSummary(res.data);
    } catch (err: any) {
      console.error("Repo summary error:", err);
      setError(err.message || "Failed to load repository summary");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">
        📊 Repository Dashboard
      </h2>

      <p className="mt-1 text-slate-500">
        View repository statistics and project metadata.
      </p>

      <div className="mt-5">
        <label className="text-sm font-semibold text-slate-700">
          Repository Name
        </label>

        <div className="mt-1 flex flex-col gap-3 md:flex-row">
          <input
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 md:max-w-md"
          />

          <button
            onClick={loadSummary}
            disabled={loading || !repoName}
            className="rounded-xl bg-cyan-600 px-5 py-2 font-semibold text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load Summary"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <pre className="whitespace-pre-wrap text-sm">{error}</pre>
        </div>
      )}

      {summary && (
        <div className="mt-6 grid gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">
                Total Files
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {summary.total_files}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">
                Directories
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {summary.total_directories}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">
                Repository
              </p>
              <p className="mt-2 break-words text-xl font-bold text-slate-900">
                {summary.repo_name}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">README</p>
              <p className="mt-2 text-xl font-bold">
                {summary.readme_exists ? "✅ Yes" : "❌ No"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">License</p>
              <p className="mt-2 text-xl font-bold">
                {summary.license_exists ? "✅ Yes" : "❌ No"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">
                package.json
              </p>
              <p className="mt-2 text-xl font-bold">
                {summary.package_json_exists ? "✅ Yes" : "❌ No"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-bold text-slate-900">Top Extensions</h3>

            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {Object.entries(summary.top_extensions).map(([ext, count]) => (
                <div
                  key={ext}
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-2"
                >
                  <span className="font-mono text-slate-700">{ext}</span>
                  <span className="font-bold text-slate-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}