import { test, expect } from '@playwright/test';

test('supa-check responds', async ({ request }) => {
  const res = await request.get('/api/supa-check');
  expect([200, 401, 403]).toContain(res.status()); // tolérant si check protégé
});

