'use client';

import { useState } from 'react';
import { useScratchAvailability } from '@/hooks/useScratchAvailability';

type Question = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  points: number;
};

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Quelle est la capitale de la Guadeloupe ?',
    options: ['Basse-Terre', 'Pointe-à-Pitre', 'Les Abymes', 'Gosier'],
    correctIndex: 0,
    points: 10
  },
  {
    id: 'q2',
    text: 'Quel est le code couleur principal de Kanpanya ?',
    options: ['#FF0000', '#14B8A6', '#3B82F6', '#F59E0B'],
    correctIndex: 1,
    points: 15
  },
  {
    id: 'q3',
    text: 'Combien de points gagne-t-on en grattant une carte ?',
    options: ['25 points', '50 points', '75 points', '100 points'],
    correctIndex: 1,
    points: 20
  }
];

export default function AdminQuizTesterPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { activate } = useScratchAvailability();

  const currentQ = SAMPLE_QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === SAMPLE_QUESTIONS.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculer le score
      let score = 0;
      SAMPLE_QUESTIONS.forEach((q, index) => {
        if (selectedAnswers[index] === q.correctIndex) {
          score += q.points;
        }
      });
      setTotalScore(score);
      setQuizCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleCreateTicket = async () => {
    setIsLoading(true);
    try {
      const quizId = crypto.randomUUID();
      await activate({ 
        quizId, 
        points: totalScore, 
        label: `+${totalScore} points (Quiz Admin)` 
      });
      alert(`Ticket créé avec ${totalScore} points !`);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création du ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setTotalScore(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧠 Testeur de Quiz Administrateur
          </h1>
          <p className="text-gray-600">
            Testez le système de quiz et créez des tickets à gratter
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          {!quizCompleted ? (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-600">
                  Question {currentQuestion + 1} sur {SAMPLE_QUESTIONS.length}
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / SAMPLE_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentQ.text}
                </h2>
                <p className="text-sm text-gray-500">
                  Points possibles : {currentQ.points}
                </p>

                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <label key={index} className="cursor-pointer block">
                      <input
                        type="radio"
                        name={`question_${currentQuestion}`}
                        className="peer hidden"
                        checked={selectedAnswers[currentQuestion] === index}
                        onChange={() => handleAnswerSelect(index)}
                      />
                      <div className={`border rounded-xl p-4 transition ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                            selectedAnswers[currentQuestion] === index
                              ? 'border-primary bg-primary'
                              : 'border-gray-300'
                          }`}>
                            {selectedAnswers[currentQuestion] === index && (
                              <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                            )}
                          </div>
                          <span className="text-gray-900">{option}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="btn btn-outline"
                >
                  ← Précédent
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="btn btn-primary"
                >
                  {isLastQuestion ? 'Terminer le Quiz' : 'Suivant →'}
                </button>
              </div>
            </div>
          ) : (
            /* Résultats */
            <div className="space-y-6 text-center">
              <div className="space-y-4">
                <div className="text-6xl">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Quiz Terminé !
                </h2>
                <div className="text-4xl font-bold text-primary">
                  {totalScore} points
                </div>
                <p className="text-gray-600">
                  Vous avez répondu correctement à{' '}
                  {SAMPLE_QUESTIONS.filter((q, index) => 
                    selectedAnswers[index] === q.correctIndex
                  ).length} sur {SAMPLE_QUESTIONS.length} questions
                </p>
              </div>

              {/* Détail des réponses */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-left shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Détail des Réponses</h3>
                <div className="space-y-3">
                  {SAMPLE_QUESTIONS.map((q, index) => {
                    const isCorrect = selectedAnswers[index] === q.correctIndex;
                    return (
                      <div key={q.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center text-sm ${
                            isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {isCorrect ? '✓' : '✗'}
                          </div>
                          <span className="text-sm">{q.text}</span>
                        </div>
                        <div className="text-sm font-medium">
                          {isCorrect ? `+${q.points}` : '0'} pts
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <button
                  onClick={handleCreateTicket}
                  disabled={isLoading}
                  className="btn btn-primary btn-lg"
                >
                  {isLoading ? 'Création...' : `🎫 Créer Ticket (${totalScore} pts)`}
                </button>
                
                <div className="space-x-4">
                  <button
                    onClick={resetQuiz}
                    className="btn btn-outline"
                  >
                    🔄 Recommencer
                  </button>
                  <a
                    href="/"
                    className="btn btn-ghost"
                  >
                    🏠 Retour à l'Accueil
                  </a>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <h4 className="font-semibold text-blue-900 mb-2">📋 Prochaines Étapes</h4>
                <ol className="text-blue-800 space-y-1 text-sm">
                  <li>1. Cliquez sur "Créer Ticket" pour générer un ticket à gratter</li>
                  <li>2. Allez sur la page d'accueil pour voir le ticket</li>
                  <li>3. Grattez la carte pour révéler vos {totalScore} points</li>
                  <li>4. Vérifiez que les points sont bien crédités</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer avec liens */}
        <div className="mt-8 bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">🔗 Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <a href="/admin/quiz-scratch" className="text-primary hover:underline">
              🎫 Gestion Scratch
            </a>
            <a href="/admin/dashboard" className="text-primary hover:underline">
              📊 Dashboard
            </a>
            <a href="/playground" className="text-primary hover:underline">
              🎮 Playground
            </a>
            <a href="/" className="text-primary hover:underline">
              🏠 Accueil
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
