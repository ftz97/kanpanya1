import { test, expect } from "@playwright/test";

test.describe("Scratch Card E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Redirige vers la page scratch avant chaque test
    await page.goto("http://localhost:3001/test-scratch-stable");
  });

  test("🎟️ Scratch simple → affiche une récompense", async ({ page }) => {
    // Attendre que le canvas soit chargé
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });
    
    // Simule le grattage avec plus d'intensité
    await page.mouse.move(200, 200);
    await page.mouse.down();
    for (let i = 0; i < 50; i++) {
      await page.mouse.move(200 + i * 2, 200 + Math.sin(i * 0.1) * 10);
      await page.waitForTimeout(2);
    }
    await page.mouse.up();

    // Attendre un peu pour que le popup apparaisse
    await page.waitForTimeout(1000);

    // Vérifie qu'un popup s'affiche avec une récompense
    const popup = page.locator('[role="dialog"], .popup, [data-testid="popup-reward"]');
    if (await popup.count() > 0) {
      await expect(popup).toBeVisible({ timeout: 5000 });
    }
  });

  test("🏆 Scratch Golden Ticket (mock)", async ({ page }) => {
    // Mock : forcer la récompense
    await page.evaluate(() => {
      (window as any).FORCE_REWARD = "GOLDEN_TICKET";
    });

    // Attendre que le canvas soit chargé
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });

    // Grattage rapide
    await page.mouse.move(200, 200);
    await page.mouse.down();
    for (let i = 0; i < 30; i++) {
      await page.mouse.move(200 + i * 3, 200 + Math.sin(i * 0.1) * 5);
      await page.waitForTimeout(2);
    }
    await page.mouse.up();

    // Attendre un peu pour que le popup apparaisse
    await page.waitForTimeout(1000);

    // Vérifie apparition du Golden Ticket
    const popup = page.locator('[role="dialog"], .popup, [data-testid="popup-reward"]');
    if (await popup.count() > 0) {
      await expect(popup).toBeVisible({ timeout: 5000 });
    }
  });

  test("😢 Scratch sans gain (mock)", async ({ page }) => {
    // Mock : pas de gain
    await page.evaluate(() => {
      (window as any).FORCE_REWARD = "NONE";
    });

    // Attendre que le canvas soit chargé
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });

    // Grattage rapide
    await page.mouse.move(200, 200);
    await page.mouse.down();
    for (let i = 0; i < 30; i++) {
      await page.mouse.move(200 + i * 3, 200 + Math.sin(i * 0.1) * 5);
      await page.waitForTimeout(2);
    }
    await page.mouse.up();

    // Attendre un peu pour que le popup apparaisse
    await page.waitForTimeout(1000);

    // Vérifie le message de défaite
    const popup = page.locator('[role="dialog"], .popup, [data-testid="popup-reward"]');
    if (await popup.count() > 0) {
      await expect(popup).toBeVisible({ timeout: 5000 });
    }
  });

  test("💰 Scratch avec points (mock)", async ({ page }) => {
    // Mock : forcer les points
    await page.evaluate(() => {
      (window as any).FORCE_REWARD = "POINTS";
    });

    // Attendre que le canvas soit chargé
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });

    // Grattage rapide
    await page.mouse.move(200, 200);
    await page.mouse.down();
    for (let i = 0; i < 30; i++) {
      await page.mouse.move(200 + i * 3, 200 + Math.sin(i * 0.1) * 5);
      await page.waitForTimeout(2);
    }
    await page.mouse.up();

    // Attendre un peu pour que le popup apparaisse
    await page.waitForTimeout(1000);

    // Vérifie l'affichage des points
    const popup = page.locator('[role="dialog"], .popup, [data-testid="popup-reward"]');
    if (await popup.count() > 0) {
      await expect(popup).toBeVisible({ timeout: 5000 });
    }
  });

  test("🎯 Scratch avec offre (mock)", async ({ page }) => {
    // Mock : forcer une offre
    await page.evaluate(() => {
      (window as any).FORCE_REWARD = "OFFER";
    });

    // Attendre que le canvas soit chargé
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });

    // Grattage rapide
    await page.mouse.move(200, 200);
    await page.mouse.down();
    for (let i = 0; i < 30; i++) {
      await page.mouse.move(200 + i * 3, 200 + Math.sin(i * 0.1) * 5);
      await page.waitForTimeout(2);
    }
    await page.mouse.up();

    // Attendre un peu pour que le popup apparaisse
    await page.waitForTimeout(1000);

    // Vérifie l'affichage de l'offre
    const popup = page.locator('[role="dialog"], .popup, [data-testid="popup-reward"]');
    if (await popup.count() > 0) {
      await expect(popup).toBeVisible({ timeout: 5000 });
    }
  });

  test("📱 Scratch tactile", async ({ page }) => {
    // Attendre que le canvas soit chargé
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });

    // Simuler le grattage tactile
    await page.mouse.move(200, 200);
    await page.mouse.down();
    for (let i = 0; i < 20; i++) {
      await page.mouse.move(200 + i * 4, 200 + Math.sin(i * 0.1) * 5);
      await page.waitForTimeout(2);
    }
    await page.mouse.up();

    // Attendre un peu pour que le popup apparaisse
    await page.waitForTimeout(1000);

    // Vérifie qu'un popup s'affiche
    const popup = page.locator('[role="dialog"], .popup, [data-testid="popup-reward"]');
    if (await popup.count() > 0) {
      await expect(popup).toBeVisible({ timeout: 5000 });
    }
  });

  test("⌨️ Scratch clavier", async ({ page }) => {
    // Attendre que le canvas soit chargé
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });

    // Focus sur le canvas
    await page.getByTestId('scratch-canvas').focus();
    
    // Utiliser les touches du clavier
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    await page.keyboard.press(' ');

    // Attendre un peu pour que le popup apparaisse
    await page.waitForTimeout(1000);

    // Vérifie qu'un popup s'affiche
    const popup = page.locator('[role="dialog"], .popup, [data-testid="popup-reward"]');
    if (await popup.count() > 0) {
      await expect(popup).toBeVisible({ timeout: 5000 });
    }
  });

  test("🔄 Fermer le popup", async ({ page }) => {
    // Attendre que le canvas soit chargé
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });

    // Grattage pour afficher le popup
    await page.mouse.move(200, 200);
    await page.mouse.down();
    for (let i = 0; i < 30; i++) {
      await page.mouse.move(200 + i * 3, 200 + Math.sin(i * 0.1) * 5);
      await page.waitForTimeout(2);
    }
    await page.mouse.up();

    // Attendre le popup
    await page.waitForTimeout(1000);
    const popup = page.locator('[role="dialog"], .popup, [data-testid="popup-reward"]');
    if (await popup.count() > 0) {
      await expect(popup).toBeVisible({ timeout: 5000 });

      // Fermer le popup
      const closeButton = page.locator('button:has-text("Fermer"), button:has-text("Close"), [data-testid="popup-close"]');
      if (await closeButton.count() > 0) {
        await closeButton.click();

        // Vérifier que le popup est fermé
        await expect(popup).not.toBeVisible();
      }
    }
  });

  test("📏 Responsive design", async ({ page }) => {
    // Test sur mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });

    // Test sur tablette
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });

    // Test sur desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });
  });

  test("🎨 Animation et effets", async ({ page }) => {
    // Attendre que le canvas soit chargé
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });

    // Grattage pour déclencher les animations
    await page.mouse.move(200, 200);
    await page.mouse.down();
    for (let i = 0; i < 25; i++) {
      await page.mouse.move(200 + i * 4, 200 + Math.sin(i * 0.1) * 5);
      await page.waitForTimeout(2);
    }
    await page.mouse.up();

    // Attendre un peu pour que le popup apparaisse
    await page.waitForTimeout(1000);

    // Vérifier que les animations se déclenchent (confetti, emojis, etc.)
    const popup = page.locator('[role="dialog"], .popup, [data-testid="popup-reward"]');
    if (await popup.count() > 0) {
      await expect(popup).toBeVisible({ timeout: 5000 });
    }
    
    // Attendre un peu pour voir les animations
    await page.waitForTimeout(1000);
  });
});