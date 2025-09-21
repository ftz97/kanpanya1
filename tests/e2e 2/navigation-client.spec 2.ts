import { test, expect } from '@playwright/test';

test.describe('Navigation Client', () => {
  test.beforeEach(async ({ page }) => {
    // Supprimer les erreurs console
    page.on('console', msg => {
      if (msg.type() === 'error') throw new Error(msg.text());
    });
  });

  test('devrait afficher la navbar avec Kanpanya et naviguer vers les offres', async ({ page }) => {
    // Aller sur la page client
    await page.goto('/client');
    
    // Vérifier que la navbar affiche "Kanpanya"
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('text=Kanpanya')).toBeVisible();
    
    // Cliquer sur "Offres"
    const offresLink = page.locator('a[href*="offres"], text=Offres').first();
    await expect(offresLink).toBeVisible();
    await offresLink.click();
    
    // Vérifier la présence de la section Promos Flash
    await expect(page.locator('text=Promos Flash, text=Flash, text=Offres Flash')).toBeVisible();
    
    // Vérifier que nous sommes sur la bonne page
    await expect(page).toHaveURL(/.*offres.*/);
  });

  test('devrait afficher les éléments principaux de la page client', async ({ page }) => {
    await page.goto('/client');
    
    // Vérifier la présence des sections principales
    await expect(page.locator('text=Kanpanya')).toBeVisible();
    
    // Vérifier la présence d'éléments de navigation
    const navigation = page.locator('nav, header');
    await expect(navigation).toBeVisible();
    
    // Vérifier qu'il n'y a pas d'erreurs JavaScript
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });
});
