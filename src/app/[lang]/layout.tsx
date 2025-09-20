import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n";
import { I18nProvider } from "@/i18n/I18nProvider";

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: _lang } = await params;
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
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <I18nProvider locale={lang as Locale}>{children}</I18nProvider>;
}
