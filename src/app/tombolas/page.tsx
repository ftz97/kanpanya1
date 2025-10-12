"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { tombolas } from "@/data/dashboardData";

export default function TombolasPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Header */}
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 py-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-[#17BFA0] font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </button>
          <div className="text-lg font-bold text-[#17BFA0]">Kanpanya</div>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#123456] mb-6">🎁 Toutes les tombolas</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tombolas.map((tb, idx) => (
            <div key={idx} className="bg-yellow-50 rounded-xl shadow p-6 flex flex-col min-h-[180px]">
              <p className="font-bold text-lg text-[#123456] mb-2">{tb.title}</p>
              <p className="text-gray-600 text-sm mb-4">{tb.desc}</p>
              <button className="mt-auto bg-yellow-500 text-white rounded-lg py-3 text-sm font-semibold hover:bg-yellow-600 transition">
                {tb.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

