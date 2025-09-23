"use client";

export default function CollectivitePredictive() {
  return (
    <section className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-purple-900 mb-3">🔮 IA Prédictive - Collectivité</h2>
      <p className="text-gray-600 mb-4">Anticipez l&apos;impact des politiques publiques et événements territoriaux.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-400">
            <h3 className="font-semibold text-gray-800 mb-2">📊 Prévisions Saisonnières</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">📊</span>
                <span>Novembre : -10% trafic global (saisonnalité)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">❄️</span>
                <span>Décembre : +25% trafic (marchés de Noël)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">🌸</span>
                <span>Mars : +15% trafic (retour du printemps)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">☀️</span>
                <span>Juillet : +35% trafic (tourisme estival)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
            <h3 className="font-semibold text-gray-800 mb-2">🎉 Scénarios d&apos;Événements</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">🎉</span>
                <span>Événement jeudi soir → +18% trafic estimé</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">🏪</span>
                <span>Ouverture centre commercial → +40% flux local</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">🚇</span>
                <span>Extension métro → +35% accessibilité</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">🎪</span>
                <span>Festival municipal → +60% affluence</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-l-4 border-orange-400">
            <h3 className="font-semibold text-gray-800 mb-2">⚠️ Risques Territoriaux</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">⚠️</span>
                <span>Fermeture gare → -40% trafic intercommunal</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">🌧️</span>
                <span>Météo défavorable → -20% sorties</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">🚧</span>
                <span>Travaux prolongés → -15% fréquentation</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">🏢</span>
                <span>Fermeture entreprise → -25% flux professionnels</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border-l-4 border-purple-400">
            <h3 className="font-semibold text-gray-800 mb-2">🏛️ Impact Politiques Publiques</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">🚌</span>
                <span>Gratuité transports → +30% usage</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">🚶</span>
                <span>Piétonisation centre → +45% flux piétons</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">🏠</span>
                <span>Logements sociaux → +20% population locale</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">🌱</span>
                <span>Éco-quartier → +50% attractivité</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
            <h3 className="font-semibold text-indigo-800 mb-2">🎯 Recommandations Stratégiques</h3>
            <div className="text-sm space-y-1">
              <p className="text-indigo-700">• Programmer événements en période de faible trafic</p>
              <p className="text-indigo-700">• Anticiper les besoins en infrastructure</p>
              <p className="text-indigo-700">• Coordonner les politiques publiques</p>
              <p className="text-indigo-700">• Développer l&apos;attractivité territoriale</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
