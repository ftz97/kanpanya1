"use client";

import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

const DEFAULT_QUESTIONS: Question[] = [
  {
    question: "Quel est le rôle d'une mutuelle ?",
    options: ["Protéger la santé", "Vendre des chaussures"],
    correctIndex: 0,
  },
  {
    question: "Que gagnez-vous avec ce partenaire ?",
    options: ["Des points Kanpanya", "Un abonnement Netflix"],
    correctIndex: 0,
  },
];

export default function MiniQuiz({ 
  onComplete, 
  questions 
}: { 
  onComplete: (score: number) => void;
  questions?: Question[];
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const quizQuestions = questions || DEFAULT_QUESTIONS;
  const question = quizQuestions[current];

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);

    // Compter les bonnes réponses
    if (index === question.correctIndex) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (current < quizQuestions.length - 1) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
        setAnswered(false);
      } else {
        onComplete(score + (index === question.correctIndex ? 1 : 0));
      }
    }, 900);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 w-full max-w-xs sm:max-w-sm text-center">
      <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 px-2">
        ❓ {question.question}
      </h2>

      <div className="space-y-1.5 sm:space-y-2">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctIndex;
          const isSelected = i === selected;

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition
                ${
                  answered
                    ? isCorrect
                      ? "bg-green-500 text-white"
                      : isSelected
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-400"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <p className="mt-2 sm:mt-3 text-xs text-gray-500">
        Question {current + 1} / {quizQuestions.length}
      </p>
    </div>
  );
}
