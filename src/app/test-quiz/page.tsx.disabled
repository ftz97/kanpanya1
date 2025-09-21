"use client";

import { useState } from "react";

const questions = [
  {
    question: "Quel fruit est le plus riche en vitamine C ?",
    options: ["Orange", "Kiwi", "Pomme", "Banane"],
    correct: "Kiwi",
  },
  {
    question: "Combien de minutes faut-il marcher par jour pour être en bonne santé ?",
    options: ["10", "30", "60", "90"],
    correct: "30",
  },
];

export default function TestQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    console.log("Réponse sélectionnée:", answer);
    
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
      console.log("Bonne réponse!");
    } else {
      console.log("Mauvaise réponse!");
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-2">🎉 Quiz terminé !</h2>
          <p className="text-gray-700">
            Votre score : <span className="font-semibold">{score}</span> / {questions.length}
          </p>
          <p className="mt-3 text-green-600 font-medium">+{score * 15} points</p>
          <p className="mt-2 text-gray-500">Merci d&apos;avoir participé 🙏</p>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowResult(false);
            }}
            className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-green-700 mb-6">
          {questions[currentQuestion].question}
        </h2>
        <div className="flex flex-col gap-3">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="px-4 py-3 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 hover:scale-[1.02] transition"
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Question {currentQuestion + 1} sur {questions.length}
        </div>
      </div>
    </div>
  );
}
