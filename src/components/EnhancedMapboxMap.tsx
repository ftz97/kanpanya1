"use client";

import { useEffect, useRef, useState } from "react";

export default function EnhancedMapboxMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<unknown>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialisation basique de la carte
    setIsLoaded(true);
  }, []);

  if (error) {
    return (
      <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
        <p className="text-red-600">Erreur de chargement de la carte: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
      <div ref={mapContainer} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <p className="text-gray-600">Chargement de la carte...</p>
        </div>
      )}
    </div>
  );
}
