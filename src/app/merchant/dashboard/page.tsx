"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MerchantStats {
  merchant_id: string;
  merchant_name: string;
  total_recommendations: number;
  total_clicks: number;
  total_impressions: number;
  avg_ctr: number;
  revenue_from_recommendations: number;
  new_customers: number;
  top_recommendation: string;
  monthly_trend: {
    month: string;
    clicks: number;
    revenue: number;
  }[];
}

interface RecommendationDetail {
  id: string;
  title: string;
  category: string;
  clicks: number;
  impressions: number;
  ctr: number;
  revenue_generated: number;
  is_sponsored: boolean;
  created_at: string;
}

export default function MerchantDashboardPage() {
  const [stats, setStats] = useState<MerchantStats | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  useEffect(() => {
    fetchMerchantStats();
  }, [selectedPeriod]);

  const fetchMerchantStats = async () => {
    try {
      // Simulation de données - à remplacer par un vrai appel API
      const mockStats: MerchantStats = {
        merchant_id: "merchant_123",
        merchant_name: "Pizzeria Bella Vista",
        total_recommendations: 12,
        total_clicks: 145,
        total_impressions: 3200,
        avg_ctr: 4.53,
        revenue_from_recommendations: 2340.50,
        new_customers: 23,
        top_recommendation: "Pizza Margherita -50%",
        monthly_trend: [
          { month: "Oct", clicks: 45, revenue: 890.20 },
          { month: "Nov", clicks: 67, revenue: 1234.80 },
          { month: "Déc", clicks: 89, revenue: 1567.30 },
          { month: "Jan", clicks: 145, revenue: 2340.50 }
        ]
      };

      const mockRecommendations: RecommendationDetail[] = [
        {
          id: "1",
          title: "Pizza Margherita -50%",
          category: "Restauration",
          clicks: 45,
          impressions: 1200,
          ctr: 3.75,
          revenue_generated: 890.20,
          is_sponsored: true,
          created_at: "2024-01-15"
        },
        {
          id: "2",
          title: "Menu Famille -30%",
          category: "Restauration", 
          clicks: 32,
          impressions: 800,
          ctr: 4.0,
          revenue_generated: 640.80,
          is_sponsored: false,
          created_at: "2024-01-10"
        },
        {
          id: "3",
          title: "Livraison Gratuite",
          category: "Restauration",
          clicks: 28,
          impressions: 600,
          ctr: 4.67,
          revenue_generated: 420.50,
          is_sponsored: false,
          created_at: "2024-01-05"
        }
      ];

      setStats(mockStats);
      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error("Erreur lors du chargement des stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🏪 Dashboard Commerçant
          </h1>
          <p className="text-gray-600">
            Bienvenue {stats.merchant_name} - Suivez vos performances
          </p>
        </div>

        {/* Période de sélection */}
        <div className="mb-6">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">1 an</option>
          </select>
        </div>

        {/* Stats Principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Visites via Recommandations</p>
                <p className="text-3xl font-bold text-[#17BFA0]">{stats.total_clicks}</p>
                <p className="text-xs text-gray-500 mt-1">
                  +{stats.monthly_trend[stats.monthly_trend.length - 1].clicks - stats.monthly_trend[stats.monthly_trend.length - 2].clicks} ce mois
                </p>
              </div>
              <div className="p-3 bg-[#17BFA0]/10 rounded-full">
                <span className="text-2xl">👆</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus Générés</p>
                <p className="text-3xl font-bold text-green-600">{stats.revenue_from_recommendations.toLocaleString()}€</p>
                <p className="text-xs text-gray-500 mt-1">
                  +{((stats.monthly_trend[stats.monthly_trend.length - 1].revenue - stats.monthly_trend[stats.monthly_trend.length - 2].revenue) / stats.monthly_trend[stats.monthly_trend.length - 2].revenue * 100).toFixed(1)}% vs mois dernier
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Nouveaux Clients</p>
                <p className="text-3xl font-bold text-blue-600">{stats.new_customers}</p>
                <p className="text-xs text-gray-500 mt-1">via recommandations</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taux de Clic</p>
                <p className="text-3xl font-bold text-orange-600">{stats.avg_ctr}%</p>
                <p className="text-xs text-gray-500 mt-1">moyenne</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Graphique de tendance */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📈 Évolution des Visites et Revenus
          </h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {stats.monthly_trend.map((month, index) => (
              <div key={month.month} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg relative">
                  <div 
                    className="bg-[#17BFA0] rounded-t-lg transition-all duration-500"
                    style={{ 
                      height: `${(month.clicks / Math.max(...stats.monthly_trend.map(m => m.clicks))) * 200}px` 
                    }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-600">{month.month}</div>
                <div className="text-xs text-gray-500">{month.clicks} clics</div>
                <div className="text-xs text-green-600 font-medium">{month.revenue.toFixed(0)}€</div>
              </div>
            ))}
          </div>
        </div>

        {/* Détail des Recommandations */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                🎯 Vos Recommandations Actives
              </h3>
              <button className="px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58d] transition-colors">
                + Nouvelle Recommandation
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recommandation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clics
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CTR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recommendations.map((rec, index) => (
                  <motion.tr
                    key={rec.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{rec.title}</div>
                      <div className="text-xs text-gray-500">Créé le {rec.created_at}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {rec.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{rec.clicks}</div>
                      <div className="text-xs text-gray-500">{rec.impressions} impressions</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        rec.ctr >= 4 ? 'bg-green-100 text-green-800' :
                        rec.ctr >= 3 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {rec.ctr}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">{rec.revenue_generated.toFixed(2)}€</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        rec.is_sponsored ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rec.is_sponsored ? '⭐ Sponsorisé' : '🆓 Gratuit'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-[#17BFA0] hover:text-[#14a58d]">
                          Modifier
                        </button>
                        {!rec.is_sponsored && (
                          <button className="text-purple-600 hover:text-purple-900">
                            Booster
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions Premium */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">⭐ Boostez vos Recommandations</h3>
              <p className="text-purple-100 mb-4">
                Passez en Premium pour augmenter votre visibilité et vos revenus
              </p>
              <div className="flex space-x-4 text-sm">
                <div className="flex items-center">
                  <span className="mr-2">🎯</span>
                  Placement prioritaire
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📊</span>
                  Analytics avancées
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🎨</span>
                  Personnalisation
                </div>
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Passer Premium - 29€/mois
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
