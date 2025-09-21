"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function MapSection() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.error("❌ Token Mapbox manquant");
      return;
    }
    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [2.3522, 48.8566], // Paris
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    const geocoder = new MapboxGeocoder({
      accessToken: token,
      mapboxgl,
      marker: true,
      placeholder: "Rechercher une adresse...",
      language: "fr",
    });

    map.current.addControl(geocoder, "top-left");

    return () => map.current?.remove();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div ref={mapContainer} className="w-full h-[500px] rounded-lg shadow border" />
    </div>
  );
}