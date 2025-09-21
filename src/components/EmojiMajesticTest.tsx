"use client";
import { rainMajestic } from "@/lib/emojiMajesticPresets";

export default function EmojiMajesticTest() {
  return (
    <div className="flex flex-col gap-6 items-center p-6">
      <h2 className="text-2xl font-bold text-center mb-4">👑 Animation Majestueuse</h2>
      
      <button 
        onClick={() => rainMajestic()} 
        className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg transform hover:scale-105"
      >
        👑 DÉCLENCHER L'ANIMATION MAJESTUEUSE
      </button>
      
      <div className="text-center text-sm text-gray-600 max-w-md">
        <p className="mb-2"><strong>Caractéristiques :</strong></p>
        <p>• Durée longue (4.2-6s) pour un effet majestueux</p>
        <p>• Gros emojis premium (28-60px)</p>
        <p>• Oscillation douce et entrée progressive</p>
        <p>• Visibilité totale dès l&apos;apparition</p>
      </div>
    </div>
  );
}
