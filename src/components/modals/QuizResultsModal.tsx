"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useModals } from "@/components/system/ModalManager";
import { ScratchCard } from "@/components/ScratchCard";
import type { ScratchReward } from "@/hooks/useScratchAvailability";


interface QuizResults {
  score: number;
  total: number;
  points: number;
}

export default function QuizResultsModal({ results }: { results: QuizResults }) {
  const { pop } = useModals();
  const [scratchReward, setScratchReward] = React.useState<ScratchReward | null>(null);
  const [showReward, setShowReward] = React.useState(false);

  // Calculer la récompense basée sur le score
  React.useEffect(() => {
    const percentage = (results.score / results.total) * 100;
    let newReward: ScratchReward;

    if (percentage >= 80) {
      // Excellent : 20% de chance de coupon, 80% de points bonus
      if (Math.random() < 0.2) {
        newReward = {
          type: 'coupon',
          label: '🎉 15% de réduction !',
          code: 'QUIZ15'
        };
      } else {
        newReward = {
          type: 'points',
          amount: 50,
          label: '🌟 +50 points bonus !'
        };
      }
    } else if (percentage >= 60) {
      // Bon : 10% de chance de coupon, 90% de points
      if (Math.random() < 0.1) {
        newReward = {
          type: 'coupon',
          label: '🎊 10% de réduction !',
          code: 'QUIZ10'
        };
      } else {
        newReward = {
          type: 'points',
          amount: 25,
          label: '👍 +25 points bonus !'
        };
      }
    } else {
      // Faible : 5% de chance de coupon, 30% de points minimes, 65% de rien
      if (Math.random() < 0.05) {
        newReward = {
          type: 'coupon',
          label: '🍀 5% de réduction !',
          code: 'QUIZ5'
        };
      } else if (Math.random() < 0.35) {
        newReward = {
          type: 'points',
          amount: 10,
          label: '💪 +10 points bonus !'
        };
      } else {
        newReward = {
          type: 'points',
          amount: 0,
          label: '😔 Pas de bonus cette fois...'
        };
      }
    }

    setScratchReward(newReward);
  }, [results]);

  const handleScratchReveal = () => {
    setShowReward(true);
    // Animation de confettis si c'est une bonne récompense
    if (scratchReward && (scratchReward.type === 'coupon' || scratchReward.amount > 0)) {
      import('canvas-confetti').then(confetti => {
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: scratchReward.type === 'coupon' ? ['#FFD700', '#FFA500'] : ['#10B981', '#34D399']
        });
      });
    }
  };

  const getScoreEmoji = () => {
    const percentage = (results.score / results.total) * 100;
    if (percentage >= 80) return '🏆';
    if (percentage >= 60) return '🥈';
    if (percentage >= 40) return '🥉';
    return '💪';
  };

  const getScoreMessage = () => {
    const percentage = (results.score / results.total) * 100;
    if (percentage >= 80) return 'Excellent !';
    if (percentage >= 60) return 'Bien joué !';
    if (percentage >= 40) return 'Pas mal !';
    return 'Continuez !';
  };

  return (
    <div className="space-y-6 p-8">
      {/* Header avec score */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-6xl mb-4">{getScoreEmoji()}</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {getScoreMessage()}
        </h2>
        <div className="text-xl text-gray-600">
          <span className="font-bold text-teal-600">{results.score}</span> / {results.total} bonnes réponses
        </div>
        <div className="text-lg text-gray-500 mt-2">
          +{results.points} points de base
        </div>
      </motion.div>

      {/* Scratch Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center"
      >
        <ScratchCard
          reward={scratchReward || { type: 'points', amount: 0, label: 'Grattez pour découvrir votre récompense !' }}
          onReveal={handleScratchReveal}
          width={300}
          height={200}
          coverText="🎁 GRATTEZ ICI 🎁"
        />
      </motion.div>

      {/* Pop-up de récompense */}
      {showReward && scratchReward && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative p-6 rounded-2xl bg-gradient-to-r ${
            scratchReward.type === 'coupon' ? 'from-yellow-400 to-orange-500' :
            scratchReward.amount > 25 ? 'from-green-400 to-emerald-500' :
            scratchReward.amount > 0 ? 'from-blue-400 to-cyan-500' :
            'from-gray-300 to-gray-400'
          } text-white text-center shadow-2xl`}
        >
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl mb-3"
          >
            {scratchReward.type === 'coupon' ? '🎉' : 
             scratchReward.amount > 0 ? '🌟' : '😔'}
          </motion.div>
          
          <h3 className="text-xl font-bold mb-2">
            {scratchReward.label}
          </h3>
          
          {scratchReward.type === 'coupon' && scratchReward.code && (
            <div className="text-lg font-mono bg-white/20 rounded-lg p-2 mt-2">
              Code: {scratchReward.code}
            </div>
          )}
          
          {scratchReward.type === 'points' && scratchReward.amount > 0 && (
            <div className="text-2xl font-bold">
              +{scratchReward.amount} points
            </div>
          )}
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex gap-3 justify-center"
      >
        <button
          onClick={pop}
          className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all duration-150 shadow-lg active:scale-95"
        >
          Continuer
        </button>
      </motion.div>
    </div>
  );
}
