"use client";

import { useState, useRef } from "react";
import { X, Plus, Trash2, Save, Upload, Image as ImageIcon, BarChart3 } from "lucide-react";

interface SurveyOption {
  id: string;
  text: string;
  imageUrl?: string;
  imageFile?: File;
}

interface Survey {
  id: string;
  titre: string;
  description: string;
  type: 'multiple' | 'single' | 'rating' | 'text';
  options: SurveyOption[];
  imageUrl?: string;
  imageFile?: File;
  active: boolean;
  points: number;
}

interface SurveyCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  onSuccess: () => void;
}

export function SurveyCreator({ isOpen, onClose, merchantId, onSuccess }: SurveyCreatorProps) {
  const [survey, setSurvey] = useState<Survey>({
    id: "",
    titre: "",
    description: "",
    type: 'multiple',
    options: [
      { id: "1", text: "Option 1" },
      { id: "2", text: "Option 2" }
    ],
    active: true,
    points: 20
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const addOption = () => {
    const newOption: SurveyOption = {
      id: Date.now().toString(),
      text: ""
    };
    setSurvey({
      ...survey,
      options: [...survey.options, newOption]
    });
  };

  const updateOption = (id: string, field: keyof SurveyOption, value: any) => {
    setSurvey({
      ...survey,
      options: survey.options.map(opt => 
        opt.id === id ? { ...opt, [field]: value } : opt
      )
    });
  };

  const removeOption = (id: string) => {
    if (survey.options.length > 2) {
      setSurvey({
        ...survey,
        options: survey.options.filter(opt => opt.id !== id)
      });
    }
  };

  const handleImageUpload = (file: File, type: 'survey' | 'option', optionId?: string) => {
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image doit faire moins de 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      
      if (type === 'survey') {
        setSurvey({ ...survey, imageUrl, imageFile: file });
      } else if (type === 'option' && optionId) {
        updateOption(optionId, 'imageUrl', imageUrl);
        updateOption(optionId, 'imageFile', file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ici on pourrait sauvegarder le sondage dans Supabase
      console.log("Sondage créé:", survey);
      
      // Simulation de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess();
      onClose();
      
      // Reset form
      setSurvey({
        id: "",
        titre: "",
        description: "",
        type: 'multiple',
        options: [
          { id: "1", text: "Option 1" },
          { id: "2", text: "Option 2" }
        ],
        active: true,
        points: 20
      });
      
    } catch (error) {
      console.error("Erreur création sondage:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#123456]">Créer un Sondage</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations générales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre du sondage
              </label>
              <input
                type="text"
                value={survey.titre}
                onChange={(e) => setSurvey({ ...survey, titre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                placeholder="Quel est votre plat préféré ?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Points de participation
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
              rows={3}
              placeholder="Décrivez votre sondage..."
              required
            />
          </div>

          {/* Type de sondage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de sondage
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'multiple', label: 'Choix multiple', icon: '☑️' },
                { value: 'single', label: 'Choix unique', icon: '🔘' },
                { value: 'rating', label: 'Note/Étoiles', icon: '⭐' },
                { value: 'text', label: 'Réponse libre', icon: '💬' }
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setSurvey({ ...survey, type: type.value as any })}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    survey.type === type.value
                      ? 'border-[#17BFA0] bg-[#17BFA0]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{type.icon}</div>
                  <div className="text-sm font-medium">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Image du sondage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image du sondage (optionnelle)
            </label>
            <div className="flex items-center gap-4">
              {survey.imageUrl ? (
                <div className="relative">
                  <img
                    src={survey.imageUrl}
                    alt="Aperçu"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setSurvey({ ...survey, imageUrl: undefined, imageFile: undefined })}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => imageInputRef.current?.click()}
                  className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#17BFA0] transition-colors"
                >
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <div className="text-xs text-gray-500">Ajouter image</div>
                  </div>
                </div>
              )}
              
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'survey');
                }}
                className="hidden"
              />
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && survey.options.length > 0) {
                    // Prendre la première option disponible
                    const firstOption = survey.options[0];
                    handleImageUpload(file, 'option', firstOption.id);
                  }
                }}
                className="hidden"
              />
              
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <Upload className="w-4 h-4" />
                Choisir une image
              </button>
            </div>
          </div>

          {/* Options (si pas texte libre) */}
          {survey.type !== 'text' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#123456]">Options</h3>
                <button
                  type="button"
                  onClick={addOption}
                  className="flex items-center gap-2 px-3 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter une option
                </button>
              </div>

              <div className="space-y-4">
                {survey.options.map((option, index) => (
                  <div key={option.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Option {index + 1}
                        </label>
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => updateOption(option.id, 'text', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                          placeholder="Texte de l'option..."
                          required
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {option.imageUrl ? (
                          <div className="relative">
                            <img
                              src={option.imageUrl}
                              alt="Option"
                              className="w-16 h-16 object-cover rounded border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => updateOption(option.id, 'imageUrl', undefined)}
                              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                if (file) handleImageUpload(file, 'option', option.id);
                              };
                              input.click();
                            }}
                            className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                          >
                            <ImageIcon className="w-4 h-4 text-gray-400" />
                          </button>
                        )}
                        
                        {survey.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(option.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
              disabled={loading}
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
                  Créer le sondage
                </>
              )}
            </button>
          </div>
        </form>

        {/* Aperçu */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Aperçu du sondage
          </h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Titre:</strong> {survey.titre || "Non défini"}</p>
            <p><strong>Type:</strong> {
              { multiple: 'Choix multiple', single: 'Choix unique', rating: 'Note/Étoiles', text: 'Réponse libre' }[survey.type]
            }</p>
            <p><strong>Options:</strong> {survey.options.length}</p>
            <p><strong>Points:</strong> {survey.points}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
