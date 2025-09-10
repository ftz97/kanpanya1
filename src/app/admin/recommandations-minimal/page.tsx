"use client";

import { useState } from "react";

export default function AdminRecommendationsMinimalPage() {
  const [loading, setLoading] = useState(true);

  // Test simple sans useEffect
  const handleTest = () => {
    console.log("🔄 Test cliqué");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Test Minimal Admin
        </h1>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="mb-4">Loading: {loading.toString()}</p>
          <button 
            onClick={handleTest}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Test JavaScript
          </button>
        </div>
      </div>
    </div>
  );
}
