"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamic imports pour les modales
const SponsorFlowModal = dynamic(() => import("./SponsorFlowModal"), { 
  ssr: false,
  loading: () => <div className="p-4 text-center">Chargement...</div>
});

// Types
interface Sponsor {
  id: string;
  name: string;
  logo: string;
  logoImage?: string;
  mainImage: string;
  type: "video-quiz" | "quiz-direct";
  title: string;
  description: string;
  cta: string;
  reward?: string;
  background: string;
  icon?: string;
  theme: string;
  questions: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
  scratchRewards: Array<{
    type: "points" | "coupon" | "gift";
    amount?: number;
    label: string;
    description: string;
  }>;
}

// Données sponsor avec 2 types de flow
const mockSponsors: Sponsor[] = [
  {
    id: "1",
    name: "Mutuelle Locale",
    logo: "🏥",
    logoImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    type: "video-quiz",
    title: "🎬 Santé & Nutrition",
    description: "Découvrez les secrets d'une vie saine",
    cta: "Découvrir",
    reward: "Jusqu'à +200 pts",
    background: "from-teal-400 to-emerald-600",
    icon: "▶️",
    theme: "santé",
    questions: [
      {
        question: "Combien de fruits et légumes faut-il manger par jour ?",
        options: ["2 portions", "5 portions", "10 portions", "Autant qu'on veut"],
        correctIndex: 1,
        explanation: "L'OMS recommande au minimum 5 portions de fruits et légumes par jour !"
      },
      {
        question: "Quelle boisson est la meilleure pour s'hydrater ?",
        options: ["Soda", "Eau plate", "Énergisante", "Café"],
        correctIndex: 1,
        explanation: "L'eau plate reste la meilleure source d'hydratation naturelle !"
      },
      {
        question: "Combien de temps d'activité physique par semaine ?",
        options: ["30 min", "2h30", "10h", "Pas besoin"],
        correctIndex: 1,
        explanation: "L'OMS recommande au minimum 2h30 d'activité modérée par semaine !"
      },
      {
        question: "À quelle fréquence consulter son médecin ?",
        options: ["Jamais", "Une fois par an", "Tous les 6 mois", "Quotidiennement"],
        correctIndex: 1,
        explanation: "Une visite de contrôle annuelle permet de prévenir les problèmes de santé !"
      }
    ],
    scratchRewards: [
      { type: "points", amount: 50, label: "+50 points santé", description: "Points bonus pour votre bien-être !" },
      { type: "points", amount: 100, label: "+100 points vitalité", description: "Excellente connaissance santé !" },
      { type: "coupon", label: "Consultation -20%", description: "Réduction chez nos médecins partenaires" },
      { type: "gift", label: "Kit bien-être", description: "Coffret produits santé offert" }
    ]
  },
  {
    id: "2",
    name: "Boulangerie Artisanale",
    logo: "🥖",
    logoImage: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=80&h=80&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&h=400&fit=crop",
    type: "quiz-direct",
    title: "🧠 Quiz Boulangerie",
    description: "Testez vos connaissances sur l'art de la boulangerie",
    cta: "Jouer",
    reward: "Jusqu'à +150 pts",
    background: "from-amber-400 to-orange-500",
    icon: "🎯",
    theme: "boulangerie",
    questions: [
      {
        question: "Quel est l'ingrédient principal du pain ?",
        options: ["Farine", "Sucre", "Beurre", "Œufs"],
        correctIndex: 0,
        explanation: "Le pain est principalement fait de farine, d'eau, de sel et de levure !"
      },
      {
        question: "Combien de temps faut-il laisser reposer la pâte ?",
        options: ["30 min", "1-2 heures", "5 heures", "24 heures"],
        correctIndex: 1,
        explanation: "La pâte doit reposer 1 à 2 heures pour que la levure fasse son travail !"
      },
      {
        question: "Quelle température pour cuire le pain ?",
        options: ["150°C", "200°C", "250°C", "300°C"],
        correctIndex: 2,
        explanation: "Le pain se cuit à 250°C pour obtenir une croûte dorée et croustillante !"
      },
      {
        question: "Qu'est-ce qui fait lever le pain ?",
        options: ["Le sel", "La levure", "Le sucre", "L'eau"],
        correctIndex: 1,
        explanation: "La levure transforme les sucres en gaz carbonique, ce qui fait gonfler la pâte !"
      }
    ],
    scratchRewards: [
      { type: "points", amount: 75, label: "+75 points boulanger", description: "Bravo pour vos connaissances !" },
      { type: "coupon", label: "Pain gratuit", description: "Un pain de votre choix offert !" },
      { type: "coupon", label: "-30% pâtisseries", description: "Réduction sur nos délices" },
      { type: "gift", label: "Coffret artisan", description: "Sélection de nos spécialités" }
    ]
  },
  {
    id: "3",
    name: "Carrefour",
    logo: "🛒",
    logoImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=400&fit=crop",
    type: "quiz-direct",
    title: "🛒 Quiz Supermarché",
    description: "Testez vos connaissances sur l'alimentation",
    cta: "Jouer",
    reward: "Jusqu'à +120 pts",
    background: "from-blue-400 to-blue-600",
    icon: "🎯",
    theme: "supermarché",
    questions: [
      {
        question: "Quel est le meilleur moment pour faire ses courses ?",
        options: ["Le matin", "Le soir", "Après avoir mangé", "N'importe quand"],
        correctIndex: 2,
        explanation: "Faire ses courses après avoir mangé évite les achats impulsifs !"
      },
      {
        question: "Où faut-il regarder en premier dans un magasin ?",
        options: ["Les rayons du milieu", "Le bas des étagères", "Le haut des étagères", "Les promotions"],
        correctIndex: 1,
        explanation: "Les produits les moins chers sont souvent en bas des étagères !"
      },
      {
        question: "Quelle est la meilleure façon de conserver les légumes ?",
        options: ["Au frigo", "À température ambiante", "Dans l'eau", "Au congélateur"],
        correctIndex: 0,
        explanation: "La plupart des légumes se conservent mieux au frigo !"
      },
      {
        question: "Combien de temps peut-on garder un produit après sa date limite ?",
        options: ["1 jour", "3 jours", "1 semaine", "Jamais"],
        correctIndex: 1,
        explanation: "On peut généralement consommer 2-3 jours après la DLC si bien conservé !"
      }
    ],
    scratchRewards: [
      { type: "points", amount: 60, label: "+60 points courses", description: "Bravo pour vos connaissances !" },
      { type: "coupon", label: "-15% sur vos courses", description: "Réduction valable 1 semaine" },
      { type: "coupon", label: "Produit gratuit", description: "Un produit de votre choix offert" },
      { type: "gift", label: "Coffret découverte", description: "Sélection de produits locaux" }
    ]
  },
  {
    id: "4",
    name: "Décathlon",
    logo: "🏃‍♂️",
    logoImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=center",
    mainImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
    type: "video-quiz",
    title: "🏃‍♂️ Sport & Bien-être",
    description: "Découvrez les bienfaits du sport",
    cta: "Découvrir",
    reward: "Jusqu'à +180 pts",
    background: "from-green-400 to-green-600",
    icon: "▶️",
    theme: "sport",
    questions: [
      {
        question: "Combien de temps d'activité physique par jour ?",
        options: ["15 min", "30 min", "1 heure", "2 heures"],
        correctIndex: 1,
        explanation: "L'OMS recommande 30 minutes d'activité modérée par jour !"
      },
      {
        question: "Quel est le meilleur moment pour faire du sport ?",
        options: ["Le matin", "Le midi", "Le soir", "N'importe quand"],
        correctIndex: 3,
        explanation: "Le meilleur moment est celui où vous pouvez être régulier !"
      },
      {
        question: "Combien de temps faut-il s'échauffer ?",
        options: ["5 min", "10 min", "20 min", "Pas besoin"],
        correctIndex: 1,
        explanation: "Un échauffement de 10 minutes prépare bien le corps à l'effort !"
      },
      {
        question: "Que faut-il faire après le sport ?",
        options: ["Se reposer", "S'étirer", "Manger", "Tout ça"],
        correctIndex: 3,
        explanation: "Repos, étirements et nutrition sont tous importants après l'effort !"
      }
    ],
    scratchRewards: [
      { type: "points", amount: 90, label: "+90 points sport", description: "Excellente forme physique !" },
      { type: "points", amount: 120, label: "+120 points vitalité", description: "Champion du sport !" },
      { type: "coupon", label: "-20% équipement", description: "Réduction sur vos équipements sport" },
      { type: "gift", label: "Kit sportif", description: "Coffret accessoires sport offert" }
    ]
  }
];

