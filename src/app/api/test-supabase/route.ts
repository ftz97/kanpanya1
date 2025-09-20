import { NextResponse } from 'next/server';
import { createServerClientSafe } from '@/lib/supabase-server';

export const runtime = 'nodejs';

function serializeError(err: any) {
  try {
    return {
      name: err?.name ?? null,
      message: err?.message ?? String(err),
      details: err?.details ?? null,
      hint: err?.hint ?? null,
      code: err?.code ?? null,
      status: err?.status ?? null,
    };
  } catch {
    return { message: String(err) };
  }
}

export async function GET() {
  // 👉 Liste de tables probables dans ton projet (public.*)
  const candidateTables = [
    'profiles',
    'merchants',
    'clients',
    'sponsor_campaigns',
    'scratch_cards',
    'quiz_rewards',
    'orders',
    'users_public', // si tu as une vue publique utilisateurs
  ];

  const results: Array<{
    table: string;
    ok: boolean;
    rowCount?: number | null;
    error?: any;
  }> = [];

  // On tente une requête ultra simple sur plusieurs tables possibles
  for (const table of candidateTables) {
    try {
      const supabase = await createServerClientSafe();
      const { data, error, count } = await supabase
        .from(table as any)
        .select('*', { count: 'exact', head: true })
        .limit(1);

      if (error) {
        results.push({ table, ok: false, error: serializeError(error) });
      } else {
        results.push({
          table,
          ok: true,
          rowCount: typeof count === 'number' ? count : null,
        });
      }
    } catch (e: any) {
      results.push({ table, ok: false, error: serializeError(e) });
    }
  }

  // Petit test d'auth côté client (vérifie qu'on parle bien au bon projet)
  // Note: Sans session, on n'aura pas d'utilisateur, mais l'appel ne doit pas planter.
  let authPing: any = null;
  try {
    const supabase = await createServerClientSafe();
    const { data, error } = await supabase.auth.getSession();
    authPing = error ? serializeError(error) : { ok: true, hasSession: !!data?.session };
  } catch (e: any) {
    authPing = serializeError(e);
  }

  // URL/host du backend visé (pratique pour confirmer le "bon" projet)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  let host = url;
  try {
    host = new URL(url).host;
  } catch {}

  // Statut global : ok si au moins UNE table répond sans erreur
  const atLeastOneOk = results.some((r) => r.ok);

  return NextResponse.json(
    {
      ok: atLeastOneOk,
      supabase_url_host: host || 'UNKNOWN',
      auth_ping: authPing,
      probes: results,
      hint:
        atLeastOneOk
          ? 'Connexion OK. Si certaines tables échouent, vérifie leurs policies RLS ou leurs noms.'
          : 'Aucune table test n\'a répondu. Vérifie .env.local (URL/KEY) et que tu utilises bien l\'ANCIEN projet.',
    },
    { status: atLeastOneOk ? 200 : 500 }
  );
}
