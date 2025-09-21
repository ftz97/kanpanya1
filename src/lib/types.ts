// Types utilitaires pour remplacer 'unknown'
export type Dict<T = unknown> = Record<string, T>;

// Type guard pour vérifier si un objet est un User
export type User = {
  id: string;
  email: string;
  created_at?: string;
};

export function isUser(x: unknown): x is User {
  return !!x && typeof x === "object" && "id" in x && "email" in x;
}

// Type guard pour vérifier si un objet est une offre flash
export function isFlashOffer(x: unknown): x is {
  id: string;
  title: string;
  description?: string | null;
  price: number | null;
  starts_at: string;
  ends_at: string | null;
  is_active: boolean;
} {
  return !!x && 
    typeof x === "object" && 
    "id" in x && 
    "title" in x && 
    "starts_at" in x && 
    "is_active" in x;
}

// Utilitaire pour parser JSON de manière sûre
export function safeParseJSON(input: string): unknown {
  try { 
    return JSON.parse(input); 
  } catch { 
    return null; 
  }
}

// Types pour les formulaires
export type FormErrors = Dict<string | undefined>;

// Types pour les paramètres de requête
export type QueryParams = Dict<string | string[] | undefined>;

// Types pour les props de composants React
export type ComponentProps<T = unknown> = {
  children?: React.ReactNode;
} & T;


