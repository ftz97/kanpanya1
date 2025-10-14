"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Commercant {
  id: string;
  name: string;
  logo: string;
  logoImage: string;
  mainImage: string;
  type: "video-quiz" | "quiz-direct";
  title: string;
  description: string;
  cta: string;
  reward: string;
  background: string;
  icon: string;
  theme: string;
  questions: QuizQuestion[];
  scratchRewards: Array<{
    type: "points" | "coupon" | "gift";
    amount?: number;
    label: string;
    description: string;
  }>;
}

export default function AdminPage() {
  const [commercants, setCommercants] = useState<Commercant[]>([]);
  const [currentCommercant, setCurrentCommercant] = useState<Partial<Commercant>>({
    type: "quiz-direct",
    theme: "",
    questions: [],
    scratchRewards: []
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addQuestion = () => {
    setCurrentCommercant(prev => ({
      ...prev,
      questions: [
        ...(prev.questions || []),
        {
          question: "",
          options: ["", "", "", ""],
          correctIndex: 0,
          explanation: ""
        }
      ]
    }));
  };

  const updateQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
    setCurrentCommercant(prev => ({
      ...prev,
      questions: prev.questions?.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const addReward = () => {
    setCurrentCommercant(prev => ({
      ...prev,
      scratchRewards: [
        ...(prev.scratchRewards || []),
        {
          type: "points",
          amount: 50,
          label: "",
          description: ""
        }
      ]
    }));
  };

  const saveCommercant = () => {
    if (!currentCommercant.name || !currentCommercant.title) {
      alert("Veuillez remplir au moins le nom et le titre");
      return;
    }

    const newCommercant: Commercant = {
      id: editingId || Date.now().toString(),
      name: currentCommercant.name!,
      logo: currentCommercant.logo || "🏪",
      logoImage: currentCommercant.logoImage || "",
      mainImage: currentCommercant.mainImage || "",
      type: currentCommercant.type || "quiz-direct",
      title: currentCommercant.title!,
      description: currentCommercant.description || "",
      cta: currentCommercant.cta || "Découvrir",
      reward: currentCommercant.reward || "Points",
      background: currentCommercant.background || "from-blue-400 to-blue-600",
      icon: currentCommercant.icon || "🎯",
      theme: currentCommercant.theme || "",
      questions: currentCommercant.questions || [],
      scratchRewards: currentCommercant.scratchRewards || []
    };

    if (editingId) {
      setCommercants(prev => prev.map(c => c.id === editingId ? newCommercant : c));
    } else {
      setCommercants(prev => [...prev, newCommercant]);
    }

    // Reset form
    setCurrentCommercant({
      type: "quiz-direct",
      theme: "",
      questions: [],
      scratchRewards: []
    });
    setShowForm(false);
    setEditingId(null);
  };

  const editCommercant = (commercant: Commercant) => {
    setCurrentCommercant(commercant);
    setEditingId(commercant.id);
    setShowForm(true);
  };

  const deleteCommercant = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce commerçant ?")) {
      setCommercants(prev => prev.filter(c => c.id !== id));
    }
  };

  const exportData = () => {
    const data = {
      commercants,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'commercants-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#17BFA0]">
              🏪 Administration Commerçants
            </h1>
            <div className="flex gap-3">
              <button
                onClick={exportData}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                📥 Exporter
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] transition-colors"
              >
                ➕ Nouveau Commerçant
              </button>
            </div>
          </div>

          {/* Liste des commerçants */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {commercants.map((commercant) => (
              <div key={commercant.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{commercant.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editCommercant(commercant)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteCommercant(commercant.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{commercant.title}</p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {commercant.type}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    {commercant.questions.length} questions
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    {commercant.scratchRewards.length} récompenses
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border-t pt-6"
            >
              <h2 className="text-xl font-bold mb-4">
                {editingId ? "✏️ Modifier" : "➕ Nouveau"} Commerçant
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom du commerçant</label>
                  <input
                    type="text"
                    value={currentCommercant.name || ""}
                    onChange={(e) => setCurrentCommercant(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Ex: L'Oréal Professionnel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Titre</label>
                  <input
                    type="text"
                    value={currentCommercant.title || ""}
                    onChange={(e) => setCurrentCommercant(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Ex: 💇‍♀️ Soins cheveux"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <input
                    type="text"
                    value={currentCommercant.description || ""}
                    onChange={(e) => setCurrentCommercant(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Ex: Découvrez nos produits professionnels"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Thème</label>
                  <input
                    type="text"
                    value={currentCommercant.theme || ""}
                    onChange={(e) => setCurrentCommercant(prev => ({ ...prev, theme: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Ex: coiffure, alimentation, sport"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    value={currentCommercant.type || "quiz-direct"}
                    onChange={(e) => setCurrentCommercant(prev => ({ ...prev, type: e.target.value as "video-quiz" | "quiz-direct" }))}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="quiz-direct">Quiz direct</option>
                    <option value="video-quiz">Vidéo + Quiz</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Récompense</label>
                  <input
                    type="text"
                    value={currentCommercant.reward || ""}
                    onChange={(e) => setCurrentCommercant(prev => ({ ...prev, reward: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Ex: Jusqu'à +200 pts"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">URL Logo</label>
                  <input
                    type="url"
                    value={currentCommercant.logoImage || ""}
                    onChange={(e) => setCurrentCommercant(prev => ({ ...prev, logoImage: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">URL Image principale</label>
                  <input
                    type="url"
                    value={currentCommercant.mainImage || ""}
                    onChange={(e) => setCurrentCommercant(prev => ({ ...prev, mainImage: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
        </div>

              {/* Questions */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Questions du Quiz</h3>
                  <button
                    onClick={addQuestion}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    ➕ Ajouter Question
                  </button>
                </div>

                {currentCommercant.questions?.map((question, qIndex) => (
                  <div key={qIndex} className="border rounded-lg p-4 mb-3 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Question</label>
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Ex: Quel est le meilleur moment pour se laver les cheveux ?"
                        />
        </div>

                      {question.options.map((option, oIndex) => (
                        <div key={oIndex}>
                          <label className="block text-sm font-medium mb-1">
                            Option {oIndex + 1}
                            {oIndex === question.correctIndex && " ✅"}
                          </label>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...question.options];
                              newOptions[oIndex] = e.target.value;
                              updateQuestion(qIndex, 'options', newOptions);
                            }}
                            className="w-full p-2 border rounded"
                            placeholder={`Option ${oIndex + 1}`}
                          />
                        </div>
                      ))}
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Bonne réponse</label>
                        <select
                          value={question.correctIndex}
                          onChange={(e) => updateQuestion(qIndex, 'correctIndex', parseInt(e.target.value))}
                          className="w-full p-2 border rounded"
                        >
                          {question.options.map((_, index) => (
                            <option key={index} value={index}>Option {index + 1}</option>
                          ))}
                        </select>
        </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Explication</label>
                        <input
                          type="text"
                          value={question.explanation}
                          onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Ex: 2-3 fois par semaine permet de préserver les huiles naturelles !"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Récompenses */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Récompenses Scratch</h3>
                  <button
                    onClick={addReward}
                    className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                  >
                    ➕ Ajouter Récompense
                  </button>
        </div>

                {currentCommercant.scratchRewards?.map((reward, rIndex) => (
                  <div key={rIndex} className="border rounded-lg p-4 mb-3 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <select
                          value={reward.type}
                          onChange={(e) => {
                            const newRewards = [...(currentCommercant.scratchRewards || [])];
                            newRewards[rIndex] = { ...reward, type: e.target.value as "points" | "coupon" | "gift" };
                            setCurrentCommercant(prev => ({ ...prev, scratchRewards: newRewards }));
                          }}
                          className="w-full p-2 border rounded"
                        >
                          <option value="points">Points</option>
                          <option value="coupon">Coupon</option>
                          <option value="gift">Cadeau</option>
                        </select>
                      </div>
                      
                      {reward.type === "points" && (
                        <div>
                          <label className="block text-sm font-medium mb-1">Montant</label>
                          <input
                            type="number"
                            value={reward.amount || 0}
                            onChange={(e) => {
                              const newRewards = [...(currentCommercant.scratchRewards || [])];
                              newRewards[rIndex] = { ...reward, amount: parseInt(e.target.value) };
                              setCurrentCommercant(prev => ({ ...prev, scratchRewards: newRewards }));
                            }}
                            className="w-full p-2 border rounded"
                            placeholder="50"
                          />
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Label</label>
                        <input
                          type="text"
                          value={reward.label}
                          onChange={(e) => {
                            const newRewards = [...(currentCommercant.scratchRewards || [])];
                            newRewards[rIndex] = { ...reward, label: e.target.value };
                            setCurrentCommercant(prev => ({ ...prev, scratchRewards: newRewards }));
                          }}
                          className="w-full p-2 border rounded"
                          placeholder="Ex: +50 points santé"
                        />
        </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <input
                          type="text"
                          value={reward.description}
                          onChange={(e) => {
                            const newRewards = [...(currentCommercant.scratchRewards || [])];
                            newRewards[rIndex] = { ...reward, description: e.target.value };
                            setCurrentCommercant(prev => ({ ...prev, scratchRewards: newRewards }));
                          }}
                          className="w-full p-2 border rounded"
                          placeholder="Ex: Points bonus pour votre bien-être !"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Boutons */}
              <div className="flex gap-3">
                <button
                  onClick={saveCommercant}
                  className="px-6 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] transition-colors"
                >
                  💾 Sauvegarder
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setCurrentCommercant({
                      type: "quiz-direct",
                      theme: "",
                      questions: [],
                      scratchRewards: []
                    });
                  }}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  ❌ Annuler
                </button>
        </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}