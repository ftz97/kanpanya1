"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, HelpCircle, Gift, Image as ImageIcon } from "lucide-react";

/**
 * Konpanya — Demo: Espaces publicitaires immersifs & responsifs
 *
 * Contenu de la page:
 * 1) Espace intégré au feed (section) — "FeedEmbeddedAd"
 * 2) Hero immersif (haut/bas de page) — "HeroAd"
 * 3) Carrousel d'espace sponsor (léger, sans carte massive) — "CarouselSpaceAd"
 * 4) Dock sticky en bas (discret, toujours visible) — "StickyDockAd"
 * 5) Interstitiel plein écran (avec Skip) — "InterstitialAd"
 *
 * Tous les formats utilisent les mêmes données mock et CTA.
 * Tailwind + Framer Motion only.
 */

// Types
interface Sponsor {
  id: string;
  name: string;
  logo: string; // emoji ou URL
  type: "video" | "quiz" | "scratch" | "image-quiz" | "simple";
  title: string;
  description: string;
  cta: string;
  reward?: string;
  background?: string; // classes tailwind pour dégradé
}

// Données mock
const SPONSORS: Sponsor[] = [
  {
    id: "1",
    name: "Mutuelle Locale",
    logo: "🏥",
    type: "video",
    title: "🎬 Vidéo Nutrition",
    description: "3 minutes pour booster vos habitudes alimentaires.",
    cta: "▶️ Regarder",
    reward: "+50 pts",
    background: "from-[#17BFA0] to-[#14a58d]",
  },
  {
    id: "2",
    name: "Boulangerie Artisanale",
    logo: "🥖",
    type: "quiz",
    title: "🧠 Quiz Pain",
    description: "Testez vos connaissances et gagnez des récompenses.",
    cta: "🎯 Jouer",
    reward: "+100 pts",
    background: "from-amber-400 to-orange-500",
  },
  {
    id: "3",
    name: "Café du Coin",
    logo: "☕",
    type: "scratch",
    title: "🎟️ Grattez et Gagnez",
    description: "Un ticket = une chance de gagner !",
    cta: "🎲 Gratter",
    reward: "Boisson offerte",
    background: "from-purple-600 to-violet-800",
  },
  {
    id: "4",
    name: "Épicerie Bio",
    logo: "🥬",
    type: "simple",
    title: "💰 Offre Flash -20%",
    description: "Code valable 24h sur tous les produits.",
    cta: "⚡ Profiter",
    reward: "Jusqu'à 15€",
    background: "from-emerald-500 to-teal-600",
  },
];

// Icônes par type
const TYPE_ICON: Record<Sponsor["type"], JSX.Element> = {
  video: <Play className="w-4 h-4" />,
  quiz: <HelpCircle className="w-4 h-4" />,
  scratch: <Gift className="w-4 h-4" />,
  "image-quiz": <ImageIcon className="w-4 h-4" />,
  simple: <Gift className="w-4 h-4" />,
};

function useAutoplay(length: number, delay = 6000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % length), delay);
    return () => clearInterval(t);
  }, [length, delay]);
  return [index, setIndex] as const;
}

// 1) Espace intégré au feed (section) — Immersif, sans "carte"
function FeedEmbeddedAd({ sponsor }: { sponsor: Sponsor }) {
  return (
    <section className="w-full my-6">
      <div
        className={`relative w-full h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r ${
          sponsor.background || "from-slate-800 to-slate-900"
        } flex items-center justify-between px-6`}
      >
        {/* Texte gauche */}
        <div className="text-white max-w-lg">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-3 py-1 rounded-full text-xs mb-3">
            <span className="opacity-90">Espace sponsorisé</span>
            <span className="text-white/80">•</span>
            <span className="font-semibold opacity-90">{sponsor.name}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2">{sponsor.title}</h3>
          <p className="text-sm sm:text-base text-white/90 mb-4 line-clamp-2">{sponsor.description}</p>
          <button
            className="bg-white text-black px-4 py-2 rounded-full font-semibold shadow hover:shadow-lg hover:scale-[1.03] transition"
            aria-label={`${sponsor.cta} – ${sponsor.name}`}
          >
            {TYPE_ICON[sponsor.type]} <span className="ml-2 align-middle">{sponsor.cta}</span>
          </button>
        </div>

        {/* Visuel/logo droite */}
        <div className="hidden sm:flex items-center justify-center text-7xl drop-shadow-sm select-none">
          {sponsor.logo}
        </div>
      </div>
    </section>
  );
}

