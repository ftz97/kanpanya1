"use client";

import { useState, useEffect, useCallback } from "react";

interface MapboxMapProps {
  className?: string;
  height?: string;
}

export default function MapboxMap({ className = "", height = "400px" }: MapboxMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);

  
const stableSetIsClient = useCallback(() => {
  setIsClient();
}, [setIsClient]);

const stableSetMapboxToken = useCallback(() => {
  setMapboxToken();
}, [setMapboxToken]);

useEffect(() => {
  stableSetIsClient();
  stableSetMapboxToken();
}, [stableSetIsClient, stableSetMapboxToken]);;

  if (!isClient) {
    return (
      <div 
        className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  if (!mapboxToken || mapboxToken.includes('your_real_token_here')) {
    return (
      <div 
        className={`bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200 flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center p-6">
          <div className="text-4xl mb-3">🗺️</div>
          <h3 className="text-lg font-semibold text-red-700 mb-2">Token Mapbox requis</h3>
          <p className="text-red-600 text-sm mb-4">
            Configurez votre token Mapbox dans le fichier .env.local
          </p>
          <div className="bg-white p-3 rounded border text-xs text-left">
            <p className="font-mono text-gray-700">
              NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200 flex items-center justify-center ${className}`}
      style={{ height }}
    >
      <div className="text-center p-6">
        <div className="text-4xl mb-3">🗺️</div>
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Carte Interactive</h3>
        <p className="text-blue-600 text-sm mb-4">
          Token Mapbox configuré ✅
        </p>
        <div className="bg-white p-3 rounded border text-xs">
          <p className="text-green-600 font-medium">
            Prêt pour l&apos;intégration Mapbox GL JS
          </p>
        </div>
      </div>
    </div>
  );
}

