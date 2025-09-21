import { test, expect } from '@playwright/test';

test('unauthed → /dashboard redirige vers /login', async ({ page }) => {
  const res = await page.goto('/dashboard');
  // on doit se retrouver sur /login
  await expect(page).toHaveURL(/\/login(\?|$)/);
  // statut HTTP 200 (page login s'affiche)
  expect(res?.status()).toBeLessThan(400);
});








