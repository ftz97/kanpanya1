"use client";

import SimulatedMap from '@/components/SimulatedMap';

export default function TestSimulatedMapPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Test SimulatedMap
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Carte simulée (OpenStreetMap + Interface Mapbox)</h2>
          <SimulatedMap 
            height="600px"
            center={[-61.5314, 16.2412]} // Pointe-à-Pitre, Guadeloupe
            zoom={13}
          />
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-green-800 mb-2">✅ Avantages de cette version :</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Fonctionne sans token Mapbox</li>
            <li>• Utilise OpenStreetMap (gratuit et fiable)</li>
            <li>• Interface similaire à Mapbox</li>
            <li>• Contrôles de zoom simulés</li>
            <li>• Marqueur animé</li>
            <li>• Affichage des coordonnées de la souris</li>
            <li>• Chargement instantané</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">📝 Instructions de test :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>1. Vérifiez que la carte se charge correctement</li>
            <li>2. Bougez la souris pour voir les coordonnées</li>
            <li>3. Testez les contrôles de zoom simulés</li>
            <li>4. Vérifiez le marqueur animé au centre</li>
            <li>5. Vérifiez les overlays d'informations</li>
            <li>6. Testez le zoom avec la molette de la souris</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
