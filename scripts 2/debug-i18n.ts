import { createAsyncT } from "../src/i18n";

async function debugI18n() {
  console.log("🔍 Debug i18n system\n");

  try {
    const { t } = await createAsyncT("fr", ["common", "flashOffers"]);
    
    console.log("Testing individual keys:");
    console.log("flashOffers.title:", t("flashOffers.title"));
    console.log("common.forms.errors.required:", t("common.forms.errors.required"));
    
    // Test direct import
    console.log("\nDirect import test:");
    const frCommon = await import("../src/locales/fr/common.json");
    const frFlashOffers = await import("../src/locales/fr/flashOffers.json");
    
    console.log("fr/common.json:", JSON.stringify(frCommon.default, null, 2));
    console.log("fr/flashOffers.json:", JSON.stringify(frFlashOffers.default, null, 2));
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

debugI18n().catch(console.error);


