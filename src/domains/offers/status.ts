export type OfferStatus =
  | "draft"
  | "published"
  | "upcoming"
  | "ongoing"
  | "expired"
  | "archived"
  | "active"     // si tu as un flag "is_active"
  | "inactive";  // idem

/**
 * Mappe un statut vers la clé i18n correspondante.
 * On réutilise les clés que tu as dans common.status.*
 */
export function statusToI18nKey(s: OfferStatus): `common.status.${string}` {
  switch (s) {
    case "draft":
      return "common.status.draft";
    case "published":
      return "common.status.published";
    case "upcoming":
      return "common.status.upcoming";
    case "ongoing":
      return "common.status.ongoing";
    case "expired":
      return "common.status.expired";
    case "archived":
      return "common.status.archived";
    case "active":
      return "common.status.active";
    case "inactive":
      return "common.status.inactive";
    default:
      return "common.status.all";
  }
}

// Usage:
// const label = t(statusToI18nKey(row.status));


