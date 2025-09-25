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
  const carouselRef = useRef<HTMLDivElement>(null);

  // 🔄 Auto défilement

useEffect(() => {
  stableSetInterval();
  stableScrollBy();
  stableScrollTo();
  stableClearInterval();
}, [stableSetInterval, stableScrollBy, stableScrollTo, stableClearInterval]);;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-center mb-4">🎥 Vidéos Interactives</h2>

      {/* Carrousel */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth px-2"
      >
        {sponsors.map((s) => (
          <div
            key={s.id}
            onClick={() => setOpenSponsor(s.id)}
            className="snap-start flex-shrink-0 w-[85%] sm:w-[48%] lg:w-[30%] cursor-pointer rounded-xl overflow-hidden shadow-lg relative"
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
          </div>
        ))}
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
