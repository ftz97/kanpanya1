import { test, expect } from '@playwright/test';

function daysFromNow(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return Math.floor(d.getTime() / 1000);
}

test.describe('API /whoami', () => {
  test('403 quand non authentifié', async ({ request }) => {
    const res = await request.get('/api/whoami');
    expect(res.status()).toBe(403);
  });

  test.describe('authentifié (cookies injectés)', () => {
    test.beforeEach(async ({ context }) => {
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
          secure: false, // true si tu testes en HTTPS
          sameSite: 'Lax',
          expires: daysFromNow(3),
        },
        {
          name: 'sb-refresh-token',
          value: refresh,
          domain: hostname,
          path: '/',
          expires: daysFromNow(30),
        },
      ]);
    });

    test('200 + user id/email quand authentifié', async ({ request }) => {
      const res = await request.get('/api/whoami');
      expect(res.status()).toBe(200);
      const json = await res.json();
      expect(json.ok).toBe(true);
      expect(json.user.id).toBeTruthy();
      expect(json.user.email).toBeTruthy();
    });
  });
});








