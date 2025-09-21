"use client";
import { useEffect, useState, useCallback } from "react";

export default function AIInsightsBox() {
  const [insight, setInsight] = useState<string>("Chargement de l'analyse...");

  
const stableFetch = useCallback(() => {
  fetch();
}, [fetch]);

const stableJson = useCallback(() => {
  json();
}, [json]);

const stableSetInsight = useCallback(() => {
  setInsight();
}, [setInsight]);

const stableError = useCallback(() => {
  error();
}, [error]);

const stableFetchInsight = useCallback(() => {
  fetchInsight();
}, [fetchInsight]);

useEffect(() => {
  stableFetch();
  stableJson();
  stableSetInsight();
  stableError();
  stableSetInsight();
  stableFetchInsight();
}, [stableFetch, stableJson, stableSetInsight, stableError, stableSetInsight, stableFetchInsight]);;

  return (
    <section className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-2">🤖 Analyse IA</h2>
      <p className="text-gray-700">{insight}</p>
    </section>
  );
}
