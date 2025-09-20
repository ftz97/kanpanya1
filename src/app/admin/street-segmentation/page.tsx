"use client";

import { useState } from 'react';
import StreetSegmentationMap from '@/components/StreetSegmentationMap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface StreetSegment {
  id: string;
  name: string;
  coordinates: [number, number][];
  type: 'commercial' | 'residential' | 'mixed' | 'industrial';
  population?: number;
  businesses?: number;
  footTraffic?: number;
  color: string;
}

export default function StreetSegmentationPage() {
  const [activeTab, setActiveTab] = useState<'map' | 'analytics' | 'zones'>('map');
  const [selectedSegment, setSelectedSegment] = useState<StreetSegment | null>(null);

  // Données de démonstration pour les collectivités
  const segments: StreetSegment[] = [
    {
      id: 'rue-commerciale-1',
      name: 'Rue de Rivoli',
      coordinates: [[2.3522, 48.8566], [2.3622, 48.8576], [2.3722, 48.8586]],
      type: 'commercial',
      population: 2500,
      businesses: 45,
      footTraffic: 8500,
      color: '#3b82f6'
    },
    {
      id: 'rue-residentielle-1',
      name: 'Rue de la Paix',
      coordinates: [[2.3322, 48.8666], [2.3422, 48.8676], [2.3522, 48.8686]],
      type: 'residential',
      population: 1800,
      businesses: 12,
      footTraffic: 3200,
      color: '#22c55e'
    },
    {
      id: 'rue-mixte-1',
      name: 'Boulevard Saint-Germain',
      coordinates: [[2.3422, 48.8466], [2.3522, 48.8476], [2.3622, 48.8486]],
      type: 'mixed',
      population: 3200,
      businesses: 28,
      footTraffic: 6200,
      color: '#f59e0b'
    },
    {
      id: 'rue-commerciale-2',
      name: 'Rue du Faubourg Saint-Antoine',
      coordinates: [[2.3722, 48.8566], [2.3822, 48.8576], [2.3922, 48.8586]],
      type: 'commercial',
      population: 2100,
      businesses: 38,
      footTraffic: 7200,
      color: '#3b82f6'
    },
    {
      id: 'rue-residentielle-2',
      name: 'Rue de Charonne',
      coordinates: [[2.3822, 48.8666], [2.3922, 48.8676], [2.4022, 48.8686]],
      type: 'residential',
      population: 2200,
      businesses: 15,
      footTraffic: 2800,
      color: '#22c55e'
    }
  ];

  // Données pour les graphiques
  const trafficData = segments.map(segment => ({
    name: segment.name,
    footTraffic: segment.footTraffic,
    population: segment.population,
    businesses: segment.businesses
  }));

  const typeDistribution = segments.reduce((acc, segment) => {
    acc[segment.type] = (acc[segment.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(typeDistribution).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    color: segments.find(s => s.type === type)?.color || '#6b7280'
  }));

  const handleSegmentClick = (segment: StreetSegment) => {
    setSelectedSegment(segment);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🗺️ Segmentation des Rues - Collectivités
          </h1>
          <p className="text-gray-600">
            Analyse géographique et segmentation des rues pour l'étude urbaine et la planification territoriale
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'map', label: '🗺️ Carte Interactive', icon: '🗺️' },
              { id: 'analytics', label: '📊 Analytics', icon: '📊' },
              { id: 'zones', label: '🏘️ Zones', icon: '🏘️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Carte de Segmentation des Rues</h2>
              <StreetSegmentationMap 
                height="600px"
                segments={segments}
                onSegmentClick={handleSegmentClick}
              />
            </div>

            {selectedSegment && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Détails du Segment: {selectedSegment.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">👥 Population</h4>
                    <p className="text-2xl font-bold text-blue-600">{selectedSegment.population?.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">🏪 Commerces</h4>
                    <p className="text-2xl font-bold text-green-600">{selectedSegment.businesses}</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">🚶 Trafic Piéton</h4>
                    <p className="text-2xl font-bold text-yellow-600">{selectedSegment.footTraffic?.toLocaleString()}/jour</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Graphique du trafic piéton */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Trafic Piéton par Rue</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="footTraffic" fill="#3b82f6" name="Trafic piéton/jour" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Distribution des types */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Distribution des Types de Rues</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tableau de données */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Données Détaillées par Rue</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Population
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commerces
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trafic Piéton
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {segments.map((segment) => (
                      <tr key={segment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {segment.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            segment.type === 'commercial' ? 'bg-blue-100 text-blue-800' :
                            segment.type === 'residential' ? 'bg-green-100 text-green-800' :
                            segment.type === 'mixed' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {segment.type.charAt(0).toUpperCase() + segment.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {segment.population?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {segment.businesses}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {segment.footTraffic?.toLocaleString()}/jour
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'zones' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Gestion des Zones de Segmentation</h3>
              <p className="text-gray-600 mb-6">
                Configurez et gérez les zones de segmentation pour l'analyse urbaine et la planification territoriale.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {segments.map((segment) => (
                  <div key={segment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{segment.name}</h4>
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: segment.color }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 capitalize">{segment.type}</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Population:</span>
                        <span className="font-medium">{segment.population?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Commerces:</span>
                        <span className="font-medium">{segment.businesses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trafic:</span>
                        <span className="font-medium">{segment.footTraffic?.toLocaleString()}/jour</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                      Modifier la Zone
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Actions de Segmentation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition">
                  <div className="text-center">
                    <div className="text-2xl mb-2">➕</div>
                    <h4 className="font-medium">Ajouter une Zone</h4>
                    <p className="text-sm text-gray-600">Créer une nouvelle zone de segmentation</p>
                  </div>
                </button>
                <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <h4 className="font-medium">Exporter les Données</h4>
                    <p className="text-sm text-gray-600">Exporter les données de segmentation</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
