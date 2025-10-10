"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  QrCode, 
  Users, 
  Star, 
  Gift, 
  Scan, 
  ArrowLeft, 
  TrendingUp, 
  Calendar,
  Settings,
  BarChart3,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Eye,
  Download,
  Share2,
  Bell
} from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Données simulées pour le commerçant
const merchantData = {
  id: "merchant-123",
  nom: "🥖 Boulangerie Artisanale",
  description: "Boulangerie traditionnelle depuis 1985",
  adresse: "12 Rue des Fleurs, Fort-de-France",
  telephone: "0596 12 34 56",
  email: "contact@boulangerie-artisanale.fr",
  active: true,
  type: "Alimentation",
  ouverture: "6h00 - 19h00",
  image: "/images/boulangerie.jpg"
};

const statsData = {
  total_scans_given: 247,
  unique_clients_scanned: 156,
  total_points_given: 2470,
  last_scan_date: new Date().toISOString(),
  moyenne_quotidienne: 12,
  croissance_mensuelle: 23,
  satisfaction_client: 4.8,
  taux_retour: 67
};

const recentScans = [
  { client: "Marie L.", points: 10, heure: "14:30", produit: "Pain complet" },
  { client: "Jean P.", points: 10, heure: "13:45", produit: "Croissants" },
  { client: "Sophie M.", points: 10, heure: "12:15", produit: "Sandwich" },
  { client: "Pierre D.", points: 10, heure: "11:30", produit: "Viennoiseries" },
  { client: "Claire B.", points: 10, heure: "10:45", produit: "Pain de mie" },
];

const rewardsConfig = [
  { type: "purchases", goal: 10, reward: "1 pain gratuit", active: true },
  { type: "points", goal: 100, reward: "5€ de réduction", active: true },
  { type: "seasonal", goal: 5, reward: "Café offert", active: false },
];

export default function CommercantPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [showQRModal, setShowQRModal] = useState(false);

  const tabs = [
    { id: "overview", label: "Vue d'ensemble", icon: BarChart3 },
    { id: "scans", label: "Scans récents", icon: Scan },
    { id: "rewards", label: "Récompenses", icon: Gift },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 text-gray-600 hover:text-[#17BFA0] font-medium transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <div className="text-lg font-bold text-[#17BFA0]">Kanpanya</div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:text-[#17BFA0] transition">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowQRModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58d] transition"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">Mon QR</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header commerçant */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#17BFA0] to-[#14a58d] rounded-2xl p-6 mb-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{merchantData.nom}</h1>
              <p className="text-teal-100 mb-4">{merchantData.description}</p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{merchantData.adresse}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{merchantData.ouverture}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-teal-100">Statut</p>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  Actif
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs de navigation */}
        <div className="bg-white rounded-xl shadow-sm p-1 mb-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition ${
                    activeTab === tab.id
                      ? "bg-[#17BFA0] text-white shadow-sm"
                      : "text-gray-600 hover:text-[#17BFA0] hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenu selon l'onglet actif */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Scans donnés</p>
                    <p className="text-3xl font-bold text-[#17BFA0]">{statsData.total_scans_given}</p>
                  </div>
                  <div className="p-3 bg-[#17BFA0]/10 rounded-lg">
                    <Scan className="w-6 h-6 text-[#17BFA0]" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">+{statsData.croissance_mensuelle}% ce mois</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Clients uniques</p>
                    <p className="text-3xl font-bold text-[#17BFA0]">{statsData.unique_clients_scanned}</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">+15 nouveaux</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Points distribués</p>
                    <p className="text-3xl font-bold text-[#17BFA0]">{statsData.total_points_given}</p>
                  </div>
                  <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-500">~{statsData.moyenne_quotidienne}/jour</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Satisfaction</p>
                    <p className="text-3xl font-bold text-[#17BFA0]">{statsData.satisfaction_client}</p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <Award className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-500">{statsData.taux_retour}% de retour</span>
                </div>
              </motion.div>
            </div>

            {/* Actions rapides */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => setShowQRModal(true)}
                  className="flex items-center justify-center gap-3 p-4 rounded-xl border border-[#17BFA0] text-[#17BFA0] hover:bg-[#F9FFFD] transition"
                >
                  <QrCode className="w-5 h-5" />
                  <span>Voir QR Code</span>
                </button>
                
                <button 
                  onClick={() => router.push("/scan")}
                  className="flex items-center justify-center gap-3 p-4 rounded-xl border border-blue-500 text-blue-500 hover:bg-blue-50 transition"
                >
                  <Scan className="w-5 h-5" />
                  <span>Scanner client</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab("rewards")}
                  className="flex items-center justify-center gap-3 p-4 rounded-xl border border-purple-500 text-purple-500 hover:bg-purple-50 transition"
                >
                  <Gift className="w-5 h-5" />
                  <span>Gérer récompenses</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === "scans" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Scans récents</h2>
              <button className="flex items-center gap-2 px-4 py-2 text-[#17BFA0] border border-[#17BFA0] rounded-lg hover:bg-[#F9FFFD] transition">
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {recentScans.map((scan, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#17BFA0] rounded-full flex items-center justify-center text-white font-medium">
                      {scan.client.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{scan.client}</p>
                      <p className="text-sm text-gray-500">{scan.produit}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#17BFA0]">+{scan.points} pts</p>
                    <p className="text-sm text-gray-500">{scan.heure}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "rewards" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Configuration des récompenses</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58d] transition">
                  <Gift className="w-4 h-4" />
                  <span>Ajouter une récompense</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rewardsConfig.map((reward, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        reward.active ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                      }`}>
                        {reward.active ? "Actif" : "Inactif"}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{reward.reward}</h3>
                    <p className="text-sm text-gray-500">
                      {reward.type === "purchases" && `${reward.goal} achats`}
                      {reward.type === "points" && `${reward.goal} points`}
                      {reward.type === "seasonal" && `Offre limitée`}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations du commerce</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom du commerce</label>
                    <input 
                      type="text" 
                      defaultValue={merchantData.nom}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea 
                      defaultValue={merchantData.description}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                    <input 
                      type="text" 
                      defaultValue={merchantData.adresse}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input 
                      type="tel" 
                      defaultValue={merchantData.telephone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      defaultValue={merchantData.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Horaires d'ouverture</label>
                    <input 
                      type="text" 
                      defaultValue={merchantData.ouverture}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  Annuler
                </button>
                <button className="px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58d] transition">
                  Sauvegarder
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal QR Code */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm relative">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">QR Code Commerçant</h3>
              <div className="bg-gray-100 rounded-lg p-8 mb-4 flex items-center justify-center">
                <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-gray-500" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Les clients peuvent scanner ce code pour gagner des points chez vous.
              </p>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Download className="w-4 h-4" />
                  <span>Télécharger</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Share2 className="w-4 h-4" />
                  <span>Partager</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
