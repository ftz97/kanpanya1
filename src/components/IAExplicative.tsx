"use client";

export default function IAExplicative() {
  return (
    <section className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-amber-900 mb-3">🧠 IA Explicative</h2>
      <p className="text-gray-600 mb-4">Pourquoi les flux évoluent ainsi ?</p>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border-l-4 border-red-400">
          <h3 className="font-semibold text-gray-800 mb-2">⚠️ Facteurs de Réduction</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">⚠️</span>
              <span>Les flux diminuent le soir faute de transports publics</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">📉</span>
              <span>Le mardi est faible car seulement 30% des commerces sont ouverts</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">🚧</span>
              <span>Travaux en cours : -15% de trafic piétonnier</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
          <h3 className="font-semibold text-gray-800 mb-2">✅ Facteurs d&apos;Augmentation</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">🎯</span>
              <span>Événements locaux : +40% d&apos;affluence les weekends</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">🌤️</span>
              <span>Météo favorable : +25% de sorties en extérieur</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">📱</span>
              <span>Promotions ciblées : +18% de conversion</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-400">
          <h3 className="font-semibold text-gray-800 mb-2">🔍 Analyse Comportementale</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">👥</span>
              <span>Génération Z : préfère les commerces ouverts tard</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">🛒</span>
              <span>Comportement d&apos;achat : 67% décident sur place</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">📍</span>
              <span>Géolocalisation : 89% restent dans un rayon de 2km</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
          <h3 className="font-semibold text-purple-800 mb-2">💡 Recommandations IA</h3>
          <div className="text-sm space-y-1">
            <p className="text-purple-700">• Adapter les horaires aux transports publics</p>
            <p className="text-purple-700">• Cibler les commerces ouverts le mardi</p>
            <p className="text-purple-700">• Anticiper les événements locaux</p>
          </div>
        </div>
      </div>
    </section>
  );
}
