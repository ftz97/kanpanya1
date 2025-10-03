"use client";
import { motion } from "framer-motion";
import { Gift, Play } from "lucide-react";

/**
 * Page de démo — Variantes améliorées du format "Carrousel Espace Sponsor"
 * Chaque section illustre une idée d'amélioration visuelle/UX.
 */

const sponsor = {
  id: "1",
  name: "Mutuelle Locale",
  logo: "🏥",
  title: "🎬 Vidéo Nutrition",
  description: "3 minutes pour booster vos habitudes alimentaires.",
  cta: "▶️ Regarder",
  reward: "+50 pts",
};

// Wrapper commun
function DemoContainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="my-8">
      <h2 className="text-lg font-semibold text-slate-800 mb-3">{title}</h2>
      <div className="w-full h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg flex items-center justify-between px-6">
        {children}
      </div>
    </section>
  );
}

export default function CarouselIdeasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 sm:px-6 md:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Idées d'améliorations — Carrousel sponsor</h1>
        <p className="text-slate-600 mt-1 text-sm">Chaque bloc illustre un axe d'amélioration (design, animations, expérience utilisateur).</p>
      </header>

      {/* 1. Gradient animé */}
      <DemoContainer title="1) Gradient animé dynamique">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 animate-[gradient_6s_linear_infinite] bg-[length:200%_200%]" />
        <div className="relative text-white z-10 flex flex-col">
          <h3 className="text-xl font-bold">{sponsor.title}</h3>
          <p className="text-sm opacity-90">{sponsor.description}</p>
        </div>
      </DemoContainer>

      {/* 2. CTA glassmorphism */}
      <DemoContainer title="2) Bouton CTA en glassmorphism">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-600" />
        <div className="relative z-10 flex items-center justify-between w-full text-white">
          <div>
            <h3 className="text-xl font-bold">{sponsor.title}</h3>
            <p className="text-sm opacity-90">{sponsor.description}</p>
          </div>
          <button className="backdrop-blur-md bg-white/20 border border-white/30 px-4 py-2 rounded-full font-semibold hover:scale-105 transition">
            {sponsor.cta}
          </button>
        </div>
      </DemoContainer>

      {/* 3. Badge récompense animé */}
      <DemoContainer title="3) Badge récompense animé">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-600" />
        <div className="relative z-10 flex items-center justify-between w-full text-white">
          <div>
            <h3 className="text-xl font-bold">{sponsor.title}</h3>
            <p className="text-sm opacity-90">{sponsor.description}</p>
          </div>
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-pink-600 font-semibold"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Gift className="w-4 h-4" /> {sponsor.reward}
          </motion.div>
        </div>
      </DemoContainer>

      {/* 4. Hover parallax logo */}
      <DemoContainer title="4) Effet parallax sur le logo (hover)">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-700" />
        <div className="relative z-10 flex items-center justify-between w-full text-white">
          <div className="flex items-center gap-3">
            <motion.span
              className="text-5xl select-none"
              whileHover={{ x: [0, 5, -5, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.6 }}
            >
              {sponsor.logo}
            </motion.span>
            <div>
              <h3 className="text-xl font-bold">{sponsor.title}</h3>
              <p className="text-sm opacity-90">{sponsor.description}</p>
            </div>
          </div>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold shadow hover:scale-105 transition">
            {sponsor.cta}
          </button>
        </div>
      </DemoContainer>

      {/* 5. Intégration enrichie : aperçu vidéo */}
      <DemoContainer title="5) Contenu enrichi (aperçu vidéo auto-play)">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="relative z-10 flex items-center justify-between w-full text-white">
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            autoPlay
            muted
            loop
            className="h-full rounded-xl object-cover mr-4"
          />
          <div>
            <h3 className="text-xl font-bold">{sponsor.title}</h3>
            <p className="text-sm opacity-90">{sponsor.description}</p>
            <button className="bg-emerald-500 mt-2 px-3 py-2 rounded-lg font-semibold hover:scale-105 transition">
              {sponsor.cta}
            </button>
          </div>
        </div>
      </DemoContainer>

      <footer className="mt-16 text-center text-xs text-slate-500">
        Fait avec ❤️ — Chaque bloc = une idée d'amélioration du carrousel sponsor.
      </footer>
    </div>
  );
}
