import RealMapboxMapClick from '@/components/RealMapboxMapClick';

export default function TestClicPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Test Carte avec Clic pour Ajouter des Points
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Carte Interactive avec Clic</h2>
          <p className="text-gray-600 mb-4">
            Activez le mode clic puis cliquez directement sur la carte pour ajouter des points !
          </p>
          <RealMapboxMapClick 
            height="600px"
            center={[-61.5314, 16.2412]} // Pointe-à-Pitre, Guadeloupe
            zoom={13}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">🏝️ Martinique - Fort-de-France</h3>
            <RealMapboxMapClick 
              height="400px"
              center={[-61.0742, 14.6036]} // Fort-de-France
              zoom={14}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">🏙️ Paris</h3>
            <RealMapboxMapClick 
              height="400px"
              center={[2.3522, 48.8566]} // Paris
              zoom={13}
            />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-green-800 mb-2">✅ Méthodes d'ajout de points :</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• <strong>Mode Clic</strong> - Activez le bouton "🖱️ Activer Mode Clic" puis cliquez sur la carte</li>
            <li>• <strong>Bouton Centre</strong> - Cliquez sur "📍 Ajouter au Centre" pour ajouter au centre de la vue</li>
            <li>• <strong>Précis</strong> - Choisissez exactement où vous voulez placer vos points</li>
            <li>• <strong>Intuitif</strong> - Interface simple et directe</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">🎯 Instructions :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>1. <strong>Activez le mode clic</strong> - Bouton "🖱️ Activer Mode Clic" (devient vert)</li>
            <li>2. <strong>Cliquez sur la carte</strong> - N'importe où pour ajouter un point</li>
            <li>3. <strong>Ou utilisez le bouton centre</strong> - "📍 Ajouter au Centre"</li>
            <li>4. <strong>Répétez</strong> pour ajouter plusieurs points</li>
            <li>5. <strong>Ligne verte</strong> apparaît dès le 2ème point</li>
            <li>6. <strong>Polygone vert</strong> se forme au 3ème point</li>
            <li>7. <strong>Désactivez le mode clic</strong> quand vous avez fini</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-purple-800 mb-2">🛠️ Fonctionnalités :</h3>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• <strong>Mode clic activé/désactivé</strong> - Bouton qui change de couleur</li>
            <li>• <strong>Ajout au centre</strong> - Bouton séparé pour ajouter au centre de la vue</li>
            <li>• <strong>Marqueurs bleus</strong> - Points visibles sur la carte</li>
            <li>• <strong>Ligne verte</strong> - Relie tous les points (2+ points)</li>
            <li>• <strong>Polygone translucide</strong> - Zone fermée (3+ points)</li>
            <li>• <strong>Liste interactive</strong> - Clic pour centrer, ✕ pour supprimer</li>
            <li>• <strong>Reset complet</strong> - "Tout effacer" pour recommencer</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">💡 Avantages :</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• <strong>Pas de dépendance externe</strong> - Fonctionne sans géocodeur</li>
            <li>• <strong>Précision maximale</strong> - Cliquez exactement où vous voulez</li>
            <li>• <strong>Interface claire</strong> - Mode clic activé/désactivé visible</li>
            <li>• <strong>Double option</strong> - Clic libre ou ajout au centre</li>
            <li>• <strong>Fiable</strong> - Pas de problème de réseau ou d'API</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
