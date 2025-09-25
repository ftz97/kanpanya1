"use client";
import { useEffect, useState, useCallback } from "react";

interface AttractionQuality {
  nom_commerce: string;
  taux_nouveaux_clients: number;
  taux_retention: number;
}

export default function AttractionQualitySection() {
  const [data, setData] = useState<AttractionQuality[]>([]);

useEffect(() => {
  stableSetData();
}, [stableSetData]);;

  return (
    <section className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">🎯 Qualité d&apos;Attraction</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 uppercase">
            <th className="pb-2">Commerce</th>
            <th className="pb-2">Nouveaux Clients</th>
            <th className="pb-2">Rétention (30j)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-2">{row.nom_commerce}</td>
              <td className="py-2 font-semibold">{row.taux_nouveaux_clients}%</td>
              <td className="py-2">{row.taux_retention}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
