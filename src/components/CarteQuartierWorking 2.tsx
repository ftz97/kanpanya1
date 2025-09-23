"use client";

import { useState } from "react";

export default function CarteQuartierWorking() {
  const [zones, setZones] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fonction de recherche d'adresses
  const searchAddresses = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Simulation de recherche
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockResults = [
        `Rue ${query}, Pointe-à-Pitre, Guadeloupe`,
        `Avenue ${query}, Pointe-à-Pitre, Guadeloupe`,
        `Place ${query}, Pointe-à-Pitre, Guadeloupe`,
        `Boulevard ${query}, Pointe-à-Pitre, Guadeloupe`
      ];
      setSearchResults(mockResults);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Ajouter une adresse
  const addAddress = (address: string) => {
    setZones(prev => [...prev, address]);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Créer un quartier
  const createQuartier = () => {
    if (zones.length < 3) {
      alert("Ajoutez au moins 3 adresses pour créer un quartier.");
      return;
    }
    alert(`✅ Quartier créé avec ${zones.length} adresses !`);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-blue-800">🗺️ Créer un quartier</h2>

      {/* Barre de recherche */}
      <div className="relative">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchAddresses(e.target.value);
            }}
            placeholder="Rechercher une adresse à Pointe-à-Pitre..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => searchAddresses(searchQuery)}
            disabled={isSearching}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSearching ? "⏳" : "🔍"}
          </button>
        </div>

        {/* Résultats de recherche */}
        {searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => addAddress(result)}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
              >
                <div className="text-sm font-medium text-gray-900">
                  {result}
                </div>
                <div className="text-xs text-gray-500">
                  Adresse
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Liste des adresses ajoutées */}
      {zones.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">
            📍 Adresses ajoutées ({zones.length}) :
          </h3>
          <div className="flex flex-wrap gap-2">
            {zones.map((zone, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm flex items-center gap-1"
              >
                📍 {zone}
                <button
                  onClick={() => setZones(prev => prev.filter((_, i) => i !== index))}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={createQuartier}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ✅ Créer quartier automatiquement
        </button>
        <button
          onClick={() => setZones([])}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🗑️ Effacer tout
        </button>
      </div>

      {/* Zone de carte */}
      <div className="w-full h-[600px] rounded-lg shadow bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">🗺️</div>
          <div className="text-lg font-semibold mb-2">Carte Mapbox</div>
          <div className="text-sm">
            {zones.length > 0 ? (
              <>
                <div>📍 {zones.length} adresse{zones.length > 1 ? 's' : ''} ajoutée{zones.length > 1 ? 's' : ''}</div>
                <div className="mt-2 text-xs">
                  Carte interactive avec marqueurs
                </div>
              </>
            ) : (
              <div>Utilisez la barre de recherche pour ajouter des adresses</div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">📝 Instructions :</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>1. Tapez une adresse dans la barre de recherche</li>
          <li>2. Cliquez sur un résultat pour l'ajouter</li>
          <li>3. Ajoutez au moins 3 adresses</li>
          <li>4. Cliquez sur "Créer quartier automatiquement"</li>
        </ul>
      </div>
    </div>
  );
}
