"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, HelpCircle, Image, Gift } from "lucide-react";

// Types pour les sponsors
interface Sponsor {
  id: string;
  name: string;
  logo: string;
  type: "video" | "quiz" | "scratch" | "image-quiz" | "simple";
  title: string;
  description: string;
  thumbnail: string;
  cta: string;
  content?: any;
}

// Données mock pour les sponsors
const mockSponsors: Sponsor[] = [
  {
    id: "1",
    name: "Mutuelle Locale",
    logo: "🏥",
    type: "video",
    title: "Vidéo Nutrition",
    description: "Découvrez les secrets d'une alimentation équilibrée",
    thumbnail: "🎬",
    cta: "Regarder",
    content: {
      videoUrl: "https://example.com/video1.mp4",
      duration: "3:45"
    }
  },
  {
    id: "2",
    name: "Boulangerie Artisanale",
    logo: "🥖",
    type: "quiz",
    title: "Quiz Boulangerie",
    description: "Testez vos connaissances sur le pain artisanal",
    thumbnail: "❓",
    cta: "Participer",
    content: {
      questions: [
        { q: "Quel est le temps de fermentation idéal ?", a: ["2h", "12h", "24h", "48h"], correct: 2 },
        { q: "Quelle farine est la plus riche ?", a: ["T45", "T65", "T80", "T110"], correct: 3 },
        { q: "À quelle température cuire ?", a: ["180°C", "200°C", "220°C", "240°C"], correct: 3 },
        { q: "Quel est le secret du croustillant ?", a: ["L'eau", "Le sel", "La vapeur", "Le temps"], correct: 2 }
      ]
    }
  },
  {
    id: "3",
    name: "Café du Coin",
    logo: "☕",
    type: "scratch",
    title: "Ticket Café",
    description: "Grattez pour gagner une boisson offerte",
    thumbnail: "🎟️",
    cta: "Gratter",
    content: {
      reward: "Boisson offerte",
      probability: 0.3
    }
  },
  {
    id: "4",
    name: "Fleuriste Local",
    logo: "🌸",
    type: "image-quiz",
    title: "Quiz Fleurs",
    description: "Reconnaissez-vous ces fleurs de saison ?",
    thumbnail: "🌺",
    cta: "Découvrir",
    content: {
      image: "https://example.com/fleurs.jpg",
      questions: [
        { q: "Quelle fleur fleurit en hiver ?", a: ["Rose", "Tulipe", "Cyclamen", "Lavande"], correct: 2 },
        { q: "Quelle couleur attire les abeilles ?", a: ["Rouge", "Bleu", "Jaune", "Violet"], correct: 2 }
      ]
    }
  },
  {
    id: "5",
    name: "Épicerie Bio",
    logo: "🥬",
    type: "simple",
    title: "Offre Spéciale",
    description: "10% de réduction sur tous les produits bio",
    thumbnail: "💰",
    cta: "Profiter",
    content: {
      offer: "10% de réduction",
      code: "BIO10",
      validUntil: "31/12/2024"
    }
  }
];

