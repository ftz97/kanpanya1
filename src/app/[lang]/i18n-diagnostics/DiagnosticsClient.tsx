"use client";

import { useState } from "react";
import { useTAsync } from "@/i18n/useTAsync";

// petites clés de test live côté client
const CLIENT_KEYS = [
  "flashOffers.title",
  "common.misc.filters",
  "common.forms.errors.maxChars",
  "auth.login.title", // peut être manquante si pas encore ajoutée
];

export default function DiagnosticsClient() {
  const { t, tn } = useTAsync(["common", "flashOffers", "auth"]);
  const [count, setCount] = useState(1);

  // NEW
  const [testKey, setTestKey] = useState("auth.missing.demo");
  const [testValue, setTestValue] = useState<string | null>(null);

  const clientChecks = CLIENT_KEYS.map((key) => {
    const val = t(key);
    const ok = !val.startsWith("[missing]");
    return { key, ok, val };
  });

  const runMissingKeyTest = () => {
    const val = t(testKey);
    setTestValue(val);
  };

  // Test API codes
  const [apiMsg, setApiMsg] = useState<string | null>(null);

  async function testApiMissingTitle() {
    const res = await fetch("/api/offers", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ starts_at: "2030-01-01T10:00", ends_at: "2030-01-01T12:00" })
    });
    const json = await res.json();
    if (json?.error?.code) {
      setApiMsg(t("common.api.errors." + json.error.code));
    } else {
      setApiMsg("OK");
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-medium">Client-side (live)</h2>

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
            {clientChecks.map((c) => (
              <tr key={c.key} className="border-t">
                <td className="p-3 font-mono">{c.key}</td>
                <td className="p-3">{c.ok ? "✅" : "❌"}</td>
                <td className="p-3">{c.val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* NEW: Forcer une clé manquante */}
      <div className="rounded-xl border p-3 space-y-3">
        <div className="text-sm opacity-70">Forcer une clé (ex: <code>auth.missing.demo</code>)</div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={testKey}
            onChange={(e) => setTestKey(e.target.value)}
            className="border rounded px-2 py-1 w-[320px]"
            placeholder="path.to.key"
          />
          <button
            type="button"
            onClick={runMissingKeyTest}
            className="rounded bg-black text-white px-3 py-1.5 text-sm"
          >
            Tester
          </button>
        </div>
        {testValue !== null && (
          <div className="text-sm">
            Résultat :{" "}
            <span className={testValue.startsWith("[missing]") ? "text-red-600" : "text-green-700"}>
              {testValue}
            </span>
          </div>
        )}
      </div>

      {/* Test API codes */}
      <div className="rounded-xl border p-3 space-y-2">
        <div className="text-sm opacity-70">Test code API → message i18n</div>
        <button
          type="button"
          onClick={testApiMissingTitle}
          className="rounded bg-black text-white px-3 py-1.5 text-sm"
        >
          Simuler offer.missing_title
        </button>
        {apiMsg && <div className="text-sm">Résultat : {apiMsg}</div>}
      </div>

      {/* Pluralisation */}
      <div className="rounded-xl border p-3 space-y-2">
        <div className="text-sm opacity-70">
          Pluralisation <code>common.list.offersCount</code> :
        </div>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value || "0", 10))}
            className="border rounded px-2 py-1 w-24"
          />
          <span className="text-sm">
            {tn("common.list.offersCount", Number.isFinite(count) ? count : 0)}
          </span>
        </div>
      </div>
    </section>
  );
}


