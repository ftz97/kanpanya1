// app/page.tsx - Page d'accueil Kanpanya avec effets UI
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function HomePage() {
  const router = useRouter();
  const [loadingClient, setLoadingClient] = useState(false);
  const [loadingMerchant, setLoadingMerchant] = useState(false);

  // Étapes du mini pitch
  const steps = [
    { icon: "🔍", text: "Découvre tes commerçants locaux" },
    { icon: "📲", text: "Scanne ton QR code" },
    { icon: "🎁", text: "Gagne des récompenses exclusives" },
  ];

  // 🎉 Confettis mini
  const triggerConfetti = () => {
    confetti({
      particleCount: 6,
      spread: 40,
      origin: { y: 0.8 },
    });
  };

  // Progression bouton client
  const handleClientClick = () => {
    setLoadingClient(true);
    triggerConfetti(); // Déclenche les confettis
    setTimeout(() => {
      setLoadingClient(false);
      router.push("/login-client");
    }, 1200);
  };

  // Progression bouton commerçant
  const handleMerchantClick = () => {
    setLoadingMerchant(true);
    triggerConfetti(); // Déclenche les confettis
    setTimeout(() => {
      setLoadingMerchant(false);
      router.push("/login-merchant");
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#123456] mb-6">
          👋 Bienvenue sur <span className="text-[#17BFA0]">Kanpanya</span>
        </h1>

        {/* Animation des étapes avec icônes en "pop" */}
        <div className="flex flex-col items-center gap-4 mb-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.6, duration: 0.6 }}
              className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl shadow-sm w-full group"
            >
              {/* Icône avec effet "pop" et halo lumineux */}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: i * 0.6 + 0.3, duration: 0.6 }}
                className="text-2xl relative"
              >
                <span className="relative z-10">{step.icon}</span>
                <span className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition bg-[#17BFA0]" />
              </motion.span>
              <p className="text-gray-700 font-medium">{step.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Choix du profil avec boutons de progression */}
        <div className="flex flex-col gap-4">
          {/* Bouton Client avec progression */}
          <button
            onClick={handleClientClick}
            disabled={loadingClient || loadingMerchant}
            className="relative w-full bg-[#17BFA0] text-white py-3 rounded-xl font-semibold shadow hover:bg-[#14a58a] transition overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingClient ? (
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
              />
            ) : null}
            <span className="relative z-10">👤 Je suis un(e) client(e)</span>
          </button>

          {/* Bouton Commerçant avec progression */}
          <button
            onClick={handleMerchantClick}
            disabled={loadingClient || loadingMerchant}
            className="relative w-full bg-[#123456] text-white py-3 rounded-xl font-semibold shadow hover:bg-[#1A4A66] transition overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingMerchant ? (
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
              />
            ) : null}
            <span className="relative z-10">🏪 Je suis un(e) commerçant(e)</span>
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Sélectionne ton profil pour continuer
        </p>
      </div>
    </div>
  );
}