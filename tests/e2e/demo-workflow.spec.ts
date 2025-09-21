import { test, expect } from "@playwright/test";

test.describe("Demo Workflow", () => {
  test("le workflow Husky fonctionne", async ({ page }) => {
    // Test simple pour démontrer que le workflow fonctionne
    await page.goto("https://example.com");
    await expect(page.locator("h1")).toContainText("Example Domain");
  });
});
