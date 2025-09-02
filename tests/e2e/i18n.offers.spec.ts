import { test, expect } from "@playwright/test";

const locales = ["fr", "en", "es"];

for (const lng of locales) {
  test(`offers list has translated heading in ${lng}`, async ({ page }) => {
    await page.goto(`/${lng}/flash-offers`);
    // clé: offers.list.title → p.ex. "Offres flash" / "Flash offers" / "Ofertas flash"
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      /Offres|Flash offers|Ofertas/i
    );
  });

  test(`new offer form has translated labels in ${lng}`, async ({ page }) => {
    await page.goto(`/${lng}/flash-offers/new`);
    
    // Vérifier les labels traduits
    await expect(page.getByLabel(/Title|Titre|Título/i)).toBeVisible();
    await expect(page.getByLabel(/Description/i)).toBeVisible();
    await expect(page.getByLabel(/Price|Prix|Precio/i)).toBeVisible();
    
    // Vérifier le bouton de soumission
    await expect(page.getByRole("button", { name: /Create|Créer|Crear/i })).toBeVisible();
  });

  test(`dashboard shows translated content in ${lng}`, async ({ page }) => {
    await page.goto(`/${lng}/dashboard`);
    
    // Vérifier le titre de la page
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      /Bonjour|Hello|Hola/i
    );
    
    // Vérifier le bouton de création d'offre
    await expect(page.getByRole("button", { name: /Créer|Create|Crear/i })).toBeVisible();
  });
}


