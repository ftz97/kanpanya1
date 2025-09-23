"use client";
import { useEffect, useState, useCallback } from "react";

interface Flow {
  source_nom: string;
  cible_nom: string;
  nb_clients: number;
}

export default function LocalFlowsSection() {
  const [flows, setFlows] = useState<Flow[]>([]);

  
const stableSetFlows = useCallback(() => {
  setFlows();
}, [setFlows]);

useEffect(() => {
  stableSetFlows();
}, [stableSetFlows]);;

  return (
    <section className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">🌍 Flux Locaux & Zones Chaudes</h2>
      <ul className="space-y-3">
        {flows.map((f, idx) => (
          <li key={idx} className="flex justify-between">
            <span>
              {f.source_nom} → {f.cible_nom}
            </span>
            <span className="font-semibold">{f.nb_clients} clients</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
