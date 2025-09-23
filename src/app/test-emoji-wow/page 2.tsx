"use client";
import EmojiSlowTest from "@/components/EmojiSlowTest";

export default function EmojiWowPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">🌟 Test Effets Slow Motion</h1>
        <p className="text-lg text-gray-600 mb-8">Effets d'animation emoji ralentis</p>
        <EmojiSlowTest />
        
        <div className="mt-8 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg max-w-md mx-auto">
          <h3 className="font-semibold mb-2">Effets disponibles :</h3>
          <p>• <strong>Oscillation</strong> : Mouvement en S comme une feuille</p>
          <p>• <strong>Échelle variable</strong> : Tailles différentes pour la profondeur</p>
          <p>• <strong>Glow discret</strong> : Scintillement sur les emojis brillants</p>
          <p>• <strong>Easing dramatique</strong> : Animation cinématique</p>
          <p>• <strong>Version finale</strong> : Toutes les améliorations combinées</p>
        </div>
      </div>
    </main>
  );
}
