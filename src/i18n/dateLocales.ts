import { fr, enUS, es as esES } from "date-fns/locale";
import type { Locale as AppLocale } from "@/i18n";

export function dateFnsLocale(l: AppLocale) {
  switch (l) {
    case "fr":
      return fr;
    case "en":
      return enUS;
    case "es":
      return esES;
    case "gcf":
      return fr; // repli raisonnable
    default:
      return fr;
  }
}


