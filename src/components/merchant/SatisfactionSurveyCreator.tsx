"use client";

import { useState } from "react";
import { X, Plus, Trash2, Save, Star, ThumbsUp, Smile, Frown, Meh } from "lucide-react";

interface SatisfactionQuestion {
  id: string;
  question: string;
  type: 'rating' | 'nps' | 'emoji' | 'yesno' | 'text';
  required: boolean;
}

interface SatisfactionSurveyCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  onSuccess: () => void;
}

export function SatisfactionSurveyCreator({ isOpen, onClose, merchantId, onSuccess }: SatisfactionSurveyCreatorProps) {
  const [survey, setSurvey] = useState({
    titre: "Questionnaire de satisfaction",
    description: "Votre avis compte ! Aidez-nous à améliorer nos services",
    points: 30,
    active: true,
    showAfterVisit: true,
    triggerType: 'scan' as 'scan' | 'purchase' | 'manual'
  });

  const [questions, setQuestions] = useState<SatisfactionQuestion[]>([
    {
      id: "1",
      question: "Comment évaluez-vous votre expérience globale ?",
      type: 'rating',
      required: true
    },
    {
      id: "2",
      question: "Recommanderiez-vous notre établissement ?",
      type: 'nps',
      required: true
    },
    {
      id: "3",
      question: "Qualité des produits",
      type: 'emoji',
      required: false
    }
  ]);

  const [loading, setLoading] = useState(false);

  const questionTypes = [
    { value: 'rating', label: 'Note étoiles', icon: <Star className="w-4 h-4" />, desc: '1-5 étoiles' },
    { value: 'nps', label: 'NPS Score', icon: <ThumbsUp className="w-4 h-4" />, desc: '0-10' },
    { value: 'emoji', label: 'Emoji', icon: <Smile className="w-4 h-4" />, desc: '😞 😐 😊' },
    { value: 'yesno', label: 'Oui/Non', icon: <ThumbsUp className="w-4 h-4" />, desc: 'Oui ou Non' },
    { value: 'text', label: 'Texte libre', icon: <span className="text-sm">💬</span>, desc: 'Commentaire' }
  ];

  const addQuestion = () => {
    const newQuestion: SatisfactionQuestion = {
      id: Date.now().toString(),
      question: "",
      type: 'rating',
      required: false
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: keyof SatisfactionQuestion, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Questionnaire créé:", { ...survey, questions, merchantId });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess();
      onClose();
      
      // Reset
      setSurvey({
        titre: "Questionnaire de satisfaction",
        description: "Votre avis compte ! Aidez-nous à améliorer nos services",
        points: 30,
        active: true,
        showAfterVisit: true,
        triggerType: 'scan'
      });
      setQuestions([
        {
          id: "1",
          question: "Comment évaluez-vous votre expérience globale ?",
          type: 'rating',
          required: true
        }
      ]);
      
    } catch (error) {
      console.error("Erreur création questionnaire:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#123456]">Créer un Questionnaire de Satisfaction</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations générales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre du questionnaire
              </label>
              <input
                type="text"
                value={survey.titre}
                onChange={(e) => setSurvey({ ...survey, titre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Points de récompense
              </label>
              <input
                type="number"
                value={survey.points}
                onChange={(e) => setSurvey({ ...survey, points: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={survey.description}
              onChange={(e) => setSurvey({ ...survey, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
              rows={2}
              required
            />
          </div>

          {/* Déclenchement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quand afficher le questionnaire ?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { value: 'scan', label: 'Après chaque scan', icon: '📱' },
                { value: 'purchase', label: 'Après un achat', icon: '🛒' },
                { value: 'manual', label: 'Manuellement', icon: '👆' }
              ].map((trigger) => (
                <button
                  key={trigger.value}
                  type="button"
                  onClick={() => setSurvey({ ...survey, triggerType: trigger.value as any })}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    survey.triggerType === trigger.value
                      ? 'border-[#17BFA0] bg-[#17BFA0]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{trigger.icon}</div>
                  <div className="text-sm font-medium">{trigger.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#123456]">Questions</h3>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center gap-2 px-3 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] text-sm"
              >
                <Plus className="w-4 h-4" />
                Ajouter une question
              </button>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-[#123456]">
                      Question {index + 1}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </h4>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(question.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question
                      </label>
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                        placeholder="Votre question..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {questionTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => updateQuestion(question.id, 'type', type.value)}
                          className={`p-2 rounded border transition-colors text-xs ${
                            question.type === type.value
                              ? 'border-[#17BFA0] bg-[#17BFA0]/10 text-[#17BFA0]'
                              : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                        >
                          <div className="flex items-center justify-center mb-1">
                            {type.icon}
                          </div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-[10px] text-gray-500">{type.desc}</div>
                        </button>
                      ))}
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={question.required}
                        onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
                        className="w-4 h-4 text-[#17BFA0] border-gray-300 rounded focus:ring-[#17BFA0]"
                      />
                      <span className="text-sm text-gray-700">Question obligatoire</span>
                    </label>

                    {/* Aperçu de la question */}
                    <div className="bg-gray-50 rounded p-3 border border-gray-100">
                      <p className="text-xs font-medium text-gray-500 mb-2">Aperçu :</p>
                      <p className="text-sm text-gray-900 mb-2">
                        {question.question || "Votre question apparaîtra ici"}
                        {question.required && <span className="text-red-500 ml-1">*</span>}
                      </p>
                      
                      {question.type === 'rating' && (
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} className="w-6 h-6 text-gray-300" />
                          ))}
                        </div>
                      )}
                      
                      {question.type === 'nps' && (
                        <div className="flex gap-1 flex-wrap">
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                            <span key={i} className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-xs">
                              {i}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {question.type === 'emoji' && (
                        <div className="flex gap-3 text-3xl">
                          <Frown className="w-8 h-8 text-red-500" />
                          <Meh className="w-8 h-8 text-yellow-500" />
                          <Smile className="w-8 h-8 text-green-500" />
                        </div>
                      )}
                      
                      {question.type === 'yesno' && (
                        <div className="flex gap-3">
                          <button type="button" className="px-4 py-2 border border-gray-300 rounded">Oui</button>
                          <button type="button" className="px-4 py-2 border border-gray-300 rounded">Non</button>
                        </div>
                      )}
                      
                      {question.type === 'text' && (
                        <textarea 
                          className="w-full px-3 py-2 border border-gray-300 rounded" 
                          rows={2}
                          placeholder="Zone de saisie pour le client..."
                          disabled
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700">Options</h3>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={survey.active}
                onChange={(e) => setSurvey({ ...survey, active: e.target.checked })}
                className="w-4 h-4 text-[#17BFA0] border-gray-300 rounded focus:ring-[#17BFA0]"
              />
              <div>
                <div className="text-sm font-medium text-gray-700">✅ Activer immédiatement</div>
                <div className="text-xs text-gray-500">Le questionnaire sera disponible pour les clients</div>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={survey.showAfterVisit}
                onChange={(e) => setSurvey({ ...survey, showAfterVisit: e.target.checked })}
                className="w-4 h-4 text-[#17BFA0] border-gray-300 rounded focus:ring-[#17BFA0]"
              />
              <div>
                <div className="text-sm font-medium text-gray-700">🎯 Afficher après la visite</div>
                <div className="text-xs text-gray-500">Le client recevra le questionnaire après son passage</div>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || questions.length === 0}
              className="flex-1 px-4 py-3 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Création...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Créer le questionnaire
                </>
              )}
            </button>
          </div>
        </form>

        {/* Résumé */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-2">📊 Résumé</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Questions :</strong> {questions.length}</p>
            <p><strong>Obligatoires :</strong> {questions.filter(q => q.required).length}</p>
            <p><strong>Points :</strong> {survey.points}</p>
            <p><strong>Déclenchement :</strong> {
              { scan: 'Après chaque scan', purchase: 'Après un achat', manual: 'Manuellement' }[survey.triggerType]
            }</p>
          </div>
        </div>
      </div>
    </div>
  );
}
