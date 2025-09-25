// app/scan/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ScanLanding() {
  const router = useRouter();

  // Étapes du mini pitch
  const steps = [
    { icon: "🔍", text: "Découvre tes commerçants locaux" },
    { icon: "📲", text: "Scanne ton QR code" },
    { icon: "🎁", text: "Gagne des récompenses exclusives" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#123456] mb-6">
          👋 Bienvenue sur <span className="text-[#17BFA0]">Kanpanya</span>
        </h1>

        {/* Animation des étapes */}
        <div className="flex flex-col items-center gap-4 mb-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.6, duration: 0.6 }}
              className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl shadow-sm w-full"
            >
              <span className="text-2xl">{step.icon}</span>
              <p className="text-gray-700 font-medium">{step.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Choix du profil */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/login-client")}
            className="w-full bg-[#17BFA0] text-white py-3 rounded-xl font-semibold shadow hover:bg-[#14a58a] transition"
          >
            👤 Je suis un(e) client(e)
          </button>

          <button
            onClick={() => router.push("/login-merchant")}
            className="w-full bg-[#212E40] text-white py-3 rounded-xl font-semibold shadow hover:bg-[#1a2330] transition"
          >
            🏪 Je suis un(e) commerçant(e)
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Sélectionne ton profil pour continuer
        </p>
      </div>
    </div>
  );
}