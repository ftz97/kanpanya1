"use client";

import { motion } from "framer-motion";

export default function StatsSectionCommercant() {
  const stats = [
    {
      icon: "👥",
      label: "Clients actifs",
      value: "247",
      change: "+12%",
      color: "text-blue-600"
    },
    {
      icon: "🎯",
      label: "Offres vues",
      value: "1,234",
      change: "+8%",
      color: "text-green-600"
    },
    {
      icon: "💰",
      label: "CA ce mois",
      value: "2,450€",
      change: "+15%",
      color: "text-purple-600"
    },
    {
      icon: "⭐",
      label: "Note moyenne",
      value: "4.8",
      change: "+0.2",
      color: "text-yellow-600"
    }
  ];

  return (
    <section>
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#123456]">
        📊 Mes statistiques
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-4 text-center border border-gray-200"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-lg font-bold text-[#123456] mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-gray-500 mb-1">
              {stat.label}
            </div>
            <div className={`text-xs font-medium ${stat.color}`}>
              {stat.change} ce mois
            </div>
          </motion.div>
        ))}
      </div>

      {/* Graphique simple */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <h3 className="font-semibold text-[#123456] mb-3">📈 Évolution des vues</h3>
        <div className="h-32 flex items-end justify-between gap-2">
          {[40, 60, 45, 80, 70, 90, 85].map((height, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-[#17BFA0] rounded-t flex-1"
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Lun</span>
          <span>Mar</span>
          <span>Mer</span>
          <span>Jeu</span>
          <span>Ven</span>
          <span>Sam</span>
          <span>Dim</span>
        </div>
      </div>
    </section>
  );
}
