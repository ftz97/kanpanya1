import { test, expect } from "@playwright/test";

const LOCALES = ["fr", "en", "es", "gcf"] as const;

for (const l of LOCALES) {
  test(`flash-offers in ${l}`, async ({ page }) => {
    await page.goto(`/${l}/flash-offers`);
    
    // Vérifie que le titre est traduit
    await expect(page.getByText(/Flash|Offres|Ofertas|Of/)).toBeVisible();
    
    // Vérifie que les filtres sont traduits
    await expect(page.getByText(/Filtres|Filters|Filtros|Filtraj/)).toBeVisible();
    
    // Vérifie que le statut est traduit
    await expect(page.getByText(/Statut|Status|Estado|Léta/)).toBeVisible();
  });
}


