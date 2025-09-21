import { test, expect } from '@playwright/test';

function daysFromNow(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

test.beforeEach(async ({ context }) => {
  // Charge les tokens depuis l'env (voir .env.e2e)
  const access = process.env.E2E_SB_ACCESS_TOKEN!;
  const refresh = process.env.E2E_SB_REFRESH_TOKEN!;
  const baseURL = process.env.E2E_BASE_URL || 'http://localhost:3000';
  const { hostname } = new URL(baseURL);

  if (!access || !refresh) {
    throw new Error('Manque E2E_SB_ACCESS_TOKEN ou E2E_SB_REFRESH_TOKEN dans .env.e2e');
  }

  // Injecte les cookies comme si l'utilisateur était déjà loggé
  await context.addCookies([
    {
      name: 'sb-access-token',
      value: access,
      domain: hostname,
      path: '/',
      httpOnly: true,
      secure: false, // en local
      sameSite: 'Lax',
      expires: Math.floor(daysFromNow(3).getTime() / 1000),
    },
    {
      name: 'sb-refresh-token',
      value: refresh,
      domain: hostname,
      path: '/',
      httpOnly: true,
      secure: false, // en local
      sameSite: 'Lax',
      expires: Math.floor(daysFromNow(30).getTime() / 1000),
    },
  ]);
});

test('authed → /dashboard accessible', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/dashboard/);
  // Optionnel: vérifie un élément clé de la page
  await expect(page.locator('h1, [data-testid="dashboard-root"]')).toBeVisible();
});

test('/api/supa-check → 200 quand session présente', async ({ request }) => {
  const res = await request.get('/api/supa-check');
  expect(res.status()).toBe(200);
  const json = await res.json();
  expect(json.ok).toBe(true);
  expect(json.user).toBeTruthy();
});








