// scripts/clean-duplicates.js
const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

const SRC_DIR = path.resolve("src");

// Trouve tous les fichiers qui finissent par " 2.ts" ou " 2.tsx"
const files = glob.sync(`${SRC_DIR}/**/* 2.@(ts|tsx)`);

files.forEach((file) => {
  const dir = path.dirname(file);
  const ext = path.extname(file);
  const base = path.basename(file, ext);

  // Nouveau nom sans " 2"
  const newBase = base.replace(/ 2$/, "");
  const newFile = path.join(dir, newBase + ext);

  console.log(`🔄 Renommage: ${file} → ${newFile}`);
  fs.renameSync(file, newFile);

  // Met à jour les imports dans tout le projet
  const allFiles = glob.sync(`${SRC_DIR}/**/*.{ts,tsx}`);
  allFiles.forEach((f) => {
    let content = fs.readFileSync(f, "utf8");
    const relativeOld = path.relative(path.dirname(f), file).replace(/\\/g, "/").replace(ext, "");
    const relativeNew = path.relative(path.dirname(f), newFile).replace(/\\/g, "/").replace(ext, "");

    if (content.includes(relativeOld)) {
      console.log(`   ✏️ Mise à jour import dans ${f}`);
      content = content.replace(new RegExp(relativeOld, "g"), relativeNew);
      fs.writeFileSync(f, content, "utf8");
    }
  });
});

console.log("✅ Nettoyage terminé !");
