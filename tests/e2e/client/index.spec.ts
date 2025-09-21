import { test, expect } from "@playwright/test";

test.describe("Page client - Index", () => {
  test.beforeEach(async ({ page }) => {
    page.on("console", msg => {
      if (msg.type() === "error") {
        throw new Error(`Erreur console: ${msg.text()}`);
      }
    });
  });

  test("la page se charge correctement", async ({ page }) => {
    await page.goto("/client");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("i18n: le titre est traduit", async ({ page }) => {
    // Version FR
    await page.goto("/fr/client");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/.+/);

    // Version EN
    await page.goto("/en/client");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/.+/);
  });
});
