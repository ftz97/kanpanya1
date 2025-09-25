# 🚀 Onboarding Client Kanpanya - Mobile First

## 📱 Vue d'ensemble

L'onboarding client de Kanpanya est un parcours mobile-first complet qui guide les utilisateurs depuis l'inscription jusqu'au dashboard principal.

## 🎯 Flow utilisateur

### 1. **Page d'accueil** - `/`
- Logo Kanpanya centré avec icône smartphone
- Slogan : "Scanne, cumule, gagne !"
- Boutons d'action :
  - "Créer un compte" → `/signup`
  - "Se connecter" → `/login`
- Design : Gradient teal/emerald, mobile-first

### 2. **Création de compte** - `/signup`
- Formulaire mobile-first avec :
  - Prénom
  - Nom
  - Email
  - Mot de passe (min 6 caractères)
  - Checkbox CGU
- Intégration Supabase Auth
- Insertion automatique dans la table `clients`
- Redirection vers `/onboarding/qr-code`

### 3. **QR Code** - `/onboarding/qr-code`
- Génération QR code basé sur `user.id`
- Instructions claires pour l'utilisation
- Design avec card et icônes explicatives
- CTA "Continuer" → `/onboarding/preferences`

### 4. **Préférences** - `/onboarding/preferences`
- Switches pour 4 types de notifications :
  - 📣 Promotions
  - 🎥 Vidéos
  - ❓ Quiz
  - 🏆 Jeux concours
- Sauvegarde dans `clients_commercants.notifications` (JSONB)
- CTA "Enregistrer mes préférences" → `/dashboard`

### 5. **Dashboard Client** - `/dashboard`
- 3 sections principales :
  - 🎟 Mes points & tombolas
  - ❤️ Mes commerçants suivis
  - 🔔 Mes notifications
- FAB (Floating Action Button) turquoise avec icône `ScanLine`
- Actions rapides : Profil, Favoris

## 🛠️ Technologies utilisées

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS 4** (mobile-first)
- **Supabase** (Auth + Database)
- **shadcn/ui** (composants)
- **lucide-react** (icônes)
- **qrcode.react** (génération QR)

## 📊 Base de données

### Tables utilisées :
- `users` (auth Supabase)
- `clients` (infos utilisateur : prenom, nom, email, points)
- `clients_commercants.notifications` (JSONB avec préférences)
- `client_points` (points cumulés)

### Structure des notifications :
```json
{
  "promotions": true,
  "videos": true,
  "quiz": true,
  "jeux_concours": true,
  "avant_premiere": true
}
```

## 🎨 Design System

### Couleurs principales :
- **Primary** : `#14B8A6` (turquoise)
- **Background** : Gradient teal/emerald
- **Cards** : Blanc avec ombres douces
- **Text** : Gris foncé sur fond clair

### Composants :
- **Buttons** : Arrondis-xl, 100% largeur mobile
- **Cards** : Ombres douces, padding généreux
- **FAB** : Turquoise, position fixe bottom-right
- **Switches** : shadcn/ui avec couleurs personnalisées

## 📱 Responsive Design

- **Mobile-first** : Conçu pour mobile en priorité
- **Breakpoints** : sm, md, lg pour desktop
- **Touch-friendly** : Boutons 44px minimum
- **Navigation** : Simple et intuitive

## 🚀 Déploiement

L'application est déployée sur Vercel :
- **URL** : https://kanpanya1-cuhy9ahi1-ftz971s-projects.vercel.app
- **Build** : Automatique sur push
- **Runtime** : Node.js configuré sur toutes les routes API

## 🔧 Configuration

### Variables d'environnement :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Dépendances principales :
```json
{
  "next": "^15.5.2",
  "react": "^19.1.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^4.1.13",
  "@supabase/supabase-js": "^2.39.0",
  "qrcode.react": "^4.2.0",
  "@radix-ui/react-slot": "^1.0.2",
  "class-variance-authority": "^0.7.0"
}
```

## ✅ Fonctionnalités implémentées

- [x] Page d'accueil avec navigation
- [x] Inscription avec validation
- [x] Connexion utilisateur
- [x] Génération QR code unique
- [x] Gestion des préférences notifications
- [x] Dashboard avec FAB
- [x] Intégration Supabase complète
- [x] Design mobile-first responsive
- [x] Composants shadcn/ui
- [x] Déploiement Vercel

## 🎯 Prochaines étapes

- [ ] Scanner QR code (FAB)
- [ ] Gestion des commerçants favoris
- [ ] Système de points avancé
- [ ] Notifications push
- [ ] Tests E2E avec Playwright

---

**L'onboarding client Kanpanya est maintenant complet et fonctionnel ! 🎉**
