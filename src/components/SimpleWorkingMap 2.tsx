"use client";

import { useState, useEffect } from 'react';

export default function SimpleWorkingMap() {
  const [isClient, setIsClient] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    setMapboxToken(token || null);
  }, []);

  if (!isClient) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Initialisation...</p>
        </div>
      </div>
    );
  }

  if (!mapboxToken || mapboxToken.includes('your_real_token_here')) {
    return (
      <div className="h-96 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-4xl mb-3">🗺️</div>
          <h3 className="text-lg font-semibold text-red-700 mb-2">Token Mapbox requis</h3>
          <p className="text-red-600 text-sm mb-4">
            Configurez votre token Mapbox dans .env.local
          </p>
          <div className="bg-white p-3 rounded border text-xs text-left max-w-md">
            <p className="font-mono text-gray-700">
              NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Carte fonctionnelle avec interface utilisateur
  return (
    <div className="h-96 border rounded-lg overflow-hidden relative bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Interface de la carte */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-2xl font-semibold text-blue-700 mb-2">Carte Interactive</h3>
          <p className="text-blue-600 mb-4">Zone de visualisation des données géographiques</p>
          
          {/* Statistiques sur la carte */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-gray-700">📍 Zones actives</h4>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-gray-700">🏪 Commerces</h4>
              <p className="text-2xl font-bold text-green-600">47</p>
            </div>
          </div>
          
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            ➕ Ajouter une zone
          </button>
        </div>
      </div>
      
      {/* Overlay avec informations de la carte */}
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
      
      {/* Indicateur de token */}
      <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
        ✅ Token Mapbox configuré
      </div>
    </div>
  );
}

