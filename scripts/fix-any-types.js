#!/usr/bin/env node
import fs from "fs";
import path from "path";

const SRC_DIR = path.resolve("src");

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Regex simple pour remplacer "any" par "unknown"
  const regex = /\bany\b/g;
  if (!regex.test(content)) return;

  const fixed = content.replace(regex, "unknown");
  fs.writeFileSync(filePath, fixed, "utf8");
  console.log(`✅ Corrigé : ${filePath}`);
}

function scanDir(dir) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      fixFile(fullPath);
    }
  }
}

console.log("🔎 Remplacement global des 'any' par 'unknown'...");
scanDir(SRC_DIR);
console.log("🎉 Correction terminée !");

