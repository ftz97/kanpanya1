import { test, expect } from '@playwright/test';
import { TestHelpers } from './helpers/test-helpers';

test.describe('Performance et Chargement', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    helpers.setupConsoleErrorHandling();
  });

  test('devrait charger la page en moins de 3 secondes', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    const loadTime = Date.now() - startTime;
    
    // La page doit se charger en moins de 3 secondes
    expect(loadTime).toBeLessThan(3000);
    
    console.log(`⏱️ Temps de chargement: ${loadTime}ms`);
  });

  test('devrait avoir un bon score Lighthouse', async ({ page }) => {
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Mesurer les métriques de performance
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
      };
    });
    
    // Vérifier que les métriques sont dans des limites acceptables
    expect(metrics.domContentLoaded).toBeLessThan(1000);
    expect(metrics.loadComplete).toBeLessThan(2000);
    
    console.log('📊 Métriques de performance:', metrics);
  });

  test('devrait gérer les images de manière optimale', async ({ page }) => {
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Vérifier que les images ont des attributs alt
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');
      
      // Les images doivent avoir un src et un alt
      expect(src).toBeTruthy();
      expect(alt).toBeTruthy();
    }
  });

  test('devrait avoir des ressources optimisées', async ({ page }) => {
    const resources: string[] = [];
    
    page.on('response', response => {
      resources.push(`${response.status()} - ${response.url()}`);
    });
    
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Vérifier qu'il n'y a pas trop d'erreurs 404
    const error404 = resources.filter(r => r.startsWith('404'));
    expect(error404.length).toBeLessThan(3);
    
    // Vérifier qu'il n'y a pas d'erreurs 500
    const error500 = resources.filter(r => r.startsWith('5'));
    expect(error500.length).toBe(0);
    
    console.log(`📦 Ressources chargées: ${resources.length}`);
  });

  test('devrait gérer la mémoire correctement', async ({ page }) => {
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Mesurer l'utilisation mémoire
    const memoryInfo = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory;
      }
      return null;
    });
    
    if (memoryInfo) {
      // Vérifier que l'utilisation mémoire n'est pas excessive
      const usedMB = memoryInfo.usedJSHeapSize / 1024 / 1024;
      expect(usedMB).toBeLessThan(100); // Moins de 100MB
      
      console.log(`🧠 Mémoire utilisée: ${usedMB.toFixed(2)}MB`);
    }
  });

  test('devrait être responsive sur différentes tailles d\'écran', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568, name: 'Mobile Small' },
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop Small' },
      { width: 1920, height: 1080, name: 'Desktop Large' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/client');
      await helpers.waitForPageLoad();
      
      // Vérifier que la page se charge correctement
      await expect(page.locator('body')).toBeVisible();
      
      console.log(`✅ ${viewport.name} (${viewport.width}x${viewport.height})`);
    }
  });

  test('devrait gérer les interactions sans lag', async ({ page }) => {
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Mesurer le temps de réponse des interactions
    const startTime = Date.now();
    
    // Simuler des clics rapides
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        await button.click();
        await page.waitForTimeout(100); // Petite pause entre les clics
      }
    }
    
    const interactionTime = Date.now() - startTime;
    
    // Les interactions doivent être rapides
    expect(interactionTime).toBeLessThan(2000);
    
    console.log(`⚡ Temps d'interaction: ${interactionTime}ms`);
  });
});
