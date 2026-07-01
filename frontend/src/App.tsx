import { useEffect, useState } from "react";
import api from "./api/api";
import ChatForm from "./components/ChatForm";
import ExplainFileForm from "./components/ExplainFileForm";
import IngestForm from "./components/IngestForm";
import SearchCodeForm from "./components/SearchCodeForm";
import RepoDashboard from "./components/RepoDashboard";
import Header from "./components/Header";

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
        <Header
          isHealthy={isHealthy}
          error={error}
        />
        <div className="grid gap-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <RepoDashboard />
          </section>

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