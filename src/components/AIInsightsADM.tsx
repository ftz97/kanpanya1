"use client";
import { useEffect, useState, useCallback } from "react";

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">IA Insights Admin</h2>
      <p className="text-gray-600">Module d'insights IA en cours de développement...</p>
    </div>
  );
}
