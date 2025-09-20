"use client";

interface FluxData {
  id: string;
  from: string;
  to: string;
  percentage: number;
  clients: number;
  trend: 'up' | 'down' | 'stable';
}

export default function FluxTable() {
  const fluxData: FluxData[] = [
    {
      id: "1",
      from: "Marché Central",
      to: "Carrefour Market",
      percentage: 40,
      clients: 1247,
      trend: 'up'
    },
    {
      id: "2", 
      from: "Centre-ville",
      to: "Quartier résidentiel",
      percentage: 67,
      clients: 2103,
      trend: 'stable'
    },
    {
      id: "3",
      from: "Gare SNCF",
      to: "Centre commercial",
      percentage: 23,
      clients: 456,
      trend: 'down'
    },
    {
      id: "4",
      from: "Université",
      to: "Restauration rapide",
      percentage: 31,
      clients: 789,
      trend: 'up'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">🔄 Flux de Clients Détaillés</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 uppercase border-b">
              <th className="pb-3">Origine</th>
              <th className="pb-3">Destination</th>
              <th className="pb-3">Pourcentage</th>
              <th className="pb-3">Clients</th>
              <th className="pb-3">Tendance</th>
            </tr>
          </thead>
          <tbody>
            {fluxData.map((flux) => (
              <tr key={flux.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium">{flux.from}</td>
                <td className="py-3">{flux.to}</td>
                <td className="py-3">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${flux.percentage}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold">{flux.percentage}%</span>
                  </div>
                </td>
                <td className="py-3 font-semibold">{flux.clients.toLocaleString()}</td>
                <td className="py-3">
                  <span className={`flex items-center ${getTrendColor(flux.trend)}`}>
                    <span className="mr-1">{getTrendIcon(flux.trend)}</span>
                    <span className="capitalize">{flux.trend}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
