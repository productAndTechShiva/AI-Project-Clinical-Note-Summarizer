import { useState } from "react";

import NoteInput from "./components/NoteInput";
import { summarizeClinicalNote } from "./api/clinicalApi";
import SummaryCard from "./components/SummaryCard";

import type { Summary, SummaryResponse } from "./types/summary";


const SAMPLE_NOTE = `
Patient is a 55 year old male presenting with chest pain for two days.
History of hypertension and type 2 diabetes.
Blood pressure 150/95.
ECG normal.
Stress test recommended.
Follow up after one week.
`;



function App() {
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState<Summary | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!note.trim()) {
      setError("Please enter a clinical note.");
      return;
    }

    if (note.trim().length < 10) {
      setError("Clinical note must contain at least 10 characters.");
      return;
    }

    try {
      setLoading(true);

      setError(null);

      const response: SummaryResponse = await summarizeClinicalNote(note);

      if (response.success && response.summary) {
        setSummary(response.summary);
      } else {
        setError(response.error || "Failed to generate summary");
      }
    } catch {
      setError("Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="page-title">AI Clinical Note Summarizer</h1>

      <NoteInput
        note={note}
        onLoadSample={() => {
          setNote(SAMPLE_NOTE);
        }}
        onNoteChange={setNote}
        onSubmit={handleSubmit}
        onClear={() => {
          setNote("");
          setSummary(null);
          setError(null);
        }}
        loading={loading}
      />

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* {summary && (
        <div style={{ marginTop: "20px" }}>
          <h2>Summary Generated</h2>

          <pre>
            {JSON.stringify(
              summary,
              null,
              2
            )}
          </pre>
        </div>
      )} */}

      {summary && (
        <div className="summary-section">
          <h2>Clinical Summary</h2>

          <SummaryCard
            title="Patient Information"
            content={summary.patient_information}
          />

          <SummaryCard
            title="Medical History"
            content={summary.medical_history}
          />

          <SummaryCard
            title="Clinical Findings"
            content={summary.clinical_findings}
          />

          <SummaryCard
            title="Recommendations"
            content={summary.recommendations}
          />
        </div>
      )}
    </div>
  );
}

export default App;
