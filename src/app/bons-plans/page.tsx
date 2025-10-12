"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { flashOffers } from "@/data/dashboardData";

export default function BonsPlansPage() {
  const router = useRouter();
  const [items, setItems] = React.useState<typeof flashOffers>([]);

  React.useEffect(() => {
    setTimeout(() => setItems(flashOffers), 200);
  }, []);

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
        <h1 className="text-2xl sm:text-3xl font-bold text-[#123456] mb-6">🔥 Tous les bons plans flash</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Chargement des offres...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((offer, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="bg-white rounded-xl shadow overflow-hidden border border-gray-200 flex flex-col h-auto sm:min-h-[300px]"
              >
                {/* Image principale */}
                {offer.image && (
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image 
                      src={offer.image} 
                      alt={offer.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Logo rond en overlay */}
                    {offer.logo && (
                      <div className="absolute bottom-3 left-3 w-14 h-14 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white z-10">
                        <Image 
                          src={offer.logo} 
                          alt="Logo"
                          width={56}
                          height={56}
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Contenu */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                      {offer.tag}
                    </span>
                    <span className="text-xs text-gray-500">Offre limitée</span>
                  </div>
                  <p className="font-semibold text-lg text-[#123456] mb-4">{offer.title}</p>
                  <button className="mt-auto w-full border-2 border-[#17BFA0] text-[#17BFA0] rounded-lg py-3 text-sm font-semibold hover:bg-[#17BFA0] hover:text-white active:scale-95 transition-all duration-200">
                    Voir l&apos;offre
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
