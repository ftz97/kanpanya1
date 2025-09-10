"use client";

import { useState, useEffect } from "react";

export default function AdminRecommendationsTestPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<string>("");

  useEffect(() => {
    console.log("🔄 Test useEffect déclenché");
    
    const timer = setTimeout(() => {
      console.log("✅ Timer terminé");
      setData("Données de test");
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Test Admin Recommandations</h1>
          <div className="text-center text-gray-500">
            Chargement... (loading: {loading.toString()})
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Test Admin Recommandations</h1>
        <div className="bg-white p-6 rounded-xl shadow">
          <p>Données chargées : {data}</p>
          <p>Loading : {loading.toString()}</p>
        </div>
      </div>
    </div>
  );
}
