"use client";
import { useModal } from "@/components/modal/ModalManager";
import ScratchCard from "@/components/ScratchCard";

function QuizResultModalSimple({ reward }: { reward: string }) {
  const { close } = useModal();
  
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Bravo 🎉</h2>
      <p className="mb-6">Gratte pour découvrir ton lot :</p>

      <ScratchCard
        reward={reward}
        onComplete={() => {
          console.log("Scratch terminé !");
          // ici on envoie à Supabase + confettis
        }}
      />
      
      <div className="mt-6 flex gap-3">
        <button 
          className="btn-secondary transition-transform duration-150 active:scale-95" 
          onClick={pop}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export default QuizResultModalSimple;






