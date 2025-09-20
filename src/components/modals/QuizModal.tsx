"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useModal } from "@/components/modal/ModalManager";

export default function QuizModal() {
  const { close } = useModal();
  const [selected, setSelected] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

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
        { id: "green", text: "#10B981" },
      ],
      correct: "teal",
      points: 10
    },
    {
      id: "q3",
      text: "Combien de points gagnez-vous en regardant une vidéo ?",
      options: [
        { id: "3", text: "3 points" },
        { id: "5", text: "5 points" }, // ✅ bonne réponse
        { id: "10", text: "10 points" },
        { id: "15", text: "15 points" },
      ],
      correct: "5",
      points: 10
    }
  ];

  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleValidate = () => {
    if (selected === currentQ.correct) {
      setScore(prev => prev + currentQ.points);
    }
    setValidated(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Quiz terminé
      console.log("Quiz terminé:", { score: score > 0 ? 1 : 0, total: questions.length, points: score });
      close();
    } else {
      // Passer à la question suivante
      setCurrentQuestion(prev => prev + 1);
      setSelected(null);
      setValidated(false);
    }
  };

  const handleClose = () => {
    close();
  };

  return (
    <div className="space-y-6">
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
        {currentQ.options.map((option, index) => (
          <QuizOption
            key={option.id}
            text={option.text}
            onClick={() => !validated && setSelected(option.id)}
            status={
              !validated ? "default" :
              option.id === currentQ.correct ? "correct" :
              option.id === selected ? "incorrect" : "default"
            }
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={handleClose}
          className="btn btn-ghost"
        >
          Fermer
        </button>
        {!validated ? (
          <button
            onClick={handleValidate}
            disabled={!selected}
            className="btn btn-primary"
          >
            Valider
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="btn btn-primary"
          >
            {isLastQuestion ? "Terminer" : "Suivant"}
          </button>
        )}
      </div>
    </div>
  );
}

// Composant QuizOption
interface OptionProps {
  text: string;
  onClick: () => void;
  status?: "default" | "correct" | "incorrect";
}

const QuizOption = ({ text, status = "default", onClick }: OptionProps) => {
  const base = "w-full py-3 px-4 rounded-xl border-2 font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white";
  
  const variants = {
    default: "border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50",
    correct: "border-green-500 bg-green-50 text-green-700",
    incorrect: "border-red-500 bg-red-50 text-red-700"
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${base} ${variants[status]}`}
    >
      {text}
    </motion.button>
  );
};
