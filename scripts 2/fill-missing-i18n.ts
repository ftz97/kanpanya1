// scripts/fill-missing-i18n.ts
import fs from "node:fs";
import path from "node:path";

type Dict = Record<string, any>;

const LOCALES = ["fr", "en", "es", "gcf"] as const;
const DOMAINS = ["common", "flashOffers", "auth"] as const;

const argv = new Map<string, string>();
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  const m = a.match(/^--([^=]+)=(.*)$/);
  if (m) argv.set(m[1], m[2]);
}
const DRY = process.argv.includes("--dry-run");
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
  if (DRY) {
    console.log(`~ ${p} (dry-run)`);
    return;
  }
  if (fs.existsSync(p)) fs.copyFileSync(p, p + ".bak");
  fs.writeFileSync(p, pretty, "utf8");
  console.log(`✔ ${p}`);
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

function fillMissing(ref: any, target: any, makeValue: (frVal: any, pathKey: string) => any, pathKey = ""): any {
  // si la ref est une string → on s'assure que target est string
  if (typeof ref === "string") {
    if (typeof target === "string") return target;
    return makeValue(ref, pathKey);
  }

  // si la ref est un objet → on crée/complète récursivement
  if (ref && typeof ref === "object" && !Array.isArray(ref)) {
    const out: Dict = typeof target === "object" && target && !Array.isArray(target) ? { ...target } : {};
    for (const k of Object.keys(ref)) {
      const nextPath = pathKey ? `${pathKey}.${k}` : k;
      out[k] = fillMissing(ref[k], target?.[k], makeValue, nextPath);
    }
    return out;
  }

  // autres types (rare) → on copie brut
  return (target === undefined ? ref : target);
}

function run() {
  for (const domain of onlyDomains) {
    const refPath = path.join(ROOT, "fr", `${domain}.json`);
    const ref = readJSON(refPath);

    for (const loc of onlyLocales) {
      if (loc === "fr") continue;
      const tgtPath = path.join(ROOT, loc, `${domain}.json`);
      const tgt = readJSON(tgtPath);

      const makeValue = (frVal: any, key: string) => {
        if (STRATEGY === "copy-fr") return frVal;
        // placeholder
        if (typeof frVal === "string") return `${TAG} ${frVal}`;
        return `${TAG} ${key}`;
      };

      const filled = fillMissing(ref, tgt, makeValue);
      // ne réécrit que si différent
      if (JSON.stringify(filled) !== JSON.stringify(tgt)) {
        writeJSON(tgtPath, filled);
      } else {
        console.log(`= ${tgtPath} (OK)`);
      }
    }
  }
  console.log(DRY ? "🔎 Dry-run terminé." : "✅ Comblement des clés manquantes terminé.");
}

run();


