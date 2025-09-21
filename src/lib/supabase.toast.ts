"use client";
import type { Locale } from "@/i18n";
import { createAsyncT } from "@/i18n";
import { toast } from "sonner";
import { normalizeError } from "@/lib/supabase.errors";

export async function toastSupaError(locale: Locale, error: unknown) {
  const { t } = await createAsyncT(locale, ["common"]);
  const norm = normalizeError(error);
  const key = `common.api.errors.${norm.code}`;
  const msg = t(key);
  toast.error(msg.startsWith("[missing]") ? t("common.toasts.error") : msg, { duration: 5500 });
}


