"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { calculateDistance, formatDistance } from "@/utils/calculateDistance";
import "swiper/css";
import "swiper/css/pagination";

interface Actu {
  merchant: string;
  title: string;
  desc: string;
  image?: string;
  logo?: string;
  coordinates?: { lat: number; lon: number };
  hasQuiz?: boolean;
  quiz?: {
    questions: Array<{
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }>;
  };
}

interface ActusSectionProps {
  actus: Actu[];
  userPosition?: { lat: number; lon: number } | null;
}

export default function ActusSection({ actus, userPosition }: ActusSectionProps) {
  const [progress, setProgress] = useState(1 / actus.length);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedActu, setSelectedActu] = useState<Actu | null>(null);

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-semibold text-[#123456]">📰 Actus commerçants</h2>
          <a 
            href="/actus"
            className="text-xs sm:text-sm text-[#17BFA0] font-medium hover:underline flex items-center gap-1"
          >
            Voir tout
            <span className="text-lg">→</span>
          </a>
        </div>
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView="auto"
          pagination={{ clickable: true }}
          grabCursor={true}
          className="overflow-visible"
          onSlideChange={(swiper) =>
            setProgress((swiper.activeIndex + 1) / actus.length)
          }
        >
          {actus.map((a, idx) => {
            // Calculer la distance si position utilisateur disponible
            const distance = userPosition && a.coordinates 
              ? calculateDistance(userPosition, a.coordinates)
              : null;
            
            // Debug
            if (idx === 0) {
              console.log("🔍 ActusSection debug:", {
                userPosition,
                coordinates: a.coordinates,
                distance,
                showBadge: distance && distance <= 2000
              });
            }

            return (
              <SwiperSlide key={idx} className="!w-72 sm:!w-80">
                <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col min-h-[280px] border border-gray-200">
                  {/* Image principale */}
                  {a.image && (
                    <div className="relative h-32 w-full overflow-hidden">
                      <Image 
                        src={a.image} 
                        alt={a.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      
                      {/* Badge distance (si < 2km) */}
                      {distance && distance <= 2000 && (
                        <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-[11px] font-medium shadow-md">
                          📍 {formatDistance(distance)}
                        </span>
                      )}
                      
                      {/* Badge Quiz */}
                      {a.hasQuiz && (
                        <span className="absolute top-3 left-3 bg-[#17BFA0] text-white px-2 py-1 rounded text-[11px] font-medium shadow-md">
                          🧠 Quiz
                        </span>
                      )}
                      
                      {/* Logo rond en overlay */}
                      {a.logo && (
                        <div className="absolute bottom-2 left-2 w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white z-10">
                          <Image 
                            src={a.logo} 
                            alt={a.merchant}
                            width={48}
                            height={48}
                            className="object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  )}
                
                {/* Contenu */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="font-bold text-[#123456] truncate">{a.title}</p>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">{a.desc}</p>
                  <p className="mt-auto text-xs sm:text-sm text-[#17BFA0] font-semibold truncate">
                    {a.merchant}
                  </p>
                  
                  {/* Bouton Quiz */}
                  {a.hasQuiz && (
                    <button 
                      onClick={() => {
                        setSelectedActu(a);
                        setShowQuiz(true);
                      }}
                      className="mt-2 bg-[#17BFA0] text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-[#14a58e] transition-colors"
                    >
                      🧠 Faire le quiz
                    </button>
                  )}
                </div>
              </div>
            </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      
      {/* Progress bar intégrée */}
      <div className="h-1 bg-gray-200 rounded-full mt-3 overflow-hidden">
        <motion.div
          className="h-full bg-teal-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        />
      </div>

      {/* Modale Quiz */}
      {showQuiz && selectedActu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#17BFA0]">
                Quiz {selectedActu.merchant}
              </h3>
              <button 
                onClick={() => setShowQuiz(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {selectedActu.quiz?.questions.map((q, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{q.question}</h4>
                  <div className="space-y-2">
                    {q.options.map((option, optIdx) => (
                      <div 
                        key={optIdx}
                        className={`p-2 rounded text-sm ${
                          optIdx === q.correctIndex 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-gray-50 text-gray-700'
                        }`}
                      >
                        {optIdx === q.correctIndex ? '✅ ' : '○ '}{option}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-2 italic">
                    💡 {q.explanation}
                  </p>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setShowQuiz(false)}
              className="w-full mt-4 bg-[#17BFA0] text-white py-2 rounded-lg font-medium hover:bg-[#14a58e] transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}

