"use client";

import { useLocale } from "@/i18n/I18nProvider";
import { toastApiError, toastSuccess, toastInfo, toastError } from "@/ui/toast";

export function useToastI18n() {
  const locale = useLocale();

  return {
    apiError: (code?: string, fallback?: string) => toastApiError(locale, code, fallback),
    success: (key: string, vars?: Record<string, string | number>) => toastSuccess(locale, key, vars),
    info:    (key: string, vars?: Record<string, string | number>) => toastInfo(locale, key, vars),
    error:   (key: string, vars?: Record<string, string | number>) => toastError(locale, key, vars),
  };
}


