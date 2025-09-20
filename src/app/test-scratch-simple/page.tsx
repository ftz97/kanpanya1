"use client";
import React from "react";
import ScratchCard from "@/components/ScratchCard";

export default function TestScratchSimplePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-center">🎫 Test Scratch Card Simple</h1>
      <div className="w-full max-w-sm sm:max-w-md">
        <ScratchCard
          reward={{
            type: "points",
            amount: 50,
            label: "+50 points bonus !"
          }}
          onReveal={() => {
            console.log("🎉 Récompense révélée !");
          }}
        />
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">Ce composant utilise directement ScratchCard avec une récompense fixe</p>
        <p className="text-sm text-gray-500">L'animation de pluie d'emoji devrait se déclencher après le grattage</p>
      </div>
    </div>
  );
}
