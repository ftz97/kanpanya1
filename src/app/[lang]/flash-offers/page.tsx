import type { Locale } from "@/i18n";
import { I18nProvider } from "@/i18n/I18nProvider";
import OffersList from "./OffersList";
import LocaleSwitch from "@/components/LocaleSwitch";

export default function FlashOffersPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <I18nProvider locale={lang}>
      <div className="p-6">
        <div className="flex items-center justify-end mb-4">
          <LocaleSwitch />
        </div>
        <OffersList />
      </div>
    </I18nProvider>
  );
}
