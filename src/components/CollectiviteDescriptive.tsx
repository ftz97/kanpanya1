"use client";

export default function CollectiviteDescriptive() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-3">📍 IA Descriptive - Collectivité</h2>
      <p className="text-gray-600 mb-4">Analyse des flux commerciaux de votre territoire en temps réel.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-400">
          <h3 className="font-semibold text-gray-800 mb-3">🔄 Flux Territoriaux</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="text-blue-500 mr-2">➡️</span>
              <span>45% des déplacements : Centre-ville → Quartiers</span>
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 mr-2">🔄</span>
              <span>32% flux inter-quartiers (résidentiel ↔ commercial)</span>
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 mr-2">🚇</span>
              <span>23% flux externes (communes limitrophes)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
          <h3 className="font-semibold text-gray-800 mb-3">⏰ Patterns Temporels</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">📈</span>
              <span>Pic d'activité : Vendredi 17h-19h (+45%)</span>
            </li>
            <li className="flex items-center">
              <span className="text-orange-500 mr-2">📉</span>
              <span>Heures creuses : Mardi 14h-16h (-35%)</span>
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 mr-2">🌅</span>
              <span>Activité matinale : 8h-10h (+20%)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-purple-400">
          <h3 className="font-semibold text-gray-800 mb-3">🏪 Répartition Commerciale</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="text-purple-500 mr-2">🛒</span>
              <span>Restauration : 35% du trafic commercial</span>
            </li>
            <li className="flex items-center">
              <span className="text-purple-500 mr-2">👕</span>
              <span>Mode & Beauté : 28% du trafic</span>
            </li>
            <li className="flex items-center">
              <span className="text-purple-500 mr-2">🏠</span>
              <span>Services : 37% du trafic</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-orange-400">
          <h3 className="font-semibold text-gray-800 mb-3">📊 Métriques Clés</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Visiteurs/jour :</span>
              <span className="font-semibold text-orange-600 ml-2">2,847</span>
            </div>
            <div>
              <span className="text-gray-500">Commerces actifs :</span>
              <span className="font-semibold text-orange-600 ml-2">156</span>
            </div>
            <div>
              <span className="text-gray-500">Temps moyen :</span>
              <span className="font-semibold text-orange-600 ml-2">47 min</span>
            </div>
            <div>
              <span className="text-gray-500">Satisfaction :</span>
              <span className="font-semibold text-orange-600 ml-2">4.2/5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
