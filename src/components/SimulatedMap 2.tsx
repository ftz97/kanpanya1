"use client";

import { useState, useEffect } from 'react';

interface SimulatedMapProps {
  className?: string;
  height?: string;
  center?: [number, number];
  zoom?: number;
}

export default function SimulatedMap({ 
  className = "", 
  height = "400px",
  center = [2.3522, 48.8566], // Paris par défaut
  zoom = 12
}: SimulatedMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Simuler le chargement
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Carte simulée avec OpenStreetMap */}
      <div 
        className="w-full h-full rounded-lg overflow-hidden relative"
        style={{ height }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${center[0]-0.01},${center[1]-0.01},${center[0]+0.01},${center[1]+0.01}&layer=mapnik&marker=${center[1]},${center[0]}`}
          className="w-full h-full border-0"
          title="Carte OpenStreetMap"
        />
        
        {/* Overlay de simulation Mapbox */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Contrôles simulés */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 pointer-events-auto">
              <span className="text-lg">+</span>
            </button>
            <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 pointer-events-auto">
              <span className="text-lg">−</span>
            </button>
            <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 pointer-events-auto">
              <span className="text-lg">⌂</span>
            </button>
          </div>

          {/* Marqueur principal */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </div>

          {/* Coordonnées de la souris */}
          {mousePosition && (
            <div 
              className="absolute bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded pointer-events-auto"
              style={{
                left: mousePosition.x + 10,
                top: mousePosition.y - 20
              }}
            >
              {center[0].toFixed(4)}, {center[1].toFixed(4)}
            </div>
          )}
        </div>
      </div>
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Chargement de la carte...</p>
          </div>
        </div>
      )}
      
      {/* Overlay avec informations */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow">
        <div className="text-sm">
          <p className="font-semibold text-gray-700">📍 Zone d'activité</p>
          <p className="text-blue-600">47 commerces actifs</p>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow">
        <div className="text-sm">
          <p className="font-semibold text-gray-700">🎯 Statistiques</p>
          <p className="text-green-600">1,247 scans aujourd'hui</p>
        </div>
      </div>

      {/* Légende */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow">
        <div className="text-sm">
          <p className="font-semibold text-gray-700 mb-2">🗺️ Carte simulée</p>
          <p className="text-gray-600 text-xs">OpenStreetMap + Interface Mapbox</p>
          <p className="text-gray-600 text-xs">Coordonnées: {center[0].toFixed(4)}, {center[1].toFixed(4)}</p>
        </div>
      </div>
    </div>
  );
}
