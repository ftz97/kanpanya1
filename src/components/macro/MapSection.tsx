"use client";

import { useEffect, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function MapSection() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Fonction pour initialiser la carte
  const initializeMap = useCallback(() => {
    if (!mapContainer.current || map.current) return;

    try {
      // Configuration de base de la carte
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [2.3522, 48.8566], // Paris
        zoom: 12,
      });

      // Ajouter les contrôles de navigation
      map.current.addControl(new mapboxgl.NavigationControl());

      // Ajouter le geocoder
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });

      map.current.addControl(geocoder);

    } catch (error) {
      console.error("Erreur lors de l'initialisation de la carte:", error);
    }
  }, []);

  useEffect(() => {
    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [initializeMap]);

  return (
    <div className="w-full h-[600px]">
      <div ref={mapContainer} className="w-full h-full rounded-lg shadow" />
    </div>
  );
}
