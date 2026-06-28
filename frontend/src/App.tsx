import { useEffect, useState } from "react";
import api from "./api/api";
import ChatForm from "./components/ChatForm";
import ExplainFileForm from "./components/ExplainFileForm";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 text-slate-900">
      <main className="mx-auto max-w-6xl px-6 py-8">
        <section className="mb-8 rounded-3xl border border-sky-100 bg-white p-8 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-600">
                Local AI Developer Assistant
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-slate-950">
                🤖 Personal AI Engineer
              </h1>

              <p className="mt-3 max-w-2xl text-slate-600">
                Ingest repositories, chat with code, search semantically, and explain files using FastAPI, Ollama, and ChromaDB.
              </p>
            </div>

            <div
              className={`rounded-full px-5 py-3 text-sm font-semibold ${
                isHealthy
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  : "bg-red-50 text-red-700 ring-1 ring-red-200"
              }`}
            >
              {isHealthy ? "🟢 Backend Healthy" : "🔴 Backend Offline"}
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              <p className="font-semibold">Backend Error</p>
              <pre className="mt-2 whitespace-pre-wrap text-sm">{error}</pre>
            </div>
          )}
        </section>

        <div className="grid gap-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <IngestForm />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <ChatForm />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <SearchCodeForm />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <ExplainFileForm />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;