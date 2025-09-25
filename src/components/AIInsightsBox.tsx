"use client";
import { useEffect, useState, useCallback } from "react";

export default function AIInsightsBox() {
  const [insight, setInsight] = useState<string>("Chargement de l'analyse...");

  const fetchInsight = useCallback(async () => {
    try {
      const response = await fetch('/api/ai-insights');
      const data = await response.json();
      setInsight(data.insight || "Analyse terminée - Aucun insight particulier détecté.");
    } catch (error) {
      console.error('Erreur lors du chargement de l\'insight:', error);
      setInsight("Erreur lors du chargement de l'analyse. Veuillez réessayer.");
    }
  }, []);

  useEffect(() => {
    fetchInsight();
  }, [fetchInsight]);

  return (
    <section className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-2">🤖 Analyse IA</h2>
      <p className="text-gray-700">{insight}</p>
    </section>
  );
}
