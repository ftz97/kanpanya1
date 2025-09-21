"use client";
import { useEffect, useState } from "react";

export default function AIInsightsADM() {
  const [insights, setInsights] = useState<string>("Chargement des analyses...");

  
const stableFetch = useCallback(() => {
  fetch();
}, [fetch]);

const stableJson = useCallback(() => {
  json();
}, [json]);

const stableSetInsights = useCallback(() => {
  setInsights();
}, [setInsights]);

const stableError = useCallback(() => {
  error();
}, [error]);

const stableSetInsights = useCallback(() => {
  setInsights();
}, [setInsights]);

const stableFetchInsights = useCallback(() => {
  fetchInsights();
}, [fetchInsights]);

useEffect(() => {
  stableFetch();
  stableJson();
  stableSetInsights();
  stableError();
  stableSetInsights();
  stableFetchInsights();
}, [stableFetch, stableJson, stableSetInsights, stableError, stableSetInsights, stableFetchInsights]);;

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
