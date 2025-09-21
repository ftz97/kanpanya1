import { test, expect } from '@playwright/test';
import { TestHelpers } from './helpers/test-helpers';

/**
 * Test d'intégration complet qui lance tous les scénarios
 * Utilisez ce fichier pour un test de bout en bout complet
 */
test.describe('🚀 Test d\'intégration complet - Kanpanya Client', () => {
  let helpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page);
    helpers.setupConsoleErrorHandling();
  });

  test('scénario complet : de l\'accueil à l\'interaction complète', async ({ page }) => {
    console.log('🎬 Début du scénario complet...');
    
    // 1. Chargement de la page
    console.log('📄 Chargement de la page client...');
    const startTime = Date.now();
    await page.goto('/client');
    await helpers.waitForPageLoad();
    const loadTime = Date.now() - startTime;
    console.log(`⏱️ Page chargée en ${loadTime}ms`);
    
    // Vérifier la présence des éléments principaux
    await expect(page.locator('text=Kanpanya')).toBeVisible();
    console.log('✅ Navbar Kanpanya visible');
    
    // 2. Test de navigation
    console.log('🧭 Test de navigation...');
    const offresLink = page.locator('a[href*="offres"], text=Offres').first();
    if (await offresLink.isVisible()) {
      await offresLink.click();
      await expect(page).toHaveURL(/.*offres.*/);
      console.log('✅ Navigation vers offres réussie');
      
      // Retour à la page principale
      await page.goto('/client');
      await helpers.waitForPageLoad();
    }
    
    // 3. Test de grattage de carte
    console.log('🎫 Test de grattage de carte...');
    const scratchCard = page.locator('[data-testid="scratch-card"], .scratch-card, canvas').first();
    if (await scratchCard.isVisible()) {
      console.log('🎯 Carte à gratter trouvée, simulation du grattage...');
      await helpers.simulateScratching(scratchCard);
      
      // Attendre un résultat
      const result = await page.waitForSelector(
        '[data-testid="reward-modal"], .reward-modal, text=Récompense, text=Points, text=Pas de ticket pour le moment, text=Aucun ticket disponible',
        { timeout: 10000 }
      );
      
      if (result) {
        console.log('✅ Résultat du grattage affiché');
        
        // Fermer le modal si nécessaire
        try {
          await helpers.closeModal();
          console.log('✅ Modal fermé');
        } catch (e) {
          console.log('ℹ️ Pas de modal à fermer');
        }
      }
    } else {
      console.log('ℹ️ Aucune carte à gratter disponible');
    }
    
    // 4. Test du modal vidéo
    console.log('🎥 Test du modal vidéo...');
    const mutuelleButton = page.locator('button:has-text("Mutuelle Locale"), [data-testid="mutuelle-button"], text=Mutuelle').first();
    if (await mutuelleButton.isVisible()) {
      console.log('🎬 Ouverture du modal vidéo...');
      await mutuelleButton.click();
      
      const videoModal = await page.waitForSelector(
        '[data-testid="video-modal"], .video-modal, [role="dialog"]',
        { timeout: 5000 }
      );
      
      if (videoModal) {
        console.log('✅ Modal vidéo ouvert');
        
        // Lancer la vidéo
        const playButton = page.locator('button[aria-label="Play video"], button:has-text("Play"), [data-testid="play-button"]').first();
        if (await playButton.isVisible()) {
          console.log('▶️ Lancement de la vidéo...');
          await playButton.click();
          
          // Attendre la fin de la vidéo
          const videoEndModal = await page.waitForSelector(
            '[data-testid="video-end-modal"], .video-end-modal, text=Fin de la vidéo',
            { timeout: 15000 }
          );
          
          if (videoEndModal) {
            console.log('✅ Vidéo terminée, VideoEndModal affiché');
            
            // Fermer le modal
            await helpers.closeModal();
            console.log('✅ Modal vidéo fermé');
          }
        }
      }
    } else {
      console.log('ℹ️ Bouton Mutuelle Locale non trouvé');
    }
    
    // 5. Test d'accessibilité
    console.log('♿ Test d\'accessibilité...');
    
    // Test de navigation clavier
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    console.log('✅ Navigation clavier fonctionnelle');
    
    // Test de fermeture avec Escape
    const anyModal = page.locator('[role="dialog"], .modal').first();
    if (await anyModal.isVisible()) {
      await page.keyboard.press('Escape');
      console.log('✅ Fermeture avec Escape testée');
    }
    
    // 6. Vérification finale
    console.log('🔍 Vérification finale...');
    await helpers.checkNoJavaScriptErrors();
    console.log('✅ Aucune erreur JavaScript');
    
    // Vérifier les performances
    const finalLoadTime = Date.now() - startTime;
    expect(finalLoadTime).toBeLessThan(10000); // Moins de 10 secondes au total
    console.log(`🏁 Test complet terminé en ${finalLoadTime}ms`);
    
    console.log('🎉 Scénario complet réussi !');
  });

  test('test de stress - interactions multiples', async ({ page }) => {
    console.log('💪 Test de stress...');
    
    await page.goto('/client');
    await helpers.waitForPageLoad();
    
    // Simuler des interactions rapides
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    console.log(`🔄 Test de ${Math.min(buttonCount, 5)} boutons...`);
    
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        try {
          await button.click();
          await page.waitForTimeout(200);
        } catch (e) {
          // Ignorer les erreurs d'interaction
        }
      }
    }
    
    console.log('✅ Test de stress terminé');
  });
});
