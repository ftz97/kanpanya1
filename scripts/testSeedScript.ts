import { createClient } from "@supabase/supabase-js";

// Script de test pour démontrer le fonctionnement sans vraies clés Supabase
console.log("🧪 Test du script de seed des messages de bienvenue");
console.log("=" .repeat(60));

// Simuler les messages qui seraient insérés
const messages = [
  // 🇫🇷 Français - Matin
  { period: "morning", lang: "fr", message_template: "Bonjour {username} ☀️", emoji: "☀️" },
  { period: "morning", lang: "fr", message_template: "Salut {username} 👋", emoji: "👋" },
  { period: "morning", lang: "fr", message_template: "Bon matin {username} 🌸", emoji: "🌸" },

  // 🇺🇸 Anglais - Matin
  { period: "morning", lang: "en", message_template: "Good morning {username} ☀️", emoji: "☀️" },
  { period: "morning", lang: "en", message_template: "Hello {username} 👋", emoji: "👋" },

  // 🇪🇸 Espagnol - Matin
  { period: "morning", lang: "es", message_template: "Buenos días {username} ☀️", emoji: "☀️" },
  { period: "morning", lang: "es", message_template: "Hola {username} 👋", emoji: "👋" },

  // 🇭🇹 Créole haïtien - Matin
  { period: "morning", lang: "gcf", message_template: "{username}, bonjou ! ☀️", emoji: "☀️" },
  { period: "morning", lang: "gcf", message_template: "Salut {username} 👋", emoji: "👋" },

  // 🇫🇷 Français - Après-midi
  { period: "afternoon", lang: "fr", message_template: "Bon après-midi {username} 🌱", emoji: "🌱" },
  { period: "afternoon", lang: "fr", message_template: "Salut {username} 🔥", emoji: "🔥" },

  // 🇺🇸 Anglais - Après-midi
  { period: "afternoon", lang: "en", message_template: "Good afternoon {username} 🌱", emoji: "🌱" },
  { period: "afternoon", lang: "en", message_template: "Hey {username} 🔥", emoji: "🔥" },

  // 🇪🇸 Espagnol - Après-midi
  { period: "afternoon", lang: "es", message_template: "Buenas tardes {username} 🌱", emoji: "🌱" },
  { period: "afternoon", lang: "es", message_template: "Hola {username} 🔥", emoji: "🔥" },

  // 🇭🇹 Créole haïtien - Après-midi
  { period: "afternoon", lang: "gcf", message_template: "Bon apremidi {username} 🌱", emoji: "🌱" },
  { period: "afternoon", lang: "gcf", message_template: "Salut {username} 🔥", emoji: "🔥" },

  // 🇫🇷 Français - Soir
  { period: "evening", lang: "fr", message_template: "Bonsoir {username} 🌙", emoji: "🌙" },
  { period: "evening", lang: "fr", message_template: "Bonne soirée {username} 🌟", emoji: "🌟" },

  // 🇺🇸 Anglais - Soir
  { period: "evening", lang: "en", message_template: "Good evening {username} 🌙", emoji: "🌙" },
  { period: "evening", lang: "en", message_template: "Good night {username} 🌟", emoji: "🌟" },

  // 🇪🇸 Espagnol - Soir
  { period: "evening", lang: "es", message_template: "Buenas noches {username} 🌙", emoji: "🌙" },
  { period: "evening", lang: "es", message_template: "Buenas tardes {username} 🌟", emoji: "🌟" },

  // 🇭🇹 Créole haïtien - Soir
  { period: "evening", lang: "gcf", message_template: "Bonswa {username} 🌙", emoji: "🌙" },
  { period: "evening", lang: "gcf", message_template: "Bon aswè {username} 🌟", emoji: "🌟" },
];

console.log(`📝 ${messages.length} messages prêts à être insérés :`);
console.log();

// Afficher un résumé par langue
const summary = messages.reduce((acc, msg) => {
  acc[msg.lang] = (acc[msg.lang] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log("📈 Résumé par langue :");
Object.entries(summary).forEach(([lang, count]) => {
  const flag = {
    fr: "🇫🇷",
    en: "🇺🇸", 
    es: "🇪🇸",
    gcf: "🇭🇹"
  }[lang] || "🌍";
  console.log(`  ${flag} ${lang}: ${count} messages`);
});

console.log();

// Afficher quelques exemples
console.log("🎯 Exemples de messages :");
console.log();

const examples = [
  { lang: "fr", period: "morning", name: "Sarah" },
  { lang: "en", period: "afternoon", name: "Kevin" },
  { lang: "es", period: "evening", name: "María" },
  { lang: "gcf", period: "morning", name: "Jean" },
];

examples.forEach(({ lang, period, name }) => {
  const message = messages.find(m => m.lang === lang && m.period === period);
  if (message) {
    const personalizedMessage = message.message_template.replace('{username}', name);
    const flag = {
      fr: "🇫🇷",
      en: "🇺🇸", 
      es: "🇪🇸",
      gcf: "🇭🇹"
    }[lang] || "🌍";
    console.log(`  ${flag} ${lang} (${period}): "${personalizedMessage}"`);
  }
});

console.log();
console.log("🚀 Pour utiliser ce script avec de vraies données :");
console.log("1. Configurez vos clés Supabase dans .env.local");
console.log("2. Exécutez le script SQL dans Supabase Dashboard");
console.log("3. Lancez : pnpm run seed:welcome");
console.log();
console.log("✅ Script de test terminé !");
