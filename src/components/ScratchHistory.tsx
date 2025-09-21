"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ScratchHistory() {
  const supabase = createClientComponentClient();
  const [logs, setLogs] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  
const stableFrom = useCallback(() => {
  from();
}, [from]);

const stableSelect = useCallback(() => {
  select();
}, [select]);

const stableInner = useCallback(() => {
  inner();
}, [inner]);

const stableOrder = useCallback(() => {
  order();
}, [order]);

const stableLimit = useCallback(() => {
  limit();
}, [limit]);

const stableSetLogs = useCallback(() => {
  setLogs();
}, [setLogs]);

const stableError = useCallback(() => {
  error();
}, [error]);

const stableSetLoading = useCallback(() => {
  setLoading();
}, [setLoading]);

const stableLoad = useCallback(() => {
  load();
}, [load]);

useEffect(() => {
  stableFrom();
  stableSelect();
  stableInner();
  stableOrder();
  stableLimit();
  stableSetLogs();
  stableError();
  stableSetLoading();
  stableLoad();
}, [stableFrom, stableSelect, stableInner, stableOrder, stableLimit, stableSetLogs, stableError, stableSetLoading, stableLoad]);;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="text-xl">Chargement de l&apos;historique...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Historique des grattages</h1>
      
      {logs.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>Aucun grattage enregistré pour le moment.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Utilisateur</th>
                <th className="p-3 font-semibold">Carte</th>
                <th className="p-3 font-semibold">Sponsor</th>
                <th className="p-3 font-semibold">Résultat</th>
                <th className="p-3 font-semibold">Récompense</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                const status = log.result?.status;
                const reward = log.result?.reward;
                const config = log.scratch_configs;
                
                return (
                  <tr key={log.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm">
                      {new Date(log.created_at).toLocaleString('fr-FR')}
                    </td>
                    <td className="p-3 text-sm">
                      {log.user_id ? (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {log.user_id.slice(0, 8)}...
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          Anonyme
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-sm font-medium">
                      {config?.badge || 'Carte inconnue'}
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                      {config?.sponsor_name || 'Sans sponsor'}
                    </td>
                    <td className="p-3 text-sm">
                      {status === 'win' && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          🥳 Gagné
                        </span>
                      )}
                      {status === 'lucky' && (
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                          🍀 Chance
                        </span>
                      )}
                      {status === 'jackpot' && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">
                          🏆 JACKPOT
                        </span>
                      )}
                      {status === 'lose' && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                          😢 Perdu
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-sm">
                      <span className="max-w-xs truncate block" title={reward}>
                        {reward || 'Aucune récompense'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        Affichage des 50 derniers grattages
      </div>
    </div>
  );
}
