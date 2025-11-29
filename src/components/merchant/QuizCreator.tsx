"use client";

import { useState } from "react";
import { X, Plus, Trash2, Save } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

interface QuizCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  onSuccess: () => void;
}

export function QuizCreator({ isOpen, onClose, onSuccess }: QuizCreatorProps) {
  const [quiz, setQuiz] = useState({
    titre: "",
    description: "",
    pointsBonus: 50,
    active: true,
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "Quelle est notre spécialité ?",
      options: ["Pizza", "Burgers", "Pâtes", "Salades"],
      correctAnswer: 0,
      points: 10,
    }
  ]);

  const [loading, setLoading] = useState(false);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 10,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ici on pourrait sauvegarder le quiz dans Supabase
      console.log("Quiz créé:", { ...quiz, questions });
      
      // Simulation de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess();
      onClose();
      
      // Reset form
      setQuiz({ titre: "", description: "", pointsBonus: 50, active: true });
      setQuestions([{
        id: "1",
        question: "Quelle est notre spécialité ?",
        options: ["Pizza", "Burgers", "Pâtes", "Salades"],
        correctAnswer: 0,
        points: 10,
      }]);
      
    } catch (error) {
      console.error("Erreur création quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#123456]">Créer un Quiz</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations générales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre du quiz
              </label>
              <input
                type="text"
                value={quiz.titre}
                onChange={(e) => setQuiz({ ...quiz, titre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                placeholder="Quiz sur nos produits..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Points bonus (réussite complète)
              </label>
              <input
                type="number"
                value={quiz.pointsBonus}
                onChange={(e) => setQuiz({ ...quiz, pointsBonus: parseInt(e.target.value) || 0 })}
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
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
              rows={3}
              placeholder="Décrivez le quiz pour vos clients..."
              required
            />
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

                    <div className="grid grid-cols-2 gap-2">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={question.correctAnswer === optionIndex}
                            onChange={() => updateQuestion(question.id, 'correctAnswer', optionIndex)}
                            className="text-[#17BFA0]"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...question.options];
                              newOptions[optionIndex] = e.target.value;
                              updateQuestion(question.id, 'options', newOptions);
                            }}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-[#17BFA0] focus:border-transparent text-sm"
                            placeholder={`Option ${optionIndex + 1}`}
                            required
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        Points pour cette question:
                      </label>
                      <input
                        type="number"
                        value={question.points}
                        onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value) || 0)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-[#17BFA0] focus:border-transparent text-sm"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                  Créer le quiz
                </>
              )}
            </button>
          </div>
        </form>

        {/* Aperçu */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-2">Aperçu du quiz</h4>
          <div className="text-sm text-gray-600">
            <p><strong>Titre:</strong> {quiz.titre || "Non défini"}</p>
            <p><strong>Questions:</strong> {questions.length}</p>
            <p><strong>Points bonus:</strong> {quiz.pointsBonus}</p>
            <p><strong>Points totaux possibles:</strong> {
              questions.reduce((total, q) => total + q.points, 0) + quiz.pointsBonus
            }</p>
          </div>
        </div>
      </div>
    </div>
  );
}
