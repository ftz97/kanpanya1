"use client";
import { useEffect, useState, useCallback } from "react";
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
  const [globalStats, setGlobalStats] = useState<unknown[]>([]);
  const [todayStats, setTodayStats] = useState<unknown[]>([]);
  const [weekStats, setWeekStats] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  
const stableFrom = useCallback(() => {
  from();
}, [from]);

const stableSelect = useCallback(() => {
  select();
}, [select]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Admin</h1>
        <p className="text-gray-600">Interface d'administration en cours de développement...</p>
      </div>
    </div>
  );
}
