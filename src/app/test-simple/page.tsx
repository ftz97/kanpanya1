"use client";

export default function TestSimplePage() {
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        🗺️ Test Simple - Cartes
      </h1>

      {/* Vérification du token Mapbox */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">🔑 Configuration Mapbox</h2>
        <p className="text-sm text-gray-600">
          Token Mapbox: {MAPBOX_TOKEN ? "✅ Configuré" : "❌ Manquant"}
        </p>
        {MAPBOX_TOKEN && (
          <p className="text-xs text-gray-500 mt-1">
            Token: {MAPBOX_TOKEN.substring(0, 20)}...
          </p>
        )}
        {!MAPBOX_TOKEN && (
          <div className="mt-2 p-3 bg-red-100 border border-red-300 rounded">
            <p className="text-red-700 text-sm">
              ⚠️ Ajoutez NEXT_PUBLIC_MAPBOX_TOKEN dans votre fichier .env.local
            </p>
          </div>
        )}
      </div>

      {/* Test de base */}
      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">✅ Test de fonctionnement</h2>
        <p className="text-gray-600 mb-4">
          Cette page fonctionne correctement. Si vous voyez ce message, 
          votre application Next.js est opérationnelle.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-semibold text-green-800">✅ Serveur</h3>
            <p className="text-sm text-green-600">Next.js fonctionne</p>
          </div>
          
          <div className={`p-4 border rounded ${
            MAPBOX_TOKEN 
              ? 'bg-green-50 border-green-200' 
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <h3 className={`font-semibold ${
              MAPBOX_TOKEN ? 'text-green-800' : 'text-yellow-800'
            }`}>
              {MAPBOX_TOKEN ? '✅' : '⚠️'} Mapbox
            </h3>
            <p className={`text-sm ${
              MAPBOX_TOKEN ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {MAPBOX_TOKEN ? 'Token configuré' : 'Token manquant'}
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 p-6 rounded">
        <h2 className="text-lg font-semibold mb-3">📋 Prochaines étapes</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
          <li>Configurez votre token Mapbox dans .env.local</li>
          <li>Redémarrez le serveur avec <code className="bg-gray-200 px-1 rounded">pnpm dev</code></li>
          <li>Testez les composants de carte interactifs</li>
        </ol>
      </div>
    </div>
  );
}