import { createAsyncT } from "../src/i18n";

async function debugI18nDetailed() {
  console.log("🔍 Debug i18n system - Detailed\n");

  try {
    // Test direct des imports
    console.log("1. Direct imports:");
    const frCommon = await import("../src/locales/fr/common.json");
    const frFlashOffers = await import("../src/locales/fr/flashOffers.json");
    
    console.log("frCommon:", Object.keys(frCommon.default));
    console.log("frFlashOffers:", Object.keys(frFlashOffers.default));
    
    // Test du merge manuel
    console.log("\n2. Manual merge test:");
    const merged = { ...frCommon.default, ...frFlashOffers.default };
    console.log("Merged keys:", Object.keys(merged));
    console.log("flashOffers.title:", (merged as any).flashOffers?.title);
    console.log("common.forms.errors.required:", (merged as any).common?.forms?.errors?.required);
    
    // Test de la fonction getPath
    console.log("\n3. getPath test:");
    function getPath(obj: any, path: string) {
      return path.split(".").reduce<any>((acc, k) => {
        if (acc && typeof acc === "object" && k in acc) {
          return acc[k];
        }
        return undefined;
      }, obj);
    }
    
    console.log("getPath(merged, 'flashOffers.title'):", getPath(merged, "flashOffers.title"));
    console.log("getPath(merged, 'common.forms.errors.required'):", getPath(merged, "common.forms.errors.required"));
    
    // Test du système complet
    console.log("\n4. Full system test:");
    const { t } = await createAsyncT("fr", ["common", "flashOffers"]);
    console.log("t('flashOffers.title'):", t("flashOffers.title"));
    console.log("t('common.forms.errors.required'):", t("common.forms.errors.required"));
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

debugI18nDetailed().catch(console.error);


