"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function SimpleDrawingMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<unknown>(null);
  const draw = useRef<unknown>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawnPolygons, setDrawnPolygons] = useState<unknown[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

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

  // Fonction pour supprimer un polygone
  const removePolygon = useCallback((index: number) => {
    setDrawnPolygons((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Fonction pour commencer le dessin
  const startDrawing = useCallback(() => {
    setIsDrawing(true);
    // Logique de dessin ici
  }, []);

  // Fonction pour arrêter le dessin
  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  return (
    <div className="w-full h-[600px] flex flex-col">
      {/* Contrôles */}
      <div className="flex gap-2 p-4 bg-gray-50 border-b">
        <button
          onClick={startDrawing}
          disabled={isDrawing}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          {isDrawing ? "Dessin en cours..." : "Commencer le dessin"}
        </button>
        <button
          onClick={stopDrawing}
          disabled={!isDrawing}
          className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
        >
          Arrêter le dessin
        </button>
      </div>

      {/* Carte */}
      {error ? (
        <div className="flex-1 bg-red-50 border border-red-200 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-red-600 text-lg mb-2">⚠️ Erreur de carte</div>
            <div className="text-red-800">{error}</div>
          </div>
        </div>
      ) : (
        <div ref={mapContainer} className="flex-1 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500">
            {isLoaded ? "Carte Mapbox chargée" : "Chargement de la carte..."}
          </div>
        </div>
      )}

      {/* Liste des polygones dessinés */}
      {drawnPolygons.length > 0 && (
        <div className="p-4 bg-gray-50 border-t">
          <h3 className="font-semibold mb-2">Polygones dessinés ({drawnPolygons.length})</h3>
          <div className="space-y-2">
            {drawnPolygons.map((polygon: any, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                <span className="text-sm">Polygone #{index + 1}</span>
                <button
                  onClick={() => removePolygon(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium px-2 py-1 rounded hover:bg-red-50 transition"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
