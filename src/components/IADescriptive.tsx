"use client";

export default function IADescriptive() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-3">📍 IA Descriptive</h2>
      <p className="text-gray-600 mb-4">Visualisez les flux et les heures creuses en temps réel.</p>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-400">
          <h3 className="font-semibold text-gray-800 mb-2">🔄 Flux de Clients</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="text-blue-500 mr-2">➡️</span>
              <span>40% des clients vont du Marché Central → Carrefour Market</span>
            </li>
            <li className="flex items-center">
              <span className="text-blue-500 mr-2">🔄</span>
              <span>67% flux principal : Centre-ville → Quartier résidentiel</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-orange-400">
          <h3 className="font-semibold text-gray-800 mb-2">⏰ Heures Creuses</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="text-orange-500 mr-2">🔥</span>
              <span>Mardi 14h-17h (-35% vs moyenne)</span>
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">📈</span>
              <span>Pic d&apos;affluence : Vendredi 18h-20h (+45% vs moyenne)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-purple-400">
          <h3 className="font-semibold text-gray-800 mb-2">📊 Métriques Temps Réel</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Clients actifs :</span>
              <span className="font-semibold text-purple-600 ml-2">1,247</span>
            </div>
            <div>
              <span className="text-gray-500">Dernière mise à jour :</span>
              <span className="font-semibold text-purple-600 ml-2">2 min</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
