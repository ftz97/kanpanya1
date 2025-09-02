"use client";

import { toast } from "sonner";
import type { Locale } from "@/i18n";
import { createAsyncT } from "@/i18n";

/**
 * Affiche un message d'erreur API à partir d'un code stable
 * ex: code = "offer.missing_title" → key "common.api.errors.offer.missing_title"
 */
export async function toastApiError(locale: Locale, code?: string, fallback?: string) {
  const { t } = await createAsyncT(locale, ["common"]);
  const key = code ? `common.api.errors.${code}` : "common.api.errors.unknown";
  const msg = t(key);
  toast.error(msg.startsWith("[missing]") ? (fallback || code || "Error") : msg, {
    duration: 5000,
  });
}

export async function toastSuccess(locale: Locale, key: string, vars?: Record<string, string | number>) {
  const { t } = await createAsyncT(locale, ["common"]);
  toast.success(t(key, vars));
}

export async function toastInfo(locale: Locale, key: string, vars?: Record<string, string | number>) {
  const { t } = await createAsyncT(locale, ["common"]);
  toast(t(key, vars));
}

export async function toastError(locale: Locale, key: string, vars?: Record<string, string | number>) {
  const { t } = await createAsyncT(locale, ["common"]);
  const msg = t(key, vars);
  toast.error(msg.startsWith("[missing]") ? t("common.toasts.error") : msg, {
    duration: 5500,
  });
}


