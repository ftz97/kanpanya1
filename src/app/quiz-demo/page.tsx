"use client";

import Quiz from "@/components/Quiz";
import MiniQuiz from "@/components/MiniQuiz";
import { useState } from "react";

const SAMPLE_QUESTIONS = [
  {
    question: "Quelle est la capitale de la France ?",
    options: ["Lyon", "Paris", "Marseille", "Toulouse"],
    correctIndex: 1
  },
  {
    question: "Combien de côtés a un triangle ?",
    options: ["2", "3", "4", "5"],
    correctIndex: 1
  },
  {
    question: "Quel est le plus grand océan du monde ?",
    options: ["Atlantique", "Pacifique", "Indien", "Arctique"],
    correctIndex: 1
  },
  {
    question: "Qui a peint la Joconde ?",
    options: ["Michel-Ange", "Léonard de Vinci", "Picasso", "Van Gogh"],
    correctIndex: 1
  }
];

export default function QuizDemoPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showMiniQuiz, setShowMiniQuiz] = useState(false);
  
  const handleQuizComplete = () => {
    if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setShowMiniQuiz(false);
  };

  const handleMiniQuizComplete = () => {
    setShowMiniQuiz(false);
    // Ici on pourrait déclencher l'affichage d'une carte à gratter
    console.log("MiniQuiz terminé ! Carte à gratter débloquée !");
  };
  
  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-4 sm:p-8">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 text-center w-full max-w-sm sm:max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#212E40] mb-4 sm:mb-6">
            🎉 Quiz Terminé !
          </h1>
          <p className="text-base sm:text-lg mb-3 sm:mb-4">
            Votre score : {score}/{SAMPLE_QUESTIONS.length}
          </p>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            {score === SAMPLE_QUESTIONS.length ? "Parfait ! 🏆" : 
             score >= SAMPLE_QUESTIONS.length * 0.7 ? "Bien joué ! 👍" : 
             "Pas mal ! Continue comme ça ! 💪"}
          </p>
          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full bg-[#17BFA0] hover:bg-[#14a58d] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-md text-sm sm:text-base"
            >
              🔄 Recommencer
            </button>
            <button
              onClick={() => setShowMiniQuiz(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-md text-sm sm:text-base"
            >
              🎯 Mini Quiz Partenaire
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (showMiniQuiz) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-4 sm:p-8">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-2xl w-full">
          <div className="mb-4 sm:mb-6 text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#212E40] mb-2">
              🎯 Mini Quiz Partenaire
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Répondez aux questions pour débloquer une carte à gratter !
            </p>
          </div>
          
          <MiniQuiz onComplete={handleMiniQuizComplete} />
          
          <div className="mt-4 sm:mt-6 text-center">
            <button
              onClick={() => setShowMiniQuiz(false)}
              className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium text-sm sm:text-base"
            >
              ← Retour au quiz principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md md:max-w-2xl w-full">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-[#212E40] mb-2">
            Quiz Démo 🎯
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Question {currentQuestion + 1} sur {SAMPLE_QUESTIONS.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-[#17BFA0] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / SAMPLE_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Quiz
          question={SAMPLE_QUESTIONS[currentQuestion].question}
          options={SAMPLE_QUESTIONS[currentQuestion].options}
          correctIndex={SAMPLE_QUESTIONS[currentQuestion].correctIndex}
          onComplete={handleQuizComplete}
        />
      </div>
    </div>
  );
}
