'use client';

import { useState } from 'react';
import { useScratchAvailability } from '@/hooks/useScratchAvailability';
import { useUserPoints } from '@/hooks/useUserPoints';
import ScratchCard from '@/components/ScratchCard';

export default function AdminQuizScratchPage() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'scratch' | 'points'>('quiz');
  const { state, activate, markUsed, clear, refresh } = useScratchAvailability();
  const { points, isLoading: pointsLoading, refresh: refreshPoints } = useUserPoints();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateQuizTicket = async () => {
    setIsLoading(true);
    try {
      const quizId = crypto.randomUUID();
      await activate({ 
        quizId, 
        points: 50, 
        label: '+50 points (Test Admin)' 
      });
      alert('Ticket créé avec succès !');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création du ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCustomTicket = async () => {
    setIsLoading(true);
    try {
      const quizId = crypto.randomUUID();
      await activate({ 
        quizId, 
        points: 100, 
        label: '+100 points (Ticket Premium)' 
      });
      alert('Ticket premium créé avec succès !');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création du ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearTickets = () => {
    clear();
    alert('Tous les tickets ont été supprimés');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎮 Administration Quiz & Scratch Cards
          </h1>
          <p className="text-gray-600">
            Gestion des quiz, création de tickets à gratter et suivi des points
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'quiz', label: '🧠 Quiz', icon: '🧠' },
              { id: 'scratch', label: '🎫 Scratch Cards', icon: '🎫' },
              { id: 'points', label: '⭐ Points', icon: '⭐' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'quiz' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">🧠 Gestion des Quiz</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Créer un ticket après quiz */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Simuler un Quiz Terminé</h3>
                  <p className="text-gray-600 mb-4">
                    Crée un ticket à gratter comme si un utilisateur venait de terminer un quiz
                  </p>
                  <button
                    onClick={handleCreateQuizTicket}
                    disabled={isLoading}
                    className="btn btn-primary w-full"
                  >
                    {isLoading ? 'Création...' : '🎯 Créer Ticket Quiz (50 pts)'}
                  </button>
                </div>

                {/* Créer un ticket premium */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Ticket Premium</h3>
                  <p className="text-gray-600 mb-4">
                    Crée un ticket avec plus de points pour tester les récompenses importantes
                  </p>
                  <button
                    onClick={handleCreateCustomTicket}
                    disabled={isLoading}
                    className="btn btn-primary w-full"
                  >
                    {isLoading ? 'Création...' : '💎 Créer Ticket Premium (100 pts)'}
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">📋 Instructions</h4>
                <ol className="text-blue-800 space-y-1 text-sm">
                  <li>1. Cliquez sur "Créer Ticket Quiz" pour simuler un quiz terminé</li>
                  <li>2. Allez sur la page d'accueil pour voir le ticket apparaître</li>
                  <li>3. Grattez la carte pour révéler la récompense</li>
                  <li>4. Vérifiez que les points sont bien crédités</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'scratch' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">🎫 Gestion des Scratch Cards</h2>
              
              {/* État actuel */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">État Actuel</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {state.available ? '✅' : '❌'}
                    </div>
                    <div className="text-sm text-gray-600">Ticket Disponible</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {state.used ? '✅' : '❌'}
                    </div>
                    <div className="text-sm text-gray-600">Ticket Utilisé</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {state.reward?.type === 'points' ? state.reward.amount : 0}
                    </div>
                    <div className="text-sm text-gray-600">Points</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={refresh}
                      className="btn btn-outline w-full"
                    >
                      🔄 Actualiser l'État
                    </button>
                    <button
                      onClick={handleClearTickets}
                      className="btn btn-error w-full"
                    >
                      🗑️ Supprimer Tous les Tickets
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Test de Révélation</h3>
                  <p className="text-gray-600 mb-4">
                    Si un ticket est disponible, vous pouvez le révéler directement
                  </p>
                  <button
                    onClick={markUsed}
                    disabled={!state.available || state.used}
                    className="btn btn-primary w-full"
                  >
                    🎁 Révéler le Ticket
                  </button>
                </div>
              </div>

              {/* Aperçu du ticket */}
              {state.available && !state.used && state.reward && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Aperçu du Ticket</h3>
                  <div className="max-w-md mx-auto">
                    <ScratchCard
                      reward={state.reward}
                      onReveal={() => {
                        setTimeout(() => markUsed(), 800);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'points' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">⭐ Gestion des Points</h2>
              
              {/* Total des points */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {pointsLoading ? '...' : points}
                  </div>
                  <div className="text-gray-600 mb-4">Points Totaux</div>
                  <button
                    onClick={refreshPoints}
                    className="btn btn-outline"
                  >
                    🔄 Actualiser
                  </button>
                </div>
              </div>

              {/* Historique des points */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">📊 Informations</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Les points sont stockés dans la table <code>points_ledger</code></p>
                  <p>• Chaque révélation de ticket crédite automatiquement les points</p>
                  <p>• L'historique complet est conservé pour audit</p>
                  <p>• Les points sont sécurisés avec RLS (Row Level Security)</p>
                </div>
              </div>

              {/* Actions de test */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">🧪 Tests</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      handleCreateQuizTicket();
                      setTimeout(() => refreshPoints(), 2000);
                    }}
                    className="btn btn-primary w-full"
                  >
                    🎯 Créer Ticket + Vérifier Points
                  </button>
                  <p className="text-xs text-gray-500">
                    Crée un ticket, puis vérifie que les points sont bien mis à jour
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer avec liens utiles */}
        <div className="mt-8 bg-white rounded-lg shadow p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">🔗 Liens Utiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <a href="/" className="text-primary hover:underline">
              🏠 Page d'Accueil
            </a>
            <a href="/playground" className="text-primary hover:underline">
              🎮 Playground
            </a>
            <a href="/quiz/result" className="text-primary hover:underline">
              🧠 Résultat Quiz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
