import { useEffect, useState } from "react";
import api from "./api/api";
import ChatForm from "./components/ChatForm";
import IngestForm from "./components/IngestForm";
import SearchCodeForm from "./components/SearchCodeForm";
import ExplainFileForm from "./components/ExplainFileForm";

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
        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-400">
                Local AI Developer Assistant
              </p>

              <h1 className="text-4xl font-bold tracking-tight">
                🤖 Personal AI Engineer
              </h1>

              <p className="mt-3 max-w-2xl text-slate-400">
                Ingest repositories, chat with code, search semantically, and explain files using FastAPI, Ollama, and ChromaDB.
              </p>
            </div>

            <div
              className={`rounded-full px-5 py-3 text-sm font-semibold ${
                isHealthy
                  ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                  : "bg-red-500/15 text-red-300 ring-1 ring-red-500/30"
              }`}
            >
              {isHealthy ? "🟢 Backend Healthy" : "🔴 Backend Offline"}
            </div>
          </div>
        </section>

        <div className="grid gap-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <IngestForm />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <ChatForm />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <SearchCodeForm />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <ExplainFileForm />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;