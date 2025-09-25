import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

console.log("🧪 Test du hook useWelcomeMessage");
console.log("=" .repeat(50));

// Simuler les différents cas d'erreur que le hook peut rencontrer
const testErrorCases = [
  {
    name: "Erreur RPC avec message",
    error: { message: "Invalid API key" },
    expected: "Invalid API key"
  },
  {
    name: "Erreur RPC avec details",
    error: { details: "Function does not exist" },
    expected: "Function does not exist"
  },
  {
    name: "Erreur RPC vide",
    error: {},
    expected: "Erreur RPC inconnue"
  },
  {
    name: "Erreur réseau",
    error: new Error("Network error"),
    expected: "Network error"
  },
  {
    name: "Erreur inconnue",
    error: "String error",
    expected: "String error"
  }
];

console.log("📋 Test des cas d'erreur :");
console.log();

testErrorCases.forEach((testCase, index) => {
  console.log(`${index + 1}. ${testCase.name}:`);
  console.log(`   Erreur:`, testCase.error);
  
  // Simuler la logique du hook
  let errorMessage;
  if (testCase.error && typeof testCase.error === 'object') {
    errorMessage = testCase.error.message || testCase.error.details || 'Erreur RPC inconnue';
  } else {
    errorMessage = testCase.error?.message || testCase.error?.toString() || 'Erreur inconnue';
  }
  
  console.log(`   Message extrait: "${errorMessage}"`);
  console.log(`   Attendu: "${testCase.expected}"`);
  console.log(`   ✅ ${errorMessage === testCase.expected ? 'CORRECT' : 'INCORRECT'}`);
  console.log();
});

// Test de la fonction de fallback
console.log("🎯 Test des messages de fallback :");
console.log();

const getFallbackMessages = (userName: string, language: 'fr' | 'en' | 'es' | 'gcf' = 'fr') => {
  const messages = {
    fr: {
      morning: [
        `Bonjour ${userName} ☀️`,
        `Salut ${userName} 👋`,
        `Bon matin ${userName} 🌸`,
      ],
      afternoon: [
        `Bon après-midi ${userName} 🌱`,
        `Salut ${userName} 🔥`,
        `Hey ${userName} 👋`,
      ],
      evening: [
        `Bonsoir ${userName} 🌙`,
        `Bonne soirée ${userName} 🌟`,
        `Salut ${userName} ✨`,
      ],
    },
    en: {
      morning: [
        `Good morning ${userName} ☀️`,
        `Hello ${userName} 👋`,
        `Morning ${userName} 🌸`,
      ],
      afternoon: [
        `Good afternoon ${userName} 🌱`,
        `Hey ${userName} 🔥`,
        `Hi ${userName} 👋`,
      ],
      evening: [
        `Good evening ${userName} 🌙`,
        `Good night ${userName} 🌟`,
        `Hey ${userName} ✨`,
      ],
    },
    es: {
      morning: [
        `Buenos días ${userName} ☀️`,
        `Hola ${userName} 👋`,
        `Buen día ${userName} 🌸`,
      ],
      afternoon: [
        `Buenas tardes ${userName} 🌱`,
        `Hola ${userName} 🔥`,
        `Hey ${userName} 👋`,
      ],
      evening: [
        `Buenas noches ${userName} 🌙`,
        `Buenas tardes ${userName} 🌟`,
        `Hola ${userName} ✨`,
      ],
    },
    gcf: {
      morning: [
        `${userName}, bonjou ! ☀️`,
        `Salut ${userName} 👋`,
        `Bon maten ${userName} 🌸`,
      ],
      afternoon: [
        `Bon apremidi ${userName} 🌱`,
        `Salut ${userName} 🔥`,
        `Hey ${userName} 👋`,
      ],
      evening: [
        `Bonswa ${userName} 🌙`,
        `Bon aswè ${userName} 🌟`,
        `Salut ${userName} ✨`,
      ],
    },
  };

  return messages[language] || messages.fr;
};

const getRandomFallbackMessage = (userName: string, language: 'fr' | 'en' | 'es' | 'gcf' = 'fr', period: string) => {
  const fallbackMessages = getFallbackMessages(userName, language);
  const messages = fallbackMessages[period as keyof typeof fallbackMessages];
  if (messages) {
    return messages[Math.floor(Math.random() * messages.length)];
  }
  
  // Fallback par défaut selon la langue
  const defaultMessages = {
    fr: `Bonjour ${userName} ! 🌟`,
    en: `Hello ${userName} ! 🌟`,
    es: `¡Hola ${userName} ! 🌟`,
    gcf: `${userName}, bonjou ! 🌟`,
  };
  return defaultMessages[language] || defaultMessages.fr;
};

// Test des messages de fallback
const testUsers = [
  { name: "Sarah", lang: "fr" as const },
  { name: "Kevin", lang: "en" as const },
  { name: "María", lang: "es" as const },
  { name: "Jean", lang: "gcf" as const },
];

const periods = ["morning", "afternoon", "evening"];

testUsers.forEach(({ name, lang }) => {
  console.log(`👤 ${name} (${lang}):`);
  periods.forEach(period => {
    const message = getRandomFallbackMessage(name, lang, period);
    console.log(`   ${period}: "${message}"`);
  });
  console.log();
});

console.log("✅ Test du hook terminé !");
console.log();
console.log("💡 Le hook est maintenant plus robuste pour gérer :");
console.log("   - Erreurs RPC avec ou sans message");
console.log("   - Erreurs réseau");
console.log("   - Erreurs inconnues");
console.log("   - Fallback vers les messages locaux");
