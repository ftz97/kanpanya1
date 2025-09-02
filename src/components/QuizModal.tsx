"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type OptionStatus = "default" | "selected" | "correct" | "wrong";

interface OptionProps {
  text: string;
  status?: OptionStatus;
  onClick?: () => void;
}

const QuizOption = ({ text, status = "default", onClick }: OptionProps) => {
  const base =
    "w-full py-3 px-4 rounded-xl border-2 font-semibold transition-all duration-200";

  const variants: Record<OptionStatus, string> = {
    default: "border-teal-400 text-teal-600 bg-white hover:bg-teal-50",
    selected:
      "border-blue-500 bg-blue-100 text-blue-600 shadow-md scale-105",
    correct:
      "border-green-500 bg-green-100 text-green-700 shadow-lg scale-105 animate-pulse",
    wrong: "border-red-500 bg-red-100 text-red-600 line-through shadow-md",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className={`${base} ${variants[status]}`}
    >
      {text}
    </motion.button>
  );
};

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (result: { score: number; total: number; points: number }) => void;
}

export default function QuizModal({ isOpen, onClose, onComplete }: QuizModalProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      id: "q1",
      text: "Quelle est une bonne source de protéines végétales ?",
      options: [
        { id: "banane", text: "Banane" },
        { id: "concombre", text: "Concombre" },
        { id: "lentilles", text: "Lentilles" }, // ✅ bonne réponse
        { id: "pdt", text: "Pomme de terre" },
      ],
      correct: "lentilles",
      points: 10
    },
    {
      id: "q2", 
      text: "Quel est le code couleur principal de Kanpanya ?",
      options: [
        { id: "red", text: "#FF0000" },
        { id: "teal", text: "#14B8A6" }, // ✅ bonne réponse
        { id: "blue", text: "#3B82F6" },
        { id: "orange", text: "#F59E0B" },
      ],
      correct: "teal",
      points: 15
    }
  ];

  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleSelect = (id: string) => {
    if (!validated) setSelected(id);
  };

  const handleValidate = () => {
    setValidated(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculer le score final
      const totalPoints = questions.reduce((acc, q) => {
        return acc + (selected === q.correct ? q.points : 0);
      }, 0);
      
      onComplete?.({
        score: selected === currentQ.correct ? 1 : 0,
        total: questions.length,
        points: totalPoints
      });
      onClose();
    } else {
      // Passer à la question suivante
      setCurrentQuestion(prev => prev + 1);
      setSelected(null);
      setValidated(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl w-full max-w-md space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-teal-600 font-bold text-lg">Quiz Nutrition</h2>
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        {/* Question */}
        <motion.p 
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center font-semibold text-lg"
        >
          {currentQ.text}
        </motion.p>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt) => {
            let status: OptionStatus = "default";

            if (validated) {
              if (opt.id === currentQ.correct) status = "correct";
              else if (opt.id === selected) status = "wrong";
            } else if (selected === opt.id) {
              status = "selected";
            }

            return (
              <QuizOption
                key={opt.id}
                text={opt.text}
                status={status}
                onClick={() => handleSelect(opt.id)}
              />
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="pt-4 text-center">
          {!validated ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleValidate}
              disabled={!selected}
              className="px-6 py-2 rounded-lg bg-teal-500 text-white font-bold shadow-md disabled:bg-gray-300 transition"
            >
              Valider
            </motion.button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                {selected === currentQ.correct ? "✅ Bonne réponse !" : "❌ Mauvaise réponse"}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="px-6 py-2 rounded-lg bg-primary text-white font-bold shadow-md"
              >
                {isLastQuestion ? "Terminer le quiz" : "Question suivante"}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
