"use client";

import { toast } from "sonner";
import type { Locale } from "@/i18n";
import { createAsyncT } from "@/i18n";
import { toastApiError } from "@/ui/toast";

export async function withToast<T>(
  locale: Locale,
  action: () => Promise<T>,
  opts?: { successKey?: string; loadingKey?: string }
) {
  const { t } = await createAsyncT(locale, ["common"]);
  const loading = t(opts?.loadingKey ?? "common.misc.loading"); // "Chargement..."
  const success = t(opts?.successKey ?? "common.toasts.saved");

  return toast.promise(action(), {
    loading,
    success,
    error: async (err: unknown) => {
      // si l'API renvoie { error: { code } }
      const code = err?.code || err?.error?.code || err?.message;
      await toastApiError(locale, code, t("common.toasts.error"));
      return ""; // on gère déjà via toastApiError
    },
  });
}


