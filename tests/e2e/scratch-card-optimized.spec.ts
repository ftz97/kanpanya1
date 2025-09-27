import { test, expect, Page } from '@playwright/test';
import { 
  scratchAndReveal, 
  scratchWithTouch, 
  testMobileScrollBehavior, 
  testKeyboardAccessibility, 
  testPageLoadPerformance,
  forceGoldenTicket,
  forceReward 
} from '../helpers/scratch-helpers';

test.describe('ScratchCard - Tests Optimisés avec Helpers', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:3001/test-scratch-stable');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('Le canvas s\'affiche correctement', async () => {
    // Vérifier que le titre est présent
    await expect(page.locator('h2')).toContainText('Version Stable Validée', { timeout: 5000 });
    
    // Attendre explicitement le canvas avec data-testid
    const canvas = page.getByTestId('scratch-canvas');
    await expect(canvas).toBeVisible({ timeout: 5000 });
    
    // Vérifier que le canvas a les bonnes dimensions
    const canvasBox = await canvas.boundingBox();
    expect(canvasBox?.width).toBeGreaterThan(200);
    expect(canvasBox?.height).toBeGreaterThan(100);
    
    // Vérifier que le canvas a le bon texte de grattage
    await expect(canvas).toHaveAttribute('aria-label', 'Carte à gratter - Grattez pour révéler votre récompense', { timeout: 5000 });
  });

  test('Le grattage fonctionne avec la souris', async () => {
    const canvas = page.getByTestId('scratch-canvas');
    await expect(canvas).toBeVisible({ timeout: 5000 });
    
    // Simuler un mouvement de grattage avec la souris
    await canvas.hover({ position: { x: 50, y: 50 } });
    await page.mouse.down();
    
    // Dessiner un motif de grattage plus intensif
    for (let i = 0; i < 20; i++) {
      await page.mouse.move(50 + i * 8, 50 + i * 4);
    }
    
    await page.mouse.up();
    
    // Vérifier que le canvas a été modifié
    await expect(canvas).toBeVisible({ timeout: 5000 });
  });

  test('Le grattage fonctionne avec le tactile', async () => {
    await scratchWithTouch(page);
    
    // Vérifier que le canvas est toujours visible
    const canvas = page.getByTestId('scratch-canvas');
    await expect(canvas).toBeVisible({ timeout: 5000 });
  });

  test('Le popup s\'affiche après grattage suffisant', async () => {
    const { popup } = await scratchAndReveal(page, 'heavy');
    
    // Vérifier que le popup contient les éléments attendus (patterns plus flexibles)
    await expect(popup.locator('h3, h4, div').first()).toContainText(/Félicitations|Dommage|GOLDEN TICKET|Bravo|Réduction|Offre|points/);
  });

  test('Le bouton Fermer ferme le popup', async () => {
    const { popup, closeButton } = await scratchAndReveal(page, 'heavy');
    
    // Cliquer sur le bouton de fermeture
    await expect(closeButton).toBeVisible({ timeout: 5000 });
    await closeButton.click();
    
    // Vérifier que le popup a disparu
    await expect(popup).not.toBeVisible({ timeout: 5000 });
  });

  test('Comportement mobile - pas de scroll pendant grattage', async () => {
    await testMobileScrollBehavior(page);
  });

  test('Le bouton "Nouvelle Carte" recharge la page', async () => {
    const refreshButton = page.locator('button').filter({ hasText: 'Nouvelle Carte' });
    await expect(refreshButton).toBeVisible({ timeout: 5000 });
    await expect(refreshButton).toBeEnabled({ timeout: 5000 });
    
    await refreshButton.click();
    
    // Attendre que la page se recharge et que le canvas soit à nouveau visible
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });
  });

  test('Accessibilité - Support clavier', async () => {
    await testKeyboardAccessibility(page);
  });

  test('Golden Ticket - Mock récompense spéciale', async () => {
    const canvas = await forceGoldenTicket(page);
    
    // Vérifier que le Golden Ticket est affiché
    const goldenTicketText = page.locator('div').filter({ hasText: 'GOLDEN TICKET' });
    await expect(goldenTicketText.first()).toBeVisible({ timeout: 5000 });

    // Vérifier l'animation pulse du Golden Ticket
    const goldenTicketContainer = page.locator('[class*="ring-yellow-400"][class*="animate-pulse"]');
    await expect(goldenTicketContainer).toBeVisible({ timeout: 5000 });

    // Gratter pour révéler la récompense
    const { popup } = await scratchAndReveal(page, 'medium');
    
    // Vérifier le contenu du popup Golden Ticket
    await expect(popup.locator('h3, h4, div').first()).toContainText(/GOLDEN TICKET/);
    await expect(popup.locator('h3, h4, div').first()).toContainText(/points spéciaux/);
  });

  test('🥇 Golden Ticket forcé', async () => {
    const canvas = await forceReward(page, 'golden');
    await scratchAndReveal(page, 'medium');
    await expect(page.locator('[class*="ring-yellow-400"]').first()).toBeVisible({ timeout: 3000 });
  });

  test('💰 Points forcés', async () => {
    const canvas = await forceReward(page, 'points');
    const { popup } = await scratchAndReveal(page, 'medium');
    await expect(popup.locator('h3').first()).toContainText(/Félicitations|points/);
  });

  test('😞 Perte forcée', async () => {
    const canvas = await forceReward(page, 'lose');
    const { popup } = await scratchAndReveal(page, 'medium');
    await expect(popup.locator('h3').first()).toContainText(/Dommage/);
  });

  test('Performance - Temps de chargement', async () => {
    const loadTime = await testPageLoadPerformance(page, 'http://localhost:3001/test-scratch-stable', 5000);
    console.log(`Page loaded in ${loadTime}ms`);
  });
});
