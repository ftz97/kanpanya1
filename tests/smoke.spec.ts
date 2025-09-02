import { test, expect } from '@playwright/test';

function expInDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return Math.floor(d.getTime() / 1000);
}

async function injectSessionCookies(context: any) {
  const baseURL = process.env.E2E_BASE_URL || 'http://localhost:3000';
  const { hostname } = new URL(baseURL);

  const access = process.env.E2E_SB_ACCESS_TOKEN;
  const refresh = process.env.E2E_SB_REFRESH_TOKEN;
  if (!access || !refresh) {
    throw new Error('Manque E2E_SB_ACCESS_TOKEN ou E2E_SB_REFRESH_TOKEN dans .env.e2e');
  }

  await context.addCookies([
    {
      name: 'sb-access-token',
      value: access,
      domain: hostname,
      path: '/',
      httpOnly: true,
      secure: false, // passe à true si tu testes en HTTPS
      sameSite: 'Lax',
      expires: expInDays(3),
    },
    {
      name: 'sb-refresh-token',
      value: refresh,
      domain: hostname,
      path: '/',
      httpOnly: true,
      secure: false, // true si HTTPS
      sameSite: 'Lax',
      expires: expInDays(30),
    },
  ]);
}

test.describe('Smoke E2E', () => {
  // ---- Non authentifié ----
  test('health OK', async ({ request }) => {
    const res = await request.get('/api/health');
    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(['development', 'production', 'test']).toContain(json.env);
  });

  test('whoami 403 quand non loggé', async ({ request }) => {
    const res = await request.get('/api/whoami');
    expect(res.status()).toBe(403);
  });

  test('dashboard redirige vers /login quand non loggé', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login(\?|$)/);
  });

  test('debug accessible en dev', async ({ request }) => {
    const res = await request.get('/debug');
    expect([200, 304]).toContain(res.status());
  });

  // ---- Authentifié (cookies injectés) ----
  test.describe('avec session', () => {
    test.beforeEach(async ({ context }) => {
      await injectSessionCookies(context);
    });

    test('whoami 200 + user', async ({ request }) => {
      const res = await request.get('/api/whoami');
      expect(res.status()).toBe(200);
      const json = await res.json();
      expect(json.ok).toBe(true);
      expect(json.user.id).toBeTruthy();
      expect(json.user.email).toBeTruthy();
    });

    test('supa-check 200', async ({ request }) => {
      const res = await request.get('/api/supa-check');
      expect(res.status()).toBe(200);
      const json = await res.json();
      expect(json.ok).toBe(true);
      expect(json.user).toBeTruthy();
    });

    test('dashboard accessible', async ({ page }) => {
      await page.goto('/dashboard');
      await expect(page).toHaveURL(/\/dashboard/);
      // Optionnel: vérifie un élément clé
      await expect(page.locator('h1, [data-testid="dashboard-root"]')).toBeVisible();
    });
  });

  // ---- Optionnel: simuler la prod pour /debug ----
  test('debug 403 si on "assume prod"', async ({ request }) => {
    test.skip(process.env.E2E_ASSUME_PROD !== '1', 'Définis E2E_ASSUME_PROD=1 pour exécuter ce check');
    const res = await request.get('/debug');
    expect(res.status()).toBe(403);
  });
});








