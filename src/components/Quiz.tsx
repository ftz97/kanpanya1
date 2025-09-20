"use client";

import { useState } from "react";

type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

export default function Quiz({
  question,
  options,
  correctIndex,
  onComplete,
}: QuizQuestion & { onComplete: () => void }) {
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);

    // petit délai pour laisser respirer l'animation
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Question en carte */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md text-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 px-2">
          ❓ {question}
        </h2>
      </div>

      {/* Options sous forme de cartes cliquables */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md">
        {options.map((opt, i) => {
          const isSelected = i === selected;
          const isCorrect = i === correctIndex;

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={answered}
              className={`rounded-xl shadow-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-semibold transition transform w-full
                ${
                  answered
                    ? isCorrect
                      ? "bg-green-500 text-white scale-105"
                      : isSelected
                      ? "bg-red-500 text-white scale-95"
                      : "bg-gray-200 text-gray-400"
                    : "bg-white text-gray-800 hover:bg-gray-100 hover:scale-105"
                }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback visuel */}
      {answered && (
        <div className="mt-4 sm:mt-6 text-center">
          {selected === correctIndex ? (
            <p className="text-green-600 font-bold text-base sm:text-lg animate-bounce">
              🎉 Bravo, bonne réponse !
            </p>
          ) : (
            <p className="text-red-600 font-bold text-base sm:text-lg animate-shake">
              ❌ Mauvaise réponse...
            </p>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          50% {
            transform: translateX(4px);
          }
          75% {
            transform: translateX(-4px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-shake {
          animation: shake 0.4s;
        }
      `}</style>
    </div>
  );
}
