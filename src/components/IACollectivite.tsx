"use client";

export default function IACollectivite() {
  return (
    <div className="space-y-6">
      {/* Flux et Heatmaps */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🗺️ Flux et Heatmaps</h2>
        <p className="text-gray-600 mb-4">Visualisation des flux de circulation et zones d'activité.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3">📍 Flux Principaux</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Centre-ville → Quartier Nord</span>
                <span className="font-semibold text-blue-600">67%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '67%'}}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Gare → Centre commercial</span>
                <span className="font-semibold text-blue-600">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Zone résidentielle → Marché</span>
                <span className="font-semibold text-blue-600">32%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '32%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-3">🔥 Zones Chaudes</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Place du Marché (8h-12h)</span>
                <span className="font-semibold text-red-600">Très élevé</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Avenue Centrale (18h-20h)</span>
                <span className="font-semibold text-orange-600">Élevé</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Parc Municipal (14h-16h)</span>
                <span className="font-semibold text-yellow-600">Moyen</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Zone Industrielle</span>
                <span className="font-semibold text-gray-600">Faible</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulations */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🎮 Simulations</h2>
        <p className="text-gray-600 mb-4">Testez l'impact de vos décisions sur les flux urbains.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">🚌 Nouvelle Ligne de Bus</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Impact sur flux :</span>
                <span className="text-green-600 font-semibold">+25%</span>
              </div>
              <div className="flex justify-between">
                <span>Coût estimé :</span>
                <span className="text-gray-600">150k€/an</span>
              </div>
              <div className="flex justify-between">
                <span>ROI attendu :</span>
                <span className="text-blue-600 font-semibold">3.2 ans</span>
              </div>
              <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                Lancer Simulation
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">🚧 Fermeture Rue Centrale</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Impact sur flux :</span>
                <span className="text-red-600 font-semibold">-35%</span>
              </div>
              <div className="flex justify-between">
                <span>Durée :</span>
                <span className="text-gray-600">6 mois</span>
              </div>
              <div className="flex justify-between">
                <span>Déviation :</span>
                <span className="text-orange-600 font-semibold">+15% autres rues</span>
              </div>
              <button className="w-full mt-3 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
                Simuler Impact
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Analyses Territoriales */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🏙️ Analyses Territoriales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">👥 Démographie</h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Population : 45,000 hab</li>
              <li>• Densité : 2,300 hab/km²</li>
              <li>• Âge moyen : 42 ans</li>
              <li>• Croissance : +2.1%/an</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">🏪 Économie</h3>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Commerces : 156 unités</li>
              <li>• Taux de vacance : 8%</li>
              <li>• CA moyen : 180k€/an</li>
              <li>• Emplois créés : +12%</li>
            </ul>
          </div>
          
          <div className="bg-teal-50 p-4 rounded-lg">
            <h3 className="font-semibold text-teal-900 mb-2">🌱 Environnement</h3>
            <ul className="text-sm text-teal-800 space-y-1">
              <li>• Espaces verts : 23%</li>
              <li>• Qualité air : Bonne</li>
              <li>• Transports verts : 45%</li>
              <li>• Émissions : -15%</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
