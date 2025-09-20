import { toast } from "sonner";

type Toaster = {
  success: (msg: string) => void;
  error: (msg: string) => void;
  info: (msg: string) => void;
  warning: (msg: string) => void;
};

export function makeI18nToaster(t: (k: string, opts?: Record<string, unknown>) => string): Toaster {
  return {
    success: (msgKey) => {
      toast.success(t(msgKey));
    },
    error: (msgKey) => {
      toast.error(t(msgKey));
    },
    info: (msgKey) => {
      toast.info(t(msgKey));
    },
    warning: (msgKey) => {
      toast.warning(t(msgKey));
    },
  };
}

// Helper pour les erreurs API avec codes stables
export function makeApiToaster(t: (k: string, opts?: Record<string, unknown>) => string) {
  return {
    ...makeI18nToaster(t),
    apiError: (code: string, fallback?: string) => {
      const key = `common.api.errors.${code}`;
      const message = t(key);
      if (message.startsWith("[missing]")) {
        toast.error(fallback || t("common.api.errors.unknown"));
      } else {
        toast.error(message);
      }
    },
    supabaseError: (error: unknown) => {
      // Normaliser les erreurs Supabase
      if (typeof error === "object" && error && "message" in error) {
        toast.error(String(error.message));
      } else {
        toast.error(t("common.api.errors.unknown"));
      }
    }
  };
}


