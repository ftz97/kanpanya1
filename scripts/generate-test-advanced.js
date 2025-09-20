#!/usr/bin/env node
import fs from "fs";
import path from "path";

// Récupérer les arguments
const args = process.argv.slice(2);
const input = args[0];
const withI18n = args.includes("--with-i18n");
const withAuth = args.includes("--with-auth");

if (!input) {
  console.error("❌ Merci de fournir un chemin, ex: /client/rewards");
  console.error("📝 Options disponibles :");
  console.error("   --with-i18n    Ajouter des tests de traduction");
  console.error("   --with-auth    Ajouter des tests d'authentification");
  process.exit(1);
}

// Normaliser chemin
const cleanPath = input.startsWith("/") ? input.slice(1) : input;
const parts = cleanPath.split("/");
const role = parts[0]; // ex: client
const pageName = parts[1] || "index"; // ex: rewards

// Dossier et fichier
const dir = path.join("tests", "e2e", role);
const file = path.join(dir, `${pageName}.spec.ts`);

// Créer dossier si besoin
fs.mkdirSync(dir, { recursive: true });

// Convertir camelCase → PascalCase pour les noms plus jolis
const toPascalCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

// Générer contenu test Playwright
const describeName = `Page ${role} - ${toPascalCase(pageName)}`;

let content = `import { test, expect } from "@playwright/test";

test.describe("${describeName}", () => {
  test.beforeEach(async ({ page }) => {
    page.on("console", msg => {
      if (msg.type() === "error") {
        throw new Error(\`Erreur console: \${msg.text()}\`);
      }
    });
  });

  test("la page se charge correctement", async ({ page }) => {
    await page.goto("/${cleanPath}");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("la page est responsive", async ({ page }) => {
    await page.goto("/${cleanPath}");
    
    // Test desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator("body")).toBeVisible();
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator("body")).toBeVisible();
  });

  test("navigation fonctionne", async ({ page }) => {
    await page.goto("/${cleanPath}");
    
    // Vérifier que les liens de navigation sont présents
    const navLinks = page.locator("nav a, header a");
    await expect(navLinks.first()).toBeVisible();
  });`;

// Ajouter tests i18n si demandé
if (withI18n) {
  content += `

  test("traductions françaises fonctionnent", async ({ page }) => {
    await page.goto("/${cleanPath}?lang=fr");
    await expect(page.locator("body")).toContainText("Kanpanya");
  });

  test("traductions anglaises fonctionnent", async ({ page }) => {
    await page.goto("/${cleanPath}?lang=en");
    await expect(page.locator("body")).toBeVisible();
  });`;
}

// Ajouter tests auth si demandé
if (withAuth) {
  content += `

  test("authentification requise", async ({ page }) => {
    await page.goto("/${cleanPath}");
    
    // Vérifier redirection vers login si non connecté
    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      await expect(page.locator("h1")).toContainText("Connexion");
    }
  });`;
}

content += `
});
`;

// Écrire fichier
fs.writeFileSync(file, content, "utf-8");
console.log(`✅ Test généré : ${file}`);
console.log(`📁 Dossier : ${dir}`);
console.log(`🎯 Page testée : /${cleanPath}`);
if (withI18n) console.log(`🌍 Avec tests i18n`);
if (withAuth) console.log(`🔐 Avec tests auth`);
console.log(`\n🚀 Pour lancer le test :`);
console.log(`   pnpm run test:e2e:dot -- ${file}`);
