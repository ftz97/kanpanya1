// 🎁 Données Tombolas
export const tombolas = [
  { 
    title: "☕ Café offert", 
    desc: "10 gagnants cette semaine", 
    cta: "Jouer",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80&h=80&fit=crop",
    coordinates: { lat: 14.6105, lon: -61.0585 }
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

// 📰 Données Actus commerçants avec quiz
export const actus = [
  { 
    merchant: "L'Oréal Professionnel", 
    title: "💇‍♀️ Nouveaux produits coiffure", 
    desc: "Découvrez notre gamme professionnelle",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=80&h=80&fit=crop",
    coordinates: { lat: 14.6143, lon: -61.0621 },
    hasQuiz: true,
    quiz: {
      questions: [
        {
          question: "Quel est le meilleur moment pour se laver les cheveux ?",
          options: ["Tous les jours", "2-3 fois par semaine", "Une fois par mois", "Jamais"],
          correctIndex: 1,
          explanation: "2-3 fois par semaine permet de préserver les huiles naturelles !"
        },
        {
          question: "Quelle température d'eau pour le shampoing ?",
          options: ["Très chaude", "Tiède", "Froide", "N'importe laquelle"],
          correctIndex: 1,
          explanation: "L'eau tiède ouvre les cuticules sans les abîmer !"
        }
      ]
    }
  },
  { 
    merchant: "Coco Paradise", 
    title: "🥥 Eau de coco fraîche", 
    desc: "100% naturelle, directement de l'arbre",
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=80&h=80&fit=crop",
    coordinates: { lat: 14.6105, lon: -61.0585 },
    hasQuiz: true,
    quiz: {
      questions: [
        {
          question: "Quels sont les bienfaits de l'eau de coco ?",
          options: ["Hydratation", "Électrolytes", "Vitamines", "Tout ça"],
          correctIndex: 3,
          explanation: "L'eau de coco est riche en électrolytes, vitamines et hydrate naturellement !"
        },
        {
          question: "Quand boire de l'eau de coco ?",
          options: ["Le matin", "Après le sport", "Avant de dormir", "N'importe quand"],
          correctIndex: 1,
          explanation: "Après le sport, elle reconstitue parfaitement les minéraux perdus !"
        }
      ]
    }
  },
  { 
    merchant: "Schwarzkopf Professional", 
    title: "✨ Soins cheveux colorés", 
    desc: "Protégez votre couleur avec nos soins",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=80&h=80&fit=crop",
    coordinates: { lat: 14.5987, lon: -61.0692 }
  },
  { 
    merchant: "Boulangerie Artisanale", 
    title: "🥖 Pain complet dispo", 
    desc: "Cuit ce matin, encore chaud",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=80&h=80&fit=crop",
    coordinates: { lat: 14.6037, lon: -61.0731 }
  },
];

// 🔥 Données Bon plans flash
export const flashOffers = [
  { 
    title: "Happy Hour 14h-16h", 
    tag: "Flash",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80&h=80&fit=crop",
    coordinates: { lat: 14.6105, lon: -61.0585 }
  },
  { 
    title: "Légumes frais -30%", 
    tag: "Flash",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=250&fit=crop",
    logo: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=80&h=80&fit=crop",
    coordinates: { lat: 14.6143, lon: -61.0621 }
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

// 🎟️ Données Cartes de fidélité avec vraies marques
export const fidelityCards = [
  { 
    merchant: "L'Oréal Professionnel", 
    type: "purchases" as const, 
    goal: 8, 
    current: 5, 
    reward: "Soin cheveux offert",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=80&h=80&fit=crop",
    coordinates: { lat: 14.6037, lon: -61.0731 }
  },
  { 
    merchant: "Coco Paradise", 
    type: "purchases" as const, 
    goal: 6, 
    current: 4, 
    reward: "1 eau de coco offerte",
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=80&h=80&fit=crop",
    coordinates: { lat: 14.6105, lon: -61.0585 }
  },
  { 
    merchant: "Schwarzkopf Professional", 
    type: "amount" as const, 
    goal: 150, 
    current: 120, 
    reward: "15€ de réduction",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=80&h=80&fit=crop"
  },
  { 
    merchant: "Wella Professionals", 
    type: "purchases" as const, 
    goal: 5, 
    current: 3, 
    reward: "Masque cheveux offert",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=200&fit=crop",
    logo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=80&h=80&fit=crop"
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

