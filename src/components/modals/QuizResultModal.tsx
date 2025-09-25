"use client";
import { useModal } from "@/components/modal/ModalManager";
import { useRouter } from "next/navigation";
import { useScratchAvailability } from "@/hooks/useScratchAvailability";
// Composants UI inline pour éviter les problèmes d'import
const Button = ({ children, onClick, className = "", variant = "default" }: unknown) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";
  const variantClasses = {
    default: "bg-[#17BFA0] text-white hover:bg-[#14a58d]",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }: unknown) => (
  <div className={`rounded-xl border bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }: unknown) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }: unknown) => (
  <div className={`font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </div>
);

const CardDescription = ({ children, className = "" }: unknown) => (
  <div className={`text-sm text-gray-500 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }: unknown) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

import { Trophy, Gift, ArrowRight } from "lucide-react";

function QuizResultModal({ reward, score, total }: { 
  reward: string; 
  score: number; 
  total: number; 
}) {
  const { pop } = useModals();
  const router = useRouter();
  const { activate } = useScratchAvailability();
  
  const percentage = (score / total) * 100;
  const isGoodScore = percentage >= 60;
  
  const handleGoToScratch = () => {
    // Activer un ticket basé sur le score du quiz
    const points = Math.floor(score * 5); // 5 points par bonne réponse
    activate({
      quizId: `quiz-${Date.now()}`,
      points,
      label: `+${points} points (Quiz: ${score}/${total})`
    });
    
    // Fermer le modal et rediriger vers la page scratch
    close();
    router.push('/scratch');
  };
  
  return (
    <div className="p-8 max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">
            {isGoodScore ? "Excellent ! 🎉" : "Bien joué ! 👏"}
          </CardTitle>
          <CardDescription>
            Vous avez obtenu {score} bonnes réponses sur {total}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center">
            <div className="text-3xl font-bold text-[#17BFA0] mb-2">
              {percentage.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600">
              {isGoodScore ? "Score excellent !" : "Continuez comme ça !"}
            </div>
          </div>

          {/* Reward Preview */}
          <div className="bg-gradient-to-r from-[#17BFA0]/10 to-[#BDF2D0]/10 rounded-lg p-4 text-center">
            <Gift className="w-8 h-8 text-[#17BFA0] mx-auto mb-2" />
            <div className="font-semibold text-[#123456]">Votre récompense</div>
            <div className="text-sm text-gray-600 mt-1">{reward}</div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleGoToScratch}
              className="w-full bg-[#17BFA0] hover:bg-[#14a58d] text-white"
            >
              <Gift className="w-4 h-4 mr-2" />
              Gratter mon ticket
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              onClick={pop}
              variant="outline"
              className="w-full"
            >
              Continuer l&apos;exploration
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-xs text-gray-500">
            Votre ticket sera disponible sur la page des cartes à gratter
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuizResultModal;


