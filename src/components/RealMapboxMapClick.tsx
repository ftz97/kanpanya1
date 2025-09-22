"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface RealMapboxMapClickProps {
  className?: string;
  height?: string;
  center?: [number, number];
  zoom?: number;
}

interface Point {
  lng: number;
  lat: number;
  label: string;
}

export default function RealMapboxMapClick({
  className = "",
  height = "500px",
  center = [2.3522, 48.8566], // Paris par défaut
  zoom = 12,
}: RealMapboxMapClickProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [clickMode, setClickMode] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Initialisation de la carte
  useEffect(() => {
    if (!mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      setError("Token Mapbox manquant. Vérifiez votre .env.local");
      return;
    }

    mapboxgl.accessToken = token;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center,
        zoom,
        attributionControl: false,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

      map.current.on("load", () => {
        setIsLoaded(true);
      });

      // Gestion du clic sur la carte
      map.current.on("click", (e) => {
        if (clickMode) {
          const coords = [e.lngLat.lng, e.lngLat.lat] as [number, number];
          const newPoint: Point = {
            lng: coords[0],
            lat: coords[1],
            label: `Point ${points.length + 1}`,
          };
          
          setPoints((prev) => [...prev, newPoint]);
          console.log("✅ Point ajouté par clic:", newPoint);
        }
      });

      map.current.on("error", (e: any) => {
        setError(e?.error?.message || "Erreur Mapbox inconnue");
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, zoom, clickMode, points.length]);

  // Mettre à jour les marqueurs et la ligne entre points
  useEffect(() => {
    if (!map.current) return;

    // Supprimer anciens marqueurs
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Ajouter nouveaux marqueurs
    points.forEach((p) => {
      const marker = new mapboxgl.Marker({ color: "#2563eb" })
        .setLngLat([p.lng, p.lat])
        .addTo(map.current!);
      markersRef.current.push(marker);
    });

    // Gestion de la ligne verte entre les points
    const coords = points.map((p) => [p.lng, p.lat]);
    
    if (points.length >= 2) {
      // Ajouter ou mettre à jour la ligne
      if (map.current.getSource("line-points")) {
        (map.current.getSource("line-points") as mapboxgl.GeoJSONSource).setData({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: coords,
          },
        });
      } else {
        map.current.addSource("line-points", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        });
        map.current.addLayer({
          id: "line-layer",
          type: "line",
          source: "line-points",
          paint: {
            "line-color": "#10b981",
            "line-width": 3,
          },
        });
      }
    } else {
      // Supprimer la ligne si moins de 2 points
      if (map.current.getLayer("line-layer")) {
        map.current.removeLayer("line-layer");
      }
      if (map.current.getSource("line-points")) {
        map.current.removeSource("line-points");
      }
    }

    // Gestion du polygone vert translucide (3 points ou plus)
    if (points.length >= 3) {
      const polygon = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[...coords, coords[0]]], // fermer le polygone
        },
      };

      if (map.current.getSource("polygon-points")) {
        (map.current.getSource("polygon-points") as mapboxgl.GeoJSONSource).setData(polygon);
      } else {
        map.current.addSource("polygon-points", {
          type: "geojson",
          data: polygon,
        });
        map.current.addLayer({
          id: "polygon-layer",
          type: "fill",
          source: "polygon-points",
          paint: {
            "fill-color": "#10b981",
            "fill-opacity": 0.2,
          },
        });
      }
    } else {
      // Supprimer le polygone si moins de 3 points
      if (map.current.getLayer("polygon-layer")) {
        map.current.removeLayer("polygon-layer");
      }
      if (map.current.getSource("polygon-points")) {
        map.current.removeSource("polygon-points");
      }
    }
  }, [points]);

  const removePoint = (label: string) => {
    setPoints((prev) => prev.filter((p) => p.label !== label));
  };

  const clearAllPoints = () => {
    setPoints([]);
  };

  if (error) {
    return (
      <div
        className={`bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200 flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center p-6">
          <div className="text-4xl mb-3">❌</div>
          <h3 className="text-lg font-semibold text-red-700 mb-2">
            Erreur de carte
          </h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <div
        ref={mapContainer}
        className="w-full h-full rounded-lg"
        style={{ height }}
      />

      {!isLoaded && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Chargement de la carte...</p>
          </div>
        </div>
      )}

      {/* Bouton Mode Clic */}
      <div className="absolute top-4 right-4 bg-white bg-opacity-95 p-3 rounded-lg shadow">
        <button
          onClick={() => setClickMode(!clickMode)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            clickMode
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {clickMode ? "🖱️ Mode Clic Activé" : "🖱️ Activer Mode Clic"}
        </button>
        {clickMode && (
          <p className="text-xs text-gray-600 mt-1 text-center">
            Cliquez sur la carte pour ajouter des points
          </p>
        )}
      </div>

      {/* Bouton Ajouter Point au Centre */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-95 p-3 rounded-lg shadow">
        <button
          onClick={() => {
            if (map.current) {
              const center = map.current.getCenter();
              const newPoint: Point = {
                lng: center.lng,
                lat: center.lat,
                label: `Point ${points.length + 1}`,
              };
              setPoints((prev) => [...prev, newPoint]);
              console.log("✅ Point ajouté au centre:", newPoint);
            }
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          📍 Ajouter au Centre
        </button>
      </div>

      {/* Liste des adresses choisies */}
      {points.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 p-3 rounded-lg shadow max-w-xs">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-700">
              📍 Points ajoutés ({points.length})
            </p>
            <button
              onClick={clearAllPoints}
              className="text-xs text-red-500 hover:text-red-700 font-medium"
            >
              Tout effacer
            </button>
          </div>
          <ul className="space-y-1 max-h-32 overflow-y-auto">
            {points.map((p, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center text-sm text-gray-700 p-1 hover:bg-gray-50 rounded"
              >
                <span
                  className="truncate cursor-pointer flex-1"
                  onClick={() => {
                    map.current?.flyTo({ center: [p.lng, p.lat], zoom: 16 });
                  }}
                  title="Cliquer pour centrer sur ce point"
                >
                  {p.label}
                </span>
                <button
                  className="ml-2 text-red-500 hover:text-red-700 text-xs"
                  onClick={() => removePoint(p.label)}
                  title="Supprimer ce point"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
