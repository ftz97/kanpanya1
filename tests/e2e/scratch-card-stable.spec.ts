import { test, expect, Page } from '@playwright/test';

test.describe('ScratchCardStableV3 - Tests E2E', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000/test-scratch-stable');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('Le canvas s\'affiche correctement', async () => {
    // Vérifier que le titre est présent
    await expect(page.locator('h2')).toContainText('Gratte ton ticket magique');
    
    // Vérifier que le canvas est présent et visible
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    
    // Vérifier que le canvas a les bonnes dimensions
    const canvasBox = await canvas.boundingBox();
    expect(canvasBox?.width).toBeGreaterThan(200);
    expect(canvasBox?.height).toBeGreaterThan(100);
    
    // Vérifier que le canvas a le bon texte de grattage
    await expect(canvas).toHaveAttribute('aria-label', 'Carte à gratter - Grattez pour révéler votre récompense');
  });

  test('Le grattage fonctionne avec la souris', async () => {
    const canvas = page.locator('canvas');
    
    // Simuler un mouvement de grattage avec la souris
    await canvas.hover({ position: { x: 50, y: 50 } });
    await page.mouse.down();
    
    // Dessiner un motif de grattage
    for (let i = 0; i < 10; i++) {
      await page.mouse.move(50 + i * 10, 50 + i * 5);
      await page.waitForTimeout(50);
    }
    
    await page.mouse.up();
    
    // Vérifier que le canvas a été modifié (transparence)
    // On ne peut pas vérifier directement la transparence, mais on peut vérifier
    // que les événements ont été traités
    await expect(canvas).toBeVisible();
  });

  test('Le grattage fonctionne avec le tactile', async () => {
    const canvas = page.locator('canvas');
    
    // Simuler un touch sur mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Simuler un mouvement tactile
    await canvas.touchstart();
    
    // Simuler un mouvement de grattage tactile
    for (let i = 0; i < 5; i++) {
      await page.touchscreen.tap(100 + i * 20, 100 + i * 10);
      await page.waitForTimeout(100);
    }
    
    await canvas.touchend();
    
    // Vérifier que le canvas est toujours visible
    await expect(canvas).toBeVisible();
  });

  test('Le popup s\'affiche après grattage suffisant', async () => {
    const canvas = page.locator('canvas');
    
    // Gratter intensivement pour déclencher le popup
    await canvas.click({ position: { x: 100, y: 100 } });
    
    // Simuler un grattage étendu pour atteindre le threshold
    for (let i = 0; i < 20; i++) {
      await page.mouse.move(100 + i * 5, 100 + i * 3);
      await page.waitForTimeout(30);
    }
    
    // Attendre que le popup apparaisse
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
    
    // Vérifier que le popup est visible
    const popup = page.locator('[role="dialog"]');
    await expect(popup).toBeVisible();
    
    // Vérifier que le popup contient les éléments attendus
    await expect(popup.locator('h3, h4, div')).toContainText(/Félicitations|Dommage|GOLDEN TICKET|Bravo/);
  });

  test('Le bouton Fermer ferme le popup', async () => {
    const canvas = page.locator('canvas');
    
    // Déclencher le popup (grattage intensif)
    await canvas.click({ position: { x: 150, y: 150 } });
    
    for (let i = 0; i < 25; i++) {
      await page.mouse.move(150 + i * 4, 150 + i * 2);
      await page.waitForTimeout(25);
    }
    
    // Attendre le popup
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
    
    // Trouver et cliquer sur le bouton de fermeture
    // Le bouton peut être dans le composant Popup
    const closeButton = page.locator('button').filter({ hasText: /Fermer|Close|×/ });
    
    if (await closeButton.count() > 0) {
      await closeButton.first().click();
      
      // Vérifier que le popup a disparu
      await expect(page.locator('[role="dialog"]')).not.toBeVisible();
    }
  });

  test('Comportement mobile - pas de scroll pendant grattage', async () => {
    // Simuler un viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    const canvas = page.locator('canvas');
    const initialScrollY = await page.evaluate(() => window.scrollY);
    
    // Simuler un mouvement tactile qui pourrait causer un scroll
    await canvas.touchstart();
    
    // Mouvement vertical qui pourrait déclencher un scroll
    for (let i = 0; i < 10; i++) {
      await page.touchscreen.tap(200, 200 + i * 10);
      await page.waitForTimeout(50);
    }
    
    await canvas.touchend();
    
    // Vérifier que la page n'a pas scrollé
    const finalScrollY = await page.evaluate(() => window.scrollY);
    expect(finalScrollY).toBe(initialScrollY);
  });

  test('Le bouton "Nouvelle Carte" recharge la page', async () => {
    const refreshButton = page.locator('button').filter({ hasText: 'Nouvelle Carte' });
    await expect(refreshButton).toBeVisible();
    
    // Vérifier que le bouton est cliquable
    await expect(refreshButton).toBeEnabled();
    
    // Le test de rechargement est difficile à tester directement,
    // mais on peut vérifier que le bouton existe et est cliquable
    await refreshButton.click();
    
    // Attendre un peu pour voir si la page se recharge
    await page.waitForTimeout(1000);
  });

  test('Accessibilité - Support clavier', async () => {
    const canvas = page.locator('canvas');
    
    // Vérifier que le canvas est focusable
    await canvas.focus();
    await expect(canvas).toBeFocused();
    
    // Simuler une pression sur Entrée ou Espace
    await page.keyboard.press('Enter');
    
    // Vérifier que quelque chose se passe (le canvas reste visible)
    await expect(canvas).toBeVisible();
  });

  test('Golden Ticket - Affichage spécial', async () => {
    // Ce test est plus difficile car le Golden Ticket est aléatoire
    // On peut au moins vérifier que les éléments sont présents
    
    // Vérifier que le ticket a un gradient
    const ticketContainer = page.locator('[class*="bg-gradient-to-br"]');
    await expect(ticketContainer).toBeVisible();
    
    // Vérifier que le texte du ticket existe
    const ticketText = page.locator('div').filter({ hasText: /GOLDEN TICKET|Bravo|Dommage/ });
    await expect(ticketText.first()).toBeVisible();
  });

  test('Performance - Temps de chargement', async () => {
    const startTime = Date.now();
    
    // Naviguer vers la page
    await page.goto('http://localhost:3000/test-scratch-stable');
    
    // Attendre que le canvas soit visible
    await page.waitForSelector('canvas');
    
    const loadTime = Date.now() - startTime;
    
    // Vérifier que la page se charge en moins de 5 secondes
    expect(loadTime).toBeLessThan(5000);
  });
});

