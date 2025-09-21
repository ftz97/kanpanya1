import { test, expect } from '@playwright/test';

// Utilise l'état sauvegardé après login
test.use({ storageState: 'auth.json' });

test.describe('Espace privé (connecté)', () => {
  test('accès à /dashboard sans redirection', async ({ page, baseURL }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(new RegExp(`${baseURL}/dashboard`));
    // Ajuste les sélecteurs à ton UI
    await expect(page.getByRole('heading', { name: /dashboard|tableau de bord/i })).toBeVisible();
  });

  test('header affiche un indice de session (email, avatar, bouton logout)', async ({ page }) => {
    // Exemple : si tu affiches l'email dans un menu
    const header = page.locator('header');
    await expect(header).toBeVisible();
    // Remplace par un sélecteur réel de ton app :
    await expect(header).toContainText(/@/); // email présent
  });
});








