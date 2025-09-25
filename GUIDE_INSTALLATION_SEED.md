# 🌱 **Guide d'installation - Script de seed des messages de bienvenue**

Ce guide vous explique comment utiliser le script TypeScript pour insérer automatiquement les messages de bienvenue dans Supabase.

## 📋 **Prérequis**

1. **Script SQL exécuté** : Assurez-vous d'avoir exécuté `supabase-welcome-messages-rpc.sql` dans Supabase Dashboard
2. **Clés Supabase** : Avoir accès aux clés API de votre projet Supabase
3. **Variables d'environnement** : Configurer `.env.local`

## 🔧 **Configuration**

### 1. Créer le fichier `.env.local`

Créez un fichier `.env.local` à la racine du projet avec :

```bash
# Configuration Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_ici
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role_ici
```

### 2. Obtenir vos clés Supabase

1. **Allez sur** [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Sélectionnez** votre projet
3. **Allez dans** Settings → API
4. **Copiez** :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **Important** : La clé `service_role` est nécessaire pour permettre l'insertion massive de données.

## 🚀 **Utilisation**

### Méthode 1 : Script npm (recommandé)

```bash
# Installer les dépendances si nécessaire
pnpm install

# Exécuter le script de seed
pnpm run seed:welcome
```

### Méthode 2 : Exécution directe

```bash
# Avec tsx (recommandé)
npx tsx scripts/seedWelcomeMessages.ts

# Ou avec ts-node
npx ts-node scripts/seedWelcomeMessages.ts
```

## 📊 **Ce que fait le script**

1. **Vérifie** les variables d'environnement
2. **Se connecte** à Supabase avec la clé service_role
3. **Vérifie** si la table `welcome_messages` existe
4. **Supprime** les anciens messages (si présents)
5. **Insère** 36 nouveaux messages multilingues :
   - 🇫🇷 Français : 15 messages
   - 🇺🇸 Anglais : 9 messages  
   - 🇪🇸 Espagnol : 9 messages
   - 🇭🇹 Créole haïtien : 9 messages
6. **Affiche** un résumé par langue

## 🎯 **Messages insérés**

### Par période et langue :

| Période | Français | Anglais | Espagnol | Créole |
|---------|----------|---------|----------|--------|
| **Matin** | 5 messages | 3 messages | 3 messages | 3 messages |
| **Après-midi** | 5 messages | 3 messages | 3 messages | 3 messages |
| **Soir** | 5 messages | 3 messages | 3 messages | 3 messages |

### Exemples de messages :

- **Français** : "Bonjour {username} ☀️", "Salut {username} 👋"
- **Anglais** : "Good morning {username} ☀️", "Hello {username} 👋"
- **Espagnol** : "Buenos días {username} ☀️", "Hola {username} 👋"
- **Créole** : "{username}, bonjou ! ☀️", "Salut {username} 👋"

## ✅ **Vérification**

Après l'exécution du script, vous devriez voir :

```
✅ Messages insérés avec succès !
📊 36 messages ajoutés dans la base de données

📈 Résumé par langue :
  🇫🇷 fr: 15 messages
  🇺🇸 en: 9 messages
  🇪🇸 es: 9 messages
  🇭🇹 gcf: 9 messages

🎉 Vous pouvez maintenant tester avec :
   - Page de test : http://localhost:3000/test-welcome
   - Dashboard : http://localhost:3000/dashboard
```

## 🧪 **Test**

1. **Démarrez** le serveur de développement :
   ```bash
   pnpm dev
   ```

2. **Visitez** la page de test :
   ```
   http://localhost:3000/test-welcome
   ```

3. **Testez** différentes langues et prénoms

## ❌ **Dépannage**

### Erreur : "Variables d'environnement manquantes"
- Vérifiez que `.env.local` existe et contient les bonnes clés
- Assurez-vous que les noms des variables sont exacts

### Erreur : "Table 'welcome_messages' n'existe pas"
- Exécutez d'abord le script SQL `supabase-welcome-messages-rpc.sql`
- Vérifiez que la table a été créée dans Supabase Dashboard

### Erreur : "Permissions insuffisantes"
- Utilisez la clé `service_role` (pas `anon`)
- Vérifiez que la clé a les bonnes permissions dans Supabase

### Erreur : "Contraintes CHECK non respectées"
- Vérifiez que les valeurs `period` et `lang` sont valides
- Les périodes doivent être : `morning`, `afternoon`, `evening`
- Les langues doivent être : `fr`, `en`, `es`, `gcf`

## 🔄 **Réexécution**

Le script peut être réexécuté plusieurs fois :
- Il supprime automatiquement les anciens messages
- Il insère les nouveaux messages à chaque fois
- Parfait pour mettre à jour ou corriger les données

## 🎉 **Félicitations !**

Une fois le script exécuté avec succès, votre système de messages de bienvenue multilingues est opérationnel ! 

Vous pouvez maintenant :
- Tester avec `/test-welcome`
- Intégrer dans votre application avec le hook `useWelcomeMessage`
- Personnaliser les messages selon vos besoins
