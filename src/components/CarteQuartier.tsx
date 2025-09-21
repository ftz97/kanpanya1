"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type AreaOption = {
  value: string;
  label: string;
  type: "adresse" | "quartier";
  coordinates: [number, number];
};

export default function CarteQuartier() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);

  const [zones, setZones] = useState<AreaOption[]>([]);
  const [quartier, setQuartier] = useState<GeoJSON.Polygon | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<unknown[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  
const stableSetMapError = useCallback(() => {
  setMapError();
}, [setMapError]);

const stableSetTimeout = useCallback(() => {
  setTimeout();
}, [setTimeout]);

const stableMap = useCallback(() => {
  Map();
}, [Map]);

    }

    // Ajouter un marqueur sur la carte
    if (mapRef.current) {
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapRef.current);
    }

    setSearchQuery("");
    setSearchResults([]);
  };

  // ✅ Générer un quartier auto avec les points
  const createAutoQuartier = () => {
    if (zones.length < 3) {
      alert("Ajoutez au moins 3 adresses pour créer un quartier.");
      return;
    }

    // Petit algo Convex Hull (version simplifiée)
    const points = zones.map((z) => z.coordinates);
    const polygon: GeoJSON.Polygon = {
      type: "Polygon",
      coordinates: [[...points, points[0]]], // ferme le polygone
    };

    setQuartier(polygon);

    if (mapRef.current) {
      // Supprime l'ancien quartier
      if (mapRef.current.getSource("quartier-auto")) {
        mapRef.current.removeLayer("quartier-auto-fill");
        mapRef.current.removeSource("quartier-auto");
      }

      // Ajoute le nouveau quartier
      mapRef.current.addSource("quartier-auto", {
        type: "geojson",
        data: polygon,
      });

      mapRef.current.addLayer({
        id: "quartier-auto-fill",
        type: "fill",
        source: "quartier-auto",
        layout: {},
        paint: {
          "fill-color": "#17BFA0",
          "fill-opacity": 0.3,
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Créer un quartier</h2>

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
                  {result.properties?.category || "Adresse"}
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
            Adresses ajoutées ({zones.length}) :
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
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Créer quartier automatiquement
        </button>
        <button
          onClick={() => {
            setZones([]);
            setQuartier(null);
            if (mapRef.current?.getSource("quartier-auto")) {
              mapRef.current.removeLayer("quartier-auto-fill");
              mapRef.current.removeSource("quartier-auto");
            }
            if (draw.current) {
              draw.current.deleteAll();
            }
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Effacer tout
        </button>
      </div>

      {/* Quartier affiché */}
      {quartier && (
        <div className="p-2 bg-green-100 text-green-800 rounded">
          ✅ Quartier créé ({zones.length} adresses)
        </div>
      )}

      {/* Carte */}
      {mapError ? (
        <div className="w-full h-[600px] rounded-lg shadow bg-red-50 border border-red-200 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-red-600 text-lg mb-2">⚠️ Erreur de carte</div>
            <div className="text-red-800">{mapError}</div>
            <div className="text-sm text-red-600 mt-2">
              Pour obtenir un token Mapbox gratuit : 
              <br />
              1. Allez sur <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
              <br />
              2. Créez un compte gratuit
              <br />
              3. Copiez votre token public dans .env.local
            </div>
          </div>
        </div>
      ) : (
        <div ref={mapContainer} className="w-full h-[600px] rounded-lg shadow" />
      )}
    </div>
  );
}

