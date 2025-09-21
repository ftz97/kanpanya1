"use client";

import { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

interface AnalysisData {
  zone_name: string;
  overall_score: number;
  demographic: unknown;
  commercial: unknown;
  traffic: unknown;
  environmental: unknown;
  social: unknown;
  recommendations: string[];
  summary: unknown;
}

interface ZoneAnalysisDashboardProps {
  zoneData: unknown;
  onClose: () => void;
}

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function ZoneAnalysisDashboard({ zoneData, onClose }: ZoneAnalysisDashboardProps) {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (zoneData) {
      analyzeZone();
    }
  }, [zoneData]);

  const analyzeZone = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/zones/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          geometry: zoneData.feature,
          name: zoneData.name
        }),
      });

      const result = await response.json();

      if (result.success) {
        setAnalysis(result.analysis);
        // Sauvegarder l'analyse
        await saveAnalysis(result.analysis);
      } else {
        setError(result.error || 'Erreur lors de l\'analyse');
      }
    } catch (err) {
      setError('Erreur de connexion');
      console.error('Erreur analyse:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveAnalysis = async (analysisData: AnalysisData) => {
    try {
      await fetch('/api/zones/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: analysisData.zone_name,
          geometry: zoneData.feature,
          municipality: 'Martinique',
          analysis_data: analysisData
        }),
      });
    } catch (err) {
      console.error('Erreur sauvegarde:', err);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyse en cours...</h3>
            <p className="text-gray-600">Analyse des données urbaines de "{zoneData?.name}"</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-4xl mb-4">❌</div>
            <h3 className="text-lg font-semibold text-red-700 mb-2">Erreur d&apos;analyse</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  // Préparer les données pour les graphiques
  const demographicData = [
    { age: '0-17', value: analysis.demographic.population.age_groups['0-17'] },
    { age: '18-35', value: analysis.demographic.population.age_groups['18-35'] },
    { age: '36-55', value: analysis.demographic.population.age_groups['36-55'] },
    { age: '55+', value: analysis.demographic.population.age_groups['55+'] }
  ];

  const commercialData = [
    { category: 'Commerce', value: analysis.commercial.businesses.categories['Commerce de proximité'] },
    { category: 'Restaurants', value: analysis.commercial.businesses.categories['Restaurants'] },
    { category: 'Services', value: analysis.commercial.businesses.categories['Services'] },
    { category: 'Santé', value: analysis.commercial.businesses.categories['Santé'] },
    { category: 'Éducation', value: analysis.commercial.businesses.categories['Éducation'] }
  ];

  const radarData = [
    { subject: 'Démographie', A: analysis.demographic.population.density / 2 },
    { subject: 'Commerce', A: analysis.commercial.businesses.economic_impact.Attractivité },
    { subject: 'Trafic', A: analysis.traffic.pedestrian_traffic.Accessibilité },
    { subject: 'Environnement', A: analysis.environmental.green_spaces['Qualité de l\'air'] },
    { subject: 'Social', A: analysis.social.community['Cohésion sociale'] }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">📊 Analyse Urbaine</h2>
              <p className="text-blue-100">Zone: {analysis.zone_name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">{analysis.overall_score}/100</div>
              <div>
                <div className="text-sm text-blue-100">Score Global</div>
                <div className="w-32 bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full" 
                    style={{ width: `${analysis.overall_score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6 space-y-6">
          {/* Graphiques principaux */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Démographie */}
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-3 text-gray-800">👥 Démographie</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Population totale:</span>
                  <span className="font-medium">{analysis.demographic.population.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Densité:</span>
                  <span className="font-medium">{analysis.demographic.population.density} hab/km²</span>
                </div>
              </div>
              <div className="h-48 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={demographicData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Commerce */}
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold mb-3 text-gray-800">🏪 Commerce</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Entreprises:</span>
                  <span className="font-medium">{analysis.commercial.businesses.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>CA estimé:</span>
                  <span className="font-medium">{(analysis.commercial.businesses.economic_impact['Chiffre d\'affaires estimé'] / 1000000).toFixed(1)}M€</span>
                </div>
              </div>
              <div className="h-48 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={commercialData} dataKey="value" outerRadius={80} label>
                      {commercialData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold mb-3 text-gray-800">📈 Analyse Multidimensionnelle</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Score" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommandations */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold mb-3 text-green-800">💡 Recommandations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-700 mb-2">Points forts</h4>
                <ul className="text-sm text-green-600 space-y-1">
                  {analysis.summary['Points forts'].map((point: string, index: number) => (
                    <li key={index}>• {point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-700 mb-2">Améliorations</h4>
                <ul className="text-sm text-green-600 space-y-1">
                  {analysis.summary['Points d\'amélioration'].map((point: string, index: number) => (
                    <li key={index}>• {point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Détails par catégorie */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">🚗 Trafic</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Véhicules/jour: {analysis.traffic.vehicular_traffic['Trafic moyen/jour'].toLocaleString()}</div>
                <div>Piétons/jour: {analysis.traffic.pedestrian_traffic['Piétons/jour'].toLocaleString()}</div>
                <div>Congestion: {analysis.traffic.vehicular_traffic.Congestion}%</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">🌱 Environnement</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Espaces verts: {analysis.environmental.green_spaces['Espaces verts (%)']}%</div>
                <div>Qualité air: {analysis.environmental.green_spaces['Qualité de l\'air']}/100</div>
                <div>Éclairage: {analysis.environmental.infrastructure['Éclairage public']}%</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">🤝 Social</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Événements/an: {analysis.social.community['Événements communautaires/an']}</div>
                <div>Associations: {analysis.social.community.Associations}</div>
                <div>Cohésion: {analysis.social.community['Cohésion sociale']}/100</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
