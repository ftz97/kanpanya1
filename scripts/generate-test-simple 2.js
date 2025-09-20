#!/usr/bin/env node
import fs from "fs";
import path from "path";

// Récupérer l'argument (ex: /client/rewards)
const input = process.argv[2];
if (!input) {
  console.error("❌ Merci de fournir un chemin, ex: /client/rewards");
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

// Générer joli nom
const describeName = `Page ${role} - ${toPascalCase(pageName)}`;

// Générer contenu test Playwright basique
const content = `import { test, expect } from "@playwright/test";

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
});
`;

// Écrire fichier
fs.writeFileSync(file, content, "utf-8");
console.log(`✅ Test généré : ${file}`);

// Sauvegarder le chemin du dernier test
fs.writeFileSync(".last-test", file, "utf-8");
console.log(`📝 Chemin sauvegardé dans .last-test`);
