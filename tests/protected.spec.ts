import { test, expect } from '@playwright/test';

test('can access dashboard when logged in', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText(/dashboard/i)).toBeVisible();
  await expect(page.getByText(/connecté/i)).toBeVisible();
});
