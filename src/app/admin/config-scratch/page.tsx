"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";

function ConfigScratchContent() {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get("type") || "normal";

  const [recompenses, setRecompenses] = useState<string[]>(["⭐ +10 points bonus"]);
  const [probabilites, setProbabilites] = useState([0.4, 0.2, 0.4]);

  const handleSave = () => {
    alert("✅ Ticket enregistré !");
    router.push("/admin"); // retour à la page admin
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6">🎨 Configurer un Ticket Scratch ({type})</h1>

      <div className="mb-6">
        <label className="block font-medium mb-2">🎁 Récompenses</label>
        {recompenses.map((r, i) => (
          <input
            key={i}
            type="text"
            value={r}
            onChange={(e) => {
              const copy = [...recompenses];
              copy[i] = e.target.value;
              setRecompenses(copy);
            }}
            className="border rounded p-2 w-full mb-2"
          />
        ))}
        <button
          onClick={() => setRecompenses([...recompenses, ""])}
          className="text-sm bg-gray-200 px-3 py-1 rounded"
        >
          + Ajouter une récompense
        </button>
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-2">📊 Probabilités (%)</label>
        {probabilites.map((p, i) => (
          <input
            key={i}
            type="number"
            step="0.1"
            value={p}
            onChange={(e) => {
              const copy = [...probabilites];
              copy[i] = parseFloat(e.target.value);
              setProbabilites(copy);
            }}
            className="border rounded p-2 w-20 mr-2"
          />
        ))}
      </div>

      {/* Preview */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">👀 Prévisualisation</h2>
        <div className="border rounded-lg p-6 text-center">
          😢 Pas de chance cette fois...
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
      >
        💾 Enregistrer le Ticket
      </button>
    </div>
  );
}

export default function ConfigScratchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white p-6 flex items-center justify-center">Chargement...</div>}>
      <ConfigScratchContent />
    </Suspense>
  );
}
