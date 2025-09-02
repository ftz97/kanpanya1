"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DebugPage() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const check = async () => {
      try {
        // Test de connexion
        const { data: tables, error } = await supabase
          .from("information_schema.tables")
          .select("table_name")
          .eq("table_schema", "public");

        // Test user connecté
        const {
          data: { user },
        } = await supabase.auth.getUser();

        setStatus({
          frontend: "✅ Next.js fonctionne",
          node_env: process.env.NODE_ENV,
          supabase: error ? `❌ ${error.message}` : "✅ Connecté",
          tables: tables?.map((t: any) => t.table_name) || [],
          user: user ? { id: user.id, email: user.email } : "Pas connecté",
        });
      } catch (err: any) {
        setStatus({
          frontend: "✅ Next.js fonctionne",
          supabase: `❌ Erreur: ${err.message}`,
        });
      }
    };

    check();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🔍 Page de Diagnostic Technique</h1>

      {status ? (
        <div className="space-y-2">
          <p><strong>Frontend :</strong> {status.frontend}</p>
          <p><strong>Environnement :</strong> {status.node_env}</p>
          <p><strong>Connexion Supabase :</strong> {status.supabase}</p>

          <div>
            <strong>Tables détectées :</strong>
            <ul className="list-disc ml-6">
              {status.tables?.map((t: string) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Utilisateur connecté :</strong>{" "}
            {typeof status.user === "string" ? status.user : (
              <pre className="bg-gray-100 p-2 rounded">
                {JSON.stringify(status.user, null, 2)}
              </pre>
            )}
          </div>
        </div>
      ) : (
        <p>⏳ Vérification en cours...</p>
      )}
    </div>
  );
}
