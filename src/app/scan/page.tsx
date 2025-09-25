// app/scan/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ScanLanding() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000); // 3 secondes avant redirection automatique
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white px-6">
      <div className="bg-white shadow-md rounded-2xl p-8 text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold text-[#212E40] mb-4">
          🎉 Bienvenue sur Kanpanya
        </h1>
        <p className="text-gray-600 mb-6">
          Tu viens de scanner un QR code commerçant. 
          <br />
          Prépare-toi à débloquer tes{" "}
          <span className="font-semibold text-[#17BFA0]">récompenses</span> !
        </p>
        <button
          onClick={() => router.push("/login")}
          className="w-full bg-[#17BFA0] text-white py-3 rounded-xl font-semibold shadow hover:bg-[#14a58a] transition"
        >
          Continuer maintenant
        </button>
        <p className="text-xs text-gray-400 mt-2">
          Redirection automatique dans 3 secondes...
        </p>
      </div>
    </div>
  );
}