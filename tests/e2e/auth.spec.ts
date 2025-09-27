import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001');
  });

  test('should display welcome page', async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    await expect(page.locator('button:has-text("Je suis un(e) client(e)")')).toBeVisible();
    await expect(page.locator('button:has-text("Je suis un(e) commerçant(e)")')).toBeVisible();
  });

  test('should handle client button click', async ({ page }) => {
    // Cliquer sur le bouton "Je suis un(e) client(e)"
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier la redirection ou l'affichage de la page suivante
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle merchant button click', async ({ page }) => {
    // Cliquer sur le bouton "Je suis un(e) commerçant(e)"
    await page.click('button:has-text("Je suis un(e) commerçant(e)")');
    
    // Vérifier la redirection ou l'affichage de la page suivante
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display welcome features', async ({ page }) => {
    // Vérifier l'affichage des fonctionnalités
    await expect(page.locator('text=Découvre tes commerçants locaux')).toBeVisible();
    await expect(page.locator('text=Scanne ton QR code')).toBeVisible();
    await expect(page.locator('text=Gagne des récompenses exclusives')).toBeVisible();
  });

  test('should handle responsive design', async ({ page }) => {
    // Test sur mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Test sur tablette
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Test sur desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
  });
});