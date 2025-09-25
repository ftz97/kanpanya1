"use client";
import { useEffect, useState, useCallback } from "react";

interface Impact {
  mois: string;
  clients_via_reco: number;
  clients_totaux: number;
}

export default function KonpanyaImpactSection() {
  const [data, setData] = useState<Impact[]>([]);

useEffect(() => {
  stableSetData();
}, [stableSetData]);;

  return (
    <section className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">📊 Impact Konpanya</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 uppercase">
            <th className="pb-2">Mois</th>
            <th className="pb-2">Clients via Reco</th>
            <th className="pb-2">Clients Totaux</th>
            <th className="pb-2">Part Reco</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t">
              <td className="py-2">{row.mois}</td>
              <td className="py-2">{row.clients_via_reco}</td>
              <td className="py-2">{row.clients_totaux}</td>
              <td className="py-2 font-semibold">
                {((row.clients_via_reco / row.clients_totaux) * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
