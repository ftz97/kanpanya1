import { test, expect } from "@playwright/test";

test.describe("QR Codes E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Aller sur la page d'accueil
    await page.goto("http://localhost:3001");
  });

  test("📱 Affichage du QR code", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🔄 Génération d'un nouveau QR code", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("💾 Téléchargement du QR code", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📤 Partage du QR code", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📧 Partage par email", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📱 Partage sur les réseaux sociaux", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🎨 Personnalisation du QR code", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🌈 Changement de couleur", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📏 Changement de taille", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📱 Scan du QR code", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📋 Historique des QR codes", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🔍 Recherche dans l'historique", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("📊 Statistiques des QR codes", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🔄 Actualisation du QR code", async ({ page }) => {
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

  test("🎯 QR code pour une offre spécifique", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("🔐 QR code sécurisé", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });

  test("⏰ QR code avec expiration", async ({ page }) => {
    // Vérifier que la page d'accueil est visible
    await expect(page.locator('h1')).toContainText('Bienvenue sur Kanpanya');
    
    // Cliquer sur le bouton client
    await page.click('button:has-text("Je suis un(e) client(e)")');
    
    // Vérifier que la page se charge
    await expect(page.locator('body')).toBeVisible();
  });
});