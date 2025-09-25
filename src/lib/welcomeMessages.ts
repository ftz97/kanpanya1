/* ---------------------------------------------
   💬 Messages de bienvenue dynamiques Kanpanya
   Personnalisés par prénom + heure de la journée
   Règles spéciales : Lundi 💪, Vendredi 🎉, Week-end 🛋️
---------------------------------------------- */

// 1. Tableau de messages
export const welcomeMessages = {
  morning: [
    "Bonjour {name} ☀️ Prête pour une nouvelle journée locale ?",
    "Salut {name} 👋 Ton premier café est peut-être déjà chez un commerçant 😉",
    "Réveil en douceur {name} 🌸 Profite des promos matinales !",
    "Bon début de semaine {name} 💪 Fais le plein d'énergie locale.",
    "Hello {name} 🌞 Et si tu commençais la journée par un ticket à gratter ? 🎟️",
    "Bienvenue {name} 🥐 Une boulangerie proche a une offre spéciale ce matin.",
    "Coucou {name} 🌱 Tu fais déjà partie des soutiens locaux aujourd'hui !",
    "Bon matin {name} ☕ Tu as encore X points bonus en attente.",
    "Content de te revoir {name} 🏬 Tes commerçants préférés t'attendent.",
    "Bonjour {name} 🌟 Ta progression est impressionnante cette semaine !",
  ],
  afternoon: [
    "Salut {name} 🌱 Prêt à gratter ton ticket aujourd'hui ? 🎟️",
    "Hey {name} 🔥 Une offre flash vient de tomber pour toi !",
    "Bienvenue de nouveau {name} 👋 As-tu déjà exploré la catégorie Beauté ? 💇‍♀️",
    "Yo {name} 😎 C'est l'heure de profiter des Happy Hours locales 🍹",
    "Super de te revoir {name} 🛍️ Encore quelques points et tu débloques un bonus.",
    "Hello {name} 🎯 As-tu vu les promos flash dispo cet aprèm ?",
    "Salut {name} 🍔 Ton resto préféré propose une offre limitée !",
    "Coucou {name} 🌿 Soutiens tes commerçants en deux clics aujourd'hui.",
    "Bienvenue {name} 💡 Découvre les nouvelles offres dans ta ville.",
    "Hey {name} 🚀 Tu es dans le Top 10% des utilisateurs actifs cette semaine !",
  ],
  evening: [
    "Bonne soirée {name} 🌙 Tu as encore 1 ticket à jouer aujourd'hui !",
    "Hey {name} 🌟 Et si tu terminais la journée avec une offre locale ?",
    "Bienvenue {name} ✨ Tes commerçants te réservent des surprises du soir.",
    "Bon retour {name} 🛋️ Détends-toi, tes points Kanpanya montent en flèche.",
    "Salut {name} 🎉 Bravo pour ton activité aujourd'hui, continue comme ça !",
    "Hey {name} 🍷 C'est l'heure des petites promos du soir, profites-en.",
    "Bonne fin de journée {name} 🌜 Encore X points avant ton prochain niveau.",
    "Content de te revoir {name} 🔔 Tu as de nouvelles notifications d'offres.",
    "Salut {name} 🌠 Ton commerçant préféré propose une promo spéciale ce soir.",
    "Bonne soirée {name} 🏆 Tu fais partie des meilleurs soutiens locaux !",
  ],
};

// 2. Fonction utilitaire
export function getWelcomeMessage(name: string): string {
  const date = new Date();
  const hour = date.getHours();
  const day = date.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 5 = Vendredi, 6 = Samedi

  let period: "morning" | "afternoon" | "evening";
  if (hour >= 7 && hour < 12) period = "morning";
  else if (hour >= 12 && hour < 19) period = "afternoon";
  else period = "evening";

  // 🎯 Sélection d'un message aléatoire
  const messages = welcomeMessages[period];
  let randomMessage = messages[Math.floor(Math.random() * messages.length)];

  // 💪 Motivation spéciale lundi
  if (day === 1) {
    randomMessage += " 💪 Commence ta semaine avec énergie !";
  }

  // 🎉 Ambiance spéciale vendredi
  if (day === 5) {
    randomMessage += " 🎉 Le week-end approche, profites-en !";
  }

  // 🛋️ Mode chill samedi & dimanche
  if (day === 6 || day === 0) {
    randomMessage += " 🛋️ Prends du temps pour toi et soutiens tes commerces en mode week-end 😎";
  }

  return randomMessage.replace("{name}", name);
}
