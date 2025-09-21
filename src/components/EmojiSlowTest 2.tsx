"use client";
import { 
  rainSlowMotionOscillating, 
  rainSlowMotionScale, 
  rainSlowMotionGlow, 
  rainSlowMotionEasing,
  rainSlowMotionUltimate 
} from "@/lib/emojiSlowPresets";

export default function EmojiSlowTest() {
  return (
    <div className="flex flex-col gap-4 items-center p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">🐌 Tests Slow Motion Séparés</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <button
          onClick={() => rainSlowMotionOscillating()}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          🌊 1️⃣ Oscillation douce
        </button>

        <button
          onClick={() => rainSlowMotionScale()}
          className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          ⚖️ 2️⃣ Échelle variable
        </button>

        <button
          onClick={() => rainSlowMotionGlow()}
          className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
        >
          ✨ 3️⃣ Glow discret
        </button>

        <button
          onClick={() => rainSlowMotionEasing()}
          className="px-6 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-colors"
        >
          🎬 4️⃣ Easing dramatique
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-300 w-full">
        <button
          onClick={() => rainSlowMotionUltimate()}
          className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-lg hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg"
        >
          🚀 VERSION FINALE - Toutes les améliorations
        </button>
      </div>
    </div>
  );
}
