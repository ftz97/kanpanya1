export const LOCALES = ["fr", "en", "es", "gcf"] as const;
export type Locale = typeof LOCALES[number];
export type Domain = "common" | "flashOffers" | "auth";

// cache simple
const cache = new Map<string, unknown>();

async function importDict(locale: Locale, domain: Domain) {
  const key = `${locale}:${domain}`;
  if (cache.has(key)) return cache.get(key);

  const mod = await import(`@/locales/${locale}/${domain}.json`);
  cache.set(key, mod.default);
  return mod.default;
}

// util path a.b.c
function getPath(obj: unknown, path: string) {
  return path.split(".").reduce<unknown>((acc, k) => {
    if (acc && typeof acc === "object" && k in acc) {
      return (acc as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);
}

type Vars = Record<string, string | number> | undefined;
function interpolate(s: string, vars?: Vars) {
  if (!vars) return s;
  return Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
    s
  );
}

// Pluralisation très légère : supporte {count}, et les sous-clés ".one" / ".other"
function resolvePlural(base: string, count: number) {
  // clé "xxx.one" ou "xxx.other"
  return count === 1 ? `${base}.one` : `${base}.other`;
}

export type TFn = (key: string, vars?: Vars) => string;
export type TNFn = (baseKey: string, count: number, vars?: Vars) => string;

// Merge profond des objets (non utilisé pour le moment)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = deepMerge((result[key] as Record<string, unknown>) || {}, value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }
  return result;
}

export async function createAsyncT(locale: Locale, domains: Domain[]) {
  // charge partiellement uniquement les domaines demandés
  const dicts = await Promise.all(domains.map((d) => importDict(locale, d)));
  
  // Merge avec les noms de domaines comme préfixes
  const merged: any = {};
  for (let i = 0; i < domains.length; i++) {
    merged[domains[i]] = dicts[i];
  }

  // FR fallback par domaine si clé manquante
  const frDicts = await Promise.all(domains.map((d) => importDict("fr", d)));
  const mergedFR: any = {};
  for (let i = 0; i < domains.length; i++) {
    mergedFR[domains[i]] = frDicts[i];
  }

  const t: TFn = (key, vars) => {
    const v = getPath(merged, key) ?? getPath(mergedFR, key);
    if (typeof v === "string") return interpolate(v, vars);
    return `[missing] ${key}`;
  };

  const tn: TNFn = (baseKey, count, vars) => {
    const chosenKey = resolvePlural(baseKey, count); // xxx.one / xxx.other
    return t(chosenKey, { ...vars, count });
  };

  return { t, tn };
}
