"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, HelpCircle, Image, Gift, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mockSponsors.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mockSponsors.length) % mockSponsors.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered]);

  const handleSponsorClick = (sponsor: Sponsor) => {
    // Action directe selon le type
    switch (sponsor.type) {
      case "video":
        alert(`🎬 Vidéo: ${sponsor.title}\n${sponsor.description}`);
        break;
      case "quiz":
        alert(`🧠 Quiz: ${sponsor.title}\n${sponsor.description}`);
        break;
      case "scratch":
        alert(`🎟️ Scratch: ${sponsor.title}\n${sponsor.description}`);
        break;
      case "simple":
        alert(`💰 Offre: ${sponsor.title}\nCode: ${sponsor.content?.code || 'N/A'}`);
        break;
      default:
        alert(`📢 ${sponsor.title}\n${sponsor.description}`);
    }
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
      {/* Titre de section avec contrôles */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-[#123456]">
          📢 Contenus sponsorisés
        </h2>
        <div className="flex items-center gap-2">
          {/* Bouton play/pause */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110 ${
              isAutoPlaying 
                ? "bg-red-500 text-white hover:bg-red-600" 
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
            title={isAutoPlaying ? "Pause" : "Play"}
          >
            {isAutoPlaying ? "⏸️" : "▶️"}
          </button>
          {/* Boutons de navigation */}
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
            title="Précédent"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
            title="Suivant"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carrousel moderne avec AnimatePresence */}
      <div 
        className="relative overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={containerRef}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex justify-center"
          >
            <div
              className="w-[320px] sm:w-[380px] bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-105"
              onClick={() => handleSponsorClick(mockSponsors[currentIndex])}
            >
              {/* Header avec logo et type */}
              <div className="relative p-5 bg-gradient-to-br from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{mockSponsors[currentIndex].logo}</span>
                    <span className="font-semibold text-sm text-gray-700">{mockSponsors[currentIndex].name}</span>
                  </div>
                  <div className={`p-2 rounded-full ${getTypeColor(mockSponsors[currentIndex].type)} text-white shadow-lg`}>
                    {getTypeIcon(mockSponsors[currentIndex].type)}
                  </div>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <span className="text-5xl">{mockSponsors[currentIndex].thumbnail}</span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-xl text-[#123456] mb-3">{mockSponsors[currentIndex].title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{mockSponsors[currentIndex].description}</p>
                <button className="w-full bg-[#17BFA0] text-white py-3 rounded-xl font-medium hover:bg-[#14a58d] transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  {mockSponsors[currentIndex].cta}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Indicateurs modernes */}
      <div className="flex justify-center gap-3 mt-6">
        {mockSponsors.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-[#17BFA0] w-8 shadow-lg" 
                : "bg-gray-300 w-2 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#17BFA0] to-[#14a58d] rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
          key={currentIndex}
        />
      </div>

    </div>
  );
}
