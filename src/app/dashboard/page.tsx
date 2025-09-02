// src/app/dashboard/page.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createAsyncT } from "@/i18n";
import Link from "next/link";
import FlashOfferDialog from "@/components/offers/FlashOfferDialog";

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirectTo=/dashboard')

  const cookieStore2 = await cookies();
  const lang = (cookieStore2.get("lang")?.value || "fr") as "fr" | "en" | "es" | "gcf";
  const { t } = await createAsyncT(lang, ["common", "auth"]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Bonjour 👋</h1>
      <p className="mt-2">Votre email: <b>{user.email}</b></p>

      <div className="mt-6 space-y-4">
        <div className="flex gap-3">
          <FlashOfferDialog />
          <Link 
            href="/dashboard/offers" 
            className="border rounded-md px-4 py-2 hover:bg-gray-50"
          >
            Voir mes offres
          </Link>
        </div>
        
        <form action="/dashboard/logout" method="post">
          <button className="rounded-md px-3 py-2 border">Déconnexion</button>
        </form>
      </div>
    </main>
  );
}
