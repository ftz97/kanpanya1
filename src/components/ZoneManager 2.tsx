"use client";

import { useState } from "react";

export default function ZoneManager() {
  const [search, setSearch] = useState("");
  const [zones, setZones] = useState<string[]>([]);
  const [groups, setGroups] = useState<{ name: string; zones: string[] }[]>([]);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  // Ajouter une zone dans la sélection courante
  const addZone = () => {
    if (search && !zones.includes(search)) {
      setZones([...zones, search]);
      setSearch("");
    }
  };

  // Supprimer une zone de la sélection
  const removeZone = (zone: string) => {
    setZones(zones.filter(z => z !== zone));
  };

  // Sauvegarder un groupe
  const saveGroup = () => {
    if (zones.length === 0) return;
    const name = prompt("Nom du groupe ?");
    if (name) {
      const newGroup = { name, zones };
      setGroups([...groups, newGroup]);
      setZones([]);
      setActiveGroup(name);
    }
  };

  return (
    <div className="space-y-6">
      {/* Barre de recherche + sélection */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <label className="font-medium text-gray-700">🔍 Rechercher une rue ou un quartier</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ex: Rue Centrale"
            className="border rounded p-2 flex-1"
          />
          <button
            onClick={addZone}
            className="px-3 py-2 bg-emerald-600 text-white rounded"
          >
            ➕ Ajouter
          </button>
        </div>

        {/* Zones sélectionnées */}
        <div className="flex flex-wrap gap-2 mt-2">
          {zones.map((z) => (
            <span 
              key={z} 
              className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm flex items-center gap-1"
            >
              {z} 
              <button 
                onClick={() => removeZone(z)}
                className="text-emerald-600 hover:text-emerald-800"
              >
                ✕
              </button>
            </span>
          ))}
        </div>

        {/* Sauvegarder groupe */}
        {zones.length > 0 && (
          <button
            onClick={saveGroup}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
          >
            📂 Sauvegarder groupe
          </button>
        )}
      </div>

      {/* Navigation par onglets */}
      {groups.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">🗂️ Groupes enregistrés</h3>
          <div className="flex gap-2 flex-wrap">
            {groups.map((g) => (
              <button
                key={g.name}
                onClick={() => setActiveGroup(g.name)}
                className={`px-3 py-1 rounded-lg border ${
                  activeGroup === g.name
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Vue active */}
      {activeGroup && (
        <div className="bg-indigo-50 border border-indigo-200 rounded p-4">
          <h4 className="font-semibold mb-2">
            📊 Analyse du groupe : {activeGroup}
          </h4>
          <p className="text-gray-700">
            Zones incluses :{" "}
            {groups.find((g) => g.name === activeGroup)?.zones.join(", ")}
          </p>
          {/* 👉 Ici tu branches tes graphiques Mapbox / Trafic / Réductions */}
        </div>
      )}
    </div>
  );
}

