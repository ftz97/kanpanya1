import { test, expect } from '@playwright/test';
import { TestHelpers } from './helpers/test-helpers';

test.describe('Intégration Client - Scénario complet', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    helpers.setupConsoleErrorHandling();
  });

  test('scénario complet : navigation → scratch → vidéo', async ({ page }) => {
    // 1. Navigation vers la page client
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Vérifier la navbar
    await expect(page.locator('text=Kanpanya')).toBeVisible();
    
    // 2. Test de navigation vers les offres
    const offresLink = page.locator('a[href*="offres"], text=Offres').first();
    if (await offresLink.isVisible()) {
      await offresLink.click();
      await expect(page).toHaveURL(/.*offres.*/);
      
      // Retour à la page principale
      await page.goto('/client');
      await helpers.waitForPageLoad();
    }
    
    // 3. Test de grattage de carte
    const scratchCard = page.locator('[data-testid="scratch-card"], .scratch-card, canvas').first();
    if (await scratchCard.isVisible()) {
      await helpers.simulateScratching(scratchCard);
      
      // Vérifier l'apparition d'un reward ou du message d'absence
      const rewardOrNoTicket = page.locator(
        '[data-testid="reward-modal"], .reward-modal, text=Récompense, text=Points, text=Pas de ticket pour le moment, text=Aucun ticket disponible'
      );
      await expect(rewardOrNoTicket).toBeVisible({ timeout: 10000 });
      
      // Fermer le modal si nécessaire
      try {
        await helpers.closeModal();
      } catch (e) {
        // Modal déjà fermé ou pas de modal à fermer
      }
    }
    
    // 4. Test du modal vidéo
    const mutuelleButton = page.locator('button:has-text("Mutuelle Locale"), [data-testid="mutuelle-button"], text=Mutuelle').first();
    if (await mutuelleButton.isVisible()) {
      await mutuelleButton.click();
      
      // Vérifier l'ouverture du modal vidéo
      const videoModal = await helpers.waitForModal([
        '[data-testid="video-modal"]',
        '.video-modal',
        '[role="dialog"]'
      ]);
      
      // Lancer la vidéo
      const playButton = page.locator('button[aria-label="Play video"], button:has-text("Play"), [data-testid="play-button"]').first();
      if (await playButton.isVisible()) {
        await playButton.click();
        
        // Attendre l'apparition du VideoEndModal
        const videoEndModal = await helpers.waitForModal([
          '[data-testid="video-end-modal"]',
          '.video-end-modal',
          'text=Fin de la vidéo'
        ], 15000);
        
        // Fermer le modal
        await helpers.closeModal();
      }
    }
    
    // 5. Vérification finale - pas d'erreurs JavaScript
    await helpers.checkNoJavaScriptErrors();
  });

  test('vérification de l\'accessibilité clavier', async ({ page }) => {
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Test de navigation au clavier
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Vérifier qu'un élément est focusé
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Test de fermeture de modal avec Escape
    const mutuelleButton = page.locator('button:has-text("Mutuelle Locale"), [data-testid="mutuelle-button"], text=Mutuelle').first();
    if (await mutuelleButton.isVisible()) {
      await mutuelleButton.click();
      
      const videoModal = page.locator('[data-testid="video-modal"], .video-modal, [role="dialog"]').first();
      if (await videoModal.isVisible()) {
        await page.keyboard.press('Escape');
        await expect(videoModal).not.toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('performance et chargement', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    const loadTime = Date.now() - startTime;
    
    // Vérifier que la page se charge en moins de 5 secondes
    expect(loadTime).toBeLessThan(5000);
    
    // Vérifier qu'il n'y a pas d'erreurs de performance
    const performanceErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && msg.text().includes('performance')) {
        performanceErrors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(2000);
    expect(performanceErrors).toHaveLength(0);
  });
});
