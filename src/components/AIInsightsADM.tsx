"use client";
import { useEffect, useState } from "react";

export default function AIInsightsADM() {
  const [insights, setInsights] = useState<string>("Chargement des analyses...");

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch("/api/ai-insight/adm");
        const json = await res.json();
        setInsights(json.insights || "Pas d'analyse disponible.");
      } catch (err) {
        console.error("Erreur fetch insights:", err);
        setInsights("Erreur lors de la génération des analyses.");
      }
    };

    fetchInsights();
  }, []);

  return (
    <section className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">🤖 Analyse Stratégique ADM</h2>
      <div className="space-y-3 text-gray-700 whitespace-pre-line">
        {insights.split("\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </section>
  );
}
