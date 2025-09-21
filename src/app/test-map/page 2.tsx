"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function TestMap() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      console.error("❌ Pas de token Mapbox trouvé");
      return;
    }

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [2.3522, 48.8566], // Paris
      zoom: 12,
    });

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "500px", border: "2px solid red" }}
    />
  );
}
