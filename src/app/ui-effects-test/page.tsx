// app/ui-effects-test/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function UIEffectsTest() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 🎉 Confettis mini
  const triggerConfetti = () => {
    confetti({
      particleCount: 6,
      spread: 40,
      origin: { y: 0.8 },
    });
  };

  // Progression bouton
  const handleClickWithLoading = (redirect: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(redirect);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white px-6 gap-10">
      <h1 className="text-2xl font-bold text-[#123456]">🎨 Test UI Effects</h1>

      {/* 1️⃣ Icônes pop */}
      <div className="bg-white shadow rounded-xl p-6 w-full max-w-sm text-center">
        <h2 className="mb-4 font-semibold">1️⃣ Icônes en "pop"</h2>
        <div className="flex justify-around">
          {["🔍", "📲", "🎁"].map((icon, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: i * 0.3, duration: 0.6 }}
              className="text-4xl"
            >
              {icon}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2️⃣ Confettis mini */}
      <div className="bg-white shadow rounded-xl p-6 w-full max-w-sm text-center">
        <h2 className="mb-4 font-semibold">2️⃣ Mini Confettis</h2>
        <button
          onClick={triggerConfetti}
          className="bg-[#17BFA0] text-white py-2 px-4 rounded-lg shadow hover:bg-[#14a58a]"
        >
          🎉 Clique-moi
        </button>
      </div>

      {/* 3️⃣ Halo lumineux */}
      <div className="bg-white shadow rounded-xl p-6 w-full max-w-sm text-center">
        <h2 className="mb-4 font-semibold">3️⃣ Halo lumineux</h2>
        <div className="flex justify-around">
          {["🔍", "📲", "🎁"].map((icon, i) => (
            <div
              key={i}
              className="text-4xl relative group"
            >
              <span className="relative z-10">{icon}</span>
              <span className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition bg-[#17BFA0]" />
            </div>
          ))}
        </div>
      </div>

      {/* 4️⃣ Progression bouton */}
      <div className="bg-white shadow rounded-xl p-6 w-full max-w-sm text-center">
        <h2 className="mb-4 font-semibold">4️⃣ Bouton avec progression</h2>
        <button
          onClick={() => handleClickWithLoading("/login-client")}
          className="relative w-full bg-[#17BFA0] text-white py-3 rounded-xl font-semibold overflow-hidden"
        >
          {loading ? (
            <motion.div
              className="absolute inset-0 bg-white/30"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1 }}
            />
          ) : null}
          <span className="relative z-10">🚀 Clique-moi</span>
        </button>
      </div>
    </div>
  );
}
