"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { actus } from "@/data/dashboardData";

export default function ActusPage() {
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
        <h1 className="text-2xl sm:text-3xl font-bold text-[#123456] mb-6">📰 Toutes les actus commerçants</h1>
        
        <div className="space-y-4">
          {actus.map((actu, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
              {/* Image principale en haut */}
              {actu.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={actu.image} 
                    alt={actu.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Logo rond en overlay */}
                  {actu.logo && (
                    <div className="absolute bottom-3 left-3 w-14 h-14 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white">
                      <img 
                        src={actu.logo} 
                        alt={actu.merchant}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
              
              {/* Contenu */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-lg text-[#123456] mb-2">{actu.title}</p>
                    <p className="text-gray-600 text-sm mb-3">{actu.desc}</p>
                    <p className="text-sm text-[#17BFA0] font-semibold">{actu.merchant}</p>
                  </div>
                  <button className="px-4 py-2 bg-[#17BFA0] text-white rounded-lg text-sm font-medium hover:bg-[#14a58d] active:scale-95 transition-all duration-200 whitespace-nowrap">
                    En savoir +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

