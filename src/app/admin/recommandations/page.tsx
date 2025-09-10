"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface RecommendationStats {
  id: string;
  title: string;
  clicks: number;
  impressions: number;
  ctr: number; // Click Through Rate
  category: string;
  merchant_name: string;
  is_active: boolean;
  quality_score: number;
  last_updated: string;
}

interface OverallStats {
  total_recommendations: number;
  total_clicks: number;
  avg_ctr: number;
  top_category: string;
  active_merchants: number;
  total_clients_via_reco: number;
  monthly_clients_via_reco: number;
}

export default function AdminRecommendationsPage() {
  const [recommendations, setRecommendations] = useState<RecommendationStats[]>([]);
  const [overallStats, setOverallStats] = useState<OverallStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRecommendationStats();
  }, []);

  const fetchRecommendationStats = async () => {
    try {
      // Simulation de données - à remplacer par un vrai appel API
      const mockData = {
        recommendations: [
          {
            id: "1",
            title: "Pizza Margherita -50%",
            clicks: 45,
            impressions: 1200,
            ctr: 3.75,
            category: "Restauration",
            merchant_name: "Pizzeria Bella Vista",
            is_active: true,
            quality_score: 8.5,
            last_updated: "2024-01-15"
          },
          {
            id: "2", 
            title: "Coiffure + Manucure",
            clicks: 23,
            impressions: 800,
            ctr: 2.88,
            category: "Beauté",
            merchant_name: "Salon Élégance",
            is_active: true,
            quality_score: 7.2,
            last_updated: "2024-01-14"
          },
          {
            id: "3",
            title: "Vêtements Hiver -30%",
            clicks: 12,
            impressions: 600,
            ctr: 2.0,
            category: "Mode",
            merchant_name: "Boutique Chic",
            is_active: false,
            quality_score: 6.8,
            last_updated: "2024-01-10"
          }
        ],
        overallStats: {
          total_recommendations: 156,
          total_clicks: 2340,
          avg_ctr: 3.2,
          top_category: "Restauration",
          active_merchants: 89,
          total_clients_via_reco: 128,
          monthly_clients_via_reco: 34
        }
      };

      setRecommendations(mockData.recommendations);
      setOverallStats(mockData.overallStats);
    } catch (error) {
      console.error("Erreur lors du chargement des stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecommendations = recommendations.filter(rec => {
    const matchesCategory = selectedCategory === "all" || rec.category === selectedCategory;
    const matchesSearch = rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rec.merchant_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["all", ...Array.from(new Set(recommendations.map(r => r.category)))];

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📊 Gestion des Recommandations
          </h1>
          <p className="text-gray-600">
            Suivez les performances et gérez la qualité des recommandations
          </p>
        </div>

        {/* Stats Globales */}
        {overallStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Recommandations</p>
                  <p className="text-3xl font-bold text-[#17BFA0]">{overallStats.total_recommendations}</p>
                </div>
                <div className="p-3 bg-[#17BFA0]/10 rounded-full">
                  <span className="text-2xl">🎯</span>
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
                  <p className="text-sm font-medium text-gray-600">Total Clics</p>
                  <p className="text-3xl font-bold text-blue-600">{overallStats.total_clicks.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <span className="text-2xl">👆</span>
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
                  <p className="text-sm font-medium text-gray-600">CTR Moyen</p>
                  <p className="text-3xl font-bold text-orange-600">{overallStats.avg_ctr}%</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <span className="text-2xl">📈</span>
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
                  <p className="text-sm font-medium text-gray-600">Commerçants Actifs</p>
                  <p className="text-3xl font-bold text-purple-600">{overallStats.active_merchants}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <span className="text-2xl">🏪</span>
                </div>
              </div>
            </motion.div>

            {/* Nouveaux KPIs : Conversions via Recommandations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clients via Recommandations</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {overallStats?.total_clients_via_reco ?? 0}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-full">
                  <span className="text-2xl">🌟</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clients via Reco (mois en cours)</p>
                  <p className="text-3xl font-bold text-teal-600">
                    {overallStats?.monthly_clients_via_reco ?? 0}
                  </p>
                </div>
                <div className="p-3 bg-teal-100 rounded-full">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Filtres */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Rechercher par titre ou commerçant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Toutes les catégories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tableau des Recommandations */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Détail des Recommandations ({filteredRecommendations.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recommandation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commerçant
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
                    Qualité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecommendations.map((rec, index) => (
                  <motion.tr
                    key={rec.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{rec.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{rec.merchant_name}</div>
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
                        rec.ctr >= 3 ? 'bg-green-100 text-green-800' :
                        rec.ctr >= 2 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {rec.ctr}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              rec.quality_score >= 8 ? 'bg-green-500' :
                              rec.quality_score >= 6 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${(rec.quality_score / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{rec.quality_score}/10</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        rec.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {rec.is_active ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-[#17BFA0] hover:text-[#14a58d]">
                          Modifier
                        </button>
                        <button className={`${
                          rec.is_active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                        }`}>
                          {rec.is_active ? 'Désactiver' : 'Activer'}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions de Modération */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🛡️ Actions de Modération
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#17BFA0] hover:bg-[#17BFA0]/5 transition-colors">
              <div className="text-center">
                <span className="text-2xl mb-2 block">🚫</span>
                <p className="font-medium">Modérer un commerce</p>
                <p className="text-sm text-gray-500">Retirer de la recommandation</p>
              </div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#17BFA0] hover:bg-[#17BFA0]/5 transition-colors">
              <div className="text-center">
                <span className="text-2xl mb-2 block">⭐</span>
                <p className="font-medium">Booster une recommandation</p>
                <p className="text-sm text-gray-500">Placement sponsorisé</p>
              </div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#17BFA0] hover:bg-[#17BFA0]/5 transition-colors">
              <div className="text-center">
                <span className="text-2xl mb-2 block">📊</span>
                <p className="font-medium">Rapport qualité</p>
                <p className="text-sm text-gray-500">Analyser les performances</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
