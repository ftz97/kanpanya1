import { Page, expect } from '@playwright/test';

/**
 * Helper pour gratter et révéler le popup
 * Utilise le carré complet de grattage pour une meilleure couverture
 */
export async function scratchAndReveal(page: Page, intensity: 'light' | 'medium' | 'heavy' = 'medium') {
  const canvas = page.getByTestId('scratch-canvas');
  await expect(canvas).toBeVisible({ timeout: 5000 });

  // Obtenir les dimensions du canvas
  const canvasBox = await canvas.boundingBox();
  if (!canvasBox) {
    throw new Error('Canvas not found or not visible');
  }

  // Configurations selon l'intensité - optimisé pour Firefox/WebKit
  const configs = {
    light: { 
      iterations: 20, 
      stepX: Math.floor(canvasBox.width / 20), 
      stepY: Math.floor(canvasBox.height / 20),
      startX: Math.floor(canvasBox.width * 0.1),
      startY: Math.floor(canvasBox.height * 0.1)
    },
    medium: { 
      iterations: 40, 
      stepX: Math.floor(canvasBox.width / 40), 
      stepY: Math.floor(canvasBox.height / 40),
      startX: Math.floor(canvasBox.width * 0.05),
      startY: Math.floor(canvasBox.height * 0.05)
    },
    heavy: { 
      iterations: 80, 
      stepX: Math.floor(canvasBox.width / 80), 
      stepY: Math.floor(canvasBox.height / 80),
      startX: Math.floor(canvasBox.width * 0.02),
      startY: Math.floor(canvasBox.height * 0.02)
    }
  };

  const config = configs[intensity];

  // Gratter intensivement pour déclencher le popup - utiliser mouse events
  await page.mouse.move(config.startX, config.startY);
  await page.mouse.down();
  
  // Simuler un grattage en grille pour une meilleure couverture
  for (let i = 0; i < config.iterations; i++) {
    const row = Math.floor(i / Math.sqrt(config.iterations));
    const col = i % Math.floor(Math.sqrt(config.iterations));
    
    const x = config.startX + (col * config.stepX);
    const y = config.startY + (row * config.stepY);
    
    await page.mouse.move(x, y);
    
    // Petite pause pour Firefox/WebKit
    if (i % 10 === 0) {
      await page.waitForTimeout(10);
    }
  }
  
  await page.mouse.up();

  // Attendre que le popup apparaisse
  await expect(page.getByTestId('popup-reward')).toBeVisible({ timeout: 10000 });
  
  return {
    canvas,
    popup: page.getByTestId('popup-reward'),
    closeButton: page.getByTestId('popup-close')
  };
}

/**
 * Helper pour simuler le grattage tactile
 */
export async function scratchWithTouch(page: Page, viewport: { width: number; height: number } = { width: 375, height: 667 }) {
  await page.setViewportSize(viewport);
  
  const canvas = page.getByTestId('scratch-canvas');
  await expect(canvas).toBeVisible({ timeout: 5000 });

  // Simuler un mouvement tactile avec pointer events
  await canvas.dispatchEvent('pointerdown', {
    pointerId: 1,
    clientX: 100,
    clientY: 100,
    pointerType: 'touch'
  });
  
  // Simuler un mouvement de grattage tactile
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

  return canvas;
}

/**
 * Helper pour vérifier le comportement mobile (pas de scroll)
 */
export async function testMobileScrollBehavior(page: Page) {
  await page.setViewportSize({ width: 375, height: 667 });
  
  const canvas = page.getByTestId('scratch-canvas');
  await expect(canvas).toBeVisible({ timeout: 5000 });
  
  const initialScrollY = await page.evaluate(() => window.scrollY);
  
  // Simuler un mouvement tactile qui pourrait causer un scroll
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
  
  return canvas;
}

/**
 * Helper pour tester l'accessibilité clavier
 */
export async function testKeyboardAccessibility(page: Page) {
  const canvas = page.getByTestId('scratch-canvas');
  await expect(canvas).toBeVisible({ timeout: 5000 });
  
  // Vérifier que le canvas est focusable
  await canvas.focus();
  await expect(canvas).toBeFocused({ timeout: 5000 });
  
  // Simuler une pression sur Entrée ou Espace
  await page.keyboard.press('Enter');
  
  // Vérifier que quelque chose se passe (le canvas reste visible)
  await expect(canvas).toBeVisible({ timeout: 5000 });
  
  return canvas;
}

/**
 * Helper pour vérifier les performances de chargement
 */
export async function testPageLoadPerformance(page: Page, url: string, maxLoadTime: number = 5000) {
  const startTime = Date.now();
  
  await page.goto(url);
  await expect(page.getByTestId('scratch-canvas')).toBeVisible({ timeout: 5000 });
  
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(maxLoadTime);
  
  return loadTime;
}

/**
 * Helper pour forcer un Golden Ticket (pour les tests)
 * Utilise window pour les mocks côté client
 */
export async function forceGoldenTicket(page: Page) {
  // Définir les variables window pour TEST_MODE
  await page.addInitScript(() => {
    (window as any).FORCE_REWARD = 'golden';
  });

  // Recharger la page pour appliquer le mock
  await page.reload();
  
  const canvas = page.getByTestId('scratch-canvas');
  await expect(canvas).toBeVisible({ timeout: 5000 });
  
  return canvas;
}

/**
 * Helper pour forcer une récompense spécifique (pour les tests)
 */
export async function forceReward(page: Page, rewardType: 'golden' | 'points' | 'lose') {
  // Définir les variables window pour TEST_MODE
  await page.addInitScript(() => {
    (window as any).FORCE_REWARD = rewardType;
  });

  // Recharger la page pour appliquer le mock
  await page.reload();
  
  const canvas = page.getByTestId('scratch-canvas');
  await expect(canvas).toBeVisible({ timeout: 5000 });
  
  return canvas;
}
