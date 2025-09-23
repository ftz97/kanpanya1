"use client";

export default function IAProfessionnelle() {
  return (
    <div className="space-y-6">
      {/* IA Descriptive */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📍 IA Descriptive</h2>
        <p className="text-gray-600 mb-4">Analyse des performances commerciales et comportements clients.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">📊 Métriques Clés</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• CTR moyen : 3.2% (+15% vs mois dernier)</li>
              <li>• Conversion : 12.3% (objectif : 15%)</li>
              <li>• Panier moyen : 45€ (+8% vs moyenne)</li>
              <li>• Taux de fidélisation : 67%</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">🎯 Segmentation Client</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• 25-35 ans : 45% des clients</li>
              <li>• Urbains : 78% de la base</li>
              <li>• Revenus moyens : 65%</li>
              <li>• Mobile-first : 82% des interactions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* IA Explicative */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🧠 IA Explicative</h2>
        <p className="text-gray-600 mb-4">Pourquoi ces performances ? Analyse des causes racines.</p>
        <div className="space-y-4">
          <div className="border-l-4 border-orange-400 pl-4">
            <h3 className="font-semibold text-gray-800">📈 Facteurs de Croissance</h3>
            <p className="text-sm text-gray-600">Le CTR a augmenté de 15% grâce à l&apos;optimisation des horaires d&apos;envoi (18h-20h) et la personnalisation des titres selon les préférences client.</p>
          </div>
          <div className="border-l-4 border-red-400 pl-4">
            <h3 className="font-semibold text-gray-800">⚠️ Points d&apos;Amélioration</h3>
            <p className="text-sm text-gray-600">Le taux de conversion reste en dessous de l&apos;objectif à cause d&apos;un tunnel de conversion trop long et d&apos;un manque de social proof.</p>
          </div>
          <div className="border-l-4 border-blue-400 pl-4">
            <h3 className="font-semibold text-gray-800">💡 Insights Clés</h3>
            <p className="text-sm text-gray-600">Les clients 25-35 ans réagissent 3x mieux aux offres avec urgence (&quot;Dernière chance&quot;) et aux réductions supérieures à 30%.</p>
          </div>
        </div>
      </section>

      {/* IA Prédictive */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🔮 IA Prédictive</h2>
        <p className="text-gray-600 mb-4">Prévisions et recommandations stratégiques.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">📊 Prévisions</h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• +25% ventes en décembre</li>
              <li>• Pic : 15-20 décembre</li>
              <li>• Stock optimal : 120 unités</li>
              <li>• Prix optimal : -20%</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">🎯 Recommandations</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Lancer campagne Black Friday</li>
              <li>• Optimiser tunnel mobile</li>
              <li>• Ajouter avis clients</li>
              <li>• Créer programme fidélité</li>
            </ul>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-semibold text-indigo-900 mb-2">🚀 Scénarios</h3>
            <ul className="text-sm text-indigo-800 space-y-1">
              <li>• +30% si livraison gratuite</li>
              <li>• +15% si chat en direct</li>
              <li>• +20% si gamification</li>
              <li>• +10% si partenariats</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
