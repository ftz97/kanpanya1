"use client";
import { useEffect, useState } from "react";

export default function FluxInsights({ links }: { links: unknown[] }) {
  const [insights, setInsights] = useState<string>("Chargement...");

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch("/api/insights/flux", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ links }),
        });
        const json = await res.json();
        setInsights(json.insights || "Pas d'analyse dispo.");
      } catch (err) {
        setInsights("Erreur IA.");
      }
    };
    fetchInsights();
  }, [links]);

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded p-4">
      <h3 className="font-semibold mb-2">🤖 Analyse IA des flux</h3>
      <div className="space-y-1 whitespace-pre-line text-gray-700">{insights}</div>
    </div>
  );
}
