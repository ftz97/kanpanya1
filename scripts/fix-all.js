#!/usr/bin/env node
import fs from "fs";
import path from "path";

const SRC_DIR = path.resolve("src");

/* --------------------------
   1. Fix useEffect
-------------------------- */
function fixUseEffect(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const regex = /useEffect\(\s*\(\)\s*=>\s*{([\s\S]*?)}\s*,\s*\[\]\s*\)/g;

  let changed = false;
  content = content.replace(regex, (match, body) => {
    const calledFunctions = [...body.matchAll(/([a-zA-Z0-9_]+)\(/g)]
      .map((m) => m[1])
      .filter((fn) => !["console", "setState"].includes(fn));

    if (calledFunctions.length === 0) return match;
    changed = true;

    const callbacks = calledFunctions
      .map(
        (fn) =>
          `const stable${fn.charAt(0).toUpperCase() + fn.slice(1)} = useCallback(() => {
  ${fn}();
}, [${fn}]);`
      )
      .join("\n\n");

    const newEffect = `\n${callbacks}\n\nuseEffect(() => {\n  ${calledFunctions
      .map((fn) => `stable${fn.charAt(0).toUpperCase() + fn.slice(1)}();`)
      .join("\n  ")}\n}, [${calledFunctions
      .map((fn) => `stable${fn.charAt(0).toUpperCase() + fn.slice(1)}`)
      .join(", ")}]);`;

    return newEffect;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`🔧 useEffect corrigé : ${filePath}`);
  }
}

/* --------------------------
   2. Fix any → unknown
-------------------------- */
function fixAny(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const regex = /\bany\b/g;

  if (regex.test(content)) {
    const fixed = content.replace(regex, "unknown");
    fs.writeFileSync(filePath, fixed, "utf8");
    console.log(`🔧 any → unknown : ${filePath}`);
  }
}

/* --------------------------
   3. Fix <img> → <Image />
-------------------------- */
function fixImg(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  if (!content.includes("<img")) return;

  // Ajoute import Image si absent
  if (!content.includes('import Image from "next/image"')) {
    content = `import Image from "next/image";\n${content}`;
  }

  // Remplace les balises <img ... />
  content = content.replace(/<img([^>]*)\/?>/g, (match, attrs) => {
    return `<Image ${attrs} />`;
  });

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`🔧 <img> remplacé par <Image /> : ${filePath}`);
}

/* --------------------------
   4. Scanner tous les fichiers
-------------------------- */
function scanDir(dir) {
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      fixUseEffect(fullPath);
      fixAny(fullPath);
    }
  }
}

console.log("🚀 Lancement des corrections globales...");
scanDir(SRC_DIR);
console.log("🎉 Nettoyage terminé !");
