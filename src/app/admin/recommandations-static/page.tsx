import AIInsightsADM from "@/components/AIInsightsADM";
import IADescriptive from "@/components/IADescriptive";
import IAExplicative from "@/components/IAExplicative";
import IAPredictive from "@/components/IAPredictive";

export default function AdminRecommendationsStaticPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          📊 Gestion des Recommandations
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Recommandations</p>
                <p className="text-3xl font-bold text-blue-600">156</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clics</p>
                <p className="text-3xl font-bold text-green-600">2,340</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">👆</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CTR Moyen</p>
                <p className="text-3xl font-bold text-purple-600">3.2%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Commerces Actifs</p>
                <p className="text-3xl font-bold text-orange-600">89</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <span className="text-2xl">🏪</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-6">
          <AIInsightsADM />
          <IADescriptive />
          <IAExplicative />
          <IAPredictive />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            📋 Liste des Recommandations
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 uppercase border-b">
                  <th className="pb-3">Titre</th>
                  <th className="pb-3">Commerce</th>
                  <th className="pb-3">Catégorie</th>
                  <th className="pb-3">Clics</th>
                  <th className="pb-3">CTR</th>
                  <th className="pb-3">Statut</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Pizza Margherita -50%</td>
                  <td className="py-3">Pizzeria Mario</td>
                  <td className="py-3">Restauration</td>
                  <td className="py-3">45</td>
                  <td className="py-3">4.2%</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Actif
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">
                      Modifier
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Désactiver
                    </button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Coupe de cheveux -30%</td>
                  <td className="py-3">Salon Élégance</td>
                  <td className="py-3">Beauté</td>
                  <td className="py-3">32</td>
                  <td className="py-3">2.8%</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Actif
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">
                      Modifier
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Désactiver
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
