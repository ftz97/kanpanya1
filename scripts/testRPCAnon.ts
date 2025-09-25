import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

// Configuration Supabase avec clé anon (publique)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Variables d'environnement manquantes :");
  console.error("- NEXT_PUBLIC_SUPABASE_URL:", !!supabaseUrl);
  console.error("- NEXT_PUBLIC_SUPABASE_ANON_KEY:", !!supabaseAnonKey);
  console.error("\n💡 Assurez-vous que ces variables sont définies dans .env.local");
  process.exit(1);
}

const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

async function testRPC() {
  console.log("🧪 Test de la fonction RPC avec clé anon (publique)");
  console.log("=" .repeat(60));
  
  const testCases = [
    { username: "Sarah", lang: "fr", description: "🇫🇷 Français" },
    { username: "Kevin", lang: "en", description: "🇺🇸 Anglais" },
    { username: "María", lang: "es", description: "🇪🇸 Espagnol" },
    { username: "Jean", lang: "gcf", description: "🇭🇹 Créole haïtien" },
  ];

  for (const testCase of testCases) {
    console.log(`\n🎯 Test ${testCase.description} :`);
    console.log(`   Utilisateur: ${testCase.username}`);
    console.log(`   Langue: ${testCase.lang}`);
    
    try {
      const { data, error } = await supabaseAnon.rpc("get_random_welcome_message", {
        username: testCase.username,
        lang_input: testCase.lang,
      });

      if (error) {
        console.error(`   ❌ Erreur RPC :`, error.message);
        
        // Analyser le type d'erreur
        if (error.message.includes("Invalid API key")) {
          console.error(`   💡 Vérifiez que votre clé anon est correcte`);
        } else if (error.message.includes("function") && error.message.includes("does not exist")) {
          console.error(`   💡 La fonction RPC n'existe pas encore. Exécutez le script SQL d'abord.`);
        } else if (error.message.includes("permission denied")) {
          console.error(`   💡 Permissions insuffisantes. Vérifiez les permissions de la fonction RPC.`);
        }
      } else {
        console.log(`   ✅ Message reçu :`, data);
        if (data && data.length > 0) {
          console.log(`   📝 Message personnalisé : "${data[0].message}"`);
        }
      }
    } catch (err: any) {
      console.error(`   💥 Erreur inattendue :`, err.message);
    }
  }

  // Test avec un nom vide
  console.log(`\n🎯 Test cas limite (nom vide) :`);
  try {
    const { data, error } = await supabaseAnon.rpc("get_random_welcome_message", {
      username: "",
      lang_input: "fr",
    });

    if (error) {
      console.error(`   ❌ Erreur attendue :`, error.message);
    } else {
      console.log(`   ✅ Message avec nom vide :`, data);
    }
  } catch (err: any) {
    console.error(`   💥 Erreur inattendue :`, err.message);
  }

  // Test avec une langue invalide
  console.log(`\n🎯 Test cas limite (langue invalide) :`);
  try {
    const { data, error } = await supabaseAnon.rpc("get_random_welcome_message", {
      username: "Test",
      lang_input: "invalid_lang",
    });

    if (error) {
      console.error(`   ❌ Erreur attendue :`, error.message);
    } else {
      console.log(`   ✅ Message avec langue invalide :`, data);
    }
  } catch (err: any) {
    console.error(`   💥 Erreur inattendue :`, err.message);
  }

  console.log(`\n🏁 Test terminé !`);
  console.log(`\n💡 Si vous voyez des erreurs :`);
  console.log(`   1. Vérifiez que le script SQL a été exécuté dans Supabase`);
  console.log(`   2. Vérifiez que vos clés sont correctes dans .env.local`);
  console.log(`   3. Vérifiez que la fonction RPC a les bonnes permissions`);
}

// Exécuter le test
testRPC()
  .then(() => {
    console.log("\n✅ Script de test terminé.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Erreur fatale :", error);
    process.exit(1);
  });