// 2) Hero immersif — plein écran responsive (90vh sur desktop)
function HeroAd({ sponsor }: { sponsor: Sponsor }) {
  return (
    <section className="w-full my-6">
      <div className={`relative h-[60vh] sm:h-[70vh] md:h-[90vh] rounded-2xl overflow-hidden bg-gradient-to-br ${sponsor.background}`}>
        {/* Progress bar stories */}
        <div className="absolute top-0 left-0 right-0 flex gap-1 p-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden">
              <motion.div className="h-full bg-white" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 4, ease: "linear" }} />
            </div>
          ))}
        </div>

        {/* Overlay bas */}
        <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-black/35 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-white max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{sponsor.logo}</span>
              <h3 className="text-lg sm:text-2xl font-bold">{sponsor.title}</h3>
            </div>
            <p className="text-sm sm:text-base text-white/90 mb-4">{sponsor.description}</p>
            <div className="flex items-center gap-3">
              <button className="bg-white text-black px-4 py-2 rounded-xl font-semibold shadow hover:scale-[1.03] transition">
                {sponsor.cta}
              </button>
              {sponsor.reward && (
                <span className="px-3 py-2 rounded-xl bg-white/15 border border-white/20 text-white/90 text-xs sm:text-sm">
                  🎁 {sponsor.reward}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// 3) Carrousel d'espace sponsor – léger (conteneur = espace, pas carte)
function CarouselSpaceAd({ sponsors = SPONSORS }: { sponsors?: Sponsor[] }) {
  const [index, setIndex] = useAutoplay(sponsors.length, 5000);
  const next = () => setIndex((i) => (i + 1) % sponsors.length);
  const prev = () => setIndex((i) => (i - 1 + sponsors.length) % sponsors.length);
  const s = sponsors[index];

  return (
    <section className="w-full my-6">
      <div className="relative w-full h-40 sm:h-48 md:h-56 rounded-2xl overflow-hidden shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.id}
            className={`absolute inset-0 bg-gradient-to-r ${s.background} text-white flex items-center justify-between px-5`}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-3 max-w-xl">
              <span className="text-4xl select-none">{s.logo}</span>
              <div>
                <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-2 py-1 rounded-full text-[11px] mb-1">
                  <span>Espace sponsorisé</span>
                  <span>•</span>
                  <span className="font-semibold">{s.name}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">{s.title}</h3>
                <p className="text-sm text-white/90 line-clamp-1 sm:line-clamp-2">{s.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {s.reward && <span className="hidden sm:inline px-3 py-2 rounded-full bg-white/15 border border-white/20 text-sm">🎁 {s.reward}</span>}
              <button className="bg-white text-black px-4 py-2 rounded-full font-semibold shadow hover:scale-105 transition">
                {s.cta}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows desktop */}
        <button onClick={prev} className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white">
          <ChevronLeft className="text-slate-800" />
        </button>
        <button onClick={next} className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white">
          <ChevronRight className="text-slate-800" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {sponsors.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/50"}`}
              aria-label={`Aller au sponsor ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 4) Dock sticky en bas — discret & toujours visible (peut être masqué)
function StickyDockAd({ sponsor }: { sponsor: Sponsor }) {
  const [visible, setVisible] = useState(true);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
        >
          <div className="flex items-center gap-3 bg-slate-900/90 text-white px-4 py-3 rounded-full shadow-2xl backdrop-blur-md">
            <span className="text-2xl select-none">{sponsor.logo}</span>
            <span className="text-sm hidden sm:inline">
              <strong>{sponsor.title}</strong> — {sponsor.description}
            </span>
            <button className="bg-white text-black px-3 py-1.5 rounded-full text-sm font-semibold shadow hover:scale-105 transition">
              {sponsor.cta}
            </button>
            <button
              aria-label="Masquer l'espace sponsor"
              className="ml-1 bg-white/10 hover:bg-white/20 rounded-full p-1"
              onClick={() => setVisible(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 5) Interstitiel plein écran (avec Skip)
function InterstitialAd({ sponsor, open, onClose }: { sponsor: Sponsor; open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${sponsor.background}`} />
          <div className="absolute inset-0 bg-black/30" />
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            className="relative z-10 w-full max-w-xl mx-auto px-4"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{sponsor.logo}</span>
                  <div>
                    <h3 className="text-xl font-bold">{sponsor.title}</h3>
                    <p className="text-sm text-slate-600">{sponsor.name}</p>
                  </div>
                </div>
                <button aria-label="Fermer" onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-slate-700 mb-4">{sponsor.description}</p>
              <div className="flex items-center gap-3">
                <button className="bg-slate-900 text-white px-4 py-2 rounded-xl font-semibold hover:scale-[1.02] transition">
                  {sponsor.cta}
                </button>
                {sponsor.reward && (
                  <span className="px-3 py-2 rounded-xl bg-emerald-100 text-emerald-700 text-sm">🎁 {sponsor.reward}</span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="mx-auto mt-4 block text-white/90 hover:text-white text-sm underline"
            >
              Passer l'annonce
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// —————————————————————————————————————————————————————————————
// Page de démo
export default function AdFormatsShowcasePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [interOpen, setInterOpen] = useState(false);
  const [carouselStart, setCarouselStart] = useState(0);

  const heroSponsor = SPONSORS[heroIndex % SPONSORS.length];
  const carouselSponsors = useMemo(() => SPONSORS.slice(carouselStart).concat(SPONSORS.slice(0, carouselStart)), [carouselStart]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        <header className="mb-6">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <span>Konpanya</span>
            <span>•</span>
            <span>Demo formats publicitaires</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Espaces pub immersifs & responsifs</h1>
          <p className="text-slate-600 mt-1">Compare en direct 5 formats, sans cartes ni bandeaux imposants.</p>
        </header>

        {/* 1) Espace intégré au feed */}
        <h2 className="text-lg font-semibold text-slate-800 mb-2">1) Espace intégré au feed</h2>
        <FeedEmbeddedAd sponsor={SPONSORS[1]} />

        {/* 2) Hero immersif */}
        <div className="flex items-center justify-between mt-8 mb-2">
          <h2 className="text-lg font-semibold text-slate-800">2) Hero immersif</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setHeroIndex((i) => (i - 1 + SPONSORS.length) % SPONSORS.length)} className="p-2 rounded-full hover:bg-slate-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setHeroIndex((i) => (i + 1) % SPONSORS.length)} className="p-2 rounded-full hover:bg-slate-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <HeroAd sponsor={heroSponsor} />

        {/* 3) Carrousel d'espace sponsor */}
        <div className="flex items-center justify-between mt-8 mb-2">
          <h2 className="text-lg font-semibold text-slate-800">3) Carrousel d'espace sponsor</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setCarouselStart((n) => (n - 1 + SPONSORS.length) % SPONSORS.length)} className="p-2 rounded-full hover:bg-slate-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setCarouselStart((n) => (n + 1) % SPONSORS.length)} className="p-2 rounded-full hover:bg-slate-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <CarouselSpaceAd sponsors={carouselSponsors} />

        {/* 4) Dock sticky */}
        <h2 className="text-lg font-semibold text-slate-800 mt-8 mb-2">4) Dock sticky en bas</h2>
        <p className="text-slate-600 mb-3 text-sm">Toujours visible, discret, masquable par l'utilisateur.</p>
        <div className="relative border border-slate-200 rounded-xl p-4">
          <p className="text-slate-600 text-sm">Scroll la page et observe le dock en bas.</p>
          <div className="h-40" />
        </div>
        <StickyDockAd sponsor={SPONSORS[2]} />

        {/* 5) Interstitiel plein écran */}
        <h2 className="text-lg font-semibold text-slate-800 mt-8 mb-2">5) Interstitiel plein écran</h2>
        <p className="text-slate-600 mb-3 text-sm">Très immersif (à doser). Montre un sponsor en plein écran avec bouton "Passer".</p>
        <button
          onClick={() => setInterOpen(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded-xl font-semibold hover:scale-[1.02] transition"
        >
          Lancer l'interstitiel de démo
        </button>
        <InterstitialAd sponsor={SPONSORS[0]} open={interOpen} onClose={() => setInterOpen(false)} />

        <footer className="mt-16 mb-8 text-center text-xs text-slate-500">
          Fait avec ❤️ pour comparer les rendus, adapter les formats, et éviter les grosses cartes moches.
        </footer>
      </div>
    </div>
  );
}
