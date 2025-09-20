# 🚀 Bonnes Pratiques Supabase Auth - Production

## 🔒 Problèmes Courants & Solutions

### 1. **Cookies Absents en Production**
**Symptôme** : `sb-access-token` manquant
**Cause** : Mauvaise configuration Site URL / Redirect URLs dans Supabase
**Solution** :
- Vérifier `NEXT_PUBLIC_SITE_URL` dans `.env.local`
- Configurer `https://votre-domaine.com` dans Supabase Dashboard
- S'assurer que les Redirect URLs incluent `/auth/callback`

### 2. **403 Aléatoires**
**Symptômes** : Accès refusé de manière intermittente
**Causes possibles** :
- RLS sans policy adaptée (ex: `auth.uid() = user_id`)
- Session non lue côté serveur
**Solutions** :
```sql
-- Exemple de policy RLS correcte
CREATE POLICY "users_own_data" ON users
FOR ALL USING (auth.uid() = id);
```
- Utiliser `createServerClientSafe()` + `runtime = 'nodejs'`
- Éviter Edge Runtime pour les routes auth

### 3. **Problèmes de Cookies**
**Causes** :
- Mélange http/https
- Domaines différents (www vs apex)
- Configuration Secure/SameSite incorrecte
**Solutions** :
- Choisir un seul domaine (www OU apex)
- Rediriger l'autre côté DNS ou Vercel
- Vérifier les paramètres de cookies

## 🛡️ Sécurité

### **Open Redirect Protection**
```typescript
// ✅ CORRECT - Filtre vers chemins internes uniquement
const redirectTo = PROTECTED_PREFIXES.some(p => pathname.startsWith(p)) 
  ? pathname 
  : '/dashboard'

// ❌ DANGEREUX - Redirection vers URL externe
const redirectTo = searchParams.get('redirect') // Peut être malveillant
```

### **CORS Configuration**
```typescript
// ✅ CORRECT - Domaine spécifique
Access-Control-Allow-Origin: https://votre-domaine.com

// ❌ DANGEREUX - Tous domaines
Access-Control-Allow-Origin: *
```

## ⚡ Performance & Cache

### **Routes à ne PAS mettre en cache CDN** :
- `/auth/*` - Authentification
- `/api/supa-check` - Vérification session
- Toute route avec cookies sensibles

### **Configuration Vercel** :
```json
{
  "headers": [
    {
      "source": "/auth/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    }
  ]
}
```

## 📧 Emails & Magic Links

### **Configuration Production** :
- Vérifier DKIM/SPF pour éviter le spam
- Tester l'envoi d'emails
- Vérifier les logs Supabase

### **Variables d'environnement** :
```bash
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## 🧪 Testing E2E

### **Injection de Cookies** :
```typescript
// Injecte les 2 cookies essentiels
await context.addCookies([
  {
    name: 'sb-access-token',
    value: process.env.E2E_SB_ACCESS_TOKEN!,
    domain: hostname,
    path: '/',
    httpOnly: true,
    secure: false, // en local
    sameSite: 'Lax',
  },
  {
    name: 'sb-refresh-token',
    value: process.env.E2E_SB_REFRESH_TOKEN!,
    // ... autres propriétés
  },
]);
```

### **Commandes de Test** :
```bash
# Générer l'état authentifié
BASE_URL=http://localhost:3000 npx playwright codegen --save-storage=auth.json

# Lancer les tests
BASE_URL=http://localhost:3000 npx playwright test

# Test en mode visuel
BASE_URL=http://localhost:3000 npx playwright test --headed
```

## 🔍 Debugging

### **Vérifier les Cookies** :
```bash
# Dans le navigateur DevTools
document.cookie

# Vérifier les cookies Supabase
document.cookie.includes('sb-access-token')
```

### **Logs Supabase** :
- Dashboard Supabase → Logs
- Vérifier les tentatives d'authentification
- Identifier les erreurs de cookies

## 📋 Checklist Production

- [ ] `NEXT_PUBLIC_SITE_URL` configuré correctement
- [ ] Redirect URLs Supabase à jour
- [ ] RLS policies testées
- [ ] Cookies fonctionnent (httpOnly, Secure, SameSite)
- [ ] Pas de cache sur routes sensibles
- [ ] CORS configuré correctement
- [ ] Emails testés (DKIM/SPF)
- [ ] Tests E2E passent
- [ ] Middleware fonctionne
- [ ] Routes protégées sécurisées

---

**💡 Rappel** : L'authentification Supabase est robuste, mais la configuration est critique. Testez toujours en local avant de déployer !








