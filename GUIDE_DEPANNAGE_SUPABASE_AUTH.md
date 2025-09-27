# 🔧 Guide de Dépannage Supabase Auth - Kanpanya

## 🚨 Problèmes Courants d'Authentification

### 1. ✅ Vérifier les Clés Supabase

#### Variables d'environnement requises
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://yichatlcuqmquazlmxrv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
```

#### ⚠️ Points d'attention
- **NE JAMAIS utiliser** `SUPABASE_SERVICE_ROLE_KEY` côté client
- **Utiliser UNIQUEMENT** l'`ANON_KEY` dans le frontend
- Vérifier que les variables commencent par `NEXT_PUBLIC_`

#### 🔍 Vérification dans le code
```typescript
// ✅ Correct - utilise l'anon key
export const supabaseEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
};

// ❌ Incorrect - service role key côté client
// process.env.SUPABASE_SERVICE_ROLE_KEY
```

### 2. 📧 Configuration Email dans Supabase

#### Dans Supabase Dashboard > Authentication > Providers > Email :

1. **Enable email signup** ✅ - Doit être activé
2. **Confirm email** ⚠️ - **DÉSACTIVER pour les tests**

#### 🚑 Problème : Compte non confirmé
Si `email_confirmed_at` est `null` dans `auth.users`, l'utilisateur ne peut pas se connecter.

**Solutions :**
- **Option 1** : Désactiver "Confirm email" dans Supabase (plus simple)
- **Option 2** : Recréer l'utilisateur avec confirmation désactivée

### 3. 🔐 Logique d'Authentification

#### Implémentation actuelle dans l'app
```typescript
// src/actions/auth.signin.ts
export function useSignIn() {
  const { supabase } = useSupa();
  
  return async function signIn(email: string, password: string) {
    if (!supabase) throw new Error("Supabase not initialized");
    
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) throw error; // "invalid_credentials" → toast i18n
    return data;
  };
}
```

#### 🧪 Test de connexion simple
```typescript
import { createBrowserSupabase } from '@/lib/supabase'

async function testLogin() {
  const supabase = createBrowserSupabase();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'test@example.com',
    password: 'Test1234!'
  });

  if (error) {
    console.error('Erreur connexion', error.message);
  } else {
    console.log('Utilisateur connecté', data.user);
  }
}
```

### 4. 🚑 Plan d'Action Rapide

#### Étape 1 : Vérifier l'utilisateur dans Supabase
```sql
-- Dans Supabase SQL Editor
SELECT 
  id, 
  email, 
  email_confirmed_at,
  created_at
FROM auth.users 
WHERE email = 'test@example.com';
```

#### Étape 2 : Diagnostic selon le résultat

**Si `email_confirmed_at` est `null` :**
- ❌ L'utilisateur ne peut jamais se connecter
- ✅ **Solution** : Désactiver "Confirm email" dans Supabase Dashboard

**Si l'utilisateur n'existe pas :**
- ✅ Créer un nouvel utilisateur avec confirmation désactivée

**Si tout semble correct :**
- 🔍 Vérifier les logs d'erreur dans la console
- 🔍 Tester avec un autre utilisateur

### 5. 🔧 Commandes de Test

#### Test API d'authentification
```bash
# Tester l'endpoint d'auth
curl -X POST http://localhost:3000/api/test-tokens \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"motdepassefort"}'
```

#### Test de session
```bash
# Vérifier la session actuelle
curl http://localhost:3000/api/auth/me
```

### 6. 📊 Configuration Actuelle du Projet

#### Clés utilisées ✅
- **URL** : `https://yichatlcuqmquazlmxrv.supabase.co`
- **Anon Key** : Configurée correctement
- **Service Role** : Utilisée uniquement côté serveur

#### Clients Supabase
- **Browser Client** : `src/lib/supabase.client.ts`
- **Server Client** : `src/lib/supabase.ts`
- **Custom Hook** : `src/lib/useSupa.ts`

#### Endpoints d'authentification
- **Login** : `src/app/login/page.tsx`
- **Callback** : `src/app/auth/callback/route.ts`
- **Session Check** : `src/app/api/auth/me/route.ts`
- **Test Tokens** : `src/app/api/test-tokens/route.ts`

### 7. 🎯 Checklist de Dépannage

- [ ] Variables d'environnement correctes (`NEXT_PUBLIC_SUPABASE_*`)
- [ ] Anon key utilisée (pas service role)
- [ ] Email signup activé dans Supabase
- [ ] Email confirmation **DÉSACTIVÉE** pour les tests
- [ ] Utilisateur existe dans `auth.users`
- [ ] `email_confirmed_at` n'est pas `null`
- [ ] Mot de passe correct
- [ ] Pas d'erreurs dans la console
- [ ] Test avec endpoint `/api/test-tokens`

### 8. 🚀 Commandes Utiles

```bash
# Redémarrer l'app après modification .env
pnpm dev

# Tester l'authentification
pnpm test:e2e:debug auth.spec.ts

# Vérifier les logs
pnpm dev --verbose
```

---

## 📞 Support

Si le problème persiste :
1. Vérifier les logs Supabase Dashboard > Logs
2. Tester avec un utilisateur fraîchement créé
3. Vérifier la configuration RLS (Row Level Security)
4. Contacter l'équipe de développement

**Status actuel** : ✅ Configuration validée - Auth fonctionnelle
