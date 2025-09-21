"use client";

import RealMapboxMap from '@/components/RealMapboxMap';

export default function TestRealMapboxPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Test RealMapboxMap - Version Intégrée
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Carte Mapbox avec gestion d&apos;erreurs</h2>
          <RealMapboxMap 
            height="600px"
            center={[-61.5314, 16.2412]} // Pointe-à-Pitre, Guadeloupe
            zoom={13}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">📍 Guadeloupe - Pointe-à-Pitre</h3>
            <RealMapboxMap 
              height="400px"
              center={[-61.5314, 16.2412]} // Pointe-à-Pitre
              zoom={14}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">🏝️ Martinique - Fort-de-France</h3>
            <RealMapboxMap 
              height="400px"
              center={[-61.0742, 14.6036]} // Fort-de-France
              zoom={14}
            />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-green-800 mb-2">✅ Composant Intégré :</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Gestion d&apos;erreurs robuste</li>
            <li>• Loader avec spinner</li>
            <li>• Contrôles de navigation</li>
            <li>• Mode plein écran</li>
            <li>• Marqueurs automatiques</li>
            <li>• Overlays informatifs</li>
            <li>• Nettoyage automatique</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">📝 Instructions de test :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>1. Vérifiez que les cartes se chargent correctement</li>
            <li>2. Testez les contrôles de navigation (zoom, rotation)</li>
            <li>3. Testez le mode plein écran</li>
            <li>4. Vérifiez les marqueurs verts au centre</li>
            <li>5. Regardez les overlays avec les statistiques</li>
            <li>6. Ouvrez la console pour voir les logs de débogage</li>
            <li>7. Testez le responsive sur mobile</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
