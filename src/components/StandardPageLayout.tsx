"use client";

import { ReactNode } from "react";
import { colors } from "@/config/colors";

interface StandardPageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function StandardPageLayout({ children, className = "" }: StandardPageLayoutProps) {
  return (
    <div 
      className={`min-h-screen ${className}`}
      style={{ background: colors.background }}
    >
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}

// Composant pour les titres de page standardisés
export function PageTitle({ 
  title, 
  subtitle, 
  className = "" 
}: { 
  title: string; 
  subtitle?: string; 
  className?: string; 
}) {
  return (
    <section className={`space-y-4 ${className}`}>
      <h1 className="text-3xl font-bold" style={{ color: colors.text }}>
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600">
          {subtitle}
        </p>
      )}
    </section>
  );
}

// Composant pour les cartes standardisées
export function StandardCard({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string; 
}) {
  return (
    <div 
      className={`rounded-2xl p-6 border bg-white shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

// Composant pour les boutons primaires standardisés
export function PrimaryButton({ 
  children, 
  onClick, 
  className = "",
  disabled = false
}: { 
  children: ReactNode; 
  onClick?: () => void; 
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 text-white font-semibold rounded-lg transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{ 
        background: disabled ? '#9CA3AF' : colors.primary,
        color: 'white'
      }}
    >
      {children}
    </button>
  );
}
