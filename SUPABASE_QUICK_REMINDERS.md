# 🚀 Rappels Éclair Supabase - Anti-Galères

## **🔧 Runtime & Cookies (évite les 403 fantômes)**

✅ **Tous ces fichiers ont `export const runtime = 'nodejs'`** :
- `src/app/auth/callback/route.ts` ✅
- `src/app/login/send/route.ts` ✅  
- `src/app/api/supa-check/route.ts` ✅

✅ **Cookies attendus après login** :
- `sb-access-token`
- `sb-refresh-token`

## **🌍 Configuration Supabase Dashboard**

**Auth → URL Configuration** :

**Site URL** = `https://ton-domaine.app`

**Redirect URLs** = 
- `https://ton-domaine.app/auth/callback`
- `https://ton-domaine.app`

**Dev** :
- `http://localhost:3000/auth/callback`
- `http://localhost:3000`

## **🔗 Magic Link Configuration**

**Côté serveur** :
```typescript
emailRedirectTo: `${NEXT_PUBLIC_SITE_URL}/auth/callback?next=/dashboard`
```

## **🛡️ RLS (Row Level Security)**

**Activer RLS** :
```sql
alter table profiles enable row level security;
```

**Policies "read/update own"** :
```sql
create policy "read own" on profiles for select using (user_id = auth.uid());
create policy "update own" on profiles for update using (user_id = auth.uid());
```

## **📁 Variables d'Environnement**

**Copier `.env.example` vers `.env.local`** et remplir :
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## **🚀 Déploiement Vercel**

**Variables d'environnement** :
- `NEXT_PUBLIC_SITE_URL=https://ton-domaine.app`
- `NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...`

**Redirections automatiques** :
- `vercel.json` gère www → apex
- HTTPS forcé

## **🧪 Tests E2E**

**Générer l'état authentifié** :
```bash
BASE_URL=http://localhost:3000 npx playwright codegen --save-storage=auth.json
```

**Lancer les tests** :
```bash
BASE_URL=http://localhost:3000 npx playwright test
```

## **🔍 Debug des 403**

**Vérifier** :
1. Cookies présents dans le navigateur
2. URLs Supabase alignées
3. RLS policies actives
4. Runtime 'nodejs' sur toutes les routes sensibles

**API de diagnostic** :
```bash
curl http://localhost:3000/api/supa-check
```

---

**💡 Rappel** : Toujours tester en local avant de déployer !








