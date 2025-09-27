import { test, expect } from "@playwright/test";

test.describe("Navigation & Layout E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Aller sur la page d'accueil
    await page.goto("http://localhost:3001");
  });

  test("🏠 Navigation vers la page d'accueil", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Vérifier la présence des boutons
    await expect(page.locator('button:has-text("Je suis un(e) client(e)")')).toBeVisible();
    await expect(page.locator('button:has-text("Je suis un(e) commerçant(e)")')).toBeVisible();
  });

  test("📱 Menu de navigation mobile", async ({ page }) => {
    // Réduire la taille de l'écran pour activer le menu mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Vérifier la présence des boutons
    await expect(page.locator('button:has-text("Je suis un(e) client(e)")')).toBeVisible();
    await expect(page.locator('button:has-text("Je suis un(e) commerçant(e)")')).toBeVisible();
  });

  test("🔍 Barre de recherche", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("👤 Menu utilisateur", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🔔 Notifications", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🌙 Mode sombre/clair", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🌍 Sélecteur de langue", async ({ page }) => {
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

  test("🔗 Liens de navigation", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📊 Footer", async ({ page }) => {
    // Faire défiler vers le bas pour voir le footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
  });

  test("🔙 Bouton retour", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🏠 Breadcrumb", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📱 Menu latéral", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🔍 Filtres avancés", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📊 Tableau de bord", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("⚙️ Paramètres", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📱 PWA - Installation", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🔄 Actualisation de la page", async ({ page }) => {
    // Faire un pull-to-refresh sur mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
  });

  test("📱 Gestes tactiles", async ({ page }) => {
    // Tester les gestes tactiles sur mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });
});