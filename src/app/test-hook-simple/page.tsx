"use client";

import { useWelcomeMessageSimple } from "@/hooks/useWelcomeMessageSimple";

export default function TestHookSimplePage() {
  const userName = "Kevin";
  const language = 'fr';
  const { welcomeMessage, loading, error, refetch } = useWelcomeMessageSimple(userName, language);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Test Hook Simple</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              État de chargement
            </label>
            <div className={`p-3 rounded-md text-sm ${
              loading ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
            }`}>
              {loading ? "⏳ Chargement..." : "✅ Terminé"}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message de bienvenue
            </label>
            <div className="p-3 bg-blue-100 text-blue-800 rounded-md text-sm">
              {welcomeMessage}
            </div>
          </div>

          {error && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Erreur
              </label>
              <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">
                {error}
              </div>
            </div>
          )}

          <button
            onClick={refetch}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            🔄 Recharger le message
          </button>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p><strong>Utilisateur:</strong> {userName}</p>
          <p><strong>Langue:</strong> {language}</p>
          <p><strong>Heure:</strong> {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}
