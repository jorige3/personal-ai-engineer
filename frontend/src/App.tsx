import { useEffect, useState } from "react";
import api from "./api/api";
import IngestForm from "./components/IngestForm";
import ChatForm from "./components/ChatForm";
import SearchCodeForm from "./components/SearchCodeForm";

function App() {
  const [status, setStatus] = useState("Checking...");
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/health")
      .then((res) => {
        console.log("Backend response:", res.data);
        setStatus(res.data.status);
      })
      .catch((err) => {
        console.error("Backend error:", err);
        setStatus("Backend Offline");
        setError(err.message);
      });
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🤖 Personal AI Engineer</h1>

      <h2>Backend Status</h2>
      <p>{status}</p>

      {error && (
        <>
          <h3>Error</h3>
          <pre>{error}</pre>
        </>
      )}

      <hr />

      <IngestForm />

      <hr />

      <ChatForm />

      <hr />

      <SearchCodeForm />
      
    </div>
  );
}

export default App;