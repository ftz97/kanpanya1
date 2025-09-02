import { test, expect } from "@playwright/test";

test.describe("Auth flows - Anonymous", () => {
  test("redirects anonymous to /login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });
});




