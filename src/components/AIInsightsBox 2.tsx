"use client";
import { useEffect, useState } from "react";

export default function AIInsightsBox() {
  const [insight, setInsight] = useState<string>("Chargement de l'analyse...");

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const res = await fetch("/api/ai-insight");
        const json = await res.json();
        setInsight(json.insight || "Pas d'analyse disponible.");
      } catch (err) {
        console.error("Erreur fetch insight:", err);
        setInsight("Erreur lors de la génération de l'analyse.");
      }
    };

    fetchInsight();
  }, []);

  return (
    <section className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-2">🤖 Analyse IA</h2>
      <p className="text-gray-700">{insight}</p>
    </section>
  );
}
