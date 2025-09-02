import type { Locale } from "@/i18n";
import { fr, enUS, es as esES } from "date-fns/locale";
import { format as dfFormat } from "date-fns";

export function dateFnsLocale(l: Locale) {
  switch (l) {
    case "fr": return fr;
    case "en": return enUS;
    case "es": return esES;
    case "gcf": return fr;
    default: return fr;
  }
}

export function formatCurrency(v: number, locale: Locale, currency = "EUR") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(v);
}

export function formatNumber(v: number, locale: Locale) {
  return new Intl.NumberFormat(locale).format(v);
}

export function formatDate(d: Date | string | number, locale: Locale, pattern = "PP") {
  return dfFormat(new Date(d), pattern, { locale: dateFnsLocale(locale) });
}


