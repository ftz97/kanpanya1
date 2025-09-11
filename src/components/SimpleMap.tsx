"use client";

import { useEffect, useRef } from "react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function SimpleMap() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return;

    // Import dynamique de mapbox-gl pour éviter les problèmes SSR
    import('mapbox-gl').then((mapboxgl) => {
      mapboxgl.default.accessToken = MAPBOX_TOKEN;

      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [2.3522, 48.8566],
        zoom: 12
      });

      // Ajouter des marqueurs
      new mapboxgl.default.Marker({ color: '#10B981' })
        .setLngLat([2.3522, 48.8566])
        .setPopup(new mapboxgl.default.Popup().setHTML('<h3>Centre-ville</h3><p>1,200 scans</p>'))
        .addTo(map);

      new mapboxgl.default.Marker({ color: '#3B82F6' })
        .setLngLat([2.3622, 48.8666])
        .setPopup(new mapboxgl.default.Popup().setHTML('<h3>Quartier Nord</h3><p>890 scans</p>'))
        .addTo(map);

      new mapboxgl.default.Marker({ color: '#F59E0B' })
        .setLngLat([2.3422, 48.8466])
        .setPopup(new mapboxgl.default.Popup().setHTML('<h3>Quartier Est</h3><p>760 scans</p>'))
        .addTo(map);

      new mapboxgl.default.Marker({ color: '#EF4444' })
        .setLngLat([2.3322, 48.8366])
        .setPopup(new mapboxgl.default.Popup().setHTML('<h3>Zone industrielle</h3><p>320 scans</p>'))
        .addTo(map);

      return () => map.remove();
    }).catch((error) => {
      console.error("Erreur chargement Mapbox:", error);
    });
  }, []);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border flex items-center justify-center">
        <p className="text-gray-500">🗺️ Token Mapbox manquant</p>
      </div>
    );
  }

  return (
    <div className="h-64 rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
