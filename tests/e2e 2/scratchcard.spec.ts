import { test, expect } from '@playwright/test';

test.describe('ScratchCard', () => {
  test.beforeEach(async ({ page }) => {
    // Supprimer les erreurs console
    page.on('console', msg => {
      if (msg.type() === 'error') throw new Error(msg.text());
    });
  });

  test('devrait simuler un ticket à gratter et afficher un reward', async ({ page }) => {
    // Aller sur la page client
    await page.goto('/client');
    
    // Attendre que la page soit chargée
    await page.waitForLoadState('networkidle');
    
    // Chercher un ticket à gratter disponible
    const scratchCard = page.locator('[data-testid="scratch-card"], .scratch-card, canvas').first();
    
    // Si un ticket est disponible, le gratter
    if (await scratchCard.isVisible()) {
      // Simuler le grattage en cliquant et en faisant glisser sur la carte
      await scratchCard.hover();
      await page.mouse.down();
      await page.mouse.move(100, 100);
      await page.mouse.move(200, 200);
      await page.mouse.up();
      
      // Attendre un peu pour que l'animation se termine
      await page.waitForTimeout(1000);
      
      // Vérifier qu'un reward s'affiche
      const rewardModal = page.locator('[data-testid="reward-modal"], .reward-modal, text=Récompense, text=Points, text=Félicitations');
      await expect(rewardModal).toBeVisible({ timeout: 5000 });
      
      // Fermer le modal de reward
      const closeButton = page.locator('button[aria-label="Fermer"], button:has-text("Fermer"), [data-testid="close-button"]');
      if (await closeButton.isVisible()) {
        await closeButton.click();
      }
    }
    
    // Vérifier que le texte "Pas de ticket pour le moment" apparaît
    await expect(page.locator('text=Pas de ticket pour le moment, text=Aucun ticket disponible, text=Plus de tickets')).toBeVisible({ timeout: 10000 });
  });

  test('devrait gérer le cas où aucun ticket n\'est disponible', async ({ page }) => {
    await page.goto('/client');
    await page.waitForLoadState('networkidle');
    
    // Vérifier le message d'absence de ticket
    const noTicketMessage = page.locator('text=Pas de ticket pour le moment, text=Aucun ticket disponible, text=Plus de tickets');
    
    // Le message peut apparaître immédiatement ou après une tentative de grattage
    await expect(noTicketMessage).toBeVisible({ timeout: 10000 });
  });

  test('devrait afficher l\'interface de grattage correctement', async ({ page }) => {
    await page.goto('/client');
    await page.waitForLoadState('networkidle');
    
    // Vérifier la présence des éléments de l'interface de grattage
    const scratchSection = page.locator('[data-testid="scratch-section"], .scratch-section, text=Grattez');
    await expect(scratchSection).toBeVisible();
    
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
});
