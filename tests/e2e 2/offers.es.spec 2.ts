import { test, expect } from "@playwright/test";

test.describe("Crear oferta (ES)", () => {
  test("muestra errores i18n cuando faltan datos", async ({ page }) => {
    await page.goto("/es/flash-offers/new");

    // Le bouton doit exister en ES
    await expect(page.getByRole("button", { name: /Crear oferta/i })).toBeVisible();

    // Envoie sans remplir
    await page.getByRole("button", { name: /Crear oferta/i }).click();

    // Erreurs i18n (ES) présentes
    await expect(page.getByText(/Este campo es obligatorio|Obligatorio|Campo requerido/i)).toBeVisible();
  });

  test("envía y recibe código de error API mapeado", async ({ page }) => {
    await page.goto("/es/flash-offers/new");

    // remplis seulement dates → forcer code "offer.missing_title"
    await page.fill('input[type="datetime-local"] >> nth=0', "2030-01-01T10:00");
    await page.fill('input[type="datetime-local"] >> nth=1', "2030-01-01T12:00");

    // submit
    page.once("dialog", (dialog) => dialog.dismiss().catch(() => {})); // si on utilise alert()
    await page.getByRole("button", { name: /Crear oferta/i }).click();

    // Le front doit mapper "offer.missing_title" → message espagnol
    // Selon ton UI (toast, alert, label d'erreur), adapte la cible :
    await expect(page.getByText(/El título es obligatorio|El título es requerido/i)).toBeVisible();
  });
});


