"use client";
import type { Locale } from "@/i18n";
import { createAsyncT } from "@/i18n";
import { toast } from "sonner";
import { normalizeSupaError } from "@/lib/supabase.errors";

export async function toastSupaError(locale: Locale, error: any) {
  const { t } = await createAsyncT(locale, ["common"]);
  const norm = normalizeSupaError(error);
  const key = `common.api.errors.${norm.code}`;
  const msg = t(key);
  toast.error(msg.startsWith("[missing]") ? t("common.toasts.error") : msg, { duration: 5500 });
}


