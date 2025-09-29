"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import SponsorFlowModal from "./SponsorFlowModal";

const sponsors = [
  {
    id: "mutuelle",
    title: "Mutuelle Locale",
    description: "Découvrez nos services de santé et gagnez des points !",
    image: "/ads/mutuelle.png",
    videoSrc: "/videos/mutuelle.mp4",
    quiz: [
      { question: "Quel est le rôle principal d'une mutuelle ?", options: ["Assurer les soins", "Vendre des produits", "Organiser du sport"], correctIndex: 0 },
      { question: "Combien de repas équilibrés faut-il viser par jour ?", options: ["1", "2", "3"], correctIndex: 2 },
    ],
  },
  {
    id: "carrefour",
    title: "Carrefour Bio",
    description: "Goûtez aux saveurs bio locales avec Carrefour !",
    image: "/ads/carrefour.png",
    videoSrc: "/videos/carrefour.mp4",
    quiz: [
      { question: "Quelle est la certification bio en Europe ?", options: ["AB", "CE", "ISO"], correctIndex: 0 },
      { question: "Les fruits bio contiennent-ils moins de pesticides ?", options: ["Oui", "Non"], correctIndex: 0 },
    ],
  },
  {
    id: "decathlon",
    title: "Décathlon Sport",
    description: "Bougez plus avec Décathlon, gagnez en énergie !",
    image: "/ads/decathlon.png",
    videoSrc: "/videos/decathlon.mp4",
    quiz: [
      { question: "Quelle activité est recommandée pour rester en forme ?", options: ["Regarder la TV", "Faire du sport", "Dormir toute la journée"], correctIndex: 1 },
      { question: "Combien de minutes d'activité physique par jour ?", options: ["10", "30", "90"], correctIndex: 1 },
    ],
  },
  {
    id: "decathlon2",
    title: "Décathlon Running",
    description: "Cours avec style et gagne des points !",
    image: "/ads/decathlon2.png",
    videoSrc: "/videos/decathlon2.mp4",
    quiz: [
      { question: "Quel équipement est essentiel pour courir ?", options: ["Chaussures adaptées", "Casquette fashion", "Sac à dos lourd"], correctIndex: 0 },
      { question: "Combien de fois par semaine est-il conseillé de courir ?", options: ["1", "3", "7"], correctIndex: 1 },
    ],
  },
];

export default function SponsorCarousel() {
  const [openSponsor, setOpenSponsor] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // 🔄 Auto défilement avec carte centrale
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-center mb-4">🎥 Vidéos Interactives</h2>

      {/* Carrousel avec carte centrale */}
      <div className="px-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth">
          {sponsors.map((s, index) => {
            const isCenter = index === currentIndex;
            return (
              <div
                key={s.id}
                onClick={() => setOpenSponsor(s.id)}
                className={`snap-start flex-shrink-0 cursor-pointer rounded-xl overflow-hidden relative transition-all duration-500 ease-out ${
                  isCenter 
                    ? "w-[90%] sm:w-[60%] lg:w-[40%] scale-105 shadow-2xl z-10" 
                    : "w-[70%] sm:w-[45%] lg:w-[25%] scale-95 opacity-70"
                }`}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-48 md:h-60 lg:h-72 object-cover"
                  onError={(e) => (e.currentTarget.src = "/ads/fallback.png")}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3">
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <p className="text-sm">{s.description}</p>
                </div>
                {isCenter && (
                  <div className="absolute top-2 right-2 bg-[#17BFA0] text-white px-2 py-1 rounded-full text-xs font-bold">
                    ⭐ Focus
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Indicateurs */}
        <div className="flex justify-center gap-2 mt-4">
          {sponsors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-[#17BFA0] w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 🎥 Modal sponsor */}
      {sponsors.map((s) => (
        <SponsorFlowModal
          key={s.id}
          open={openSponsor === s.id}
          onClose={() => setOpenSponsor(null)}
          sponsorName={s.title}
          videoSrc={s.videoSrc}
          quizQuestions={s.quiz}
        />
      ))}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
