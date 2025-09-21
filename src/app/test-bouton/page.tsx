import RealMapboxMap from '@/components/RealMapboxMap';

export default function TestBoutonPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Test Carte avec Bouton d&apos;Ajout
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Carte avec Bouton &quot;Ajouter Point&quot;</h2>
          <p className="text-gray-600 mb-4">
            Utilisez le bouton bleu &quot;📍 Ajouter Point&quot; en haut à droite pour ajouter des points au centre de la carte !
          </p>
          <RealMapboxMap 
            height="600px"
            center={[-61.5314, 16.2412]} // Pointe-à-Pitre, Guadeloupe
            zoom={13}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">🏝️ Martinique - Fort-de-France</h3>
            <RealMapboxMap 
              height="400px"
              center={[-61.0742, 14.6036]} // Fort-de-France
              zoom={14}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">🏙️ Paris</h3>
            <RealMapboxMap 
              height="400px"
              center={[2.3522, 48.8566]} // Paris
              zoom={13}
            />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-green-800 mb-2">✅ Comment utiliser :</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• <strong>Naviguez</strong> sur la carte pour choisir une zone</li>
            <li>• <strong>Cliquez sur &quot;📍 Ajouter Point&quot;</strong> en haut à droite</li>
            <li>• <strong>Un marqueur bleu</strong> apparaît au centre de la carte</li>
            <li>• <strong>Répétez</strong> pour ajouter plusieurs points</li>
            <li>• <strong>Ligne verte</strong> apparaît dès le 2ème point</li>
            <li>• <strong>Polygone vert</strong> se forme au 3ème point</li>
            <li>• <strong>Cliquez sur ✕</strong> pour supprimer un point</li>
            <li>• <strong>&quot;Tout effacer&quot;</strong> pour recommencer</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">🎯 Avantages de cette méthode :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Simple et direct</strong> - Un clic pour ajouter un point</li>
            <li>• <strong>Pas de dépendance</strong> - Fonctionne sans géocodeur</li>
            <li>• <strong>Précis</strong> - Ajoute exactement au centre de la vue</li>
            <li>• <strong>Rapide</strong> - Idéal pour marquer des zones rapidement</li>
            <li>• <strong>Fiable</strong> - Pas de problème de réseau ou d&apos;API</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">💡 Cas d&apos;usage :</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• <strong>Délimiter une zone</strong> - Ajoutez 3+ points pour créer un polygone</li>
            <li>• <strong>Marquer des lieux</strong> - Points de repère visuels</li>
            <li>• <strong>Créer un itinéraire</strong> - Points reliés par une ligne</li>
            <li>• <strong>Analyser une zone</strong> - Polygone translucide pour visualiser</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
