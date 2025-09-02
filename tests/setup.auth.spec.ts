import { test, expect } from '@playwright/test';
import fs from 'node:fs';

test('login and save storage state', async ({ page, context }) => {
  await page.goto('/login');
  await page.getByLabel(/email/i).fill(process.env.E2E_TEST_EMAIL!);
  await page.getByLabel(/password/i).fill(process.env.E2E_TEST_PASSWORD!);
  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page).toHaveURL(/dashboard/);
  await context.storageState({ path: 'storageState.json' });
  // Petit log pratique
  console.log('✅ storageState.json créé:', fs.existsSync('storageState.json'));
});