export default function SponsorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showSponsorFlow, setShowSponsorFlow] = useState(false);
  const [showScratchFlow, setShowScratchFlow] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);

  const next = () => setCurrentIndex((prev) => (prev + 1) % mockSponsors.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + mockSponsors.length) % mockSponsors.length);

  // autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
    
    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleSponsorClick = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setIsAutoPlaying(false); // Pause autoplay
    setShowSponsorFlow(true); // Toujours ouvrir la modale sponsor
  };

  const handleCloseModals = () => {
    setShowSponsorFlow(false);
    setShowScratchFlow(false);
    setSelectedSponsor(null);
    setIsAutoPlaying(true); // Resume autoplay
  };

  const sponsor = mockSponsors[currentIndex];

  return (
    <>
      <div className="max-w-7xl mx-auto mt-6 px-3 sm:px-4 md:px-6">
        {/* Bandeau avec vraies images */}
        <div className="max-w-6xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl shadow-lg min-h-36 cursor-grab active:cursor-grabbing overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Image de fond avec overlay */}
              <div className="absolute inset-0">
                <Image
                  src={sponsor.mainImage}
                  alt={sponsor.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${sponsor.background} opacity-80`}></div>
              </div>

              {/* Contenu */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-white p-6 sm:p-8 min-h-36">
                {/* Infos sponsor */}
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="relative">
                    {sponsor.logoImage ? (
                      <Image
                        src={sponsor.logoImage}
                        alt={sponsor.name}
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-white/30"
                      />
                    ) : (
                      <span className="text-2xl sm:text-3xl">{sponsor.logo}</span>
                    )}
                  </div>
                  <div>
                    <div className="bg-white/20 text-xs px-2 py-1 rounded-full mb-1">
                      Espace sponsorisé • {sponsor.name}
                    </div>
                    <h3 className="font-bold text-base sm:text-lg">{sponsor.title}</h3>
                    <p className="text-xs sm:text-sm opacity-90">{sponsor.description}</p>
                    {sponsor.reward && (
                      <div className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full mt-1 inline-block font-bold">
                        {sponsor.reward}
                      </div>
                    )}
                  </div>
                </div>

                {/* Zone droite : CTA */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleSponsorClick(sponsor)}
                    className="flex items-center gap-2 bg-white text-slate-800 font-bold px-4 sm:px-5 py-2 rounded-full shadow hover:scale-105 transition text-sm sm:text-base"
                  >
                    {sponsor.icon} {sponsor.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicateurs */}
          <div className="flex justify-center gap-2 mt-4">
            {mockSponsors.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex ? "bg-[#17BFA0] w-6" : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modale sponsor */}
      {selectedSponsor && showSponsorFlow && (
        <SponsorFlowModal
          visible={showSponsorFlow}
          onClose={handleCloseModals}
          sponsorData={selectedSponsor}
        />
      )}
    </>
  );
}
