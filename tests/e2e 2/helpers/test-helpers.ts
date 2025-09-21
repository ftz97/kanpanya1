import { Page, expect } from '@playwright/test';

/**
 * Helpers pour les tests E2E
 */
export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Configure la gestion des erreurs console
   */
  setupConsoleErrorHandling() {
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        throw new Error(`Console error: ${msg.text()}`);
      }
    });
  }

  /**
   * Attend que la page soit complètement chargée
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Vérifie qu'il n'y a pas d'erreurs JavaScript
   */
  async checkNoJavaScriptErrors() {
    const errors: string[] = [];
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await this.page.waitForTimeout(1000);
    expect(errors).toHaveLength(0);
  }

  /**
   * Trouve un élément par plusieurs sélecteurs possibles
   */
  async findElement(selectors: string[]) {
    for (const selector of selectors) {
      const element = this.page.locator(selector).first();
      if (await element.isVisible()) {
        return element;
      }
    }
    throw new Error(`Aucun élément trouvé avec les sélecteurs: ${selectors.join(', ')}`);
  }

  /**
   * Simule un grattage de carte
   */
  async simulateScratching(element: any) {
    await element.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(100, 100);
    await this.page.mouse.move(200, 200);
    await this.page.mouse.move(300, 300);
    await this.page.mouse.up();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Attend qu'un modal apparaisse
   */
  async waitForModal(selectors: string[], timeout = 10000) {
    const modal = await this.findElement(selectors);
    await expect(modal).toBeVisible({ timeout });
    return modal;
  }

  /**
   * Ferme un modal
   */
  async closeModal() {
    const closeSelectors = [
      'button[aria-label="Fermer"]',
      'button:has-text("Fermer")',
      '[data-testid="close-button"]',
      'button:has-text("×")',
      'button[aria-label="Close"]'
    ];
    
    const closeButton = await this.findElement(closeSelectors);
    await closeButton.click();
  }
}
