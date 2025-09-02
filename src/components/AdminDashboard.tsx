"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AdminDashboard() {
  const supabase = createClientComponentClient();
  const [globalStats, setGlobalStats] = useState<any[]>([]);
  const [todayStats, setTodayStats] = useState<any[]>([]);
  const [weekStats, setWeekStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        let { data: global } = await supabase.from("admin_scratch_stats").select("*");
        let { data: today } = await supabase.from("admin_scratch_stats_today").select("*");
        let { data: week } = await supabase.from("admin_scratch_stats_week").select("*");

        setGlobalStats(global ?? []);
        setTodayStats(today ?? []);
        setWeekStats(week ?? []);
      } catch (error) {
        console.error("Erreur chargement stats:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Chargement des statistiques...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">📊 Tableau de bord Admin</h1>

      {/* Vue Globale */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Vue Globale</h2>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(globalStats, null, 2)}</pre>
      </section>

      {/* Stats du Jour */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Stats du Jour</h2>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(todayStats, null, 2)}</pre>
      </section>

      {/* Stats 7 derniers jours */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Stats des 7 derniers jours</h2>

        {weekStats.length === 0 ? (
          <p className="text-gray-500">Pas encore de données</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weekStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="badge" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="plays_week" fill="#3b82f6" name="Tickets joués" />
              <Bar dataKey="wins_week" fill="#22c55e" name="Gagnants" />
              <Bar dataKey="loses_week" fill="#ef4444" name="Perdants" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </section>
    </div>
  );
}
