"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { categories } from "@/data/dashboardData";

export default function CategoriesPage() {
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
        <h1 className="text-2xl sm:text-3xl font-bold text-[#123456] mb-6">📂 Toutes les catégories</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6 border border-gray-200 text-center hover:shadow-lg transition cursor-pointer">
              <span className="text-5xl mb-3 block">{cat.icon}</span>
              <p className="font-semibold text-base text-[#123456] mb-3">{cat.name}</p>
              <button className="w-full border border-[#17BFA0] text-[#17BFA0] rounded-lg py-2 text-sm font-medium hover:bg-teal-50 transition">
                Explorer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

