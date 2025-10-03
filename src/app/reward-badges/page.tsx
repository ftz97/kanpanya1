"use client";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

/**
 * Page de démo — Variantes de badges "Récompense" animés
 */

const reward = "+50 pts";

function DemoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-8">
      <h2 className="text-lg font-semibold text-slate-800 mb-3">{title}</h2>
      <div className="flex items-center justify-center h-24 bg-slate-50 rounded-xl shadow-inner">
        {children}
      </div>
    </div>
  );
}

export default function RewardBadgesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 sm:px-6 md:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Variantes de badges récompense</h1>
        <p className="text-slate-600 mt-1 text-sm">Compare plusieurs styles d'animations et de rendus.</p>
      </header>

      {/* 1. Pulse basique */}
      <DemoBlock title="1) Pulse basique (scale)">
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-pink-600 font-semibold shadow"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <Gift className="w-4 h-4" /> {reward}
        </motion.div>
      </DemoBlock>

      {/* 2. Glow lumineux */}
      <DemoBlock title="2) Glow lumineux (halo autour)">
        <motion.div
          className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white text-emerald-600 font-semibold shadow"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="absolute inset-0 rounded-full bg-emerald-300 opacity-30 blur-md animate-pulse" />
          <Gift className="w-4 h-4 relative z-10" /> <span className="relative z-10">{reward}</span>
        </motion.div>
      </DemoBlock>

      {/* 3. Shimmer (reflet animé) */}
      <DemoBlock title="3) Shimmer (reflet qui traverse)">
        <motion.div
          className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white text-indigo-600 font-semibold shadow overflow-hidden"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          <Gift className="w-4 h-4 relative z-10" /> <span className="relative z-10">{reward}</span>
        </motion.div>
      </DemoBlock>

      {/* 4. Couleurs dynamiques */}
      <DemoBlock title="4) Couleurs dynamiques selon le type de récompense">
        <div className="flex gap-4">
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-green-600 font-semibold shadow"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Gift className="w-4 h-4" /> +20 pts
          </motion.div>
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-600 font-semibold shadow"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Gift className="w-4 h-4" /> -10% off
          </motion.div>
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-yellow-600 font-semibold shadow"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Gift className="w-4 h-4" /> 🎁 Cadeau
          </motion.div>
        </div>
      </DemoBlock>

      <footer className="mt-16 text-center text-xs text-slate-500">
        Fait avec ❤️ — Choisis ton style préféré pour les badges de récompense.
      </footer>
    </div>
  );
}
