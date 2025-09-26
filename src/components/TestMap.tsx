"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function TestMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour initialiser la carte
  const initializeMap = useCallback(() => {
    if (!mapContainer.current) return;

    try {
      // Simulation d'initialisation de carte
      setIsLoaded(true);
      setError(null);
    } catch (err) {
      setError("Erreur lors de l'initialisation de la carte");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  return (
    <div className="w-full h-[400px]">
      {error ? (
        <div className="w-full h-full bg-red-50 border border-red-200 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-red-600 text-lg mb-2">⚠️ Erreur de carte</div>
            <div className="text-red-800">{error}</div>
          </div>
        </div>
      ) : (
        <div ref={mapContainer} className="w-full h-full bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500">
            {isLoaded ? "Carte de test chargée" : "Chargement de la carte..."}
          </div>
        </div>
      )}
    </div>
  );
}
