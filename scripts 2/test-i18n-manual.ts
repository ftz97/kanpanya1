import fs from "node:fs";
import path from "node:path";
import { createAsyncT } from "../src/i18n";

const LOCALES = ["fr", "en", "es", "gcf"] as const;

async function testTranslations() {
  console.log("🧪 Test manuel des traductions i18n\n");

  for (const locale of LOCALES) {
    console.log(`\n--- ${locale.toUpperCase()} ---`);
    
    try {
      const { t, tn } = await createAsyncT(locale, ["common", "flashOffers"]);
      
      // Test des clés principales
      console.log(`Page title: ${t("flashOffers.title")}`);
      console.log(`Form title: ${t("flashOffers.new.title")}`);
      console.log(`Submit button: ${t("flashOffers.new.submit")}`);
      
      // Test des erreurs de formulaire
      console.log(`Required error: ${t("common.forms.errors.required")}`);
      console.log(`Min chars (3): ${tn("common.forms.errors.minChars", 3)}`);
      console.log(`Max chars (120): ${tn("common.forms.errors.maxChars", 120)}`);
      console.log(`Non negative: ${t("common.forms.errors.nonNegative")}`);
      console.log(`Date order: ${t("common.forms.errors.dateOrder")}`);
      
      // Test des erreurs API
      console.log(`API missing title: ${t("common.api.errors.offer.missing_title")}`);
      console.log(`API missing dates: ${t("common.api.errors.offer.missing_dates")}`);
      console.log(`API unknown: ${t("common.api.errors.unknown")}`);
      
      // Test de pluralisation
      console.log(`1 offer: ${tn("common.list.offersCount", 1)}`);
      console.log(`3 offers: ${tn("common.list.offersCount", 3)}`);
      
    } catch (error) {
      console.error(`❌ Erreur pour ${locale}:`, error);
    }
  }
  
  console.log("\n✅ Test terminé");
}

testTranslations().catch(console.error);


