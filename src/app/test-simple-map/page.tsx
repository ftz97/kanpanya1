"use client";

import WorkingMap from '@/components/WorkingMap';

export default function TestSimpleMapPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Test Carte Simple
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Carte Fonctionnelle</h2>
          
          <WorkingMap 
            height="500px"
            center={[-61.55, 16.25]} // Martinique
            zoom={12}
          />
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Status:</strong> Cette carte devrait se charger et afficher la Martinique avec un marqueur vert.
            </p>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Informations de Debug</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Token Mapbox:</strong> {process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? '✅ Configuré' : '❌ Manquant'}</p>
            <p><strong>Environnement:</strong> {process.env.NODE_ENV}</p>
            <p><strong>URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Serveur'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

