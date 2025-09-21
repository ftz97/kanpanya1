"use client";

import { useState } from "react";

export default function TestCarteQuartierPage() {
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🏘️ Créateur de Quartier Simple
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
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
                <li>2. Cliquez sur un résultat pour l&apos;ajouter</li>
                <li>3. Ajoutez au moins 3 adresses</li>
                <li>4. Cliquez sur &quot;Créer quartier automatiquement&quot;</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 rounded-lg border border-yellow-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">📝 Guide d&apos;utilisation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-yellow-700">
            <div>
              <h3 className="font-semibold mb-2">📍 Ajouter des adresses :</h3>
              <ul className="space-y-1 text-sm">
                <li>1. Cliquez sur l&apos;outil Point (📍)</li>
                <li>2. Cliquez sur la carte pour marquer une adresse</li>
                <li>3. L&apos;adresse s&apos;affiche automatiquement avec géocodage</li>
                <li>4. Répétez pour ajouter plusieurs adresses</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">🔷 Définir le quartier :</h3>
              <ul className="space-y-1 text-sm">
                <li>1. Cliquez sur l&apos;outil Polygone (🔷)</li>
                <li>2. Dessinez la zone du quartier sur la carte</li>
                <li>3. Double-cliquez pour terminer le polygone</li>
                <li>4. Le quartier est créé avec toutes les adresses</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-green-50 rounded-lg border border-green-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Fonctionnalités</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-green-700">
            <div className="text-center">
              <div className="text-2xl mb-2">📍</div>
              <p className="text-sm font-semibold">Géocodage</p>
              <p className="text-xs">Adresses automatiques</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔷</div>
              <p className="text-sm font-semibold">Zones</p>
              <p className="text-xs">Dessin libre</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🗑️</div>
              <p className="text-sm font-semibold">Gestion</p>
              <p className="text-xs">Suppression facile</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">🎯 Cas d&apos;usage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-700">
            <div>
              <h3 className="font-semibold mb-2">🏪 Zone commerciale</h3>
              <p className="text-sm">Marquez les commerces d&apos;une zone et définissez le quartier commercial</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🏠 Zone résidentielle</h3>
              <p className="text-sm">Définissez une zone d&apos;habitation avec ses adresses clés</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🎯 Zone d&apos;intervention</h3>
              <p className="text-sm">Créez des zones de service ou d&apos;action spécifiques</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📊 Analyse de zone</h3>
              <p className="text-sm">Préparez des zones pour des analyses urbaines</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

