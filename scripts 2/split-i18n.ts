import fs from "node:fs";
import path from "node:path";

const LOCALES = ["fr", "en", "es", "gcf"] as const;
const DOMAINS = ["common", "flashOffers", "auth"] as const;

type Dict = Record<string, any>;

function pick(obj: Dict, prefix: string) {
  const out: Dict = {};
  const p = prefix + ".";
  for (const [k, v] of Object.entries(obj)) {
    if (k === prefix && typeof v === "object") {
      Object.assign(out, v);
    } else if (k.startsWith(p)) {
      // ex: "flashOffers.title" → out.title
      const sub = k.slice(p.length);
      setPath(out, sub, v);
    }
  }
  return out;
}

function setPath(obj: Dict, pathStr: string, val: any) {
  const parts = pathStr.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    cur[parts[i]] = cur[parts[i]] ?? {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = val;
}

function flatten(obj: Dict, prefix = ""): Dict {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(acc, flatten(v, key));
    } else {
      acc[key] = v;
    }
    return acc;
  }, {} as Dict);
}

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

for (const loc of LOCALES) {
  const legacyPath = path.join("src/locales-legacy", `${loc}.json`);
  if (!fs.existsSync(legacyPath)) {
    console.warn(`Skip ${loc}: ${legacyPath} not found`);
    continue;
  }
  const raw = JSON.parse(fs.readFileSync(legacyPath, "utf8")) as Dict;

  // A) aplanir l'ancien JSON (au cas où)
  const flat = flatten(raw);

  // B) fabriquer les 3 domaines
  const outBase = path.join("src/locales", loc);
  ensureDir(outBase);

  for (const domain of DOMAINS) {
    const picked = pick(flat, domain);
    const target = path.join(outBase, `${domain}.json`);
    fs.writeFileSync(target, JSON.stringify(picked, null, 2), "utf8");
    console.log(`→ ${target}`);
  }
}

console.log("✅ Split terminé. Vérifie les fichiers générés.");


