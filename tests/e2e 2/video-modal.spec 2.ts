import { test, expect } from '@playwright/test';

test.describe('Modal Vidéo', () => {
  test.beforeEach(async ({ page }) => {
    // Supprimer les erreurs console
    page.on('console', msg => {
      if (msg.type() === 'error') throw new Error(msg.text());
    });
  });

  test('devrait ouvrir le modal vidéo et afficher VideoEndModal après play', async ({ page }) => {
    // Aller sur la page client
    await page.goto('/client');
    
    // Attendre que la page soit chargée
    await page.waitForLoadState('networkidle');
    
    // Chercher et cliquer sur le bouton "Mutuelle Locale"
    const mutuelleButton = page.locator('button:has-text("Mutuelle Locale"), [data-testid="mutuelle-button"], text=Mutuelle').first();
    await expect(mutuelleButton).toBeVisible({ timeout: 10000 });
    await mutuelleButton.click();
    
    // Vérifier que le modal vidéo s'ouvre
    const videoModal = page.locator('[data-testid="video-modal"], .video-modal, [role="dialog"]').first();
    await expect(videoModal).toBeVisible({ timeout: 5000 });
    
    // Chercher et cliquer sur le bouton play
    const playButton = page.locator('button[aria-label="Play video"], button:has-text("Play"), [data-testid="play-button"], button:has-text("▶")').first();
    await expect(playButton).toBeVisible({ timeout: 5000 });
    await playButton.click();
    
    // Attendre un peu pour que la vidéo se lance
    await page.waitForTimeout(2000);
    
    // Vérifier que le VideoEndModal apparaît
    const videoEndModal = page.locator('[data-testid="video-end-modal"], .video-end-modal, text=Fin de la vidéo, text=Vidéo terminée').first();
    await expect(videoEndModal).toBeVisible({ timeout: 10000 });
    
    // Vérifier qu'il n'y a pas d'erreurs JavaScript
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(2000);
    expect(errors).toHaveLength(0);
  });

  test('devrait fermer le modal vidéo correctement', async ({ page }) => {
    await page.goto('/client');
    await page.waitForLoadState('networkidle');
    
    // Ouvrir le modal vidéo
    const mutuelleButton = page.locator('button:has-text("Mutuelle Locale"), [data-testid="mutuelle-button"], text=Mutuelle').first();
    await expect(mutuelleButton).toBeVisible({ timeout: 10000 });
    await mutuelleButton.click();
    
    // Vérifier que le modal est ouvert
    const videoModal = page.locator('[data-testid="video-modal"], .video-modal, [role="dialog"]').first();
    await expect(videoModal).toBeVisible({ timeout: 5000 });
    
    // Chercher et cliquer sur le bouton de fermeture
    const closeButton = page.locator('button[aria-label="Fermer"], button:has-text("Fermer"), [data-testid="close-button"], button:has-text("×")').first();
    await expect(closeButton).toBeVisible({ timeout: 5000 });
    await closeButton.click();
    
    // Vérifier que le modal est fermé
    await expect(videoModal).not.toBeVisible({ timeout: 5000 });
  });

  test('devrait gérer les interactions clavier dans le modal', async ({ page }) => {
    await page.goto('/client');
    await page.waitForLoadState('networkidle');
    
    // Ouvrir le modal vidéo
    const mutuelleButton = page.locator('button:has-text("Mutuelle Locale"), [data-testid="mutuelle-button"], text=Mutuelle').first();
    await expect(mutuelleButton).toBeVisible({ timeout: 10000 });
    await mutuelleButton.click();
    
    // Vérifier que le modal est ouvert
    const videoModal = page.locator('[data-testid="video-modal"], .video-modal, [role="dialog"]').first();
    await expect(videoModal).toBeVisible({ timeout: 5000 });
    
    // Tester la fermeture avec la touche Escape
    await page.keyboard.press('Escape');
    
    // Vérifier que le modal est fermé
    await expect(videoModal).not.toBeVisible({ timeout: 5000 });
  });
});
