"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, HelpCircle, Image, Gift } from "lucide-react";

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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      
      // Si on arrive à la fin du premier set, on saute au début du second set
      if (newIndex >= mockSponsors.length) {
        setTimeout(() => {
          setCurrentIndex(0);
          setIsTransitioning(false);
        }, 600);
        return mockSponsors.length;
      }
      
      setTimeout(() => setIsTransitioning(false), 600);
      return newIndex;
    });
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      
      // Si on va en négatif, on saute à la fin du premier set
      if (newIndex < 0) {
        setTimeout(() => {
          setCurrentIndex(mockSponsors.length - 1);
          setIsTransitioning(false);
        }, 600);
        return mockSponsors.length - 1;
      }
      
      setTimeout(() => setIsTransitioning(false), 600);
      return newIndex;
    });
  };

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, isTransitioning]);

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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-[#123456]">
          📢 Contenus sponsorisés
        </h2>
        <div className="flex items-center gap-2">
          {/* Boutons de navigation */}
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-50 transition"
            title="Précédent"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-50 transition"
            title="Suivant"
          >
            →
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

      {/* Carrousel avec boucle infinie */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: -currentIndex * 336 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Dupliquer les éléments pour une boucle infinie */}
          {[...mockSponsors, ...mockSponsors].map((sponsor, index) => (
            <div
              key={`${sponsor.id}-${index}`}
              className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => handleSponsorClick(sponsor)}
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
            </div>
          ))}
        </motion.div>
      </div>

      {/* Indicateurs */}
      <div className="flex justify-center gap-2 mt-4">
        {mockSponsors.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isTransitioning) return;
              setCurrentIndex(index);
              setIsAutoPlaying(false); // Pause auto-play on manual navigation
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === (currentIndex % mockSponsors.length) ? "bg-[#17BFA0] w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

    </div>
  );
}