export default function SponsorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mockSponsors.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mockSponsors.length) % mockSponsors.length);
  };

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || showPopup) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, showPopup, currentIndex]);

  const handleSponsorClick = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setShowPopup(true);
    setIsAutoPlaying(false); // Pause auto-play when popup opens
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedSponsor(null);
    setIsAutoPlaying(true); // Resume auto-play when popup closes
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Play className="w-4 h-4" />;
      case "quiz": return <HelpCircle className="w-4 h-4" />;
      case "scratch": return <Gift className="w-4 h-4" />;
      case "image-quiz": return <Image className="w-4 h-4" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-red-500";
      case "quiz": return "bg-blue-500";
      case "scratch": return "bg-purple-500";
      case "image-quiz": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 sm:mt-8 md:mt-10 px-3 sm:px-4 md:px-6">
      {/* Titre de section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-[#123456]">
          📢 Contenus sponsorisés
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              prevSlide();
              setIsAutoPlaying(false); // Pause auto-play on manual navigation
            }}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              nextSlide();
              setIsAutoPlaying(false); // Pause auto-play on manual navigation
            }}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-2 rounded-full shadow-md transition ${
              isAutoPlaying 
                ? "bg-[#17BFA0] text-white hover:bg-[#14a58d]" 
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
            title={isAutoPlaying ? "Pause auto-play" : "Reprendre auto-play"}
          >
            {isAutoPlaying ? "⏸️" : "▶️"}
          </button>
        </div>
      </div>

      {/* Carrousel */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: -currentIndex * 320 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {mockSponsors.map((sponsor) => (
            <motion.div
              key={sponsor.id}
              className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => handleSponsorClick(sponsor)}
              whileHover={{ y: -5 }}
            >
              {/* Header avec logo et type */}
              <div className="relative p-4 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{sponsor.logo}</span>
                    <span className="font-semibold text-sm text-gray-700">{sponsor.name}</span>
                  </div>
                  <div className={`p-1 rounded-full ${getTypeColor(sponsor.type)} text-white`}>
                    {getTypeIcon(sponsor.type)}
                  </div>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="h-32 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                <span className="text-4xl">{sponsor.thumbnail}</span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-[#123456] mb-2">{sponsor.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{sponsor.description}</p>
                <button className="w-full bg-[#17BFA0] text-white py-2 rounded-lg font-medium hover:bg-[#14a58d] transition">
                  {sponsor.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Indicateurs */}
      <div className="flex justify-center gap-2 mt-4">
        {mockSponsors.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false); // Pause auto-play on manual navigation
            }}
            className={`w-2 h-2 rounded-full transition ${
              index === currentIndex ? "bg-[#17BFA0]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Popup pour le contenu sponsorisé */}
      <AnimatePresence>
        {showPopup && selectedSponsor && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Header du popup */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedSponsor.logo}</span>
                    <div>
                      <h3 className="font-semibold text-lg text-[#123456]">{selectedSponsor.name}</h3>
                      <p className="text-sm text-gray-500">{selectedSponsor.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={closePopup}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Contenu du popup selon le type */}
              <div className="p-6">
                {selectedSponsor.type === "video" && (
                  <div className="text-center">
                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <Play className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{selectedSponsor.description}</p>
                    <button className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition">
                      ▶️ Lancer la vidéo
                    </button>
                  </div>
                )}

                {selectedSponsor.type === "quiz" && (
                  <div className="text-center">
                    <div className="w-full h-32 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <HelpCircle className="w-12 h-12 text-blue-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{selectedSponsor.description}</p>
                    <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition">
                      🧠 Commencer le quiz
                    </button>
                  </div>
                )}

                {selectedSponsor.type === "scratch" && (
                  <div className="text-center">
                    <div className="w-full h-32 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Gift className="w-12 h-12 text-purple-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{selectedSponsor.description}</p>
                    <button className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition">
                      🎟️ Gratter le ticket
                    </button>
                  </div>
                )}

                {selectedSponsor.type === "image-quiz" && (
                  <div className="text-center">
                    <div className="w-full h-32 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Image className="w-12 h-12 text-green-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{selectedSponsor.description}</p>
                    <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition">
                      🌸 Voir l'image + Quiz
                    </button>
                  </div>
                )}

                {selectedSponsor.type === "simple" && (
                  <div className="text-center">
                    <div className="w-full h-32 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                      <Gift className="w-12 h-12 text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{selectedSponsor.description}</p>
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <p className="text-sm font-medium text-gray-700">Code: {selectedSponsor.content?.code}</p>
                      <p className="text-xs text-gray-500">Valide jusqu'au {selectedSponsor.content?.validUntil}</p>
                    </div>
                    <button className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium hover:bg-yellow-600 transition">
                      💰 Utiliser l'offre
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
