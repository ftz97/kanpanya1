"use client";
import { useState } from "react";
import { colors } from "@/config/colors";
import { PrimaryButton } from "@/components/StandardPageLayout";

export function ActusPileProgress() {
  const [index, setIndex] = useState(0);
  const actus = [
    { merchant: "Épicerie Bio", title: "🌱 Nouveaux fruits locaux", desc: "Mangez frais, achetez pays" },
    { merchant: "Café du Coin", title: "🎶 Soirée Jazz vendredi", desc: "Ambiance live dès 20h" },
    { merchant: "Fleuriste Antilles", title: "💐 Atelier bouquet samedi", desc: "Apprenez à composer le vôtre" },
    { merchant: "Boulangerie Artisanale", title: "🥖 Pain complet dispo", desc: "Cuit ce matin, encore chaud" },
  ];

  const next = () => setIndex((prev) => (prev + 1) % actus.length);

  return (
    <div className="w-full max-w-sm mx-auto rounded-lg shadow-lg p-6 flex flex-col relative border min-h-80"
         style={{ 
           background: colors.card,
           borderColor: '#E5E7EB'
         }}>
      {/* En-tête avec nom du commerçant */}
      <div className="mb-3">
        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: colors.primary }}>
          {actus[index].merchant}
        </p>
      </div>
      
      {/* Titre de l'actualité */}
      <p className="font-bold mb-3 text-lg" style={{ color: colors.textPrimary }}>
        {actus[index].title}
      </p>
      
      {/* Description */}
      <p className="text-sm flex-1 leading-relaxed" style={{ color: colors.textSecondary }}>
        {actus[index].desc}
      </p>
      
      {/* Bouton d'action */}
      <PrimaryButton
        onClick={next}
        className="mt-4 w-full"
      >
        Suivant →
      </PrimaryButton>

      {/* Indicateur de progression */}
      <div className="absolute bottom-2 right-3 flex items-center space-x-1">
        {actus.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              i === index ? 'opacity-100 scale-110' : 'opacity-30'
            }`}
            style={{ 
              backgroundColor: i === index ? colors.primary : colors.textMuted 
            }}
          />
        ))}
      </div>
      
      {/* Compteur */}
      <span className="absolute bottom-2 left-3 text-xs font-medium" style={{ color: colors.textMuted }}>
        {index + 1} / {actus.length}
      </span>
    </div>
  );
}

export default function ActusPileProgressPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" 
         style={{ background: colors.background }}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>
          📰 Actus commerçants
        </h2>
        <p className="text-sm" style={{ color: colors.textSecondary }}>
          Découvrez les dernières actualités de vos commerçants préférés
        </p>
      </div>
      <ActusPileProgress />
    </div>
  );
}
