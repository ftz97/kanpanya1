/**
 * Normalisation des erreurs Supabase/PostgREST sans utiliser `any`.
 * Compatible avec les erreurs réseau/JS classiques également.
 */

export type SupabaseLikeError = {
  message: string;
  details?: string | null;
  hint?: string | null;
  code?: string | null;
  status?: number;
};

export type NormalizedError = {
  code: string;
  message: string;
  httpStatus?: number;
  meta?: Record<string, unknown>;
};

function isSupabaseLikeError(v: unknown): v is SupabaseLikeError {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return typeof o["message"] === "string";
}

export function normalizeError(err: unknown): NormalizedError {
  if (isSupabaseLikeError(err)) {
    return {
      code: (err.code ?? "SupaError") || "SupaError",
      message: err.message,
      httpStatus: err.status,
      meta: {
        details: err.details ?? undefined,
        hint: err.hint ?? undefined,
      },
    };
  }
  if (err instanceof Error) {
    return {
      code: "Error",
      message: err.message,
    };
  }
  if (typeof err === "string") {
    return {
      code: "ErrorString",
      message: err,
    };
  }
  return {
    code: "Unknown",
    message: "An unknown error occurred",
  };
}
