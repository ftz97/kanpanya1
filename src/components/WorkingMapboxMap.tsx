"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function WorkingMapboxMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<unknown>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawnPolygons, setDrawnPolygons] = useState<unknown[]>([]);

const stableImport = useCallback(() => {
  // import function call
}, []);

  return (
    <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
      <p className="text-gray-600">Carte Mapbox en cours de développement...</p>
    </div>
  );
}
