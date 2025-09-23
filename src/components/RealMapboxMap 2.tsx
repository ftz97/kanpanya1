"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface Point {
  lng: number;
  lat: number;
  label: string;
}

interface RealMapboxMapProps {
  onSave?: (points: Point[]) => void;
  className?: string;
  height?: string;
  center?: [number, number];
  zoom?: number;
}

export default function RealMapboxMap({
  onSave,
  className = "",
  height = "500px",
  center = [2.3522, 48.8566],
  zoom = 12,
}: RealMapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [points, setPoints] = useState<Point[]>([]);

  // Initialisation carte + barre unique (geocoder)
  useEffect(() => {
    if (!mapContainer.current) return;
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.error("❌ Token Mapbox manquant");
      return;
    }
    mapboxgl.accessToken = token;

    // init map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center,
      zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Attendre que le style soit chargé avant d'ajouter des sources
    map.current.on('style.load', () => {
      console.log('✅ Style Mapbox chargé');
    });

    // --- Barre de recherche Mapbox (unique) ---
    const geocoder = new MapboxGeocoder({
      accessToken: token,
      mapboxgl,
      marker: false,
      placeholder: "Rechercher une adresse ou cliquer sur la carte",
      language: "fr",
    });

    map.current.addControl(geocoder, "top-left");

    // Quand une adresse est cherchée
    geocoder.on("result", (e) => {
      const coords = e.result.center;
      const newPoint: Point = {
        lng: coords[0],
        lat: coords[1],
        label: e.result.place_name,
      };
      setPoints((prev) => {
        if (prev.some((p) => p.label === newPoint.label)) return prev;
        return [...prev, newPoint];
      });
      map.current?.flyTo({ center: coords, zoom: 14 });
    });

    // Quand on clique sur la carte
    map.current.on("click", async (e) => {
      const { lng, lat } = e.lngLat;
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}&language=fr`
      );
      const data = await res.json();
      const label =
        data.features?.[0]?.place_name ||
        `Point (${lng.toFixed(4)}, ${lat.toFixed(4)})`;

      setPoints((prev) => [...prev, { lng, lat, label }]);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [center, zoom]);

  // Affichage des marqueurs + ligne/polygone
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    // Supprimer anciens marqueurs
    document.querySelectorAll(".mapboxgl-marker").forEach((el) => el.remove());

    // Ajouter nouveaux
    points.forEach((p) => {
      new mapboxgl.Marker({ color: "#2563eb" })
        .setLngLat([p.lng, p.lat])
        .addTo(map.current!);
    });

    const coords = points.map((p) => [p.lng, p.lat]);

    // Vérifier si le style est chargé avant d'ajouter des sources
    if (map.current.isStyleLoaded()) {
      if (map.current.getSource("line-points")) {
        (map.current.getSource("line-points") as mapboxgl.GeoJSONSource).setData({
          type: "Feature",
          geometry: { type: "LineString", coordinates: coords },
        });
      } else {
        map.current.addSource("line-points", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: { type: "LineString", coordinates: coords },
          },
        });
        map.current.addLayer({
          id: "line-layer",
          type: "line",
          source: "line-points",
          paint: { "line-color": "#10b981", "line-width": 3 },
        });
      }

      if (points.length >= 3) {
        const polygon = {
          type: "Feature",
          geometry: { type: "Polygon", coordinates: [[...coords, coords[0]]] },
        };
        if (map.current.getSource("polygon-points")) {
          (map.current.getSource("polygon-points") as mapboxgl.GeoJSONSource).setData(polygon);
        } else {
          map.current.addSource("polygon-points", { type: "geojson", data: polygon });
          map.current.addLayer({
            id: "polygon-layer",
            type: "fill",
            source: "polygon-points",
            paint: { "fill-color": "#10b981", "fill-opacity": 0.2 },
          });
        }
      }
    }
  }, [points]);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />

      {/* Zone sous la barre pour voir les points + bouton */}
      {points.length > 0 && (
        <div className="absolute top-16 left-4 bg-white bg-opacity-95 p-3 rounded-lg shadow max-w-xs">
          <p className="font-semibold text-gray-700 mb-2">
            📍 Points ajoutés ({points.length})
          </p>
          <ul className="space-y-1 max-h-32 overflow-y-auto text-sm text-gray-700">
            {points.map((p, idx) => (
              <li key={idx} className="truncate">
                {p.label}
              </li>
            ))}
          </ul>
          <button
            onClick={() => onSave?.(points)}
            className="mt-3 w-full px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      )}
    </div>
  );
}