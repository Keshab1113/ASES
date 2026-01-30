import { useState } from "react";
import { uploadEvidence } from "../../api/evidence.api";

export default function EvidenceUpload({ taskId }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!file) return;
    setLoading(true);
    await uploadEvidence(taskId, file);
    setLoading(false);
    alert("Evidence uploaded. AI verification in progress.");
  };

  return (
    <div className="mt-3">
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
        className="text-sm"
      />
      <button
        onClick={submit}
        disabled={loading}
        className="ml-2 px-3 py-1 bg-sky-600 text-white rounded text-sm"
      >
        {loading ? "Uploading..." : "Submit Evidence"}
      </button>
    </div>
  );
}
