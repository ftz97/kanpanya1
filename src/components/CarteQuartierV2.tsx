"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!mapboxToken) {
    setMapError("Token Mapbox manquant. Veuillez configurer NEXT_PUBLIC_MAPBOX_TOKEN dans .env.local");
  }

  // Fonction pour ajouter une zone
  const addZoneFromSearch = (result: any) => {
    const [lng, lat] = result.geometry.coordinates;
    const newZone: AreaOption = {
      value: result.place_name,
      label: result.place_name,
      type: "adresse",
      coordinates: [lng, lat],
    };

    setZones((prev) => [...prev, newZone]);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Fonction pour créer un quartier automatique
  const createAutoQuartier = () => {
    if (zones.length < 3) {
      alert("Ajoutez au moins 3 adresses pour créer un quartier.");
      return;
    }

    // Algorithme simple pour créer un polygone
    const points = zones.map((z) => z.coordinates);
    console.log("Quartier créé avec les points:", points);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Rechercher une adresse..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          onClick={() => {
            if (searchQuery.trim()) {
              setIsSearching(true);
              // Simulation de recherche
              setTimeout(() => {
                setSearchResults([
                  {
                    place_name: searchQuery,
                    geometry: { coordinates: [2.3522, 48.8566] }
                  }
                ]);
                setIsSearching(false);
              }, 1000);
            }
          }}
          disabled={isSearching}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          {isSearching ? "Recherche..." : "Rechercher"}
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="border rounded-lg p-2 max-h-40 overflow-y-auto">
          {searchResults.map((result: any, index) => (
            <div
              key={index}
              onClick={() => addZoneFromSearch(result)}
              className="p-2 hover:bg-gray-100 cursor-pointer rounded"
            >
              {result.place_name}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={createAutoQuartier}
          disabled={zones.length < 3}
          className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
        >
          Créer quartier ({zones.length} zones)
        </button>
        <button
          onClick={() => setZones([])}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Effacer tout
        </button>
      </div>

      {mapError ? (
        <div className="w-full h-[400px] rounded-lg shadow bg-red-50 border border-red-200 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-red-600 text-lg mb-2">⚠️ Erreur de carte</div>
            <div className="text-red-800">{mapError}</div>
          </div>
        </div>
      ) : (
        <div ref={mapContainer} className="w-full h-[400px] rounded-lg shadow bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500">Carte Mapbox (Token requis)</div>
        </div>
      )}

      {zones.length > 0 && (
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Zones ajoutées ({zones.length})</h3>
          <div className="space-y-1">
            {zones.map((zone, index) => (
              <div key={index} className="text-sm text-gray-600">
                {index + 1}. {zone.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
