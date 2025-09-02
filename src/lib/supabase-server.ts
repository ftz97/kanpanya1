// src/lib/supabase-server.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function createServerClientSafe(cookieStore?: ReadonlyRequestCookies | Promise<ReadonlyRequestCookies>): Promise<SupabaseClient> {
  // Si cookieStore n'est pas fourni, on utilise cookies() (pour les composants serveur)
  // Si cookieStore est fourni, on l'utilise (pour les routes API)
  // Dans Next.js 15, cookies() retourne une Promise
  const cookiesToUse = cookieStore ? await cookieStore : await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookiesToUse.get(name)?.value,
        set() {},
        remove() {},
      },
    }
  );
}

// Cette fonction est maintenant dépréciée car elle cause des erreurs lors de la compilation
// export const supabaseServerClientPromise: Promise<SupabaseClient> = (async () => {
//   const cookieStore = await cookies();
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get: (name: string) => cookieStore.get(name)?.value,
//         set() {},
//         remove() {},
//       },
//     }
//   );
// })();

