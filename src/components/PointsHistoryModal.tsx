"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Trophy, Star, Zap, TrendingUp, Calendar, Sparkles } from "lucide-react";

interface PointsHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPoints: number;
}

export default function PointsHistoryModal({ isOpen, onClose, totalPoints }: PointsHistoryModalProps) {
  // Historique des gains et prix (à remplacer par les vraies données depuis Supabase)
  const history = [
    { id: 1, type: "gain", action: "Tombola gagnée - Café gratuit", points: 50, date: "Aujourd'hui 14:30", icon: "🎰", category: "Tombola" },
    { id: 2, type: "gain", action: "Carte à gratter - Pizza offerte", points: 100, date: "Hier 16:45", icon: "🎫", category: "Récompense" },
    { id: 3, type: "gain", action: "Quiz complété - Réduction 20%", points: 25, date: "2 jours", icon: "🧠", category: "Engagement" },
    { id: 4, type: "gain", action: "Scan commerçant - Dessert offert", points: 10, date: "3 jours", icon: "📱", category: "Interaction" },
    { id: 5, type: "gain", action: "Parrainage ami - Boisson gratuite", points: 75, date: "4 jours", icon: "👥", category: "Social" },
  ];

  const totalGains = history
    .filter(h => h.type === "gain")
    .reduce((sum, h) => sum + h.points, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
          />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 w-full max-w-[320px] md:max-w-sm relative shadow-xl text-center max-h-[85vh] overflow-y-auto"
        >
          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 text-gray-400 hover:text-gray-600 text-base sm:text-lg"
            aria-label="Fermer"
          >
            ×
          </button>

          {/* Titre */}
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#123456] mb-2 sm:mb-3 md:mb-4 text-center">
            Mes Points
          </h3>

          {/* Solde principal - Élément essentiel */}
          <div className="bg-gradient-to-r from-[#17BFA0] to-[#14a58e] rounded-md sm:rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 mb-2 sm:mb-3 md:mb-4 text-center shadow-lg">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">{totalPoints}</div>
            <div className="text-white/90 text-xs sm:text-sm font-medium">Points disponibles</div>
          </div>

          {/* Section Historique Gains */}
          <div className="mb-2 sm:mb-3 md:mb-4">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 md:mb-3">
              <Trophy className="w-3 sm:w-4 h-3 sm:h-4 text-[#17BFA0]" />
              <h4 className="text-xs sm:text-sm font-semibold text-gray-700">Mes gains récents</h4>
            </div>
            
            <div className="space-y-1 sm:space-y-1.5 md:space-y-2 max-h-32 sm:max-h-36 md:max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="flex items-center gap-1.5 sm:gap-2 md:gap-3 p-1.5 sm:p-2 md:p-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-sm sm:rounded-md md:rounded-lg"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-sm sm:rounded-md md:rounded-lg bg-gradient-to-r from-emerald-400 to-green-400 flex items-center justify-center text-xs sm:text-sm md:text-base">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{item.action}</div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 rounded-sm sm:rounded-md md:rounded-lg whitespace-nowrap">
                    {item.points} pts
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Indicateur de scroll */}
            {history.length > 3 && (
              <div className="text-center mt-2">
                <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                  <span>Glissez pour voir plus</span>
                  <motion.div
                    animate={{ y: [0, 2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-gray-400"
                  >
                    ↓
                  </motion.div>
                </div>
              </div>
            )}
          </div>

          {/* Message d'encouragement */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-sm sm:rounded-md md:rounded-lg p-1.5 sm:p-2 md:p-3 mb-2 sm:mb-3 md:mb-4 text-center">
            <p className="text-xs sm:text-sm text-blue-700 font-semibold">
              💡 Continue à scanner et jouer pour gagner des points !
            </p>
          </div>

          {/* Bouton d'action principal */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#17BFA0] to-[#14a58e] text-white py-1.5 sm:py-2 md:py-2.5 rounded-sm sm:rounded-md md:rounded-lg font-semibold hover:from-[#14a58e] hover:to-[#0fb493] active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm"
          >
            Fermer
          </button>
        </motion.div>
      </div>
    </>
  )}
</AnimatePresence>
  );
}

