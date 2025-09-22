import IADescriptive from "@/components/IADescriptive";
import AIInsightsADM from "@/components/AIInsightsADM";
import FluxTable from "@/components/FluxTable";

export default function IADescriptivePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🤖 Intelligence Artificielle Descriptive
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <IADescriptive />
          </div>
          
          <div>
            <AIInsightsADM />
          </div>
        </div>

        <div className="mt-8">
          <FluxTable />
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            📈 Tableau de Bord Temps Réel
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Flux Actifs</p>
                  <p className="text-2xl font-bold text-blue-900">12</p>
                </div>
                <div className="p-3 bg-blue-200 rounded-full">
                  <span className="text-2xl">🔄</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Heures Creuses</p>
                  <p className="text-2xl font-bold text-orange-900">3</p>
                </div>
                <div className="p-3 bg-orange-200 rounded-full">
                  <span className="text-2xl">⏰</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Efficacité</p>
                  <p className="text-2xl font-bold text-green-900">94%</p>
                </div>
                <div className="p-3 bg-green-200 rounded-full">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
