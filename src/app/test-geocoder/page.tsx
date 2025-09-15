import RealMapboxMap from '@/components/RealMapboxMap';

export default function TestGeocoderPage() {
  const handleSave = (points: any[]) => {
    console.log("💾 Points sauvegardés:", points);
    alert(`✅ ${points.length} points sauvegardés ! Vérifiez la console pour les détails.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🗺️ Test Carte Interactive avec Géocodeur + Sauvegarde
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Carte Interactive avec Lignes, Polygones et Sauvegarde</h2>
          <p className="text-gray-600 mb-4">
            Recherchez des adresses ou cliquez sur la carte pour ajouter des points. Le bouton "Enregistrer" apparaît quand vous avez des points !
          </p>
          <RealMapboxMap 
            height="600px"
            center={[-61.5314, 16.2412]} // Pointe-à-Pitre, Guadeloupe
            zoom={13}
            onSave={handleSave}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">🏝️ Martinique - Fort-de-France</h3>
            <RealMapboxMap 
              height="400px"
              center={[-61.0742, 14.6036]} // Fort-de-France
              zoom={14}
              onSave={(points) => console.log("Points Martinique:", points)}
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">🏙️ Paris</h3>
            <RealMapboxMap 
              height="400px"
              center={[2.3522, 48.8566]} // Paris
              zoom={13}
              onSave={(points) => console.log("Points Paris:", points)}
            />
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-green-800 mb-2">✅ Nouvelles Fonctionnalités :</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• <strong>Bouton "Enregistrer"</strong> - Sauvegarde tous les points sélectionnés</li>
            <li>• <strong>Géocodeur + Clic</strong> - Double méthode d'ajout de points</li>
            <li>• <strong>Ligne verte</strong> - Relie automatiquement tous les points (2+ points)</li>
            <li>• <strong>Polygone translucide</strong> - Zone verte fermée (3+ points)</li>
            <li>• <strong>Marqueurs bleus</strong> - Points visibles sur la carte</li>
            <li>• <strong>Callback onSave</strong> - Fonction appelée avec les données</li>
            <li>• <strong>Données JSON</strong> - Format structuré pour sauvegarde</li>
            <li>• <strong>Interface simplifiée</strong> - Plus d'interface complexe</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">🔍 Guide d'utilisation :</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>1. <strong>Recherchez une adresse</strong> dans la barre en haut à gauche</li>
            <li>2. <strong>Ou cliquez directement</strong> sur la carte pour ajouter un point</li>
            <li>3. <strong>Répétez</strong> pour ajouter plusieurs points</li>
            <li>4. <strong>Ligne verte</strong> apparaît dès le 2ème point</li>
            <li>5. <strong>Polygone vert</strong> se forme au 3ème point</li>
            <li>6. <strong>Cliquez sur "Enregistrer"</strong> pour sauvegarder</li>
            <li>7. <strong>Les données</strong> sont transmises via onSave</li>
            <li>8. <strong>Format JSON</strong> avec coordonnées et labels</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-purple-800 mb-2">🎯 Cas d'usage :</h3>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• <strong>Délimiter un quartier</strong> - Ajoutez 3+ points pour créer une zone</li>
            <li>• <strong>Tracer un itinéraire</strong> - Points reliés par une ligne verte</li>
            <li>• <strong>Marquer des lieux d'intérêt</strong> - Points bleus cliquables</li>
            <li>• <strong>Analyser une zone</strong> - Polygone translucide pour visualiser</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">💡 Exemples de recherche :</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-yellow-700">
            <div>
              <h4 className="font-semibold mb-1">🏝️ Antilles :</h4>
              <ul className="text-sm space-y-1">
                <li>• "Pointe-à-Pitre"</li>
                <li>• "Fort-de-France"</li>
                <li>• "Basse-Terre"</li>
                <li>• "Le Gosier"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-1">🏙️ France :</h4>
              <ul className="text-sm space-y-1">
                <li>• "Champs-Élysées"</li>
                <li>• "Tour Eiffel"</li>
                <li>• "Louvre"</li>
                <li>• "Montmartre"</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-1">🌍 Monde :</h4>
              <ul className="text-sm space-y-1">
                <li>• "Times Square"</li>
                <li>• "Big Ben"</li>
                <li>• "Sagrada Familia"</li>
                <li>• "Golden Gate"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
