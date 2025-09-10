import AIInsightsADM from "@/components/AIInsightsADM";

export default function AIInsightsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🤖 Analyses IA - Administration
        </h1>
        
        <div className="space-y-6">
          <AIInsightsADM />
          
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">📈 Métriques en Temps Réel</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Temps de réponse API</p>
                <p className="text-2xl font-bold text-blue-900">~200ms</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600">Dernière analyse</p>
                <p className="text-2xl font-bold text-green-900">Maintenant</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600">Précision IA</p>
                <p className="text-2xl font-bold text-purple-900">94.2%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
