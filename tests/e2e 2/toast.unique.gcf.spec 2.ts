import { test, expect } from "@playwright/test";

const TITLE = "TOAST_DUPLICATE_TEST";

test.describe("Toast i18n (GCF) – duplicate unique_violation", () => {
  test("affiche le toast en créole guadeloupéen pour violation unique", async ({ page, request }) => {
    // 1) Seed (insère un enregistrement avec ce titre)
    const seedRes = await request.post("/api/test-seed", {
      data: { title: TITLE }
    });
    expect(seedRes.ok()).toBeTruthy();

    // 2) Va sur la page GCF de création
    await page.goto("/gcf/flash-offers/new");

    // 3) Remplis le formulaire avec le même titre → déclenche unique_violation
    await page.getByText(/^Tit$/).click(); // si pas de label, adapte le sélecteur
    await page.locator('input,textarea').first().fill(TITLE); // ou cible ton input Titre précisément
    await page.fill('input[type="datetime-local"] >> nth=0', "2030-01-01T10:00");
    await page.fill('input[type="datetime-local"] >> nth=1', "2030-01-01T12:00");
    await page.getByLabel(/^Pri$/).fill("9.99"); // adapte si besoin

    // 4) Soumets
    await page.getByRole("button", { name: /Kréyé of-la/i }).click();

    // 5) Vérifie le toast i18n en créole guadeloupéen
    const toaster = page.locator("[data-sonner-toaster]");
    await expect(toaster).toBeVisible();

    await expect(toaster).toContainText(/On anrejistreman menm jan ja ni|Menm bagay-la ja egziste/i);
  });
});


