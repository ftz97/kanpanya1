// app/scan/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function ScanLanding() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#212E40] mb-4">
          👋 Bienvenue sur <span className="text-[#17BFA0]">Kanpanya</span>
        </h1>
        <p className="text-gray-600 mb-8">
          L'app qui connecte <span className="font-semibold">clients</span> et{" "}
          <span className="font-semibold">commerçants locaux</span> à travers
          des récompenses, défis et promotions exclusives 🎉
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/login-client")}
            className="w-full bg-[#17BFA0] text-white py-3 rounded-xl font-semibold shadow hover:bg-[#14a58a] transition"
          >
            👤 Je suis un client
          </button>

          <button
            onClick={() => router.push("/login-merchant")}
            className="w-full bg-[#212E40] text-white py-3 rounded-xl font-semibold shadow hover:bg-[#1a2330] transition"
          >
            🏪 Je suis un commerçant
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Sélectionne ton profil pour continuer
        </p>
      </div>
    </div>
  );
}