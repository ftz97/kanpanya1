import { type FormDataEntryValue } from "form-data";

// Helper pour extraire les valeurs d'un formulaire de manière typée
export function extractFormData<T extends Record<string, FormDataEntryValue>>(
  form: HTMLFormElement
): T {
  const fd = new FormData(form);
  return Object.fromEntries(fd) as T;
}

// Helper pour gérer les soumissions de formulaire
export function createFormHandler<T extends Record<string, FormDataEntryValue>>(
  handler: (values: T) => void | Promise<void>
) {
  return (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = extractFormData<T>(e.currentTarget);
    return handler(values);
  };
}

// Types pour les valeurs de formulaire communes
export type FormValues = {
  title?: string;
  description?: string;
  email?: string;
  password?: string;
  price?: string;
  starts_at?: string;
  ends_at?: string;
  is_active?: string;
};

// Helper pour convertir les valeurs de formulaire en types appropriés
export function parseFormValues(values: FormValues) {
  return {
    title: values.title || "",
    description: values.description || "",
    email: values.email || "",
    password: values.password || "",
    price: values.price ? parseFloat(values.price) : null,
    starts_at: values.starts_at || "",
    ends_at: values.ends_at || "",
    is_active: values.is_active === "on" || values.is_active === "true",
  };
}


