"use client";

import SimpleMapboxMap from '@/components/SimpleMapboxMap';

export default function TestSimpleMapboxPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Test SimpleMapboxMap
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Carte Mapbox simple (chargement dynamique)</h2>
          <SimpleMapboxMap 
            height="600px"
            center={[-61.5314, 16.2412]} // Pointe-à-Pitre, Guadeloupe
            zoom={13}
          />
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-green-800 mb-2">✅ Avantages de cette version :</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Chargement dynamique de Mapbox (pas besoin d'installer le package)</li>
            <li>• Token de démonstration inclus</li>
            <li>• Gestion d'erreurs robuste</li>
            <li>• Fonctionne sans configuration</li>
            <li>• Bouton de rechargement en cas d'erreur</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">📝 Instructions de test :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>1. Vérifiez que la carte se charge correctement</li>
            <li>2. Testez les contrôles de navigation (zoom, rotation)</li>
            <li>3. Testez le mode plein écran</li>
            <li>4. Vérifiez les marqueurs et overlays</li>
            <li>5. Ouvrez la console pour voir les logs de débogage</li>
            <li>6. Testez le bouton "Recharger" en cas d'erreur</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
