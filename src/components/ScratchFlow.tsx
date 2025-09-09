"use client";

import { useState } from "react";
import VideoModal from "./VideoModal";
import Quiz from "./Quiz";
import ScratchCard from "./ScratchCard";
import ResultModal from "./ResultModal";

// Questions de quiz par défaut
const defaultQuestions = [
  {
    id: 1,
    question: "Quels sont les bienfaits d'une alimentation équilibrée ?",
    options: [
      "Améliore la concentration et l'énergie",
      "Renforce le système immunitaire", 
      "Favorise un meilleur sommeil",
      "Toutes les réponses ci-dessus"
    ],
    correct: 3,
    explanation: "Une alimentation équilibrée apporte tous ces bienfaits et bien plus encore !"
  },
  {
    id: 2,
    question: "Combien de portions de fruits et légumes recommande-t-on par jour ?",
    options: [
      "2-3 portions",
      "5 portions",
      "7-8 portions",
      "Autant qu'on veut"
    ],
    correct: 1,
    explanation: "L'OMS recommande au minimum 5 portions de fruits et légumes par jour."
  },
  {
    id: 3,
    question: "Quelle est la meilleure source d'hydratation ?",
    options: [
      "Les boissons énergisantes",
      "L'eau plate",
      "Les sodas",
      "Le café"
    ],
    correct: 1,
    explanation: "L'eau plate reste la meilleure source d'hydratation pour notre corps."
  }
];

// Récompenses par défaut
const defaultRewards = [
  { type: 'points' as const, amount: 50, label: '+50 points', description: 'Points bonus pour votre participation !' },
  { type: 'points' as const, amount: 100, label: '+100 points', description: 'Excellent score ! Vous gagnez des points bonus !' },
  { type: 'coupon' as const, label: 'Réduction 10%', description: 'Coupon de réduction valable chez nos partenaires !' },
  { type: 'points' as const, amount: 25, label: '+25 points', description: 'Merci d\'avoir participé au quiz !' }
];

export default function ScratchFlow() {
  const [step, setStep] = useState<"video" | "quiz" | "scratch" | "result">("video");
  const [quizScore, setQuizScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [reward, setReward] = useState<typeof defaultRewards[0] | null>(null);

  const handleVideoEnd = () => {
    setStep("quiz");
  };

  const handleQuizComplete = (score: number, total: number) => {
    setQuizScore(score);
    setTotalQuestions(total);
    
    // Calculer les points gagnés (base + bonus selon le score)
    const basePoints = score * 10; // 10 points par bonne réponse
    const bonusPoints = score === total ? 50 : 0; // Bonus si parfait
    const totalPoints = basePoints + bonusPoints;
    
    setPointsEarned(totalPoints);
    
    // Sélectionner une récompense aléatoire
    const randomReward = defaultRewards[Math.floor(Math.random() * defaultRewards.length)];
    setReward(randomReward);
    
    setStep("scratch");
  };

  const handleScratchReveal = () => {
    setStep("result");
  };

  const handleRestart = () => {
    setStep("video");
    setQuizScore(0);
    setTotalQuestions(0);
    setPointsEarned(0);
    setReward(null);
  };

  return (
    <>
      {step === "video" && (
        <VideoModal onEnd={handleVideoEnd} />
      )}
      
      {step === "quiz" && (
        <Quiz 
          questions={defaultQuestions}
          onComplete={handleQuizComplete}
          timeLimit={120} // 2 minutes
        />
      )}
      
      {step === "scratch" && (
        <ScratchCard 
          reward={reward || defaultRewards[0]}
          onReveal={handleScratchReveal}
          width={400}
          height={200}
          coverText="Grattez pour révéler votre récompense !"
        />
      )}
      
      {step === "result" && (
        <ResultModal 
          isOpen={true}
          onClose={handleRestart}
          score={quizScore}
          totalQuestions={totalQuestions}
          pointsEarned={pointsEarned}
          reward={reward}
        />
      )}
    </>
  );
}
