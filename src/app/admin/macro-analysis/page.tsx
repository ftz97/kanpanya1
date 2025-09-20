"use client";

import { useState } from "react";

interface Point {
  lng: number;
  lat: number;
  label: string;
}

interface Group {
  id: string;
  name: string;
  points: Point[];
}

export default function MacroAnalysisPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [newPoint, setNewPoint] = useState({ lng: "", lat: "", label: "" });

  // === Gestion groupes ===
  const addPoint = () => {
    if (!newPoint.lng || !newPoint.lat || !newPoint.label) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const point: Point = {
      lng: parseFloat(newPoint.lng),
      lat: parseFloat(newPoint.lat),
      label: newPoint.label,
    };

    console.log("Ajout d'un point:", point);
    setGroups((prev) => [
      ...prev,
      { id: Date.now().toString(), name: point.label, points: [point] },
    ]);

    // Reset form
    setNewPoint({ lng: "", lat: "", label: "" });
  };

  const removeGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
    setSelectedGroups((prev) => prev.filter((gid) => gid !== id));
  };

  const clearAllGroups = () => {
    setGroups([]);
    setSelectedGroups([]);
  };

  const createGroup = () => {
    if (selectedGroups.length < 2) return alert("Sélectionnez au moins 2 groupes");
    const selected = groups.filter((g) => selectedGroups.includes(g.id));
    const mergedPoints = selected.flatMap((g) => g.points);

    const name = prompt("Nom du groupe :", "Nouveau quartier");
    if (!name) return;

    const newGroup: Group = {
      id: Date.now().toString(),
      name,
      points: mergedPoints,
    };

    setGroups((prev) => [
      ...prev.filter((g) => !selectedGroups.includes(g.id)),
      newGroup,
    ]);
    setSelectedGroups([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">📊 Analyse Macro - Collectivités</h1>
          <p className="text-gray-600 mt-1">Gestion des points géographiques</p>
        </div>
      </div>

      {/* Formulaire d'ajout de point */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">📍 Ajouter un point</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2.3522"
                value={newPoint.lng}
                onChange={(e) => setNewPoint({ ...newPoint, lng: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="48.8566"
                value={newPoint.lat}
                onChange={(e) => setNewPoint({ ...newPoint, lat: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom du point
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Mairie de Paris"
                value={newPoint.label}
                onChange={(e) => setNewPoint({ ...newPoint, label: e.target.value })}
              />
            </div>
          </div>
          <button
            onClick={addPoint}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            ➕ Ajouter le point
          </button>
        </div>
      </div>

      {/* Groupes */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">📍 Groupes ({groups.length})</h2>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={clearAllGroups}
              >
                Tout effacer
              </button>
              <button
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                onClick={createGroup}
                disabled={selectedGroups.length < 2}
              >
                Créer un groupe
              </button>
            </div>
          </div>
          
          {groups.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>💡 Ajoutez des points en utilisant le formulaire ci-dessus</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {groups.map((g, index) => {
                const colors = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
                const color = colors[index % colors.length];
                
                return (
                  <li
                    key={g.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 border-l-4"
                    style={{ borderLeftColor: color }}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-3"
                        checked={selectedGroups.includes(g.id)}
                        onChange={(e) =>
                          setSelectedGroups((prev) =>
                            e.target.checked
                              ? [...prev, g.id]
                              : prev.filter((id) => id !== g.id)
                          )
                        }
                      />
                      <div>
                        <span 
                          className="font-medium"
                          style={{ color: color }}
                        >
                          {g.name}
                        </span>
                        <span className="ml-2 text-gray-500">
                          ({g.points.length} point{g.points.length > 1 ? 's' : ''})
                        </span>
                        <div className="text-xs text-gray-400">
                          {g.points.map((p, i) => (
                            <span key={i}>
                              {p.lng.toFixed(4)}, {p.lat.toFixed(4)}
                              {i < g.points.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700 p-1"
                      onClick={() => removeGroup(g.id)}
                      title="Supprimer le groupe"
                    >
                      ✕
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Section IA simple */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">🤖 Analyse IA</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">📊 Points analysés</h3>
              <p className="text-2xl font-bold text-blue-600">{groups.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">📍 Zones actives</h3>
              <p className="text-2xl font-bold text-green-600">{groups.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">🎯 Recommandations</h3>
              <p className="text-2xl font-bold text-purple-600">{groups.length > 0 ? "3" : "0"}</p>
            </div>
          </div>
          
          {groups.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">💡 Insights</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Vous avez {groups.length} groupe{groups.length > 1 ? 's' : ''} de points analysés</li>
                <li>Total de {groups.reduce((sum, g) => sum + g.points.length, 0)} points géolocalisés</li>
                <li>Recommandation : Créez des zones de regroupement pour optimiser l'analyse</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}