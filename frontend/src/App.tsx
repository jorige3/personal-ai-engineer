import { useEffect, useState } from "react";
import api from "./api/api";
import ChatForm from "./components/ChatForm";
import IngestForm from "./components/IngestForm";
import SearchCodeForm from "./components/SearchCodeForm";

function App() {
  const [status, setStatus] = useState("Checking...");
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/health")
      .then((res) => {
        setStatus(res.data.status);
      })
      .catch((err) => {
        console.error("Backend error:", err);
        setStatus("Backend Offline");
        setError(err.message);
      });
  }, []);

  const isHealthy = status === "healthy";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-6xl px-6 py-8">
        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">🤖 Personal AI Engineer</h1>
              <p className="mt-2 text-slate-400">
                AI-powered repository assistant using FastAPI, Ollama, and ChromaDB.
              </p>
            </div>

            <div
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                isHealthy
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {isHealthy ? "🟢 Backend Healthy" : "🔴 Backend Offline"}
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-800 bg-red-950 p-4 text-red-200">
              <p className="font-semibold">Backend Error</p>
              <pre className="mt-2 whitespace-pre-wrap text-sm">{error}</pre>
            </div>
          )}
        </section>

        <div className="grid gap-6">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <IngestForm />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <ChatForm />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <SearchCodeForm />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;