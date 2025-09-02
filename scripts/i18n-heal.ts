// scripts/i18n-heal.ts
import fs from "node:fs";
import path from "node:path";

type Dict = Record<string, any>;

const LOCALES = ["fr", "en", "es", "gcf"] as const;
const DOMAINS = ["common", "flashOffers", "auth"] as const;

const argv = new Map<string, string>();
for (let i = 2; i < process.argv.length; i++) {
  const m = process.argv[i].match(/^--([^=]+)=(.*)$/);
  if (m) argv.set(m[1], m[2]);
}

const STRATEGY = (argv.get("strategy") || "placeholder") as "placeholder" | "copy-fr";
const TAG = argv.get("tag") || "[TODO-TRAD]";
const onlyLocales = (argv.get("locales") || "en,es,gcf").split(",").map(s => s.trim()).filter(Boolean);
const onlyDomains = (argv.get("domains") || DOMAINS.join(",")).split(",").map(s => s.trim()).filter(Boolean);
const ROOT = "src/locales";

function readJSON(p: string): Dict {
  if (!fs.existsSync(p)) return {};
  try { return JSON.parse(fs.readFileSync(p, "utf8")); }
  catch { console.error(`❌ JSON invalide: ${p}`); process.exit(1); }
}

function writeJSON(p: string, obj: Dict) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const pretty = JSON.stringify(sortObject(obj), null, 2) + "\n";
  if (fs.existsSync(p)) fs.copyFileSync(p, p + ".bak");
  fs.writeFileSync(p, pretty, "utf8");
}

function sortObject(obj: any): any {
  if (Array.isArray(obj)) return obj.map(sortObject);
  if (obj && typeof obj === "object") {
    const out: Dict = {};
    for (const k of Object.keys(obj).sort()) out[k] = sortObject(obj[k]);
    return out;
  }
  return obj;
}

function countMissing(ref: any, target: any): number {
  if (typeof ref === "string") return typeof target === "string" ? 0 : 1;
  if (ref && typeof ref === "object" && !Array.isArray(ref)) {
    return Object.keys(ref).reduce((acc, k) => acc + countMissing(ref[k], target?.[k]), 0);
  }
  return target === undefined ? 1 : 0;
}

function fillMissing(ref: any, target: any, makeValue: (frVal: any, pathKey: string) => any, pathKey = ""): any {
  if (typeof ref === "string") return (typeof target === "string") ? target : makeValue(ref, pathKey);
  if (ref && typeof ref === "object" && !Array.isArray(ref)) {
    const out: Dict = (target && typeof target === "object" && !Array.isArray(target)) ? { ...target } : {};
    for (const k of Object.keys(ref)) {
      const next = pathKey ? `${pathKey}.${k}` : k;
      out[k] = fillMissing(ref[k], target?.[k], makeValue, next);
    }
    return out;
  }
  return (target === undefined ? ref : target);
}

(async function run() {
  const summary: Record<string, Record<string, number>> = {}; // locale -> domain -> added

  for (const domain of onlyDomains) {
    const refPath = path.join(ROOT, "fr", `${domain}.json`);
    const ref = readJSON(refPath);

    for (const loc of onlyLocales) {
      if (loc === "fr") continue;
      const tgtPath = path.join(ROOT, loc, `${domain}.json`);
      const tgt = readJSON(tgtPath);

      const beforeMissing = countMissing(ref, tgt);

      const makeValue = (frVal: any, key: string) =>
        STRATEGY === "copy-fr" ? frVal : (typeof frVal === "string" ? `${TAG} ${frVal}` : `${TAG} ${key}`);

      const filled = fillMissing(ref, tgt, makeValue);
      const afterMissing = countMissing(ref, filled);

      if (JSON.stringify(filled) !== JSON.stringify(tgt)) writeJSON(tgtPath, filled);

      const added = Math.max(0, beforeMissing - afterMissing);
      summary[loc] = summary[loc] || {};
      summary[loc][domain] = (summary[loc][domain] || 0) + added;
    }
  }

  // Résumé lisible
  const rows: string[] = [];
  rows.push("");
  rows.push("i18n HEAL – résumé des clés ajoutées");
  rows.push("────────────────────────────────────");
  for (const loc of Object.keys(summary)) {
    rows.push(`• ${loc}:`);
    let total = 0;
    for (const dom of Object.keys(summary[loc])) {
      const n = summary[loc][dom];
      total += n;
      rows.push(`   - ${dom}: +${n}`);
    }
    rows.push(`   = TOTAL ${loc}: +${total}`);
  }
  rows.push("");
  console.log(rows.join("\n"));

  // Lance le check après heal
  try {
    const { spawnSync } = await import("node:child_process");
    const r = spawnSync("pnpm", ["check:i18n"], { stdio: "inherit" });
    if (r.status !== 0) {
      console.error("❌ check:i18n a détecté des écarts après heal.");
      process.exit(r.status ?? 1);
    }
    console.log("✅ check:i18n OK après heal.");
  } catch (e) {
    console.warn("⚠️ Impossible d'exécuter `pnpm check:i18n`. Ajoute le script dans package.json.");
  }
})();


