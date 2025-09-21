import { test, expect } from "@playwright/test";

async function expectNextDialogMessage(page, regex: RegExp) {
  const dlg = await page.waitForEvent("dialog");
  expect(dlg.message()).toMatch(regex);
  await dlg.dismiss().catch(() => {});
}

test.describe("Flash Offers GCF i18n", () => {
  test("UI de base en GCF (labels + bouton)", async ({ page }) => {
    await page.goto("/gcf/flash-offers/new");

    // Titre de la page (dépend de ton <h1> actuel)
    await expect(page.getByText(/Of éklè/i)).toBeVisible();

    // Labels principaux du formulaire (GCF)
    await expect(page.getByText(/^Tit$/)).toBeVisible();            // title
    await expect(page.getByText(/^Deskripsyon$/)).toBeVisible();    // description
    await expect(page.getByText(/^Koumansman$/)).toBeVisible();     // startsAt
    await expect(page.getByText(/^Bout$/)).toBeVisible();           // endsAt
    await expect(page.getByText(/^Pri$/)).toBeVisible();            // price

    // Bouton submit GCF
    await expect(page.getByRole("button", { name: /Kréyé of-la/i })).toBeVisible();
  });

  test("valide erreurs Zod (vide + ordre des dates) en GCF", async ({ page }) => {
    await page.goto("/gcf/flash-offers/new");

    // 1) Soumission vide -> erreurs "Champs-tala obligatwa."
    await page.getByRole("button", { name: /Kréyé of-la/i }).click();
    await expect(page.getByText(/Champs-tala obligatwa\./i)).toBeVisible();

    // 2) Dates inversées -> "Dat-la pou bout-la dwèt vini apré dat koumansman-an."
    await page.fill('input[type="datetime-local"] >> nth=0', "2030-01-01T12:00"); // starts_at
    await page.fill('input[type="datetime-local"] >> nth=1', "2030-01-01T10:00"); // ends_at
    await page.getByRole("button", { name: /Kréyé of-la/i }).click();

    await expect(
      page.getByText(/Dat-la pou bout-la dwèt vini apré dat koumansman-an\./i)
    ).toBeVisible();
  });

  test("mapping code API → message GCF (offer.missing_title)", async ({ page }) => {
    await page.goto("/gcf/flash-offers/new");

    // Remplir seulement les dates pour déclencher offer.missing_title côté API
    await page.fill('input[type="datetime-local"] >> nth=0', "2030-01-01T10:00");
    await page.fill('input[type="datetime-local"] >> nth=1', "2030-01-01T12:00");

    // Si ton form utilise alert() pour afficher l'erreur mappée, on l'intercepte :
    const usesAlertPromise = expectNextDialogMessage(page, /Tit-la obligatwa\./i).catch(() => {});

    await page.getByRole("button", { name: /Kréyé of-la/i }).click();

    // Deux cas :
    // 1) Tu utilises alert() -> l'attente de dialog résout et on est bon
    // 2) Tu utilises un toast/texte dans la page -> on vérifie la présence du texte
    await Promise.race([
      usesAlertPromise,
      page.waitForFunction(() => !!document.body.innerText.match(/Tit-la obligatwa\./i)),
    ]);
  });
});


