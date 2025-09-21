import { test, expect } from "@playwright/test";

const TITLE = "TOAST_DUPLICATE_TEST";

test.describe("Toast i18n (FR) – duplicate unique_violation", () => {
  test("affiche le toast 'Un enregistrement similaire existe déjà.'", async ({ page, request }) => {
    // 1) Seed (insère un enregistrement avec ce titre)
    const seedRes = await request.post("/api/test-seed", {
      data: { title: TITLE }
    });
    expect(seedRes.ok()).toBeTruthy();

    // 2) Va sur la page FR de création
    await page.goto("/fr/flash-offers/new");

    // 3) Remplis le formulaire avec le même titre → déclenche unique_violation
    await page.getByLabel(/^Titre$/).fill(TITLE);
    await page.fill('input[type="datetime-local"] >> nth=0', "2030-01-01T10:00");
    await page.fill('input[type="datetime-local"] >> nth=1', "2030-01-01T12:00");
    await page.getByLabel(/^Prix$/).fill("9.99");

    // 4) Soumets
    await page.getByRole("button", { name: /Créer l'offre|Créer l'offre/i }).click();

    // 5) Vérifie le toast i18n (sonner). Sélecteur robuste :
    //    - container : [data-sonner-toaster]
    //    - texte : "Un enregistrement similaire existe déjà."
    const toaster = page.locator("[data-sonner-toaster]");
    await expect(toaster).toBeVisible();

    await expect(toaster).toContainText(/Un enregistrement similaire existe déjà\./i);
  });
});


