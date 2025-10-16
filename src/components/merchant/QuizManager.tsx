"use client";

import { useState } from "react";
import { Play, Eye, Edit, Trash2, Users, Trophy } from "lucide-react";

interface Quiz {
  id: string;
  titre: string;
  description: string;
  pointsBonus: number;
  questions: any[];
  participants: number;
  completed: number;
  active: boolean;
  createdAt: string;
}

interface QuizManagerProps {
  onCreateQuiz: () => void;
}

export function QuizManager({ onCreateQuiz }: QuizManagerProps) {
  // Données de test - À remplacer par des vraies données Supabase
  const [quizzes] = useState<Quiz[]>([
    {
      id: "1",
      titre: "Quiz produits",
      description: "Testez vos connaissances sur nos produits",
      pointsBonus: 50,
      questions: [
        { question: "Notre spécialité ?", points: 10 },
        { question: "Depuis quand existons-nous ?", points: 15 }
      ],
      participants: 23,
      completed: 18,
      active: true,
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      titre: "Quiz fidélité",
      description: "Découvrez nos avantages fidélité",
      pointsBonus: 30,
      questions: [
        { question: "Combien de points pour un café gratuit ?", points: 5 }
      ],
      participants: 12,
      completed: 8,
      active: true,
      createdAt: "2024-01-10"
    }
  ]);

  const toggleQuizStatus = (quizId: string) => {
    console.log("Toggle quiz:", quizId);
    // Ici on mettrait à jour le statut dans Supabase
  };

  const deleteQuiz = (quizId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce quiz ?")) {
      console.log("Supprimer quiz:", quizId);
      // Ici on supprimerait le quiz de Supabase
    }
  };

  return (
    <section className="bg-white p-4 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#123456]">Mes Quiz</h2>
        <button
          onClick={onCreateQuiz}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#17BFA0] text-white text-sm font-medium hover:bg-[#14a58e] active:scale-95 transition-all duration-200"
        >
          <Play className="w-4 h-4" />
          <span>Nouveau quiz</span>
        </button>
      </div>

      <div className="space-y-4">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-[#123456]">{quiz.titre}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      quiz.active 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {quiz.active ? '🟢 Actif' : '🔴 Inactif'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{quiz.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Play className="w-4 h-4" />
                      <span>{quiz.questions.length} questions</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Trophy className="w-4 h-4" />
                      <span>{quiz.pointsBonus} pts bonus</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{quiz.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <span>✅ {quiz.completed} complétés</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => console.log("Voir résultats:", quiz.id)}
                    className="p-2 text-gray-400 hover:text-[#17BFA0] transition-colors"
                    title="Voir les résultats"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => console.log("Modifier quiz:", quiz.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Modifier le quiz"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => toggleQuizStatus(quiz.id)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      quiz.active
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {quiz.active ? 'Désactiver' : 'Activer'}
                  </button>
                  
                  <button
                    onClick={() => deleteQuiz(quiz.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Supprimer le quiz"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Play className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium mb-2">Aucun quiz créé</p>
            <p className="text-sm mb-4">Créez votre premier quiz pour engager vos clients</p>
            <button
              onClick={onCreateQuiz}
              className="px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] transition-colors"
            >
              Créer un quiz
            </button>
          </div>
        )}
      </div>

      {/* Statistiques globales */}
      {quizzes.length > 0 && (
        <div className="mt-6 bg-[#F7F9FA] rounded-xl p-4">
          <h4 className="font-medium text-[#123456] mb-3">Statistiques globales</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#17BFA0]">{quizzes.length}</div>
              <div className="text-sm text-gray-600">Quiz actifs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#17BFA0]">
                {quizzes.reduce((sum, q) => sum + q.participants, 0)}
              </div>
              <div className="text-sm text-gray-600">Participants totaux</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#17BFA0]">
                {quizzes.reduce((sum, q) => sum + q.completed, 0)}
              </div>
              <div className="text-sm text-gray-600">Quiz complétés</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#17BFA0]">
                {Math.round(
                  (quizzes.reduce((sum, q) => sum + q.completed, 0) / 
                   quizzes.reduce((sum, q) => sum + q.participants, 0)) * 100
                ) || 0}%
              </div>
              <div className="text-sm text-gray-600">Taux de réussite</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
