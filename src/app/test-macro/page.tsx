"use client";

import { useState } from "react";

export default function TestMacroPage() {
  const [points, setPoints] = useState<Array<{id: string, name: string, coords: string}>>([]);
  const [newPoint, setNewPoint] = useState({ name: "", coords: "" });

  const addPoint = () => {
    if (!newPoint.name || !newPoint.coords) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    setPoints(prev => [...prev, {
      id: Date.now().toString(),
      name: newPoint.name,
      coords: newPoint.coords
    }]);

    setNewPoint({ name: "", coords: "" });
  };

  const removePoint = (id: string) => {
    setPoints(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">🧪 Test Macro Analysis</h1>
      
      {/* Formulaire */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Ajouter un point</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Nom du point"
            className="flex-1 px-3 py-2 border rounded"
            value={newPoint.name}
            onChange={(e) => setNewPoint({...newPoint, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Coordonnées (ex: 2.3522, 48.8566)"
            className="flex-1 px-3 py-2 border rounded"
            value={newPoint.coords}
            onChange={(e) => setNewPoint({...newPoint, coords: e.target.value})}
          />
          <button
            onClick={addPoint}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* Liste des points */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Points ({points.length})</h2>
        {points.length === 0 ? (
          <p className="text-gray-500">Aucun point ajouté</p>
        ) : (
          <div className="space-y-2">
            {points.map((point) => (
              <div key={point.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">{point.name}</span>
                  <span className="ml-2 text-gray-500">({point.coords})</span>
                </div>
                <button
                  onClick={() => removePoint(point.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Debug */}
      <div className="mt-6 p-4 bg-yellow-50 rounded">
        <h3 className="font-semibold">Debug Info:</h3>
        <p>Points: {JSON.stringify(points, null, 2)}</p>
      </div>
    </div>
  );
}
