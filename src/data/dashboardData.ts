// 🎁 Données Tombolas
export const tombolas = [
  { title: "☕ Café offert", desc: "10 gagnants cette semaine", cta: "Jouer" },
  { title: "🌸 Bouquet à gagner", desc: "Offert par Fleuriste Antilles", cta: "Participer" },
  { title: "🥬 Panier garni bio", desc: "Tirage vendredi", cta: "Tenter ma chance" },
];

// 📰 Données Actus commerçants
export const actus = [
  { merchant: "Épicerie Bio", title: "🌱 Nouveaux fruits locaux", desc: "Mangez frais, achetez pays" },
  { merchant: "Café du Coin", title: "🎶 Soirée Jazz vendredi", desc: "Ambiance live dès 20h" },
  { merchant: "Fleuriste Antilles", title: "💐 Atelier bouquet samedi", desc: "Apprenez à composer le vôtre" },
  { merchant: "Boulangerie Artisanale", title: "🥖 Pain complet dispo", desc: "Cuit ce matin, encore chaud" },
];

// 🔥 Données Bon plans flash
export const flashOffers = [
  { title: "Happy Hour 14h-16h", tag: "Flash" },
  { title: "Légumes frais -30%", tag: "Flash" },
  { title: "Parapharmacie -15%", tag: "Flash" },
  { title: "Boulangerie -20%", tag: "Flash" },
  { title: "Épicerie Bio -25%", tag: "Flash" },
  { title: "Café du coin -10%", tag: "Flash" },
];

// 🎟️ Données Cartes de fidélité
export const fidelityCards = [
  { merchant: "🥖 Boulangerie", type: "purchases" as const, goal: 10, current: 7, reward: "1 pain gratuit" },
  { merchant: "☕ Café du Coin", type: "purchases" as const, goal: 5, current: 3, reward: "1 café offert" },
  { merchant: "🛒 Supermarché Local", type: "amount" as const, goal: 250, current: 150, reward: "10€ offerts" },
  { merchant: "💐 Fleuriste", type: "amount" as const, goal: 100, current: 75, reward: "5€ offerts" },
];

// 📂 Catégories
export const categories = [
  { icon: "🍔", name: "Restauration" },
  { icon: "💇‍♀️", name: "Beauté" },
  { icon: "👗", name: "Mode" },
  { icon: "🎉", name: "Loisirs" },
  { icon: "🛒", name: "Alimentation" },
  { icon: "💊", name: "Santé" },
];

// 📊 Statistiques
export const stats = [
  { icon: "🏬", number: "89", label: "Commerçants" },
  { icon: "👥", number: "1,247", label: "Utilisateurs" },
  { icon: "🎁", number: "156", label: "Offres actives" },
  { icon: "⭐", number: "4.8", label: "Note moyenne" },
];

