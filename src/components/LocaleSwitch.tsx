"use client";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "@/i18n/hooks";
import { LOCALES, type Locale } from "@/i18n";

export default function LocaleSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // e.g. "/fr/flash-offers"

  function switchTo(next: Locale) {
    // remplace le préfixe de langue dans l'URL
    const segs = pathname.split("/");
    segs[1] = next;
    document.cookie = `lang=${next}; path=/`;
    router.push(segs.join("/") || `/${next}`);
  }

  return (
    <select
      className="border rounded-md p-2"
      value={locale}
      onChange={(e) => switchTo(e.target.value as Locale)}
    >
      {LOCALES.map((l) => (
        <option key={l} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  );
}


