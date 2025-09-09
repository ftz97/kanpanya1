"use client";
import { useState } from "react";
import SimpleEmojiRain from "@/components/SimpleEmojiRain";

export default function TestSimple() {
  const [showHearts, setShowHearts] = useState(false);
  const [showSad, setShowSad] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      <h1 className="text-2xl font-bold">Test Confettis Simple</h1>
      
      <div className="flex gap-4">
        <button
          onClick={() => setShowHearts(true)}
          className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition"
        >
          ❤️ Cœurs
        </button>
        
        <button
          onClick={() => setShowSad(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          😢 Triste
        </button>
      </div>

      <p className="text-gray-600">
        Cliquez sur les boutons pour voir les confettis
      </p>

      {/* Animations */}
      <SimpleEmojiRain mode="hearts" running={showHearts} durationMs={3000} />
      <SimpleEmojiRain mode="sad" running={showSad} durationMs={3000} />
    </div>
  );
}
