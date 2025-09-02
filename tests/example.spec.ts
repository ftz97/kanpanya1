import { test, expect } from '@playwright/test';

test('la page Playwright contient "Playwright"', async ({ page }) => {
  // Ouvre la page officielle
  await page.goto('https://playwright.dev');

  // Vérifie que le mot "Playwright" apparaît dans le titre
  await expect(page).toHaveTitle(/Playwright/);
});








