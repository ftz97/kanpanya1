import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n";
import { I18nProvider } from "@/i18n/I18nProvider";

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params: { lang: _lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const base = "https://www.exemple.com"; // ← mets ton domaine
  const languages = Object.fromEntries(LOCALES.map((l) => [l, `${base}/${l}`]));

  return {
    alternates: {
      languages
    }
  };
}

export default async function LangLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return <I18nProvider locale={lang}>{children}</I18nProvider>;
}
