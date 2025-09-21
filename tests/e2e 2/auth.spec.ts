import { test, expect } from "@playwright/test";

test.describe("Auth flows - Anonymous", () => {
  test("redirects anonymous to /login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Auth flows - Authenticated", () => {
  test.use({ storageState: "storageState.json" });
  
  test("shows dashboard when logged", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: /bonjour/i })).toBeVisible();
  });
});
