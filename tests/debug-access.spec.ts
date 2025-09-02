import { test, expect } from '@playwright/test';

test('debug accessible en dev', async ({ request }) => {
  const res = await request.get('/debug');
  expect([200, 304]).toContain(res.status());
});

test('debug 403 si on suppose la prod', async ({ request }) => {
  test.skip(process.env.E2E_ASSUME_PROD !== '1', 'Définir E2E_ASSUME_PROD=1 pour ce test');
  const res = await request.get('/debug');
  expect(res.status()).toBe(403);
});
