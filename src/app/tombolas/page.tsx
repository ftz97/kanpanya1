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
            <div key={idx} className="bg-white rounded-xl shadow overflow-hidden flex flex-col min-h-[320px]">
              {/* Image principale */}
              {tb.image && (
                <div className="relative h-40 w-full overflow-hidden">
                  <img 
                    src={tb.image} 
                    alt={tb.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Logo rond en overlay */}
                  {tb.logo && (
                    <div className="absolute bottom-3 left-3 w-14 h-14 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white">
                      <img 
                        src={tb.logo} 
                        alt="Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
              
              {/* Contenu */}
              <div className="p-6 flex flex-col flex-1 bg-yellow-50">
                <p className="font-bold text-lg text-[#123456] mb-2">{tb.title}</p>
                <p className="text-gray-600 text-sm mb-4">{tb.desc}</p>
                <button className="mt-auto bg-yellow-500 text-white rounded-lg py-3 text-sm font-semibold hover:bg-yellow-600 active:scale-95 transition-all duration-200">
                  {tb.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

