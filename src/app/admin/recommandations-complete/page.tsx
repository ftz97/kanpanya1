"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AIInsightsADM from "@/components/AIInsightsADM";

interface Recommendation {
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

export default function AdminRecommendationsCompletePage() {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [overallStats, setOverallStats] = useState<OverallStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🔄 Début du fetch des données...");
        setLoading(true);
        
        const response = await fetch("/api/recommendations");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ Données reçues:", data);
        
        setRecommendations(data.recommendations || []);
        setOverallStats(data.overallStats || null);
        setError(null);
      } catch (err) {
        console.error("❌ Erreur lors du fetch:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        
        // Fallback avec des données mock
        const mockRecommendations: Recommendation[] = [
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
            last_updated: "2024-01-15T10:30:00Z",
          },
          {
            id: "2",
            title: "Coupe de cheveux -30%",
            clicks: 32,
            impressions: 800,
            ctr: 4,
            category: "Beauté",
            merchant_name: "Salon Élégance",
            is_active: true,
            quality_score: 9.2,
            last_updated: "2024-01-14T15:45:00Z",
          },
          {
            id: "3",
            title: "Café + Croissant -20%",
            clicks: 28,
            impressions: 600,
            ctr: 4.67,
            category: "Restauration",
            merchant_name: "Café du Coin",
            is_active: true,
            quality_score: 7.8,
            last_updated: "2024-01-13T08:20:00Z",
          },
        ];

        const mockOverallStats: OverallStats = {
          total_recommendations: 156,
          total_clicks: 2340,
          avg_ctr: 3.2,
          top_category: "Restauration",
          active_merchants: 89,
          total_clients_via_reco: 128,
          monthly_clients_via_reco: 34,
        };

        setRecommendations(mockRecommendations);
        setOverallStats(mockOverallStats);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-4">Chargement... (loading: {loading.toString()})</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h1 className="text-2xl font-bold text-red-800 mb-4">Erreur</h1>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-8"
        >
          📊 Gestion des Recommandations
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Recommandations</p>
                <p className="text-3xl font-bold text-blue-600">{overallStats?.total_recommendations || 0}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clics</p>
                <p className="text-3xl font-bold text-green-600">{overallStats?.total_clicks?.toLocaleString() || 0}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">👆</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CTR Moyen</p>
                <p className="text-3xl font-bold text-purple-600">{overallStats?.avg_ctr || 0}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Commerces Actifs</p>
                <p className="text-3xl font-bold text-orange-600">{overallStats?.active_merchants || 0}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <span className="text-2xl">🏪</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <AIInsightsADM />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
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
                {recommendations.map((rec, index) => (
                  <motion.tr
                    key={rec.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3">{rec.title}</td>
                    <td className="py-3">{rec.merchant_name}</td>
                    <td className="py-3">{rec.category}</td>
                    <td className="py-3">{rec.clicks}</td>
                    <td className="py-3">{rec.ctr}%</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        rec.is_active 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {rec.is_active ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="py-3">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">
                        Modifier
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        {rec.is_active ? "Désactiver" : "Activer"}
                      </button>
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
