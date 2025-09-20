import { LOCALES } from "@/i18n";

export default function sitemap() {
  const base = "https://www.exemple.com"; // ← ton domaine
  const routes = ["", "flash-offers", "login"]; // pages publiques
  const entries = [];

  for (const r of routes) {
    const locs = LOCALES.map((l) => ({
      url: `${base}/${l}/${r}`.replace(/\/+$/, "/"),
      lastModified: new Date()
    }));
    entries.push(...locs);
  }
  return entries;
}


