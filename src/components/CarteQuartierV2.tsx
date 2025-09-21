"use client";

import { useEffect, useRef, useState } from "react";

type AreaOption = {
  value: string;
  label: string;
  type: "adresse" | "quartier";
  coordinates: [number, number];
};

export default function CarteQuartierV2() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const [zones, setZones] = useState<AreaOption[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<unknown[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Vérifier le token Mapbox
  
const stableSetMapError = useCallback(() => {
  setMapError();
}, [setMapError]);

const stableStartsWith = useCallback(() => {
  startsWith();
}, [startsWith]);

const stableSetMapError = useCallback(() => {
  setMapError();
}, [setMapError]);

useEffect(() => {
  stableSetMapError();
  stableStartsWith();
  stableSetMapError();
}, [stableSetMapError, stableStartsWith, stableSetMapError]);;

  // Fonction de recherche d'adresses
  const searchAddresses = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Simulation de recherche pour la démo
      const mockResults = [
        {
          place_name: `Rue ${query}, Pointe-à-Pitre, Guadeloupe`,
          center: [-61.5314 + Math.random() * 0.01, 16.2412 + Math.random() * 0.01]
        },
        {
          place_name: `Avenue ${query}, Pointe-à-Pitre, Guadeloupe`,
          center: [-61.5314 + Math.random() * 0.01, 16.2412 + Math.random() * 0.01]
        },
        {
          place_name: `Place ${query}, Pointe-à-Pitre, Guadeloupe`,
          center: [-61.5314 + Math.random() * 0.01, 16.2412 + Math.random() * 0.01]
        }
      ];
      
      setSearchResults(mockResults);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Ajouter une adresse depuis les résultats de recherche
  const addAddressFromSearch = (feature: unknown) => {
    const [lng, lat] = feature.center;
    const label = feature.place_name;

    const newZone: AreaOption = {
      value: `${lng},${lat}`,
      label,
      type: "adresse",
      coordinates: [lng, lat],
    };

    setZones((prev) => [...prev, newZone]);
    setSearchQuery("");
    setSearchResults([]);

    console.log(`Adresse ajoutée: ${label} à ${lng}, ${lat}`);
  };

  // Créer un quartier automatiquement
  const createAutoQuartier = () => {
    if (zones.length < 3) {
      alert("Ajoutez au moins 3 adresses pour créer un quartier.");
      return;
    }
    alert(`✅ Quartier créé avec ${zones.length} adresses !`);
  };

  // Initialiser la carte
  useEffect(() => {
    if (!mapContainer.current || mapError) return;

    // Simulation de chargement de Mapbox
    const timer = setTimeout(() => {
      setMapLoaded(true);
      console.log("Carte Mapbox chargée (simulation)");
    }, 2000);

    return () => clearTimeout(timer);
  }, [mapError]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-blue-800">🗺️ Créer un quartier</h2>

      {/* Message d'erreur si problème de token */}
      {mapError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-500 text-xl mr-2">⚠️</div>
            <div>
              <h3 className="font-semibold text-red-800">Erreur de configuration</h3>
              <p className="text-red-700 text-sm">{mapError}</p>
            </div>
          </div>
        </div>
      )}

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
                onClick={() => addAddressFromSearch(result)}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
              >
                <div className="text-sm font-medium text-gray-900">
                  {result.place_name}
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
            {zones.map((z) => (
              <span
                key={z.value}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm flex items-center gap-1"
              >
                📍 {z.label}
                <button
                  onClick={() => setZones(prev => prev.filter(item => item.value !== z.value))}
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
          onClick={createAutoQuartier}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ✅ Créer quartier automatiquement
        </button>
        <button
          onClick={() => {
            setZones([]);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🗑️ Effacer tout
        </button>
      </div>

      {/* Zone de carte */}
      <div ref={mapContainer} className="w-full h-[600px] rounded-lg shadow bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
        {mapError ? (
          <div className="text-center text-red-500">
            <div className="text-4xl mb-4">⚠️</div>
            <div className="text-lg font-semibold mb-2">Erreur de configuration</div>
            <div className="text-sm">{mapError}</div>
          </div>
        ) : !mapLoaded ? (
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-4 animate-spin">⏳</div>
            <div className="text-lg font-semibold mb-2">Chargement de la carte...</div>
            <div className="text-sm">Initialisation de Mapbox</div>
          </div>
        ) : (
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
        )}
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
  );
}
