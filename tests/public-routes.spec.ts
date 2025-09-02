import { test, expect } from '@playwright/test';

test.describe('Routes publiques et protections', () => {
  test('redirection vers /login si non connecté', async ({ page, baseURL }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(new RegExp(`${baseURL}/login`));
    await expect(page.getByRole('heading', { name: /login|connexion/i })).toBeVisible();
  });

  test('page /login est accessible', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/login|connexion/i);
    await expect(page.getByRole('button', { name: /magic|lien|se connecter/i })).toBeVisible();
  });

  test('page /debug chargée en dev', async ({ page }) => {
    await page.goto('/debug');
    // Adapte ces ancrages à ta page
    await expect(page.locator('body')).toContainText(/Node|Next|Supabase|Env/i);
  });

  test('endpoint /api/supa-check retourne 200 en dev', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}/api/supa-check`);
    // En dev on attend 200 ; en prod tu peux remplacer par 403 si c'est ton cas
    expect(res.status(), 'status dev de /api/supa-check').toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty('ok', true);
  });
});








