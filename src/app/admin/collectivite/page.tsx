"use client";
import CollectiviteDescriptive from "@/components/CollectiviteDescriptive";
import CollectiviteExplicative from "@/components/CollectiviteExplicative";
import CollectivitePredictive from "@/components/CollectivitePredictive";

export default function CollectiviteDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🏙️ Tableau de bord Collectivité</h1>
          <p className="text-gray-600 text-lg">
            Analyse IA des flux commerciaux et scénarios d'impact pour votre territoire
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">IA Descriptive</h3>
            <p className="text-sm text-gray-600">Analyse des flux actuels</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">🧠</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">IA Explicative</h3>
            <p className="text-sm text-gray-600">Comprendre les causes</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">🔮</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">IA Prédictive</h3>
            <p className="text-sm text-gray-600">Anticiper les impacts</p>
          </div>
        </div>

        <CollectiviteDescriptive />
        <CollectiviteExplicative />
        <CollectivitePredictive />

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📈 Métriques Territoriales</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">2,847</div>
              <div className="text-sm text-gray-600">Visiteurs/jour</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">156</div>
              <div className="text-sm text-gray-600">Commerces actifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">47 min</div>
              <div className="text-sm text-gray-600">Temps moyen</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">4.2/5</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
