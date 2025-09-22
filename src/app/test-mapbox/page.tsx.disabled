"use client";

import DirectMap from '@/components/DirectMap';

export default function TestMapboxPage() {

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">🗺️ Test Mapbox</h1>
      
      {/* Status du token */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">📋 Configuration</h2>
        <div className="space-y-2">
          <p><strong>Token Mapbox:</strong> {process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? '✅ Configuré' : '❌ Manquant'}</p>
          <p><strong>Environnement:</strong> {process.env.NODE_ENV}</p>
          <p><strong>URL:</strong> {process.env.NEXT_PUBLIC_SITE_URL}</p>
        </div>
      </div>


      {/* Affichage de la carte */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🗺️ Aperçu de la carte</h2>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Carte Interactive</h3>
          <DirectMap />
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Fonctionnalités:</strong> Interface de carte avec statistiques, zones d'activité, et contrôles interactifs
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">📝 Instructions</h2>
        <div className="space-y-3 text-yellow-700">
          <p><strong>1.</strong> Obtenez un token Mapbox gratuit sur <a href="https://mapbox.com" target="_blank" className="underline">mapbox.com</a></p>
          <p><strong>2.</strong> Remplacez le token dans le fichier <code className="bg-yellow-100 px-2 py-1 rounded">.env.local</code></p>
          <p><strong>3.</strong> Redémarrez le serveur avec <code className="bg-yellow-100 px-2 py-1 rounded">pnpm dev</code></p>
          <p><strong>4.</strong> Testez les différentes cartes ci-dessus</p>
        </div>
      </div>

      {/* Liens utiles */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🔗 Liens utiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="/admin/recommandations" 
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-blue-600">📊 Admin Dashboard</h3>
            <p className="text-sm text-gray-600">Tableau de bord avec cartes intégrées</p>
          </a>
          <a 
            href="/dashboard" 
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-green-600">🎯 Dashboard Principal</h3>
            <p className="text-sm text-gray-600">Page d'accueil du dashboard</p>
          </a>
        </div>
      </div>
    </div>
  );
}
