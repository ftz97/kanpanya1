import { createServerSupabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createAsyncT } from "@/i18n";
import { cookies } from "next/headers";

export default async function OffersPage() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("flash_offers")
    .select("*")
    .order("ends_at", { ascending: true })
    .limit(100);

  // Récupérer la locale depuis les cookies
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "fr") as "fr" | "en" | "es" | "gcf";
  const { t } = await createAsyncT(lang, ["flashOffers", "common"]);

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-semibold">{t("flashOffers.list.title")}</h1>
        <p className="text-red-600 mt-4">{t("common.misc.error")}: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("flashOffers.list.title")}</h1>
        <Link href="/dashboard">
          <Button variant="outline">{t("flashOffers.list.back")}</Button>
        </Link>
      </header>

      <div className="grid gap-3">
        {(data ?? []).length === 0 && (
          <div className="rounded-xl border p-4 text-sm opacity-80">
            {t("flashOffers.list.noOffers")}
          </div>
        )}

        {(data ?? []).map((o: any) => (
          <div key={o.id} className="border rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{o.title}</div>
              <div className="text-sm opacity-70">
                -{o.discount}% • {o.slots} {t("flashOffers.list.slots")} • {t("flashOffers.list.endsAt")} {new Date(o.ends_at).toLocaleString()}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* (plus tard) bouton Edit → Dialog prérempli */}
              <form action={`/dashboard/offers/${o.id}/delete`} method="post">
                <Button variant="outline" type="submit">{t("flashOffers.list.delete")}</Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
