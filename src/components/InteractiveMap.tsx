"use client";

import { useState } from "react";
import { Map, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Debug: vérifier que le token est chargé
console.log("Mapbox token:", MAPBOX_TOKEN ? "✅ Chargé" : "❌ Manquant");

// Mock data pour les quartiers
const quartiers = [
  {
    id: "centre-ville",
    name: "Centre-ville",
    coordinates: [2.3522, 48.8566] as [number, number],
    scans: 1200,
    color: "#10B981"
  },
  {
    id: "quartier-nord",
    name: "Quartier Nord",
    coordinates: [2.3622, 48.8666] as [number, number],
    scans: 890,
    color: "#3B82F6"
  },
  {
    id: "quartier-est",
    name: "Quartier Est",
    coordinates: [2.3422, 48.8466] as [number, number],
    scans: 760,
    color: "#F59E0B"
  },
  {
    id: "zone-industrielle",
    name: "Zone industrielle",
    coordinates: [2.3322, 48.8366] as [number, number],
    scans: 320,
    color: "#EF4444"
  }
];

export default function InteractiveMap() {
  const [selectedQuartier, setSelectedQuartier] = useState<unknown>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border flex items-center justify-center">
        <p className="text-gray-500">🗺️ Token Mapbox manquant</p>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="h-64 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border flex items-center justify-center">
        <p className="text-red-500">🗺️ Erreur carte: {mapError}</p>
      </div>
    );
  }

  return (
    <div className="h-64 rounded-lg overflow-hidden border">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: 2.3522,
          latitude: 48.8566,
          zoom: 12
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onError={(e) => {
          console.error("Mapbox error:", e);
          setMapError("Erreur de chargement de la carte");
        }}
      >
        {quartiers.map((quartier) => (
          <Marker
            key={quartier.id}
            longitude={quartier.coordinates[0]}
            latitude={quartier.coordinates[1]}
            onClick={() => setSelectedQuartier(quartier)}
          >
            <div
              className="w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: quartier.color }}
            >
              {quartier.scans}
            </div>
          </Marker>
        ))}

        {selectedQuartier && (
          <Popup
            longitude={selectedQuartier.coordinates[0]}
            latitude={selectedQuartier.coordinates[1]}
            onClose={() => setSelectedQuartier(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <div className="p-2">
              <h3 className="font-semibold text-lg">{selectedQuartier.name}</h3>
              <p className="text-gray-600">
                <strong>{selectedQuartier.scans}</strong> scans cette semaine
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Cliquez pour voir les détails
              </p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
