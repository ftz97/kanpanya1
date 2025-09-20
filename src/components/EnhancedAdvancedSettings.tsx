import { useState } from "react";

interface Zone {
  id: string;
  name: string;
  type: 'custom' | 'predefined';
  coordinates?: any;
}

export default function EnhancedAdvancedSettings() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [zones, setZones] = useState<Zone[]>([
    { id: '1', name: 'Quartier Nord', type: 'predefined' },
    { id: '2', name: 'Centre-ville', type: 'predefined' },
    { id: '3', name: 'Zone Est', type: 'predefined' }
  ]);

  const handleAddZone = () => {
    const name = prompt("Nom du nouveau quartier ?");
    if (name) {
      const newZone: Zone = {
        id: Date.now().toString(),
        name,
        type: 'custom'
      };
      setZones([...zones, newZone]);
    }
  };

  const handleDeleteZone = (id: string) => {
    setZones(zones.filter(zone => zone.id !== id));
  };

  const handleCompareZones = () => {
    alert("Fonctionnalité de comparaison en cours de développement");
  };

  const filteredZones = zones.filter(zone => 
    zone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Bouton paramètres */}
      <button
        onClick={() => setOpen(true)}
        className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition-colors z-40"
      >
        ⚙️ Paramètres avancés
      </button>

      {/* Panneau flottant */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white w-96 max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">⚙️ Paramètres avancés</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Recherche */}
            <div>
              <label className="text-sm font-medium">🔍 Rechercher une zone</label>
              <input
                type="text"
                placeholder="Ville, quartier ou rue"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Options d'action */}
            <div className="space-y-2">
              <button 
                onClick={handleAddZone}
                className="w-full bg-blue-100 p-2 rounded hover:bg-blue-200 transition-colors"
              >
                ➕ Ajouter un quartier personnalisé
              </button>
              <button 
                onClick={handleCompareZones}
                className="w-full bg-green-100 p-2 rounded hover:bg-green-200 transition-colors"
              >
                🏘️ Comparer plusieurs rues
              </button>
            </div>

            {/* Quartiers enregistrés */}
            <div>
              <h3 className="font-semibold mb-2">📍 Quartiers enregistrés ({filteredZones.length})</h3>
              <div className="max-h-40 overflow-y-auto">
                <ul className="space-y-1">
                  {filteredZones.map((zone) => (
                    <li key={zone.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{zone.name}</span>
                        {zone.type === 'custom' && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-1 rounded">Personnalisé</span>
                        )}
                      </div>
                      <button 
                        onClick={() => handleDeleteZone(zone.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Supprimer
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Statistiques */}
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="font-medium text-sm mb-2">📊 Statistiques</h4>
              <div className="text-xs space-y-1">
                <div>Total zones: {zones.length}</div>
                <div>Personnalisées: {zones.filter(z => z.type === 'custom').length}</div>
                <div>Prédéfinies: {zones.filter(z => z.type === 'predefined').length}</div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Fermer
              </button>
              <button
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
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
