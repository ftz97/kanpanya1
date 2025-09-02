import fs from "node:fs";
import path from "node:path";

type Dict = Record<string, any>;

const ROOT = "src/locales";
const LOCALES = ["fr", "en", "es", "gcf"] as const;

// Blocs à injecter par locale
const PAYLOADS: Record<string, Dict> = {
  fr: {
    forms: { errors: {
      required: "Ce champ est obligatoire.",
      minChars: "Au moins {count} caractères.",
      maxChars: "Au plus {count} caractères.",
      nonNegative: "La valeur doit être positive ou nulle.",
      dateOrder: "La date de fin doit être après la date de début."
    }},
    api: { errors: {
      "offer.missing_title": "Le titre est requis.",
      "offer.missing_dates": "Les dates sont requises.",
      unknown: "Erreur inconnue."
    }}
  },
  en: {
    forms: { errors: {
      required: "This field is required.",
      minChars: "At least {count} characters.",
      maxChars: "At most {count} characters.",
      nonNegative: "The value must be zero or positive.",
      dateOrder: "End date must be after the start date."
    }},
    api: { errors: {
      "offer.missing_title": "Title is required.",
      "offer.missing_dates": "Dates are required.",
      unknown: "Unknown error."
    }}
  },
  es: {
    forms: { errors: {
      required: "Este campo es obligatorio.",
      minChars: "Al menos {count} caracteres.",
      maxChars: "Como máximo {count} caracteres.",
      nonNegative: "El valor debe ser positivo o cero.",
      dateOrder: "La fecha de fin debe ser posterior a la de inicio."
    }},
    api: { errors: {
      "offer.missing_title": "El título es obligatorio.",
      "offer.missing_dates": "Las fechas son obligatorias.",
      unknown: "Error desconocido."
    }}
  },
  gcf: {
    forms: { errors: {
      required: "Champs-tala obligatwa.",
      minChars: "Omwen {count} karaktè.",
      maxChars: "Oplis {count} karaktè pa posib.",
      nonNegative: "Valè-a dwèt pozitif ousinon zewo.",
      dateOrder: "Dat-la pou bout-la dwèt vini apré dat koumansman-an."
    }},
    api: { errors: {
      "offer.missing_title": "Tit-la obligatwa.",
      "offer.missing_dates": "Dat yo obligatwa.",
      unknown: "Erè enkoni."
    }}
  }
};

function deepMerge(target: Dict, src: Dict): Dict {
  for (const [k, v] of Object.entries(src)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      target[k] = deepMerge(target[k] ?? {}, v);
    } else {
      target[k] = v;
    }
  }
  return target;
}

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function sortObject(obj: Dict): Dict {
  // tri alphabétique superficiel pour lisibilité
  const sorted: Dict = {};
  for (const key of Object.keys(obj).sort()) {
    const v = obj[key];
    sorted[key] = (v && typeof v === "object" && !Array.isArray(v)) ? sortObject(v) : v;
  }
  return sorted;
}

const DRY = process.argv.includes("--dry-run");

for (const loc of LOCALES) {
  const dir = path.join(ROOT, loc);
  const file = path.join(dir, "common.json");
  ensureDir(dir);

  let json: Dict = {};
  if (fs.existsSync(file)) {
    try {
      json = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (e) {
      console.error(`❌ ${file}: JSON invalide.`);
      process.exit(1);
    }
  }

  const before = JSON.stringify(json);
  const merged = deepMerge({ ...json }, PAYLOADS[loc]);
  const after = JSON.stringify(merged);

  if (before === after) {
    console.log(`= ${file} (déjà à jour)`);
    continue;
  }

  const pretty = JSON.stringify(sortObject(merged), null, 2);

  if (DRY) {
    console.log(`~ ${file} (dry-run, aucune écriture)`);
  } else {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, file + ".bak");
    }
    fs.writeFileSync(file, pretty + "\n", "utf8");
    console.log(`✔ ${file} (mis à jour)`);
  }
}

console.log(DRY ? "🔎 Dry-run terminé." : "✅ Merge terminé.");


