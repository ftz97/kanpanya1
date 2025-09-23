"use client";

import { useState } from "react";

interface Group {
  id: string;
  name: string;
  points: number;
}

export default function GroupsSection() {
  const [groups, setGroups] = useState<Group[]>([
    { id: "1", name: "Quartier Centre", points: 4 },
    { id: "2", name: "Zone Est", points: 3 },
  ]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const removeGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const clearAll = () => {
    setGroups([]);
    setSelectedGroups([]);
  };

  const createGroup = () => {
    if (selectedGroups.length < 2) return alert("Sélectionnez au moins 2 groupes");
    const name = prompt("Nom du groupe :", "Nouveau quartier");
    if (!name) return;

    const newGroup: Group = {
      id: Date.now().toString(),
      name,
      points: 5,
    };
    setGroups((prev) => [...prev, newGroup]);
    setSelectedGroups([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold">📍 Groupes ({groups.length})</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={clearAll}>
              Tout effacer
            </button>
            <button
              className="px-3 py-1 bg-green-600 text-white rounded"
              onClick={createGroup}
              disabled={selectedGroups.length < 2}
            >
              Créer un groupe
            </button>
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          {groups.map((g) => (
            <li key={g.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedGroups.includes(g.id)}
                  onChange={(e) =>
                    setSelectedGroups((prev) =>
                      e.target.checked ? [...prev, g.id] : prev.filter((id) => id !== g.id)
                    )
                  }
                />
                <span className="font-medium">{g.name}</span>
                <span className="ml-2 text-gray-500">({g.points} pts)</span>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeGroup(g.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}