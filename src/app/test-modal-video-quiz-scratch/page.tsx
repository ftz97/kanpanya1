"use client";
import { useState } from "react";
import { motion } from "framer-motion";

// Version simplifiée du modal pour les tests
function SimpleTestModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"video" | "quiz" | "scratch">("video");

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🎥 Test Modal Vidéo Quiz Scratch
            </h2>
            <p className="text-gray-600">Étape {step === "video" ? "1" : step === "quiz" ? "2" : "3"} sur 3</p>
          </div>

          {/* Contenu selon l'étape */}
          {step === "video" && (
            <div className="text-center">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold mb-4">Étape Vidéo</h3>
              <p className="text-gray-600 mb-6">Présentation du partenaire</p>
              <button
                onClick={() => setStep("quiz")}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Continuer vers le Quiz ➡️
              </button>
            </div>
          )}

          {step === "quiz" && (
            <div className="text-center">
              <div className="text-6xl mb-4">❓</div>
              <h3 className="text-xl font-semibold mb-4">Étape Quiz</h3>
              <p className="text-gray-600 mb-6">Test de connaissances</p>
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="font-medium mb-2">Question : Quel est le rôle d'une mutuelle ?</p>
                <div className="space-y-2">
                  <button className="w-full p-2 bg-white rounded border hover:bg-gray-50">Protéger la santé</button>
                  <button className="w-full p-2 bg-white rounded border hover:bg-gray-50">Vendre des chaussures</button>
                </div>
              </div>
              <button
                onClick={() => setStep("scratch")}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Continuer vers Scratch ➡️
              </button>
            </div>
          )}

          {step === "scratch" && (
            <div className="text-center">
              <div className="text-6xl mb-4">🎟️</div>
              <h3 className="text-xl font-semibold mb-4">Étape Scratch Card</h3>
              <p className="text-gray-600 mb-6">Grattez votre ticket !</p>
              <div className="bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-lg p-8 mb-6">
                <div className="text-4xl mb-2">🎁</div>
                <p className="font-bold text-lg">+50 points Kanpanya</p>
                <p className="text-sm text-gray-600">Récompense révélée !</p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Terminer ✅
              </button>
            </div>
          )}

          {/* Barre de progression */}
          <div className="mt-6 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: step === "video" ? "33%" : step === "quiz" ? "66%" : "100%" }}
            />
          </div>
        </div>

        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function TestModalVideoQuizScratchPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎥 Test Modal Vidéo Quiz Scratch Card
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Page de test pour le modal complet avec vidéo → quiz → scratch card et animations
          </p>
        </motion.div>

        {/* Boutons de Test */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsModalOpen(true);
              addTestResult("Modal ouvert");
            }}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            🎥 Ouvrir Modal Complet
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              addTestResult("Test d'animation déclenché");
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            ✨ Test Animations
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearResults}
            className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            🗑️ Effacer Logs
          </motion.button>
        </motion.div>

        {/* Informations sur le Modal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">🎥</div>
            <h3 className="text-lg font-semibold mb-2">Étape Vidéo</h3>
            <p className="text-gray-600 text-sm">
              Présentation du partenaire avec design Kanpanya et bouton de continuation animé
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">❓</div>
            <h3 className="text-lg font-semibold mb-2">Étape Quiz</h3>
            <p className="text-gray-600 text-sm">
              Test de connaissances avec le composant MiniQuiz et transition fluide
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-3">🎟️</div>
            <h3 className="text-lg font-semibold mb-2">Étape Scratch</h3>
            <p className="text-gray-600 text-sm">
              Récompense à gratter avec animations d'emojis selon le montant gagné
            </p>
          </div>
        </motion.div>

        {/* Logs de Test */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            📊 Logs de Test
            <span className="ml-2 text-sm text-gray-500">({testResults.length} entrées)</span>
          </h3>
          
          {testResults.length === 0 ? (
            <p className="text-gray-500 italic">Aucun log pour le moment. Ouvrez le modal pour commencer les tests !</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {testResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-gray-50 rounded-lg text-sm font-mono"
                >
                  {result}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">📋 Instructions de Test</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">🎯 Tests à Effectuer :</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Ouvrir/fermer le modal</li>
                <li>• Naviguer entre les étapes</li>
                <li>• Tester les animations</li>
                <li>• Vérifier la responsivité</li>
                <li>• Tester le scratch card</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔍 Points à Vérifier :</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Transitions fluides</li>
                <li>• Animations d'emojis</li>
                <li>• Design Kanpanya</li>
                <li>• Barre de progression</li>
                <li>• Bouton de fermeture</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal Vidéo Quiz Scratch Card Animation */}
      <SimpleTestModal 
        visible={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          addTestResult("Modal fermé");
        }} 
      />
    </div>
  );
}
