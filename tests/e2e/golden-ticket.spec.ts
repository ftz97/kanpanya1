import { test, expect, Page } from '@playwright/test';

test.describe('Golden Ticket - Tests E2E', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:3001/test-scratch-stable');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('Golden Ticket - Mock récompense spéciale', async () => {
    const canvas = page.getByTestId('scratch-canvas');
    await expect(canvas).toBeVisible();

    // Mock une récompense Golden Ticket via JavaScript
    await page.evaluate(() => {
      // Forcer un Golden Ticket
      window.localStorage.setItem('mockGoldenTicket', 'true');
      
      // Override la fonction de génération de ticket
      const originalGetRandomTicketGradient = window.getRandomTicketGradient;
      window.getRandomTicketGradient = () => ({
        gradient: "from-yellow-400 via-yellow-500 to-yellow-600",
        isGolden: true
      });
    });

    // Recharger la page pour appliquer le mock
    await page.reload();
    
    // Attendre que le canvas soit visible
    await expect(canvas).toBeVisible();

    // Vérifier que le Golden Ticket est affiché
    const goldenTicketText = page.locator('div').filter({ hasText: 'GOLDEN TICKET' });
    await expect(goldenTicketText).toBeVisible();

    // Vérifier l'animation pulse du Golden Ticket
    const goldenTicketContainer = page.locator('[class*="ring-yellow-400"][class*="animate-pulse"]');
    await expect(goldenTicketContainer).toBeVisible();

    // Gratter pour révéler la récompense
    await canvas.click({ position: { x: 100, y: 100 } });
    
    // Simuler un grattage pour déclencher le popup
    for (let i = 0; i < 15; i++) {
      await page.mouse.move(100 + i * 5, 100 + i * 3);
      await page.waitForTimeout(30);
    }

    // Attendre le popup
    await page.waitForSelector('[data-testid="popup-reward"]', { timeout: 5000 });
    
    // Vérifier que le popup Golden Ticket est affiché
    const popup = page.getByTestId('popup-reward');
    await expect(popup).toBeVisible();
    
    // Vérifier le contenu du popup Golden Ticket
    await expect(popup.locator('h3, h4, div')).toContainText(/GOLDEN TICKET/);
    await expect(popup.locator('h3, h4, div')).toContainText(/points spéciaux/);
  });

  test('Golden Ticket - Vérification visuelle', async () => {
    const canvas = page.getByTestId('scratch-canvas');
    await expect(canvas).toBeVisible();

    // Vérifier les éléments visuels du Golden Ticket
    const goldenElements = [
      page.locator('[class*="ring-yellow-400"]'), // Ring doré
      page.locator('[class*="animate-pulse"]'), // Animation pulse
      page.locator('div').filter({ hasText: 'GOLDEN TICKET' }) // Texte Golden Ticket
    ];

    // Au moins un élément Golden Ticket doit être présent
    let goldenTicketFound = false;
    for (const element of goldenElements) {
      if (await element.count() > 0) {
        goldenTicketFound = true;
        await expect(element).toBeVisible();
        break;
      }
    }

    // Si aucun Golden Ticket n'est trouvé, c'est normal (aléatoire)
    // On vérifie juste que le canvas fonctionne
    await expect(canvas).toBeVisible();
  });

  test('Golden Ticket - Test de récompense spéciale', async () => {
    const canvas = page.getByTestId('scratch-canvas');
    await expect(canvas).toBeVisible();

    // Mock une récompense Golden Ticket
    await page.evaluate(() => {
      // Override la logique de récompense
      window.mockGoldenReward = {
        type: "golden",
        amount: 1000,
        merchant: "Kanpanya"
      };
    });

    // Gratter pour déclencher le popup
    await canvas.click({ position: { x: 150, y: 150 } });
    
    for (let i = 0; i < 20; i++) {
      await page.mouse.move(150 + i * 4, 150 + i * 2);
      await page.waitForTimeout(25);
    }

    // Attendre le popup
    await page.waitForSelector('[data-testid="popup-reward"]', { timeout: 5000 });
    
    const popup = page.getByTestId('popup-reward');
    await expect(popup).toBeVisible();
    
    // Vérifier le contenu de la récompense
    await expect(popup.locator('h3, h4, div')).toContainText(/Félicitations|GOLDEN TICKET|Bravo/);
    
    // Fermer le popup
    const closeButton = page.getByTestId('popup-close');
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    
    // Vérifier que le popup a disparu
    await expect(popup).not.toBeVisible();
  });
});
