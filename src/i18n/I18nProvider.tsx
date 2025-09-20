"use client";
import React, { createContext, useContext } from "react";
import type { Locale } from "@/i18n";

const I18nCtx = createContext<{ locale: Locale } | null>(null);
export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <I18nCtx.Provider value={{ locale }}>{children}</I18nCtx.Provider>;
}
export function useLocale() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useLocale must be used within I18nProvider");
  return ctx.locale;
}
