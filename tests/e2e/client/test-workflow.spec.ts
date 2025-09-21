import { test, expect } from "@playwright/test";

test.describe("Page client - TestWorkflow", () => {
  test.beforeEach(async ({ page }) => {
    page.on("console", msg => {
      if (msg.type() === "error") {
        throw new Error(`Erreur console: ${msg.text()}`);
      }
    });
  });

  test("la page se charge correctement", async ({ page }) => {
    await page.goto("/client/test-workflow");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
