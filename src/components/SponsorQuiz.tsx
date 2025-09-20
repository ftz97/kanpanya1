"use client";

import { useState } from "react";

type QuizProps = {
  question: string;
  options: string[];
  correctIndex: number;
  onComplete: (isCorrect: boolean) => void;
};

export default function SponsorQuiz({
  question,
  options,
  correctIndex,
  onComplete,
}: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);

    setTimeout(() => {
      onComplete(index === correctIndex);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg mx-auto">
      {/* Titre */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-4">
        ❓ Quiz Interactif
      </h2>

      {/* Question */}
      <p className="text-lg text-gray-700 text-center mb-6">{question}</p>

      {/* Options */}
      <div className="space-y-4">
        {options.map((opt, i) => {
          const isCorrect = i === correctIndex;
          const isSelected = i === selected;

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`w-full px-4 py-3 rounded-xl border font-medium text-base transition transform
                ${
                  answered
                    ? isCorrect
                      ? "bg-green-500 text-white border-green-600 scale-105"
                      : isSelected
                      ? "bg-red-500 text-white border-red-600 scale-95"
                      : "bg-gray-100 text-gray-400 border-gray-200"
                    : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100 hover:scale-105"
                }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div className="mt-6 text-center">
          {selected === correctIndex ? (
            <p className="text-green-600 font-semibold text-lg animate-bounce">
              🎉 Bonne réponse !
            </p>
          ) : (
            <p className="text-red-600 font-semibold text-lg animate-shake">
              ❌ Mauvaise réponse...
            </p>
          )}
        </div>
      )}

      {/* Animation */}
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
