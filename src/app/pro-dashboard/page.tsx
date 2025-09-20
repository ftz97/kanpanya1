"use client";
import AttractionQualitySection from "@/components/AttractionQualitySection";
import KonpanyaImpactSection from "@/components/KonpanyaImpactSection";
import AIInsightsBox from "@/components/AIInsightsBox";

export default function ProDashboardPage() {
  const merchantName = "Pizzeria Bella Vista"; // à remplacer par ID du commerçant connecté

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📊 Tableau de bord — {merchantName}
          </h1>
          <p className="text-gray-600">
            Suivi de vos clients et analyse automatique Konpanya
          </p>
        </div>

        {/* 🎯 Qualité d'Attraction */}
        <AttractionQualitySection />

        {/* 📊 Impact Konpanya */}
        <KonpanyaImpactSection />

        {/* 🤖 Insight IA */}
        <AIInsightsBox />
      </div>
    </main>
  );
}
