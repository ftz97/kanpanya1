"use client";

import { useEffect, useState } from "react";

interface LintSummary {
  errors: number;
  warnings: number;
  total: number;
  timestamp: string;
}

export default function LintReportPage() {
  const [summary, setSummary] = useState<LintSummary | null>(null);
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    fetch("/lint-summary.json")
      .then((res) => res.json())
      .then(setSummary)
      .catch(() => setSummary(null));

    fetch("/lint-report.html")
      .then((res) => res.text())
      .then(setHtml)
      .catch(() => setHtml("❌ Impossible de charger le rapport."));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">📊 Rapport ESLint</h1>

      {summary && (
        <div className="flex gap-4">
          <span
            className={`px-4 py-2 rounded text-white font-semibold ${
              summary.errors === 0 ? "bg-green-600" : "bg-red-600"
            }`}
          >
            ❌ {summary.errors} erreurs
          </span>
          <span className="px-4 py-2 rounded bg-yellow-500 text-white font-semibold">
            ⚠️ {summary.warnings} warnings
          </span>
          <span className="px-4 py-2 rounded bg-blue-600 text-white font-semibold">
            ✅ {summary.total} problèmes
          </span>
        </div>
      )}

      {html ? (
        <iframe
          srcDoc={html}
          style={{ width: "100%", height: "80vh", border: "1px solid #ccc" }}
        />
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

