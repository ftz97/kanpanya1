import fs from "node:fs";
import path from "node:path";

const LOCALES = ["fr", "en", "es", "gcf"];
const DOMAINS = ["common", "flashOffers", "auth"];

function walk(obj: any, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === "object" ? walk(v, `${prefix}${k}.`) : `${prefix}${k}`
  );
}

const errors: string[] = [];

for (const domain of DOMAINS) {
  const ref = JSON.parse(fs.readFileSync(path.join("src/locales/fr", `${domain}.json`), "utf8"));
  const refKeys = new Set(walk(ref));

  for (const loc of LOCALES) {
    const cur = JSON.parse(fs.readFileSync(path.join("src/locales", loc, `${domain}.json`), "utf8"));
    const keys = new Set(walk(cur));
    for (const k of refKeys) {
      if (!keys.has(k)) errors.push(`[${loc}/${domain}] missing key: ${k}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
} else {
  console.log("✅ i18n: all locales aligned per domain.");
}
