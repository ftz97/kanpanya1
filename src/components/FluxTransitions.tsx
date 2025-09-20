"use client";
import { useState } from "react";
import SankeyChart from "./SankeyChart";
import FluxInsights from "./FluxInsights";

// ✅ Mock Sankey data
const sankeyData = {
  nodes: [
    { name: "Clients" },
    { name: "Commerçants" },
    { name: "Réductions" },
    { name: "Tickets Diamant" },
  ],
  links: [
    { source: 0, target: 1, value: 120, percentage: 100 },
    { source: 1, target: 2, value: 80, percentage: 67 },
    { source: 1, target: 3, value: 40, percentage: 33 },
  ],
};

// ✅ Section générique
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white shadow rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

// ✅ Section Flux & Transitions
function FluxTransitions() {
  console.log("GraphData reçu pour le Sankey :", sankeyData);
  
  return (
    <Section title="🔄 Flux & Transitions">
      <div className="h-80 w-full">
        <SankeyChart data={sankeyData} width={800} height={300} />
      </div>
      <FluxInsights links={sankeyData.links.map(link => ({
        ...link,
        source: sankeyData.nodes[link.source],
        target: sankeyData.nodes[link.target]
      }))} />
    </Section>
  );
}

export default FluxTransitions;
