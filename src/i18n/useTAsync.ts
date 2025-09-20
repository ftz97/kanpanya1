"use client";
import { useCallback, useEffect, useState } from "react";
import { createAsyncT, type Domain } from "@/i18n";
import { useLocale } from "@/i18n/I18nProvider";

export function useTAsync(domains: Domain[]) {
  const locale = useLocale();
  const [{ t, tn }, setT] = useState<{ t: (key: string) => string; tn: (key: string, count: number) => string }>({ 
    t: () => "", 
    tn: () => "" 
  });

  const loadTranslations = useCallback(async () => {
    const result = await createAsyncT(locale, domains);
    setT(result);
  }, [locale, domains]);

  useEffect(() => {
    loadTranslations();
  }, [loadTranslations]);

  return { t, tn };
}

// Alias pour compatibilité
export const useT = useTAsync;
