"use client";
import { useEffect, useState } from "react";

interface Attraction {
  nom_commerce: string;
  taux_nouveaux_clients: number;
  taux_retention: number;
}

interface Impact {
  mois: string;
  clients_via_reco: number;
  clients_totaux: number;
}

export default function ProDashboardPage() {
  const [attraction, setAttraction] = useState<Attraction[]>([]);
  const [impact, setImpact] = useState<Impact[]>([]);
  const merchantId = "UUID_DU_COMMERÇANT"; // à remplacer dynamiquement

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch(`/api/pro-stats/${merchantId}`);
      const json = await res.json();
      setAttraction(json.attraction);
      setImpact(json.impact);
    };
    fetchStats();
  }, [merchantId]);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">📊 Tableau de bord commerçant</h1>

        {/* 🎯 Qualité d'Attraction */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">🎯 Qualité d'Attraction</h2>
          {attraction.map((a, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>{a.nom_commerce}</span>
              <span>{a.taux_nouveaux_clients.toFixed(1)}% nouveaux, {a.taux_retention.toFixed(1)}% retenus</span>
            </div>
          ))}
        </section>

        {/* 📊 Impact Konpanya */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">📊 Impact Konpanya</h2>
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 uppercase">
              <tr>
                <th>Mois</th>
                <th>Via Reco</th>
                <th>Total</th>
                <th>% Reco</th>
              </tr>
            </thead>
            <tbody>
              {impact.map((imp, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2">{new Date(imp.mois).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</td>
                  <td className="py-2">{imp.clients_via_reco}</td>
                  <td className="py-2">{imp.clients_totaux}</td>
                  <td className="py-2 font-semibold">
                    {((imp.clients_via_reco / imp.clients_totaux) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
