type HeaderProps = {
  isHealthy: boolean;
  error: string;
};

export default function Header({ isHealthy, error }: HeaderProps) {
  return (
    <header className="mb-8 rounded-3xl border border-sky-100 bg-white p-8 shadow-xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-600">
            Local AI Developer Assistant
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            🤖 Personal AI Engineer
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            AI-powered repository assistant built with React, FastAPI,
            Ollama, and ChromaDB.
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
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <h3 className="font-semibold text-red-700">Backend Error</h3>

          <pre className="mt-2 whitespace-pre-wrap text-sm text-red-600">
            {error}
          </pre>
        </div>
      )}
    </header>
  );
}
