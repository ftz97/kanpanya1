"use client";
import { useState } from "react";

export default function TestConfetti() {
  const [message, setMessage] = useState("Cliquez pour tester les confettis");

  const testHearts = async () => {
    try {
      const JSConfetti = (await import("js-confetti")).default;
      const jsConfetti = new JSConfetti();
      
      jsConfetti.addConfetti({
        emojis: ["❤️", "💖", "💘", "💝"],
        emojiSize: 48,
        confettiNumber: 25,
      });
      
      setMessage("✅ Confettis de cœurs lancés !");
    } catch (error) {
      setMessage(`❌ Erreur: ${error}`);
    }
  };

  const testSad = async () => {
    try {
      const JSConfetti = (await import("js-confetti")).default;
      const jsConfetti = new JSConfetti();
      
      jsConfetti.addConfetti({
        emojis: ["😢", "💔", "😭"],
        emojiSize: 56,
        confettiNumber: 18,
      });
      
      setMessage("✅ Confettis tristes lancés !");
    } catch (error) {
      setMessage(`❌ Erreur: ${error}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">Test Confettis</h1>
      
      <div className="text-center">
        <p className="text-lg mb-4">{message}</p>
        
        <div className="flex gap-4">
          <button
            onClick={testHearts}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition"
          >
            ❤️ Cœurs
          </button>
          
          <button
            onClick={testSad}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            😢 Triste
          </button>
        </div>
      </div>
    </div>
  );
}
