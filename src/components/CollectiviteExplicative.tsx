"use client";

export default function CollectiviteExplicative() {
  return (
    <section className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-amber-900 mb-3">🧠 IA Explicative - Collectivité</h2>
      <p className="text-gray-600 mb-4">Comprendre les dynamiques territoriales et leurs causes.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-l-4 border-red-400">
            <h3 className="font-semibold text-gray-800 mb-2">⚠️ Facteurs de Réduction</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">🚌</span>
                <span>Transports publics insuffisants le soir (-40% après 20h)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">🏪</span>
                <span>Fermeture mardi : 70% des commerces fermés</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">🚧</span>
                <span>Travaux infrastructure : -25% accessibilité</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">🌧️</span>
                <span>Météo défavorable : -30% sorties piétonnes</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
            <h3 className="font-semibold text-gray-800 mb-2">✅ Facteurs d'Augmentation</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">🎉</span>
                <span>Événements municipaux : +60% affluence</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">🚇</span>
                <span>Nouvelle ligne métro : +35% accessibilité</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">🏢</span>
                <span>Zones d'activité : +45% flux professionnels</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">🎓</span>
                <span>Université : +25% flux étudiants</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-400">
            <h3 className="font-semibold text-gray-800 mb-2">🔍 Analyse Démographique</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">👥</span>
                <span>Génération Z : 40% des déplacements, préfère le soir</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">👨‍👩‍👧‍👦</span>
                <span>Familles : 35% des flux, privilégient le weekend</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">👴</span>
                <span>Seniors : 25% des flux, préfèrent les heures creuses</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-4 border-l-4 border-purple-400">
            <h3 className="font-semibold text-gray-800 mb-2">🏛️ Impact Politique</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">📋</span>
                <span>Plan de circulation : +15% fluidité</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">🌳</span>
                <span>Espaces verts : +20% fréquentation</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2 mt-1">🏗️</span>
                <span>Rénovation urbaine : +30% attractivité</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
            <h3 className="font-semibold text-indigo-800 mb-2">💡 Recommandations Territoriales</h3>
            <div className="text-sm space-y-1">
              <p className="text-indigo-700">• Étendre les horaires de transport public</p>
              <p className="text-indigo-700">• Coordonner les fermetures commerciales</p>
              <p className="text-indigo-700">• Planifier les travaux hors périodes critiques</p>
              <p className="text-indigo-700">• Développer les événements municipaux</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
