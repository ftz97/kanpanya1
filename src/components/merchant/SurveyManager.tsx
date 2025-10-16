"use client";

import { useState } from "react";
import { BarChart3, Eye, Edit, Trash2, Users, TrendingUp, Image as ImageIcon } from "lucide-react";

interface Survey {
  id: string;
  titre: string;
  description: string;
  type: 'multiple' | 'single' | 'rating' | 'text';
  imageUrl?: string;
  participants: number;
  active: boolean;
  points: number;
  createdAt: string;
  responses: number;
}

interface SurveyManagerProps {
  onCreateSurvey: () => void;
}

export function SurveyManager({ onCreateSurvey }: SurveyManagerProps) {
  // Données de test - À remplacer par des vraies données Supabase
  const [surveys] = useState<Survey[]>([
    {
      id: "1",
      titre: "Votre plat préféré ?",
      description: "Aidez-nous à améliorer notre menu",
      type: 'single',
      imageUrl: "/api/placeholder/300/200",
      participants: 45,
      active: true,
      points: 25,
      createdAt: "2024-01-20",
      responses: 38
    },
    {
      id: "2",
      titre: "Évaluation de votre expérience",
      description: "Donnez-nous votre avis sur votre dernière visite",
      type: 'rating',
      participants: 32,
      active: true,
      points: 15,
      createdAt: "2024-01-18",
      responses: 28
    },
    {
      id: "3",
      titre: "Nouveaux produits à tester",
      description: "Quels produits aimeriez-vous voir dans nos rayons ?",
      type: 'multiple',
      participants: 67,
      active: false,
      points: 30,
      createdAt: "2024-01-15",
      responses: 52
    }
  ]);

  const toggleSurveyStatus = (surveyId: string) => {
    console.log("Toggle sondage:", surveyId);
    // Ici on mettrait à jour le statut dans Supabase
  };

  const deleteSurvey = (surveyId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce sondage ?")) {
      console.log("Supprimer sondage:", surveyId);
      // Ici on supprimerait le sondage de Supabase
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'multiple': return '☑️';
      case 'single': return '🔘';
      case 'rating': return '⭐';
      case 'text': return '💬';
      default: return '📊';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'multiple': return 'Choix multiple';
      case 'single': return 'Choix unique';
      case 'rating': return 'Note/Étoiles';
      case 'text': return 'Réponse libre';
      default: return 'Inconnu';
    }
  };

  return (
    <section className="bg-white p-4 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#123456]">Mes Sondages</h2>
        <button
          onClick={onCreateSurvey}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#17BFA0] text-white text-sm font-medium hover:bg-[#14a58e] active:scale-95 transition-all duration-200"
        >
          <BarChart3 className="w-4 h-4" />
          <span>Nouveau sondage</span>
        </button>
      </div>

      <div className="space-y-4">
        {surveys.length > 0 ? (
          surveys.map((survey) => (
            <div key={survey.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                {/* Image du sondage */}
                <div className="flex-shrink-0">
                  {survey.imageUrl ? (
                    <img
                      src={survey.imageUrl}
                      alt={survey.titre}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Contenu du sondage */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-[#123456]">{survey.titre}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          survey.active 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {survey.active ? '🟢 Actif' : '🔴 Inactif'}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {getTypeIcon(survey.type)} {getTypeLabel(survey.type)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{survey.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{survey.participants} participants</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <TrendingUp className="w-4 h-4" />
                          <span>{survey.responses} réponses</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <span>🏆 {survey.points} pts</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <span>📅 {new Date(survey.createdAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => console.log("Voir résultats:", survey.id)}
                        className="p-2 text-gray-400 hover:text-[#17BFA0] transition-colors"
                        title="Voir les résultats"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => console.log("Modifier sondage:", survey.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Modifier le sondage"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => toggleSurveyStatus(survey.id)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          survey.active
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {survey.active ? 'Désactiver' : 'Activer'}
                      </button>
                      
                      <button
                        onClick={() => deleteSurvey(survey.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Supprimer le sondage"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium mb-2">Aucun sondage créé</p>
            <p className="text-sm mb-4">Créez votre premier sondage pour recueillir l'avis de vos clients</p>
            <button
              onClick={onCreateSurvey}
              className="px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] transition-colors"
            >
              Créer un sondage
            </button>
          </div>
        )}
      </div>

      {/* Statistiques globales */}
      {surveys.length > 0 && (
        <div className="mt-6 bg-[#F7F9FA] rounded-xl p-4">
          <h4 className="font-medium text-[#123456] mb-3">Statistiques globales</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#17BFA0]">{surveys.length}</div>
              <div className="text-sm text-gray-600">Sondages actifs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#17BFA0]">
                {surveys.reduce((sum, s) => sum + s.participants, 0)}
              </div>
              <div className="text-sm text-gray-600">Participants totaux</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#17BFA0]">
                {surveys.reduce((sum, s) => sum + s.responses, 0)}
              </div>
              <div className="text-sm text-gray-600">Réponses reçues</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#17BFA0]">
                {Math.round(
                  (surveys.reduce((sum, s) => sum + s.responses, 0) / 
                   surveys.reduce((sum, s) => sum + s.participants, 0)) * 100
                ) || 0}%
              </div>
              <div className="text-sm text-gray-600">Taux de participation</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
