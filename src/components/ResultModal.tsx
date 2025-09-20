"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Star, Gift, Sparkles, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  pointsEarned: number;
  reward?: {
    type: 'points' | 'coupon';
    amount?: number;
    label: string;
    description?: string;
  };
}

export default function ResultModal({
  isOpen,
  onClose,
  score,
  totalQuestions,
  pointsEarned,
  reward
}: ResultModalProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 60;

  useEffect(() => {
    if (isOpen) {
      // Animation de confetti pour les bons scores
      if (percentage >= 70) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  }, [isOpen, percentage]);

  const getScoreMessage = () => {
    if (percentage >= 90) return "Parfait ! 🎯";
    if (percentage >= 80) return "Excellent ! 🌟";
    if (percentage >= 70) return "Très bien ! 👏";
    if (percentage >= 60) return "Bien joué ! 👍";
    if (percentage >= 50) return "Pas mal ! 💪";
    return "Continuez à vous améliorer ! 📚";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = () => {
    if (percentage >= 90) return <Trophy className="w-8 h-8 text-yellow-500" />;
    if (percentage >= 70) return <Star className="w-8 h-8 text-blue-500" />;
    return <CheckCircle className="w-8 h-8 text-green-500" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getScoreIcon()}
          </div>
          <DialogTitle className="text-2xl font-bold">
            {getScoreMessage()}
          </DialogTitle>
          <DialogDescription className="text-lg">
            Votre score : {score}/{totalQuestions}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Score détaillé */}
          <Card>
            <div className="p-4">
              <div className="text-center space-y-3">
                <div className={`text-3xl font-bold ${getScoreColor()}`}>
                  {percentage}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      percentage >= 80 ? 'bg-green-500' :
                      percentage >= 60 ? 'bg-blue-500' :
                      percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {score} bonnes réponses sur {totalQuestions} questions
                </p>
              </div>
            </div>
          </Card>

          {/* Points gagnés */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <div className="p-4">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-green-600" />
                <span className="text-lg font-semibold text-green-800">
                  +{pointsEarned} points gagnés !
                </span>
              </div>
              <p className="text-sm text-green-700 text-center mt-1">
                Vos points ont été ajoutés à votre compte
              </p>
            </div>
          </Card>

          {/* Récompense bonus */}
          {reward && (
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <div className="p-4">
                <div className="text-center space-y-2">
                  <div className="flex justify-center">
                    <Gift className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-purple-800">Récompense bonus !</h4>
                  <p className="text-sm text-purple-700">
                    {reward.description || reward.label}
                  </p>
                  {reward.type === 'points' && (
                    <div className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      <Sparkles className="w-4 h-4" />
                      +{reward.amount} points bonus
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Continuer
            </Button>
            {percentage < 70 && (
              <Button
                variant="outline"
                onClick={() => {
                  onClose();
                  // Ici vous pourriez relancer le quiz
                }}
                className="flex-1"
              >
                Rejouer
              </Button>
            )}
          </div>

          {/* Message d'encouragement */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {percentage >= 80 
                ? "Vous maîtrisez parfaitement le sujet ! 🎉"
                : percentage >= 60
                ? "Bonne compréhension, continuez comme ça ! 💪"
                : "Chaque quiz est une occasion d'apprendre ! 📚"
              }
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
