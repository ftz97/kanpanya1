import { z } from "zod";

// Schéma pour une offre flash
export const FlashOfferSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  price: z.number().nullable().optional(),
  starts_at: z.string().datetime(),
  ends_at: z.string().datetime().nullable().optional(),
  is_active: z.boolean().default(true),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid(),
});

// Schéma pour créer une offre
export const CreateOfferSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().nullable().optional(),
  price: z.number().nullable().optional(),
  starts_at: z.string().datetime("Date de début invalide"),
  ends_at: z.string().datetime("Date de fin invalide").nullable().optional(),
  is_active: z.boolean().default(true),
});

// Schéma pour mettre à jour une offre
export const UpdateOfferSchema = CreateOfferSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "Au moins un champ doit être fourni" }
);

// Schéma pour les paramètres de requête
export const OffersQuerySchema = z.object({
  status: z.enum(["active", "upcoming", "expired", "all"]).default("active"),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(20),
});

// Types générés automatiquement
export type FlashOffer = z.infer<typeof FlashOfferSchema>;
export type CreateOfferInput = z.infer<typeof CreateOfferSchema>;
export type UpdateOfferInput = z.infer<typeof UpdateOfferSchema>;
export type OffersQueryParams = z.infer<typeof OffersQuerySchema>;

// Schéma pour les erreurs de validation
export const ValidationErrorSchema = z.object({
  message: z.string(),
  errors: z.array(z.object({
    field: z.string(),
    message: z.string(),
  })),
});

export type ValidationError = z.infer<typeof ValidationErrorSchema>;


