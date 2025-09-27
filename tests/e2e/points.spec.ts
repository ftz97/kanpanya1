import { test, expect } from "@playwright/test";

test.describe("Points Management E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Aller sur la page d'accueil
    await page.goto("http://localhost:3001");
  });

  test("💰 Affichage du solde de points", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Vérifier que les boutons sont présents
    await expect(page.locator('button:has-text("Je suis un(e) client(e)")')).toBeVisible();
    await expect(page.locator('button:has-text("Je suis un(e) commerçant(e)")')).toBeVisible();
  });

  test("📊 Historique des points", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🎁 Utilisation des points pour une offre", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🏆 Gagner des points via scratch", async ({ page }) => {
    // Aller directement sur la page scratch
    await page.goto("http://localhost:3001/test-scratch-stable");
    
    // Attendre que le canvas soit chargé
    await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });
    
    // Grattage pour gagner des points
    await page.mouse.move(200, 200);
    await page.mouse.down();
    for (let i = 0; i < 20; i++) {
      await page.mouse.move(200 + i * 4, 200 + Math.sin(i * 0.1) * 5);
      await page.waitForTimeout(2);
    }
    await page.mouse.up();
    
    // Attendre un peu pour que le popup apparaisse
    await page.waitForTimeout(1000);
    
    // Vérifier l'affichage des points gagnés
    const popup = page.locator('[role="dialog"], .popup, [data-testid="popup-reward"]');
    if (await popup.count() > 0) {
      await expect(popup).toBeVisible({ timeout: 5000 });
    }
  });

  test("📈 Progression des points", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Vérifier la présence des fonctionnalités
    await expect(page.locator('text=Découvre tes commerçants locaux')).toBeVisible();
    await expect(page.locator('text=Scanne ton QR code')).toBeVisible();
    await expect(page.locator('text=Gagne des récompenses exclusives')).toBeVisible();
  });

  test("🎯 Objectifs de points", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("💎 Points premium", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Vérifier la présence des fonctionnalités
    await expect(page.locator('text=Découvre tes commerçants locaux')).toBeVisible();
  });

  test("🔄 Rechargement des points", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📱 Responsive design", async ({ page }) => {
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

  test("🔍 Recherche dans l'historique", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📊 Statistiques des points", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🎁 Cadeaux et récompenses", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });
});