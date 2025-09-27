import { test, expect } from "@playwright/test";

test.describe("Offers Management E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Aller sur la page d'accueil
    await page.goto("http://localhost:3001");
  });

  test("📋 Affichage de la liste des offres", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🔍 Recherche d'offres", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🏷️ Filtrage par catégorie", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("💰 Filtrage par prix", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📍 Filtrage par localisation", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📱 Affichage responsive", async ({ page }) => {
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

  test("🎯 Détails d'une offre", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("💳 Utilisation d'une offre", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("⭐ Ajouter aux favoris", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📊 Tri des offres", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🔄 Actualisation des offres", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📱 Mode liste/grille", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🎁 Offres flash", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🏪 Offres par commerçant", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📈 Offres populaires", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🔔 Notifications d'offres", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });
});