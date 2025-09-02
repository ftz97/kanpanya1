'use client';

import { useRouter } from 'next/navigation';
import { useScratchAvailability } from '@/hooks/useScratchAvailability';

export default function QuizResultPage(){
  const router = useRouter();
  const { activate } = useScratchAvailability();

  const handleClaim = () => {
    // Exemple : 50 points; changez selon la logique du quiz
    activate({ type: 'points', amount: 50, label: '+50 points' });
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-2">Quiz terminé 🎉</h1>
        <p className="text-gray-600 mb-6">Bravo ! Active ton ticket à gratter pour découvrir ta récompense.</p>
        <button onClick={handleClaim} className="btn btn-primary w-full">
          Activer mon ticket & revenir à l'accueil
        </button>
      </div>
    </main>
  );
}
