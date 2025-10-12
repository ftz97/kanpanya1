// 🎁 Données Tombolas
export const tombolas = [
  { 
    title: "☕ Café offert", 
    desc: "10 gagnants cette semaine", 
    cta: "Jouer",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80&h=80&fit=crop"
  },
  { 
    title: "🌸 Bouquet à gagner", 
    desc: "Offert par Fleuriste Antilles", 
    cta: "Participer",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=80&h=80&fit=crop"
  },
  { 
    title: "🥬 Panier garni bio", 
    desc: "Tirage vendredi", 
    cta: "Tenter ma chance",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=80&h=80&fit=crop"
  },
];

// 📰 Données Actus commerçants
export const actus = [
  { 
    merchant: "Épicerie Bio", 
    title: "🌱 Nouveaux fruits locaux", 
    desc: "Mangez frais, achetez pays",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&h=80&fit=crop"
  },
  { 
    merchant: "Café du Coin", 
    title: "🎶 Soirée Jazz vendredi", 
    desc: "Ambiance live dès 20h",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop"
  },
  { 
    merchant: "Fleuriste Antilles", 
    title: "💐 Atelier bouquet samedi", 
    desc: "Apprenez à composer le vôtre",
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=80&h=80&fit=crop"
  },
  { 
    merchant: "Boulangerie Artisanale", 
    title: "🥖 Pain complet dispo", 
    desc: "Cuit ce matin, encore chaud",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=80&h=80&fit=crop"
  },
];

// 🔥 Données Bon plans flash
export const flashOffers = [
  { 
    title: "Happy Hour 14h-16h", 
    tag: "Flash",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80&h=80&fit=crop"
  },
  { 
    title: "Légumes frais -30%", 
    tag: "Flash",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=80&h=80&fit=crop"
  },
  { 
    title: "Parapharmacie -15%", 
    tag: "Flash",
    image: "https://images.unsplash.com/photo-1556229162-6fbc3e09c20e?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=80&h=80&fit=crop"
  },
  { 
    title: "Boulangerie -20%", 
    tag: "Flash",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop"
  },
  { 
    title: "Épicerie Bio -25%", 
    tag: "Flash",
    image: "https://images.unsplash.com/photo-1628102491629-778571d893a3?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&h=80&fit=crop"
  },
  { 
    title: "Café du coin -10%", 
    tag: "Flash",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop"
  },
];

// 🎟️ Données Cartes de fidélité
export const fidelityCards = [
  { 
    merchant: "🥖 Boulangerie", 
    type: "purchases" as const, 
    goal: 10, 
    current: 7, 
    reward: "1 pain gratuit",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=80&h=80&fit=crop"
  },
  { 
    merchant: "☕ Café du Coin", 
    type: "purchases" as const, 
    goal: 5, 
    current: 3, 
    reward: "1 café offert",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80&h=80&fit=crop"
  },
  { 
    merchant: "🛒 Supermarché Local", 
    type: "amount" as const, 
    goal: 250, 
    current: 150, 
    reward: "10€ offerts",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=80&h=80&fit=crop"
  },
  { 
    merchant: "💐 Fleuriste", 
    type: "amount" as const, 
    goal: 100, 
    current: 75, 
    reward: "5€ offerts",
    image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=400&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=80&h=80&fit=crop"
  },
];

// 📂 Catégories
export const categories = [
  { 
    icon: "🍔", 
    name: "Restauration",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop"
  },
  { 
    icon: "💇‍♀️", 
    name: "Beauté",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=250&fit=crop"
  },
  { 
    icon: "👗", 
    name: "Mode",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=250&fit=crop"
  },
  { 
    icon: "🎉", 
    name: "Loisirs",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop"
  },
  { 
    icon: "🛒", 
    name: "Alimentation",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop"
  },
  { 
    icon: "💊", 
    name: "Santé",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop"
  },
];

// 📊 Statistiques
export const stats = [
  { icon: "🏬", number: "89", label: "Commerçants" },
  { icon: "👥", number: "1,247", label: "Utilisateurs" },
  { icon: "🎁", number: "156", label: "Offres actives" },
  { icon: "⭐", number: "4.8", label: "Note moyenne" },
];

