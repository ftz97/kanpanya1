import { test, expect } from '@playwright/test';
import { TestHelpers } from './helpers/test-helpers';

test.describe('Accessibilité et UX', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    helpers.setupConsoleErrorHandling();
  });

  test('devrait avoir une navigation clavier fonctionnelle', async ({ page }) => {
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Test de navigation Tab
    await page.keyboard.press('Tab');
    const firstFocused = page.locator(':focus');
    await expect(firstFocused).toBeVisible();
    
    // Continuer la navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Vérifier qu'on peut naviguer sans erreur
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('devrait avoir des boutons avec des rôles appropriés', async ({ page }) => {
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Vérifier les boutons principaux
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      const role = await button.getAttribute('role');
      const type = await button.getAttribute('type');
      
      // Vérifier que les boutons ont un type ou un rôle approprié
      expect(role || type).toBeTruthy();
    }
  });

  test('devrait avoir des aria-labels sur les boutons icônes', async ({ page }) => {
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Chercher les boutons avec des icônes (sans texte visible)
    const iconButtons = page.locator('button:not(:has-text())');
    const iconButtonCount = await iconButtons.count();
    
    for (let i = 0; i < Math.min(iconButtonCount, 3); i++) {
      const button = iconButtons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const title = await button.getAttribute('title');
      
      // Au moins un des deux doit être présent
      expect(ariaLabel || title).toBeTruthy();
    }
  });

  test('devrait avoir des focus rings visibles', async ({ page }) => {
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Focus sur le premier bouton
    const firstButton = page.locator('button').first();
    if (await firstButton.isVisible()) {
      await firstButton.focus();
      
      // Vérifier qu'il y a un indicateur de focus
      const focusStyles = await firstButton.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          outline: styles.outline,
          boxShadow: styles.boxShadow,
          borderColor: styles.borderColor
        };
      });
      
      // Au moins un indicateur de focus doit être présent
      const hasFocusIndicator = 
        focusStyles.outline !== 'none' || 
        focusStyles.boxShadow !== 'none' || 
        focusStyles.borderColor !== 'transparent';
      
      expect(hasFocusIndicator).toBeTruthy();
    }
  });

  test('devrait gérer les modals avec Escape', async ({ page }) => {
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Essayer d'ouvrir un modal
    const mutuelleButton = page.locator('button:has-text("Mutuelle Locale"), [data-testid="mutuelle-button"], text=Mutuelle').first();
    if (await mutuelleButton.isVisible()) {
      await mutuelleButton.click();
      
      const modal = page.locator('[data-testid="video-modal"], .video-modal, [role="dialog"]').first();
      if (await modal.isVisible()) {
        // Tester la fermeture avec Escape
        await page.keyboard.press('Escape');
        await expect(modal).not.toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('devrait avoir des contrastes de couleurs appropriés', async ({ page }) => {
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Vérifier les éléments de texte principaux
    const textElements = page.locator('h1, h2, h3, p, button, a').first();
    if (await textElements.isVisible()) {
      const color = await textElements.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.color;
      });
      
      // Vérifier que le texte n'est pas transparent ou invisible
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
      expect(color).not.toBe('transparent');
    }
  });

  test('devrait avoir des tailles de police lisibles', async ({ page }) => {
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Vérifier la taille de police des éléments de texte
    const textElements = page.locator('p, span, div').first();
    if (await textElements.isVisible()) {
      const fontSize = await textElements.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return parseFloat(styles.fontSize);
      });
      
      // La taille de police doit être au moins 12px
      expect(fontSize).toBeGreaterThanOrEqual(12);
    }
  });

  test('devrait gérer les interactions tactiles sur mobile', async ({ page }) => {
    // Simuler un viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Vérifier que les boutons sont assez grands pour le tactile
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const button = buttons.nth(i);
      const box = await button.boundingBox();
      
      if (box) {
        // Les boutons doivent faire au moins 44x44px pour le tactile
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
