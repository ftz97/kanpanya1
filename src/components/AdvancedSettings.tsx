import { useState } from "react";

export default function AdvancedSettings() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Bouton paramètres */}
      <button
        onClick={() => setOpen(true)}
        className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded shadow"
      >
        ⚙️ Paramètres avancés
      </button>

      {/* Panneau flottant */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-xl font-bold">⚙️ Paramètres avancés</h2>

            {/* Recherche */}
            <div>
              <label className="text-sm">🔍 Rechercher une zone</label>
              <input
                type="text"
                placeholder="Ville, quartier ou rue"
                className="w-full border rounded p-2 mt-1"
              />
            </div>

            {/* Options */}
            <div className="space-y-2">
              <button className="w-full bg-gray-100 p-2 rounded hover:bg-gray-200">
                ➕ Ajouter un quartier personnalisé
              </button>
              <button className="w-full bg-gray-100 p-2 rounded hover:bg-gray-200">
                🏘️ Comparer plusieurs rues
              </button>
            </div>

            {/* Quartiers enregistrés */}
            <div>
              <h3 className="font-semibold mb-2">📍 Quartiers enregistrés</h3>
              <ul className="space-y-1">
                <li className="flex justify-between">
                  <span>Quartier Nord</span>
                  <button className="text-red-600">Supprimer</button>
                </li>
                <li className="flex justify-between">
                  <span>Centre-ville</span>
                  <button className="text-red-600">Supprimer</button>
                </li>
              </ul>
            </div>

            {/* Boutons */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Fermer
              </button>
              <button
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
