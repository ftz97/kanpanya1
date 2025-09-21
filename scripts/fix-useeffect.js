#!/usr/bin/env node
import fs from "fs";
import path from "path";

const SRC_DIR = path.resolve("src");

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Cherche les useEffect avec dépendances vides mais appel de fonction
  const regex = /useEffect\(\s*\(\)\s*=>\s*{([\s\S]*?)}\s*,\s*\[\]\s*\)/g;

  let changed = false;
  content = content.replace(regex, (match, body) => {
    // Extrait les fonctions appelées dans le corps
    const calledFunctions = [...body.matchAll(/([a-zA-Z0-9_]+)\(/g)]
      .map((m) => m[1])
      .filter((fn) => !["console", "setState"].includes(fn));

    if (calledFunctions.length === 0) return match;

    changed = true;

    // Crée des useCallback stables pour chaque fonction
    const callbacks = calledFunctions
      .map(
        (fn) =>
          `const stable${fn.charAt(0).toUpperCase() + fn.slice(1)} = useCallback(() => {
  ${fn}();
}, [${fn}]);`
      )
      .join("\n\n");

    // Nouvelle version de useEffect avec dépendances correctes
    const newEffect = `\n${callbacks}\n\nuseEffect(() => {\n  ${calledFunctions
      .map((fn) => `stable${fn.charAt(0).toUpperCase() + fn.slice(1)}();`)
      .join("\n  ")}\n}, [${calledFunctions
      .map((fn) => `stable${fn.charAt(0).toUpperCase() + fn.slice(1)}`)
      .join(", ")}]);`;

    return newEffect;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Corrigé useEffect dans : ${filePath}`);
  }
}

function scanDir(dir) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith(".tsx")) {
      fixFile(fullPath);
    }
  }
}

console.log("🔎 Correction auto des useEffect...");
scanDir(SRC_DIR);
console.log("🎉 Correction terminée !");
