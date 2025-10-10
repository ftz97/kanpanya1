"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Gift, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X,
  Trophy,
  Target,
  Calendar,
  Users,
  Star,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

// Types de récompenses disponibles
const rewardTypes = [
  { 
    id: "purchases", 
    name: "Par nombre d'achats", 
    icon: Target, 
    description: "Récompense après X achats",
    color: "blue"
  },
  { 
    id: "points", 
    name: "Par points", 
    icon: Star, 
    description: "Récompense après X points",
    color: "yellow"
  },
  { 
    id: "amount", 
    name: "Par montant", 
    icon: Trophy, 
    description: "Récompense après X€ dépensés",
    color: "green"
  },
  { 
    id: "seasonal", 
    name: "Saisonnière", 
    icon: Calendar, 
    description: "Offre limitée dans le temps",
    color: "purple"
  },
  { 
    id: "tiers", 
    name: "Système de paliers", 
    icon: Users, 
    description: "Bronze, Argent, Or",
    color: "orange"
  },
];

// Récompenses existantes
const existingRewards = [
  {
    id: 1,
    type: "purchases",
    name: "Pain gratuit",
    description: "Offert après 10 achats",
    goal: 10,
    reward: "1 pain de votre choix",
    active: true,
    created: "2024-01-15"
  },
  {
    id: 2,
    type: "points",
    name: "Réduction 5€",
    description: "Sur votre prochain achat",
    goal: 100,
    reward: "5€ de réduction",
    active: true,
    created: "2024-01-10"
  },
  {
    id: 3,
    type: "seasonal",
    name: "Café offert",
    description: "Valable jusqu'au 31/12/2024",
    goal: 5,
    reward: "1 boisson chaude offerte",
    active: false,
    endDate: "2024-12-31",
    created: "2024-12-01"
  },
];

export default function RecompensesPage() {
  const router = useRouter();
  const [rewards, setRewards] = useState(existingRewards);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingReward, setEditingReward] = useState(null);
  const [newReward, setNewReward] = useState({
    type: "purchases",
    name: "",
    description: "",
    goal: 10,
    reward: "",
    endDate: "",
  });

  const handleCreateReward = () => {
    const reward = {
      id: Date.now(),
      ...newReward,
      active: true,
      created: new Date().toISOString().split('T')[0]
    };
    setRewards([...rewards, reward]);
    setNewReward({
      type: "purchases",
      name: "",
      description: "",
      goal: 10,
      reward: "",
      endDate: "",
    });
    setShowCreateModal(false);
  };

  const handleDeleteReward = (id) => {
    setRewards(rewards.filter(r => r.id !== id));
  };

  const handleToggleActive = (id) => {
    setRewards(rewards.map(r => 
      r.id === id ? { ...r, active: !r.active } : r
    ));
  };

  const getRewardTypeInfo = (type) => {
    return rewardTypes.find(t => t.id === type);
  };

  const getTypeColor = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      yellow: "bg-yellow-100 text-yellow-600 border-yellow-200",
      green: "bg-green-100 text-green-600 border-green-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      orange: "bg-orange-100 text-orange-600 border-orange-200",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/commercant")}
              className="flex items-center gap-2 text-gray-600 hover:text-[#17BFA0] font-medium transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <div className="text-lg font-bold text-[#17BFA0]">Configuration Récompenses</div>
          </div>
          
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58d] transition"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle récompense</span>
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎁 Gestion des récompenses
          </h1>
          <p className="text-gray-600">
            Configurez vos cartes de fidélité et offres spéciales
          </p>
        </motion.div>

        {/* Statistiques rapides */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total récompenses</p>
                <p className="text-2xl font-bold text-[#17BFA0]">{rewards.length}</p>
              </div>
              <div className="p-3 bg-[#17BFA0]/10 rounded-lg">
                <Gift className="w-6 h-6 text-[#17BFA0]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Actives</p>
                <p className="text-2xl font-bold text-green-600">
                  {rewards.filter(r => r.active).length}
                </p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Inactives</p>
                <p className="text-2xl font-bold text-gray-600">
                  {rewards.filter(r => !r.active).length}
                </p>
              </div>
              <div className="p-3 bg-gray-500/10 rounded-lg">
                <AlertCircle className="w-6 h-6 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Types différents</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(rewards.map(r => r.type)).size}
                </p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Target className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Liste des récompenses */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Mes récompenses</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {rewards.length} récompense{rewards.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {rewards.map((reward, index) => {
              const typeInfo = getRewardTypeInfo(reward.type);
              const Icon = typeInfo?.icon || Gift;
              
              return (
                <motion.div 
                  key={reward.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    reward.active 
                      ? "border-green-200 bg-green-50/30" 
                      : "border-gray-200 bg-gray-50/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${getTypeColor(typeInfo?.color)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{reward.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            reward.active 
                              ? "bg-green-100 text-green-600" 
                              : "bg-gray-100 text-gray-600"
                          }`}>
                            {reward.active ? "Actif" : "Inactif"}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>
                            {reward.type === "purchases" && `${reward.goal} achats`}
                            {reward.type === "points" && `${reward.goal} points`}
                            {reward.type === "amount" && `${reward.goal}€`}
                            {reward.type === "seasonal" && "Offre limitée"}
                            {reward.type === "tiers" && "Système de paliers"}
                          </span>
                          <span>→ {reward.reward}</span>
                          {reward.endDate && (
                            <span>jusqu'au {new Date(reward.endDate).toLocaleDateString("fr-FR")}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleActive(reward.id)}
                        className={`p-2 rounded-lg transition ${
                          reward.active 
                            ? "text-green-600 hover:bg-green-100" 
                            : "text-gray-400 hover:bg-gray-100"
                        }`}
                      >
                        {reward.active ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                      </button>
                      
                      <button
                        onClick={() => setEditingReward(reward)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteReward(reward.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {rewards.length === 0 && (
              <div className="text-center py-12">
                <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune récompense</h3>
                <p className="text-gray-500 mb-6">Créez votre première récompense pour fidéliser vos clients</p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58d] transition"
                >
                  Créer une récompense
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal création de récompense */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Nouvelle récompense</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Type de récompense */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Type de récompense</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {rewardTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setNewReward({...newReward, type: type.id})}
                        className={`p-4 rounded-lg border-2 transition text-left ${
                          newReward.type === type.id
                            ? "border-[#17BFA0] bg-[#17BFA0]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getTypeColor(type.color)}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{type.name}</p>
                            <p className="text-sm text-gray-500">{type.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Détails de la récompense */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la récompense</label>
                  <input
                    type="text"
                    value={newReward.name}
                    onChange={(e) => setNewReward({...newReward, name: e.target.value})}
                    placeholder="Ex: Pain gratuit"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Objectif</label>
                  <input
                    type="number"
                    value={newReward.goal}
                    onChange={(e) => setNewReward({...newReward, goal: parseInt(e.target.value)})}
                    placeholder="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={newReward.description}
                  onChange={(e) => setNewReward({...newReward, description: e.target.value})}
                  placeholder="Ex: Offert après 10 achats"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Récompense</label>
                <input
                  type="text"
                  value={newReward.reward}
                  onChange={(e) => setNewReward({...newReward, reward: e.target.value})}
                  placeholder="Ex: 1 pain de votre choix"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                />
              </div>

              {newReward.type === "seasonal" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
                  <input
                    type="date"
                    value={newReward.endDate}
                    onChange={(e) => setNewReward({...newReward, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button 
                onClick={handleCreateReward}
                className="flex items-center gap-2 px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58d] transition"
              >
                <Save className="w-4 h-4" />
                <span>Créer la récompense</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
