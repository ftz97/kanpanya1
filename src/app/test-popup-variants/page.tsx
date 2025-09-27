"use client";

import React, { useState } from "react";
import Popup from "@/components/Popup";

const variants = [
  { key: "rect", name: "Rectangle", description: "Design simple et épuré" },
  { key: "carre", name: "Carré", description: "Format carré avec dégradé" },
  { key: "banniere", name: "Bannière", description: "Format horizontal avec emoji" },
  { key: "header", name: "Header", description: "Avec en-tête coloré" },
  { key: "cercle", name: "Cercle", description: "Forme circulaire" },
  { key: "luxe", name: "Luxe", description: "Design premium" },
  { key: "glass", name: "Glass", description: "Effet de verre" },
];

export default function TestPopupVariants() {
  const [activeVariant, setActiveVariant] = useState<string | null>(null);

  const showPopup = (variant: string) => {
    setActiveVariant(variant);
  };

  const closePopup = () => {
    setActiveVariant(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          🎨 Test des Variantes de Popup
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {variants.map((variant) => (
            <div
              key={variant.key}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => showPopup(variant.key)}
            >
              <h3 className="text-xl font-semibold mb-2">{variant.name}</h3>
              <p className="text-gray-600 mb-4">{variant.description}</p>
              <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Tester {variant.name}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Cliquez sur une carte pour tester la variante de popup correspondante
          </p>
        </div>
      </div>

      {/* Popups */}
      {activeVariant && (
        <Popup
          variant={activeVariant as any}
          title="🎉 Test de Variante"
          message={`Ceci est un test de la variante "${variants.find(v => v.key === activeVariant)?.name}"`}
          onClose={closePopup}
        />
      )}
    </div>
  );
}




