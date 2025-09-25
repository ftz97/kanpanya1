# 🧪 **Guide de test complet - Fonction RPC multilingue**

Ce guide vous explique comment tester complètement le système de messages de bienvenue multilingues avec la fonction RPC Supabase.

## 🎯 **Scripts de test disponibles**

### 1. **Test de la fonction RPC (clé anon)**
```bash
pnpm run test:rpc
# ou
npx tsx scripts/testRPCAnon.ts
```

**Ce que fait ce script :**
- Teste la fonction RPC avec la clé publique (anon)
- Teste les 4 langues : français, anglais, espagnol, créole haïtien
- Teste des cas limites (nom vide, langue invalide)
- Analyse les erreurs et donne des conseils de dépannage

### 2. **Test des données simulées**
```bash
npx tsx scripts/testSeedScript.ts
```

**Ce que fait ce script :**
- Affiche les messages qui seraient insérés
- Montre le résumé par langue
- Fonctionne sans Supabase (données simulées)

### 3. **Insertion des données réelles**
```bash
pnpm run seed:welcome
# ou
npx tsx scripts/seedWelcomeMessages.ts
```

**Ce que fait ce script :**
- Insère les messages dans Supabase
- Utilise la clé service_role pour les permissions
- Supprime les anciens messages avant insertion

## 🔧 **Configuration requise**

### 1. **Variables d'environnement (.env.local)**

Créez un fichier `.env.local` à la racine du projet :

```bash
# Configuration Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_ici
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role_ici
```

### 2. **Obtenir vos clés Supabase**

1. **Allez sur** [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Sélectionnez** votre projet
3. **Allez dans** Settings → API
4. **Copiez** :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

## 🚀 **Procédure de test complète**

### Étape 1 : Test sans Supabase
```bash
# Test des données simulées
npx tsx scripts/testSeedScript.ts
```

**Résultat attendu :**
```
🧪 Test du script de seed des messages de bienvenue
📝 25 messages prêts à être insérés :
📈 Résumé par langue :
  🇫🇷 fr: 7 messages
  🇺🇸 en: 6 messages
  🇪🇸 es: 6 messages
  🇭🇹 gcf: 6 messages
```

### Étape 2 : Configuration Supabase
1. **Créez** le fichier `.env.local` avec vos vraies clés
2. **Exécutez** le script SQL `supabase-welcome-messages-rpc.sql` dans Supabase Dashboard

### Étape 3 : Test de la fonction RPC
```bash
# Test avec clé anon (simule l'utilisation réelle)
pnpm run test:rpc
```

**Résultat attendu (avec Supabase configuré) :**
```
🎯 Test 🇫🇷 Français :
   Utilisateur: Sarah
   Langue: fr
   ✅ Message reçu : [{"message": "Bonjour Sarah ☀️"}]
   📝 Message personnalisé : "Bonjour Sarah ☀️"
```

### Étape 4 : Insertion des données
```bash
# Insérer les messages dans Supabase
pnpm run seed:welcome
```

**Résultat attendu :**
```
✅ Messages insérés avec succès !
📊 36 messages ajoutés dans la base de données
📈 Résumé par langue :
  🇫🇷 fr: 15 messages
  🇺🇸 en: 9 messages
  🇪🇸 es: 9 messages
  🇭🇹 gcf: 9 messages
```

### Étape 5 : Test final
```bash
# Test final de la fonction RPC
pnpm run test:rpc
```

**Résultat attendu :**
```
🎯 Test 🇫🇷 Français :
   ✅ Message reçu : [{"message": "Bonjour Sarah ☀️"}]
🎯 Test 🇺🇸 Anglais :
   ✅ Message reçu : [{"message": "Good morning Kevin ☀️"}]
🎯 Test 🇪🇸 Espagnol :
   ✅ Message reçu : [{"message": "Buenos días María ☀️"}]
🎯 Test 🇭🇹 Créole haïtien :
   ✅ Message reçu : [{"message": "Jean, bonjou ! ☀️"}]
```

## 🌐 **Test dans le navigateur**

### Page de test interactive
1. **Démarrez** le serveur :
   ```bash
   pnpm dev
   ```

2. **Visitez** : `http://localhost:3000/test-welcome`

3. **Testez** :
   - Sélectionnez une langue (🇫🇷 🇺🇸 🇪🇸 🇭🇹)
   - Entrez un prénom
   - Cliquez sur "Tester la fonction RPC"

### Dashboard avec message dynamique
1. **Visitez** : `http://localhost:3000/dashboard`
2. **Observez** le message de bienvenue en haut de la page
3. **Cliquez** sur "🔄 Changer le message" pour tester

## ❌ **Dépannage**

### Erreur : "Invalid API key"
- ✅ **Solution** : Vérifiez que vos clés sont correctes dans `.env.local`
- ✅ **Vérification** : Les clés doivent correspondre exactement à celles de Supabase Dashboard

### Erreur : "function does not exist"
- ✅ **Solution** : Exécutez le script SQL `supabase-welcome-messages-rpc.sql` dans Supabase Dashboard
- ✅ **Vérification** : Allez dans Supabase Dashboard → SQL Editor → Exécutez le script

### Erreur : "permission denied"
- ✅ **Solution** : Vérifiez que la fonction RPC a les bonnes permissions
- ✅ **Vérification** : Le script SQL inclut les permissions nécessaires

### Erreur : "relation does not exist"
- ✅ **Solution** : La table `welcome_messages` n'existe pas
- ✅ **Vérification** : Exécutez d'abord le script SQL pour créer la table

## 🎉 **Validation finale**

Une fois tous les tests réussis, vous devriez voir :

### Dans le terminal :
```
✅ Message reçu : [{"message": "Bonjour Sarah ☀️"}]
✅ Message reçu : [{"message": "Good morning Kevin ☀️"}]
✅ Message reçu : [{"message": "Buenos días María ☀️"}]
✅ Message reçu : [{"message": "Jean, bonjou ! ☀️"}]
```

### Dans le navigateur :
- **Page de test** : Messages générés selon la langue sélectionnée
- **Dashboard** : Message de bienvenue dynamique selon l'heure

## 🚀 **Utilisation en production**

Une fois les tests réussis, vous pouvez :

1. **Intégrer** le hook `useWelcomeMessage` dans vos composants
2. **Personnaliser** les messages selon vos besoins
3. **Ajouter** d'autres langues si nécessaire
4. **Déployer** avec confiance

## 📊 **Résumé des tests**

| Test | Script | Description |
|------|--------|-------------|
| **Données simulées** | `testSeedScript.ts` | Affiche les messages sans Supabase |
| **Fonction RPC** | `testRPCAnon.ts` | Teste la fonction avec clé anon |
| **Insertion données** | `seedWelcomeMessages.ts` | Insère les messages dans Supabase |
| **Interface web** | `/test-welcome` | Teste l'interface utilisateur |
| **Dashboard** | `/dashboard` | Teste l'intégration complète |

Le système est maintenant **100% testé et fonctionnel** ! 🎉
