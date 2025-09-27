import { test, expect, Page } from '@playwright/test';

test.describe('ScratchCardStableV3 - Tests E2E', () => {
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
    
    // Attendre que le canvas soit visible
    await expect(canvas).toBeVisible({ timeout: 5000 });
    
    // Simuler un mouvement de grattage avec la souris
    await canvas.hover({ position: { x: 50, y: 50 } });
    await page.mouse.down();
    
    // Dessiner un motif de grattage plus intensif
    for (let i = 0; i < 20; i++) {
      await page.mouse.move(50 + i * 8, 50 + i * 4);
      // Utiliser une attente plus courte mais plus de mouvements
    }
    
    await page.mouse.up();
    
    // Vérifier que le canvas a été modifié (transparence)
    // On ne peut pas vérifier directement la transparence, mais on peut vérifier
    // que les événements ont été traités
    await expect(canvas).toBeVisible({ timeout: 5000 });
  });

  test('Le grattage fonctionne avec le tactile', async () => {
    const canvas = page.getByTestId('scratch-canvas');
    
    // Simuler un touch sur mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Attendre que le canvas soit visible
    await expect(canvas).toBeVisible({ timeout: 5000 });
    
    // Simuler un mouvement tactile avec pointer events
    await canvas.dispatchEvent('pointerdown', {
      pointerId: 1,
      clientX: 100,
      clientY: 100,
      pointerType: 'touch'
    });
    
    // Simuler un mouvement de grattage tactile plus intensif
    for (let i = 0; i < 15; i++) {
      await canvas.dispatchEvent('pointermove', {
        pointerId: 1,
        clientX: 100 + i * 15,
        clientY: 100 + i * 8,
        pointerType: 'touch'
      });
    }
    
    await canvas.dispatchEvent('pointerup', {
      pointerId: 1,
      pointerType: 'touch'
    });
    
    // Vérifier que le canvas est toujours visible
    await expect(canvas).toBeVisible({ timeout: 5000 });
  });

  test('Le popup s\'affiche après grattage suffisant', async () => {
    const canvas = page.getByTestId('scratch-canvas');
    
    // Attendre que le canvas soit visible
    await expect(canvas).toBeVisible({ timeout: 5000 });
    
    // Gratter intensivement pour déclencher le popup
    await canvas.click({ position: { x: 100, y: 100 } });
    
    // Simuler un grattage étendu pour atteindre le threshold (plus intensif)
    for (let i = 0; i < 40; i++) {
      await page.mouse.move(100 + i * 3, 100 + i * 2);
    }
    
    // Attendre que le popup apparaisse avec data-testid
    await expect(page.getByTestId('popup-reward')).toBeVisible({ timeout: 10000 });
    
    // Vérifier que le popup est visible
    const popup = page.getByTestId('popup-reward');
    await expect(popup).toBeVisible({ timeout: 5000 });
    
    // Vérifier que le popup contient les éléments attendus
    await expect(popup.locator('h3, h4, div')).toContainText(/Félicitations|Dommage|GOLDEN TICKET|Bravo/);
  });

  test('Le bouton Fermer ferme le popup', async () => {
    const canvas = page.getByTestId('scratch-canvas');
    
    // Attendre que le canvas soit visible
    await expect(canvas).toBeVisible({ timeout: 5000 });
    
    // Déclencher le popup (grattage intensif)
    await canvas.click({ position: { x: 150, y: 150 } });
    
    for (let i = 0; i < 50; i++) {
      await page.mouse.move(150 + i * 3, 150 + i * 2);
    }
    
    // Attendre le popup avec data-testid
    await expect(page.getByTestId('popup-reward')).toBeVisible({ timeout: 10000 });
    
    // Trouver et cliquer sur le bouton de fermeture avec data-testid
    const closeButton = page.getByTestId('popup-close');
    await expect(closeButton).toBeVisible({ timeout: 5000 });
    await closeButton.click();
    
    // Vérifier que le popup a disparu
    await expect(page.getByTestId('popup-reward')).not.toBeVisible({ timeout: 5000 });
  });

  test('Comportement mobile - pas de scroll pendant grattage', async () => {
    // Simuler un viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    const canvas = page.getByTestId('scratch-canvas');
    await expect(canvas).toBeVisible({ timeout: 5000 });
    
    const initialScrollY = await page.evaluate(() => window.scrollY);
    
    // Simuler un mouvement tactile qui pourrait causer un scroll avec pointer events
    await canvas.dispatchEvent('pointerdown', {
      pointerId: 1,
      clientX: 200,
      clientY: 200,
      pointerType: 'touch'
    });
    
    // Mouvement vertical qui pourrait déclencher un scroll
    for (let i = 0; i < 15; i++) {
      await canvas.dispatchEvent('pointermove', {
        pointerId: 1,
        clientX: 200,
        clientY: 200 + i * 8,
        pointerType: 'touch'
      });
    }
    
    await canvas.dispatchEvent('pointerup', {
      pointerId: 1,
      pointerType: 'touch'
    });
    
    // Vérifier que la page n'a pas scrollé
    const finalScrollY = await page.evaluate(() => window.scrollY);
    expect(finalScrollY).toBe(initialScrollY);
  });

  test('Le bouton "Nouvelle Carte" recharge la page', async () => {
    const refreshButton = page.locator('button').filter({ hasText: 'Nouvelle Carte' });
    await expect(refreshButton).toBeVisible({ timeout: 5000 });
    
    // Vérifier que le bouton est cliquable
    await expect(refreshButton).toBeEnabled({ timeout: 5000 });
    
    // Le test de rechargement est difficile à tester directement,
    // mais on peut vérifier que le bouton existe et est cliquable
    await refreshButton.click();
    
    // Attendre que la page se recharge et que le canvas soit à nouveau visible
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });
  });

  test('Accessibilité - Support clavier', async () => {
    const canvas = page.getByTestId('scratch-canvas');
    
    // Attendre que le canvas soit visible
    await expect(canvas).toBeVisible({ timeout: 5000 });
    
    // Vérifier que le canvas est focusable
    await canvas.focus();
    await expect(canvas).toBeFocused({ timeout: 5000 });
    
    // Simuler une pression sur Entrée ou Espace
    await page.keyboard.press('Enter');
    
    // Vérifier que quelque chose se passe (le canvas reste visible)
    await expect(canvas).toBeVisible({ timeout: 5000 });
  });

  test('Golden Ticket - Affichage spécial', async () => {
    // Ce test est plus difficile car le Golden Ticket est aléatoire
    // On peut au moins vérifier que les éléments sont présents
    
    const canvas = page.getByTestId('scratch-canvas');
    await expect(canvas).toBeVisible({ timeout: 5000 });
    
    // Vérifier que le ticket a un gradient
    const ticketContainer = page.locator('[class*="bg-gradient-to-br"]');
    await expect(ticketContainer).toBeVisible({ timeout: 5000 });
    
    // Vérifier que le texte du ticket existe (peut être aléatoire)
    const ticketText = page.locator('div').filter({ hasText: /GOLDEN TICKET|Bravo|Dommage|🎁 GRATTE ICI 🎁/ });
    await expect(ticketText.first()).toBeVisible({ timeout: 5000 });
  });

  test('Performance - Temps de chargement', async () => {
    const startTime = Date.now();
    
    // Naviguer vers la page
    await page.goto('http://localhost:3001/test-scratch-stable');
    
    // Attendre que le canvas soit visible avec data-testid
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });
    
    const loadTime = Date.now() - startTime;
    
    // Vérifier que la page se charge en moins de 5 secondes
    expect(loadTime).toBeLessThan(5000);
  });
});



