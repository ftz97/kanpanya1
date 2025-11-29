"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Gift, Trophy, Star, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RewardsPage() {
  const router = useRouter();
  const userPoints = 300; // À remplacer par les vrais points depuis Supabase

  const rewards = [
    { id: 1, titre: "Café offert", points: 50, icon: "☕", disponible: true },
    { id: 2, titre: "Pizza gratuite", points: 150, icon: "🍕", disponible: true },
    { id: 3, titre: "Ciné à -50%", points: 200, icon: "🎬", disponible: true },
    { id: 4, titre: "Massage 30min", points: 300, icon: "💆", disponible: true },
    { id: 5, titre: "Panier garni", points: 400, icon: "🧺", disponible: false },
    { id: 6, titre: "Dîner pour 2", points: 500, icon: "🍽️", disponible: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFB] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0FB493] to-[#0CA182] text-white p-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 mb-4 text-white/90 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Mes Récompenses 🎁</h1>
          <p className="text-white/90">Échangez vos points contre des cadeaux</p>

          {/* Compteur de points */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center"
          >
            <p className="text-sm text-white/80 mb-2">Vos points disponibles</p>
            <div className="flex items-center justify-center gap-3">
              <Gift className="w-8 h-8" />
              <span className="text-5xl font-black">{userPoints}</span>
              <span className="text-xl opacity-90">pts</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Liste des récompenses */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-[#102A43] mb-6">
          Catalogue de récompenses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl p-6 border-2 transition-all ${
                reward.disponible
                  ? "bg-white border-[#0FB493]/20 hover:border-[#0FB493] hover:shadow-lg cursor-pointer"
                  : "bg-gray-50 border-gray-200 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{reward.icon}</div>
                  <div>
                    <h3 className="font-bold text-[#102A43] text-lg">
                      {reward.titre}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-[#0FB493]" />
                      <span className="font-semibold text-[#0FB493]">
                        {reward.points} pts
                      </span>
                    </div>
                  </div>
                </div>

                {reward.disponible && userPoints >= reward.points && (
                  <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
                )}
              </div>

              <button
                disabled={!reward.disponible || userPoints < reward.points}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  reward.disponible && userPoints >= reward.points
                    ? "bg-[#0FB493] text-white hover:bg-[#0CA182] hover:shadow-md active:scale-95"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {!reward.disponible
                  ? "Bientôt disponible"
                  : userPoints >= reward.points
                  ? "Échanger maintenant"
                  : `Il vous manque ${reward.points - userPoints} pts`}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Section Comment gagner des points */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-7 h-7" />
            Comment gagner plus de points ?
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <span>Scanner votre QR code chez les commerçants partenaires</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <span>Gratter les cartes à gratter quotidiennes</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <span>Participer aux tombolas et quiz</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <span>Parrainer vos amis</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}


