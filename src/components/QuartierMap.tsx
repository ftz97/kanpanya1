"use client";

import { useState } from "react";
import Map, { Source, Layer, useControl } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

type ZoneCustom = {
  name: string;
  polygon: unknown; // GeoJSON du polygone
  professions: Record<string, number>;
};

// Layer style pour afficher le polygone dessiné
const polygonLayer = {
  id: "custom-polygons",
  type: "fill" as const,
  paint: {
    "fill-color": "#3B82F6",
    "fill-opacity": 0.3,
  },
};

function DrawControl({ onCreate }: { onCreate: (geojson: unknown) => void }) {
  useControl<MapboxDraw>(
    () =>
      new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      }),
    ({ map }) => {
      map.on("draw.create", (e) => {
        try {
          if (e.features && e.features.length > 0) {
            onCreate(e.features[0]);
          } else {
            console.error("Aucun feature trouvé dans l'événement draw.create:", e);
          }
        } catch (error) {
          console.error("Erreur lors de la création du quartier:", error);
        }
      });
    }
  );
  return null;
}

export default function QuartierMap() {
  const [zones, setZones] = useState<ZoneCustom[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  // Debug: vérifier que le token est chargé
  console.log("Mapbox token QuartierMap:", MAPBOX_TOKEN ? "✅ Chargé" : "❌ Manquant");

  const handleCreate = (feature: unknown) => {
    const name = prompt("Nom du quartier ?");
    if (!name) return;

    // Validation du feature GeoJSON
    if (!feature || !feature.geometry || !feature.geometry.coordinates) {
      console.error("Feature GeoJSON invalide:", feature);
      alert("Erreur: Impossible de créer le quartier");
      return;
    }

    // ⚠️ Ici tu peux remplacer par une requête Supabase → récupérer professions de la zone
    const professions = {
      Pizzeria: Math.floor(Math.random() * 5),
      Coiffeur: Math.floor(Math.random() * 5),
      Boutique: Math.floor(Math.random() * 5),
    };

    setZones([...zones, { name, polygon: feature, professions }]);
  };

  if (!MAPBOX_TOKEN) {
    return (
      <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border flex items-center justify-center">
        <p className="text-gray-500">🗺️ Token Mapbox manquant</p>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="h-96 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border flex items-center justify-center">
        <p className="text-red-500">🗺️ Erreur carte: {mapError}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="h-96 border rounded-lg overflow-hidden">
        <Map
          mapboxApiAccessToken={MAPBOX_TOKEN}
          initialViewState={{
            longitude: -61.52,
            latitude: 16.28,
            zoom: 12,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          onError={(e) => {
            console.error("Mapbox error:", e);
            setMapError("Erreur de chargement de la carte");
          }}
        >
          <DrawControl onCreate={handleCreate} />

          {zones.map((z, i) => {
            // Validation des données avant rendu
            if (!z.polygon || !z.polygon.geometry || !z.polygon.geometry.coordinates) {
              console.warn(`Zone ${z.name} a des données invalides:`, z.polygon);
              return null;
            }
            
            return (
              <Source key={i} type="geojson" data={z.polygon}>
                <Layer {...polygonLayer} />
              </Source>
            );
          })}
        </Map>
      </div>

      {/* Liste des quartiers définis */}
      {zones.map((z) => (
        <div key={z.name} className="bg-white p-4 shadow rounded">
          <h3 className="font-semibold">{z.name}</h3>
          <p className="text-gray-600">Professions présentes :</p>
          <ul className="ml-4 list-disc">
            {Object.entries(z.professions).map(([p, count]) => (
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
