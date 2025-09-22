"use client";

export default function IAPredictive() {
  return (
    <section className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-purple-900 mb-3">🔮 IA Prédictive</h2>
      <p className="text-gray-600 mb-4">Anticipez l'impact d'actions locales.</p>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-400">
          <h3 className="font-semibold text-gray-800 mb-2">📊 Prévisions Saisonnières</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">📊</span>
              <span>Prévision novembre : -10% trafic global (saisonnalité)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">❄️</span>
              <span>Décembre : +25% trafic (période de fêtes)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">🌸</span>
              <span>Mars : +15% trafic (retour du printemps)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
          <h3 className="font-semibold text-gray-800 mb-2">🎉 Scénarios d'Événements</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">🎉</span>
              <span>Événement jeudi soir → +18% trafic estimé</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">🏪</span>
              <span>Ouverture nouveau commerce → +12% flux local</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">🚇</span>
              <span>Extension métro → +35% accessibilité</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-orange-400">
          <h3 className="font-semibold text-gray-800 mb-2">⚠️ Risques Identifiés</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2 mt-1">⚠️</span>
              <span>Fermeture temporaire gare → -40% trafic</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2 mt-1">🌧️</span>
              <span>Météo défavorable → -20% sorties</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2 mt-1">🚧</span>
              <span>Travaux prolongés → -15% fréquentation</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
          <h3 className="font-semibold text-indigo-800 mb-2">🎯 Recommandations Prédictives</h3>
          <div className="text-sm space-y-1">
            <p className="text-indigo-700">• Programmer événements en période de faible trafic</p>
            <p className="text-indigo-700">• Anticiper les besoins en transport public</p>
            <p className="text-indigo-700">• Adapter l'offre commerciale aux prévisions</p>
          </div>
        </div>
      </div>
    </section>
  );
}
