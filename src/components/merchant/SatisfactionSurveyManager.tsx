"use client"

;

import { useState } from "react";
import { Star, Eye, Edit, Trash2, Users, TrendingUp, BarChart2, Download } from "lucide-react";

interface SatisfactionSurvey {
  id: string;
  titre: string;
  description: string;
  questions: number;
  responses: number;
  avgRating: number;
  npsScore: number;
  points: number;
  active: boolean;
  createdAt: string;
  triggerType: 'scan' | 'purchase' | 'manual';
}

interface SatisfactionSurveyManagerProps {
  onCreateSurvey: () => void;
}

export function SatisfactionSurveyManager({ onCreateSurvey }: SatisfactionSurveyManagerProps) {
  const [surveys] = useState<SatisfactionSurvey[]>([
    {
      id: "1",
      titre: "Questionnaire de satisfaction",
      description: "Votre avis compte ! Aidez-nous à améliorer nos services",
      questions: 5,
      responses: 127,
      avgRating: 4.3,
      npsScore: 62,
      points: 30,
      active: true,
      createdAt: "2024-01-15",
      triggerType: 'scan'
    },
    {
      id: "2",
      titre: "Satisfaction produits",
      description: "Évaluez la qualité de nos produits",
      questions: 3,
      responses: 89,
      avgRating: 4.7,
      npsScore: 78,
      points: 20,
      active: true,
      createdAt: "2024-01-10",
      triggerType: 'purchase'
    }
  ]);

  const toggleSurveyStatus = (surveyId: string) => {
    console.log("Toggle questionnaire:", surveyId);
  };

  const deleteSurvey = (surveyId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce questionnaire ?")) {
      console.log("Supprimer questionnaire:", surveyId);
    }
  };

  const exportResults = (surveyId: string) => {
    console.log("Exporter résultats:", surveyId);
    alert("📥 Export des résultats en cours...");
  };

  const getNPSColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTriggerLabel = (type: string) => {
    switch (type) {
      case 'scan': return '📱 Après scan';
      case 'purchase': return '🛒 Après achat';
      case 'manual': return '👆 Manuel';
      default: return type;
    }
  };

  return (
    <section className="bg-white p-4 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-[#123456]">Questionnaires de Satisfaction</h2>
          <p className="text-sm text-gray-500">Recueillez les avis et retours de vos clients</p>
        </div>
        <button
          onClick={onCreateSurvey}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#17BFA0] text-white text-sm font-medium hover:bg-[#14a58e] active:scale-95 transition-all duration-200"
        >
          <BarChart2 className="w-4 h-4" />
          <span>Nouveau questionnaire</span>
        </button>
      </div>

      <div className="space-y-4">
        {surveys.length > 0 ? (
          surveys.map((survey) => (
            <div key={survey.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-[#123456]">{survey.titre}</h3>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      survey.active 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {survey.active ? '✅ Actif' : '❌ Inactif'}
                    </span>

                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {getTriggerLabel(survey.triggerType)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{survey.description}</p>
                  
                  {/* Statistiques principales */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center gap-1 text-gray-600 text-xs mb-1">
                        <Users className="w-3 h-3" />
                        <span>Réponses</span>
                      </div>
                      <div className="text-lg font-bold text-[#17BFA0]">{survey.responses}</div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center gap-1 text-gray-600 text-xs mb-1">
                        <Star className="w-3 h-3" />
                        <span>Note moy.</span>
                      </div>
                      <div className="text-lg font-bold text-[#17BFA0]">
                        {survey.avgRating.toFixed(1)} ★
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center gap-1 text-gray-600 text-xs mb-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>NPS Score</span>
                      </div>
                      <div className={`text-lg font-bold ${getNPSColor(survey.npsScore)}`}>
                        {survey.npsScore}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center gap-1 text-gray-600 text-xs mb-1">
                        <span>📋</span>
                        <span>Questions</span>
                      </div>
                      <div className="text-lg font-bold text-gray-700">{survey.questions}</div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center gap-1 text-gray-600 text-xs mb-1">
                        <span>🏆</span>
                        <span>Points</span>
                      </div>
                      <div className="text-lg font-bold text-gray-700">{survey.points}</div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    Créé le {new Date(survey.createdAt).toLocaleDateString('fr-FR')}
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
                    onClick={() => exportResults(survey.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Exporter les résultats"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => console.log("Modifier questionnaire:", survey.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Modifier le questionnaire"
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
                    title="Supprimer le questionnaire"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <BarChart2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium mb-2">Aucun questionnaire créé</p>
            <p className="text-sm mb-4">Créez votre premier questionnaire de satisfaction</p>
            <button
              onClick={onCreateSurvey}
              className="px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] transition-colors"
            >
              Créer un questionnaire
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
              <div className="text-sm text-gray-600">Questionnaires actifs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#17BFA0]">
                {surveys.reduce((sum, s) => sum + s.responses, 0)}
              </div>
              <div className="text-sm text-gray-600">Réponses totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#17BFA0]">
                {(surveys.reduce((sum, s) => sum + s.avgRating, 0) / surveys.length).toFixed(1)} ★
              </div>
              <div className="text-sm text-gray-600">Note moyenne</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${getNPSColor(
                Math.round(surveys.reduce((sum, s) => sum + s.npsScore, 0) / surveys.length)
              )}`}>
                {Math.round(surveys.reduce((sum, s) => sum + s.npsScore, 0) / surveys.length)}
              </div>
              <div className="text-sm text-gray-600">NPS moyen</div>
            </div>
          </div>
        </div>
      )}

      {/* Info NPS */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
        <p className="font-medium mb-1">📊 À propos du NPS (Net Promoter Score) :</p>
        <div className="text-xs space-y-1">
          <p>• <strong className="text-green-600">70+</strong> : Excellent - Clients très satisfaits</p>
          <p>• <strong className="text-yellow-600">30-70</strong> : Bon - Clients satisfaits</p>
          <p>• <strong className="text-red-600">&lt;30</strong> : À améliorer - Clients peu satisfaits</p>
        </div>
      </div>
    </section>
  );
}
