"use client";

import RealMapboxMap from '@/components/RealMapboxMap';
import SimpleMapboxMap from '@/components/SimpleMapboxMap';
import SimulatedMap from '@/components/SimulatedMap';

export default function TestAllMapsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Comparaison des cartes
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Version 1: RealMapboxMap */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-600">1. RealMapboxMap</h2>
            <p className="text-sm text-gray-600 mb-4">Version avec package Mapbox installé</p>
            <div className="h-64">
              <RealMapboxMap 
                height="100%"
                center={[-61.5314, 16.2412]}
                zoom={13}
              />
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <p>❌ Nécessite un token valide</p>
              <p>❌ Peut avoir des erreurs de chargement</p>
            </div>
          </div>

          {/* Version 2: SimpleMapboxMap */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-yellow-600">2. SimpleMapboxMap</h2>
            <p className="text-sm text-gray-600 mb-4">Version avec chargement dynamique</p>
            <div className="h-64">
              <SimpleMapboxMap 
                height="100%"
                center={[-61.5314, 16.2412]}
                zoom={13}
              />
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <p>✅ Chargement dynamique</p>
              <p>✅ Token de démonstration inclus</p>
            </div>
          </div>

          {/* Version 3: SimulatedMap */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-600">3. SimulatedMap</h2>
            <p className="text-sm text-gray-600 mb-4">Version avec OpenStreetMap</p>
            <div className="h-64">
              <SimulatedMap 
                height="100%"
                center={[-61.5314, 16.2412]}
                zoom={13}
              />
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <p>✅ Fonctionne sans token</p>
              <p>✅ Interface similaire à Mapbox</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">📊 Comparaison des solutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-red-600 mb-2">RealMapboxMap</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Package Mapbox installé</li>
                <li>• Nécessite un token valide</li>
                <li>• Peut avoir des erreurs</li>
                <li>• Performance optimale</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-600 mb-2">SimpleMapboxMap</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Chargement dynamique</li>
                <li>• Token de démonstration</li>
                <li>• Plus robuste</li>
                <li>• Gestion d'erreurs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-2">SimulatedMap</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• OpenStreetMap gratuit</li>
                <li>• Aucun token requis</li>
                <li>• Interface similaire</li>
                <li>• Toujours fonctionnel</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-4">🎯 Recommandation</h3>
          <p className="text-green-700 mb-4">
            Pour un projet de production, je recommande d'utiliser <strong>SimulatedMap</strong> car :
          </p>
          <ul className="text-sm text-green-700 space-y-1">
            <li>✅ Fonctionne sans configuration</li>
            <li>✅ Aucun coût (OpenStreetMap gratuit)</li>
            <li>✅ Interface utilisateur similaire à Mapbox</li>
            <li>✅ Toujours disponible et fiable</li>
            <li>✅ Facile à personnaliser</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
