"use client";
import { useT, useLocale } from "@/i18n/hooks";

export default function ClientBlock() {
  const t = useT();
  const locale = useLocale();
  return (
    <div className="text-sm opacity-80">
      <div>{t("flashOffers.title")}</div>
      <div>{t("common.misc.filters")} · {t("common.misc.status")}</div>
      <div>Locale: {locale}</div>
    </div>
  );
}


