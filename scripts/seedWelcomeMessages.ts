import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

// ⚠️ Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Variables d'environnement manquantes :");
  console.error("- NEXT_PUBLIC_SUPABASE_URL:", !!supabaseUrl);
  console.error("- SUPABASE_SERVICE_ROLE_KEY:", !!supabaseServiceKey);
  console.error("\n💡 Assurez-vous que ces variables sont définies dans .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedWelcomeMessages() {
  console.log("🌱 Début de l'insertion des messages de bienvenue...");
  
  const messages = [
    // 🇫🇷 Français - Matin
    { period: "morning", lang: "fr", message_template: "Bonjour {username} ☀️", emoji: "☀️" },
    { period: "morning", lang: "fr", message_template: "Salut {username} 👋", emoji: "👋" },
    { period: "morning", lang: "fr", message_template: "Bon matin {username} 🌸", emoji: "🌸" },
    { period: "morning", lang: "fr", message_template: "Hello {username} 🌞", emoji: "🌞" },
    { period: "morning", lang: "fr", message_template: "Coucou {username} 🌱", emoji: "🌱" },

    // 🇺🇸 Anglais - Matin
    { period: "morning", lang: "en", message_template: "Good morning {username} ☀️", emoji: "☀️" },
    { period: "morning", lang: "en", message_template: "Hello {username} 👋", emoji: "👋" },
    { period: "morning", lang: "en", message_template: "Morning {username} 🌸", emoji: "🌸" },

    // 🇪🇸 Espagnol - Matin
    { period: "morning", lang: "es", message_template: "Buenos días {username} ☀️", emoji: "☀️" },
    { period: "morning", lang: "es", message_template: "Hola {username} 👋", emoji: "👋" },
    { period: "morning", lang: "es", message_template: "Buen día {username} 🌸", emoji: "🌸" },

    // 🇭🇹 Créole haïtien - Matin
    { period: "morning", lang: "gcf", message_template: "{username}, bonjou ! ☀️", emoji: "☀️" },
    { period: "morning", lang: "gcf", message_template: "Salut {username} 👋", emoji: "👋" },
    { period: "morning", lang: "gcf", message_template: "Bon maten {username} 🌸", emoji: "🌸" },

    // 🇫🇷 Français - Après-midi
    { period: "afternoon", lang: "fr", message_template: "Bon après-midi {username} 🌱", emoji: "🌱" },
    { period: "afternoon", lang: "fr", message_template: "Salut {username} 🔥", emoji: "🔥" },
    { period: "afternoon", lang: "fr", message_template: "Hey {username} 👋", emoji: "👋" },
    { period: "afternoon", lang: "fr", message_template: "Yo {username} 😎", emoji: "😎" },
    { period: "afternoon", lang: "fr", message_template: "Coucou {username} 🛍️", emoji: "🛍️" },

    // 🇺🇸 Anglais - Après-midi
    { period: "afternoon", lang: "en", message_template: "Good afternoon {username} 🌱", emoji: "🌱" },
    { period: "afternoon", lang: "en", message_template: "Hey {username} 🔥", emoji: "🔥" },
    { period: "afternoon", lang: "en", message_template: "Hi {username} 👋", emoji: "👋" },

    // 🇪🇸 Espagnol - Après-midi
    { period: "afternoon", lang: "es", message_template: "Buenas tardes {username} 🌱", emoji: "🌱" },
    { period: "afternoon", lang: "es", message_template: "Hola {username} 🔥", emoji: "🔥" },
    { period: "afternoon", lang: "es", message_template: "Hey {username} 👋", emoji: "👋" },

    // 🇭🇹 Créole haïtien - Après-midi
    { period: "afternoon", lang: "gcf", message_template: "Bon apremidi {username} 🌱", emoji: "🌱" },
    { period: "afternoon", lang: "gcf", message_template: "Salut {username} 🔥", emoji: "🔥" },
    { period: "afternoon", lang: "gcf", message_template: "Hey {username} 👋", emoji: "👋" },

    // 🇫🇷 Français - Soir
    { period: "evening", lang: "fr", message_template: "Bonsoir {username} 🌙", emoji: "🌙" },
    { period: "evening", lang: "fr", message_template: "Bonne soirée {username} 🌟", emoji: "🌟" },
    { period: "evening", lang: "fr", message_template: "Salut {username} ✨", emoji: "✨" },
    { period: "evening", lang: "fr", message_template: "Hey {username} 🛋️", emoji: "🛋️" },
    { period: "evening", lang: "fr", message_template: "Coucou {username} 🎉", emoji: "🎉" },

    // 🇺🇸 Anglais - Soir
    { period: "evening", lang: "en", message_template: "Good evening {username} 🌙", emoji: "🌙" },
    { period: "evening", lang: "en", message_template: "Good night {username} 🌟", emoji: "🌟" },
    { period: "evening", lang: "en", message_template: "Hey {username} ✨", emoji: "✨" },

    // 🇪🇸 Espagnol - Soir
    { period: "evening", lang: "es", message_template: "Buenas noches {username} 🌙", emoji: "🌙" },
    { period: "evening", lang: "es", message_template: "Buenas tardes {username} 🌟", emoji: "🌟" },
    { period: "evening", lang: "es", message_template: "Hola {username} ✨", emoji: "✨" },

    // 🇭🇹 Créole haïtien - Soir
    { period: "evening", lang: "gcf", message_template: "Bonswa {username} 🌙", emoji: "🌙" },
    { period: "evening", lang: "gcf", message_template: "Bon aswè {username} 🌟", emoji: "🌟" },
    { period: "evening", lang: "gcf", message_template: "Salut {username} ✨", emoji: "✨" },
  ];

  try {
    // Vérifier d'abord si la table existe et a des données
    const { data: existingData, error: checkError } = await supabase
      .from("welcome_messages")
      .select("id")
      .limit(1);

    if (checkError) {
      console.error("❌ Erreur lors de la vérification de la table :", checkError);
      console.error("\n💡 Assurez-vous que :");
      console.error("1. La table 'welcome_messages' existe dans Supabase");
      console.error("2. Le script SQL a été exécuté");
      console.error("3. Les permissions sont correctes");
      return;
    }

    if (existingData && existingData.length > 0) {
      console.log("⚠️  La table contient déjà des données.");
      console.log("🔄 Suppression des anciens messages...");
      
      const { error: deleteError } = await supabase
        .from("welcome_messages")
        .delete()
        .neq("id", 0); // Supprimer tous les enregistrements

      if (deleteError) {
        console.error("❌ Erreur lors de la suppression :", deleteError);
        return;
      }
      
      console.log("✅ Anciens messages supprimés.");
    }

    // Insérer les nouveaux messages
    console.log(`📝 Insertion de ${messages.length} messages...`);
    
    const { data, error } = await supabase
      .from("welcome_messages")
      .insert(messages);

    if (error) {
      console.error("❌ Erreur lors de l'insertion :", error);
      console.error("\n💡 Vérifiez que :");
      console.error("1. La table 'welcome_messages' a les bonnes colonnes");
      console.error("2. Les contraintes CHECK sont respectées");
      console.error("3. La clé service_role a les bonnes permissions");
    } else {
      console.log("✅ Messages insérés avec succès !");
      console.log(`📊 ${messages.length} messages ajoutés dans la base de données`);
      
      // Afficher un résumé par langue
      const summary = messages.reduce((acc, msg) => {
        acc[msg.lang] = (acc[msg.lang] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log("\n📈 Résumé par langue :");
      Object.entries(summary).forEach(([lang, count]) => {
        const flag = {
          fr: "🇫🇷",
          en: "🇺🇸", 
          es: "🇪🇸",
          gcf: "🇭🇹"
        }[lang] || "🌍";
        console.log(`  ${flag} ${lang}: ${count} messages`);
      });
      
      console.log("\n🎉 Vous pouvez maintenant tester avec :");
      console.log("   - Page de test : http://localhost:3000/test-welcome");
      console.log("   - Dashboard : http://localhost:3000/dashboard");
    }
  } catch (err: any) {
    console.error("❌ Erreur inattendue :", err.message);
  }
}

// Exécuter le script
seedWelcomeMessages()
  .then(() => {
    console.log("\n🏁 Script terminé.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Erreur fatale :", error);
    process.exit(1);
  });
