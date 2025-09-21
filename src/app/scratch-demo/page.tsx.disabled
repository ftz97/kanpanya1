"use client";
import React from "react";
import ScratchCard from "@/components/ScratchCard";

export default function ScratchDemoPage() {
  const demoReward = {
    type: "points" as const,
    amount: 50,
    label: "50 points gratuits"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-center">🎫 Démo - Carte à Gratter</h1>
      <div className="w-full max-w-sm sm:max-w-md">
        <ScratchCard reward={demoReward} />
      </div>
    </div>
  );
}