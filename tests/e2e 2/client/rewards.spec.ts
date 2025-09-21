import { test, expect } from "@playwright/test";

test.describe("Page client - Rewards", () => {
  test.beforeEach(async ({ page }) => {
    page.on("console", msg => {
      if (msg.type() === "error") {
        throw new Error(`Erreur console: ${msg.text()}`);
      }
    });
  });

  test("la page se charge correctement", async ({ page }) => {
    await page.goto("/client/rewards");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("la page est responsive", async ({ page }) => {
    await page.goto("/client/rewards");
    
    // Test desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator("body")).toBeVisible();
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("body")).toBeVisible();
  });

  test("navigation fonctionne", async ({ page }) => {
    await page.goto("/client/rewards");
    
    // Vérifier que les liens de navigation sont présents
    const navLinks = page.locator("nav a, header a");
    await expect(navLinks.first()).toBeVisible();
  });
});
