"use client";
import React from "react";
import ScratchCard from "@/components/ScratchCard";

export default function ScratchDemoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="mb-6 text-2xl font-bold">🎫 Démo - Carte à Gratter</h1>
      <ScratchCard 
        reward={{ type: 'points', amount: 100 }}
        onReveal={() => console.log('Card revealed!')}
      />
    </div>
  );
}