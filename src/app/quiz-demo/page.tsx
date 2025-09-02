"use client";

import InteractiveOfferQuiz from "@/components/InteractiveOfferQuiz";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function QuizDemoPage() {
  const [open, setOpen] = useState(false);
  const [lastResult, setLastResult] = useState<{ score: number; total: number; points: number } | null>(null);
  
  const handleQuizComplete = (result: { score: number; total: number; points: number }) => {
    setLastResult(result);
    console.log('Quiz terminé:', result);
    // Ici vous pourriez envoyer les données à votre API, analytics, etc.
  };
  
  return (
    <div className="min-h-screen bg-[#F2F2F2] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#212E40] mb-6">
          Démonstration Quiz Interactif 🎯
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-xl font-semibold text-[#212E40]">
            Testez le quiz nutrition
          </h2>
          
          <p className="text-gray-600 leading-relaxed">
            Cliquez sur le bouton ci-dessous pour lancer le quiz interactif. 
            Vous répondrez à 4 questions aléatoires sur la nutrition et la santé, 
            et vous verrez une animation de confettis à la fin ! 🎉
          </p>
          
          <div className="flex gap-4">
            <Button 
              onClick={() => setOpen(true)}
              className="bg-[#17BFA0] hover:bg-[#14a58d] text-white px-6 py-3 rounded-xl font-semibold shadow-md"
            >
              🚀 Lancer le quiz (10 pts/bonne réponse)
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setOpen(true)}
              className="border-[#17BFA0] text-[#17BFA0] hover:bg-[#F9FFFD] px-6 py-3 rounded-xl font-semibold"
            >
              📚 Démarrer l'offre interactive
            </Button>
          </div>
          
          {lastResult && (
            <div className="bg-[#E9FFF6] border border-[#17BFA0] rounded-xl p-4">
              <h3 className="font-semibold text-[#17BFA0] mb-2">
                🎉 Dernier résultat
              </h3>
              <p className="text-sm text-gray-600">
                Score: {lastResult.score}/{lastResult.total} • Points gagnés: {lastResult.points}
              </p>
            </div>
          )}
          
          <div className="bg-[#F9FFFD] border border-[#17BFA0] rounded-xl p-4">
            <h3 className="font-semibold text-[#17BFA0] mb-2">
              💡 Comment ça marche ?
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 4 questions aléatoires sur la nutrition</li>
              <li>• Répondez en cliquant sur les options</li>
              <li>• Feedback visuel immédiat (vert/rouge)</li>
              <li>• 10 points par bonne réponse</li>
              <li>• Votre score s'affiche à la fin</li>
              <li>• Animation de confettis pour célébrer !</li>
            </ul>
          </div>
        </div>
      </div>
      
      <InteractiveOfferQuiz 
        open={open} 
        onOpenChange={setOpen}
        pointsPerCorrect={10}
        onComplete={handleQuizComplete}
      />
    </div>
  );
}
