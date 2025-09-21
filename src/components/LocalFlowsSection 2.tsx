"use client";
import { useEffect, useState } from "react";

interface Flow {
  source_nom: string;
  cible_nom: string;
  nb_clients: number;
}

export default function LocalFlowsSection() {
  const [flows, setFlows] = useState<Flow[]>([]);

  useEffect(() => {
    // Mock data
    setFlows([
      { source_nom: "Domino's Pizza", cible_nom: "Carrefour Market", nb_clients: 40 },
      { source_nom: "Barber Street", cible_nom: "Snack Latino", nb_clients: 25 },
    ]);
  }, []);

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
