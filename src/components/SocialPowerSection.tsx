"use client";
import { useEffect, useState } from "react";

interface SocialPower {
  source_nom: string;
  cible_nom: string;
  nb_clients_partages: number;
}

export default function SocialPowerSection() {
  const [data, setData] = useState<SocialPower[]>([]);

  
const stableSetData = useCallback(() => {
  setData();
}, [setData]);

useEffect(() => {
  stableSetData();
}, [stableSetData]);;

  return (
    <section className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">🔗 Puissance Sociale</h2>
      <p className="text-sm text-gray-600 mb-4">
        Les commerces qui créent le plus de connexions entre clients
      </p>
      <ul className="space-y-3">
        {data.map((item, idx) => (
          <li key={idx} className="flex justify-between">
            <span>
              {item.source_nom} → {item.cible_nom}
            </span>
            <span className="font-semibold">{item.nb_clients_partages} clients partagés</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
