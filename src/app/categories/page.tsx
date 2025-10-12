"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { categories } from "@/data/dashboardData";

export default function CategoriesPage() {
  const router = useRouter();
  const [items, setItems] = React.useState<typeof categories>([]);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    setTimeout(() => setItems(categories), 200);
  }, []);

  // Filtrage par recherche
  const filteredItems = items.filter(cat =>
    cat.name.toLowerCase().includes(query.toLowerCase())
  );

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
        
        {/* Barre de recherche */}
        <div className="flex items-center bg-white rounded-full shadow-sm px-4 py-3 mb-5">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Rechercher une catégorie..."
            className="flex-1 text-base outline-none text-[#123456] placeholder:text-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Chargement des catégories...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">😕 Aucune catégorie trouvée</p>
            <p className="text-gray-400 text-sm mt-2">Essayez une autre recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredItems.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="bg-white rounded-xl shadow overflow-hidden border border-gray-200 flex flex-col h-auto sm:min-h-[260px] hover:shadow-lg transition cursor-pointer"
              >
                {/* Image principale avec icône overlay */}
                {cat.image && (
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image 
                      src={cat.image} 
                      alt={cat.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Icône en overlay centré */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <span className="text-6xl drop-shadow-lg">{cat.icon}</span>
                    </div>
                  </div>
                )}
                
                {/* Contenu */}
                <div className="p-4 flex flex-col flex-1 text-center items-center justify-center">
                  <p className="font-semibold text-base text-[#123456] mb-3">{cat.name}</p>
                  <button className="w-full border border-[#17BFA0] text-[#17BFA0] rounded-lg py-2 text-sm font-medium hover:bg-teal-50 active:scale-95 transition-all duration-200">
                    Explorer
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
