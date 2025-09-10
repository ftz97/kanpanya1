"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface RecommendationStats {
  id: string;
  title: string;
  clicks: number;
  impressions: number;
  ctr: number;
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

export default function AdminRecommendationsFixedPage() {
  const [recommendations, setRecommendations] = useState<RecommendationStats[]>([]);
  const [overallStats, setOverallStats] = useState<OverallStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🔄 Fetching data...");
        const res = await fetch("/api/recommendations");
        if (!res.ok) throw new Error("Fetch failed");
        const json = await res.json();
        console.log("✅ Data received:", json);
        setRecommendations(json.recommendations || []);
        setOverallStats(json.overallStats || {
          total_recommendations: 156,
          total_clicks: 2340,
          avg_ctr: 3.2,
          top_category: "Restauration",
          active_merchants: 89,
          total_clients_via_reco: 128,
          monthly_clients_via_reco: 34
        });
      } catch (err) {
        console.error("❌ Erreur côté client:", err);
        // Fallback vers les données mock
        setRecommendations([
          {
            id: "1",
            title: "Pizza Margherita -50%",
            clicks: 45,
            impressions: 1200,
            ctr: 3.75,
            category: "Restauration",
            merchant_name: "Pizzeria Mario",
            is_active: true,
            quality_score: 8.5,
            last_updated: "2024-01-15T10:30:00Z"
          }
        ]);
        setOverallStats({
          total_recommendations: 156,
          total_clicks: 2340,
          avg_ctr: 3.2,
          top_category: "Restauration",
          active_merchants: 89,
          total_clients_via_reco: 128,
          monthly_clients_via_reco: 34
        });
      } finally {
        console.log("🏁 Setting loading to false");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
          <div className="text-center text-gray-500 mt-4">
            Chargement... (loading: {loading.toString()})
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📊 Gestion des Recommandations
          </h1>
          <p className="text-gray-600">
            Suivez les performances de vos recommandations et gérez leur qualité
          </p>
        </motion.div>

        {/* Stats Globales */}
        {overallStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
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
              transition={{ delay: 0.2 }}
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
              transition={{ delay: 0.3 }}
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
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Commerces Actifs</p>
                  <p className="text-3xl font-bold text-purple-600">{overallStats.active_merchants}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <span className="text-2xl">🏪</span>
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
                  <p className="text-sm font-medium text-gray-600">Clients via Recommandations</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {overallStats.total_clients_via_reco}
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
              transition={{ delay: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Clients via Reco (mois en cours)</p>
                  <p className="text-3xl font-bold text-teal-600">
                    {overallStats.monthly_clients_via_reco}
                  </p>
                </div>
                <div className="p-3 bg-teal-100 rounded-full">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Filtres et Recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-6 rounded-xl shadow-lg mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Rechercher une recommandation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
              >
                <option value="all">Toutes les catégories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tableau des Recommandations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              📋 Liste des Recommandations ({filteredRecommendations.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 uppercase border-b">
                  <th className="pb-3 px-6">Titre</th>
                  <th className="pb-3 px-6">Commerce</th>
                  <th className="pb-3 px-6">Catégorie</th>
                  <th className="pb-3 px-6">Clics</th>
                  <th className="pb-3 px-6">CTR</th>
                  <th className="pb-3 px-6">Qualité</th>
                  <th className="pb-3 px-6">Statut</th>
                  <th className="pb-3 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecommendations.map((rec, index) => (
                  <motion.tr
                    key={rec.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="py-4 px-6 font-medium">{rec.title}</td>
                    <td className="py-4 px-6">{rec.merchant_name}</td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        {rec.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">{rec.clicks}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        rec.ctr > 4 ? 'bg-green-100 text-green-800' :
                        rec.ctr > 2 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {rec.ctr}%
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-[#17BFA0] h-2 rounded-full" 
                            style={{ width: `${rec.quality_score * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{rec.quality_score}/10</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        rec.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {rec.is_active ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-xs">
                          Modifier
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-xs">
                          {rec.is_active ? 'Désactiver' : 'Activer'}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
