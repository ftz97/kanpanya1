"use client";

import { useState } from "react";

export default function AdminRecommendationsSimplePage() {
  const [loading, setLoading] = useState(true);

  // Test simple sans useEffect
  const handleClick = () => {
    console.log("🔄 Bouton cliqué");
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Test Simple Admin Recommandations</h1>
          <div className="text-center text-gray-500 mb-4">
            Chargement... (loading: {loading.toString()})
          </div>
          <button 
            onClick={handleClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Cliquer pour arrêter le chargement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Test Simple Admin Recommandations</h1>
        <div className="bg-white p-6 rounded-xl shadow">
          <p>✅ Chargement terminé !</p>
          <p>Loading : {loading.toString()}</p>
        </div>
      </div>
    </div>
  );
}