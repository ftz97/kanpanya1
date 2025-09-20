import { useState } from "react";

type ZoneCustom = { name: string; polygon: [number, number][]; professions: Record<string, number> };

export default function QuartierCustom() {
  const [polygons, setPolygons] = useState<ZoneCustom[]>([]);

  const addQuartier = (name: string, coords: [number, number][]) => {
    // Exemple mock professions
    const professions = { Pizzeria: 3, Coiffeur: 5, Boutique: 2 };
    const quartier: ZoneCustom = { name, polygon: coords, professions };
    setPolygons([...polygons, quartier]);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() =>
          addQuartier("Quartier Historique", [
            [-61.55, 16.25],
            [-61.55, 16.30],
            [-61.50, 16.30],
            [-61.50, 16.25],
          ])
        }
        className="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        ➕ Définir un quartier (4 points)
      </button>

      {polygons.map((q) => (
        <div key={q.name} className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">{q.name}</h3>
          <p className="text-gray-600">Professions présentes :</p>
          <ul className="ml-4 list-disc">
            {Object.entries(q.professions).map(([p, count]) => (
              <li key={p}>
                {p} : {count}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

