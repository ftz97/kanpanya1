'use client';

import { useRouter } from 'next/navigation';
import { useScratchAvailability } from '@/hooks/useScratchAvailability';
import { useState } from 'react';

export default function QuizResultPage(){
  const router = useRouter();
  const { activate } = useScratchAvailability();
  const [isLoading, setIsLoading] = useState(false);

  const handleClaim = async () => {
    setIsLoading(true);
    try {
      // Passe l'ID réel du quiz si tu l'as, sinon génère un UUID
      const quizId = crypto.randomUUID();
      await activate({ quizId, points: 50, label: '+50 points' });
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de l\'activation du ticket:', error);
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-2">Quiz terminé 🎉</h1>
        <p className="text-gray-600 mb-6">Bravo ! Active ton ticket à gratter pour découvrir ta récompense.</p>
        <button 
          onClick={handleClaim} 
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Activation...' : 'Activer mon ticket & revenir à l\'accueil'}
        </button>
      </div>
    </main>
  );
}
