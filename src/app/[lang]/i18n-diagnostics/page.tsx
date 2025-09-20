// Server component
import type { Locale } from "@/i18n";
import { createAsyncT } from "@/i18n";
import { formatDate, formatCurrency, formatNumber } from "@/i18n/format";
import DiagnosticsClient from "./DiagnosticsClient";

const CRITICAL_KEYS = [
  "common.misc.filters",
  "common.misc.status",
  "common.forms.errors.required",
  "common.forms.errors.minChars",
  "common.api.errors.offer.missing_title",
  "flashOffers.title",
  "flashOffers.new.submit",
];

export default async function I18nDiagnosticsPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const { t } = await createAsyncT(lang as Locale, ["common", "flashOffers", "auth"]);

  // Vérifie les clés côté serveur (avec fallback FR)
  const checks = CRITICAL_KEYS.map((key) => {
    const val = t(key);
    const ok = !val.startsWith("[missing]");
    return { key, ok, val };
  });

  const now = new Date();
  const samples = {
    date: formatDate(now, lang as Locale),
    currency: formatCurrency(1200.5, lang as Locale, "EUR"),
    number: formatNumber(1234567.89, lang as Locale),
  };

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">i18n Diagnostics</h1>
        <p className="text-sm opacity-70">Locale courante: <b>{lang}</b></p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Clés critiques (server)</h2>
        <div className="rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Clé</th>
                <th className="text-left p-3">OK ?</th>
                <th className="text-left p-3">Valeur</th>
              </tr>
            </thead>
            <tbody>
              {checks.map((c) => (
                <tr key={c.key} className="border-t">
                  <td className="p-3 font-mono">{c.key}</td>
                  <td className="p-3">{c.ok ? "✅" : "❌"}</td>
                  <td className="p-3">{c.val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Formats</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border p-3">
            <div className="text-xs opacity-60">Date</div>
            <div className="font-medium">{samples.date}</div>
          </div>
          <div className="rounded-xl border p-3">
            <div className="text-xs opacity-60">Devise (EUR)</div>
            <div className="font-medium">{samples.currency}</div>
          </div>
          <div className="rounded-xl border p-3">
            <div className="text-xs opacity-60">Nombre</div>
            <div className="font-medium">{samples.number}</div>
          </div>
        </div>
      </section>

      <DiagnosticsClient />
    </div>
  );
}
