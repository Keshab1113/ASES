import { useEffect, useState } from "react";
import { getExecutiveSummary } from "../../api/executive.api";

export default function ExecutiveSummary() {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    getExecutiveSummary().then(res => setSummary(res.data.summary));
  }, []);

  return (
    <div className="max-w-4xl">
      <h1 className="text-xl font-bold mb-4">
        Executive Safety Summary
      </h1>

      <div className="p-6 bg-white dark:bg-slate-800 rounded shadow whitespace-pre-line">
        {summary}
      </div>
    </div>
  );
}
