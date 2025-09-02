# 🚀 Deployment Checklist - Next.js + Supabase

## 📋 Checklist de déploiement

### 1. ✅ **Supabase Configuration**
- [ ] **Site URL** configurée dans Supabase Auth → URL Configuration
- [ ] **Redirect URLs** incluent exactement :
  - `https://votre-domaine.com/auth/callback`
  - `https://votre-domaine.com`
  - (Dev) `http://localhost:3000/auth/callback`, `http://localhost:3000`

### 2. ✅ **Variables d'environnement**
- [ ] `NEXT_PUBLIC_SUPABASE_URL` = URL de votre projet Supabase
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Clé anonyme publique
- [ ] `NEXT_PUBLIC_SITE_URL` = URL de votre site (prod)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` = Clé de service (server-only)

### 3. ✅ **Sécurité et Middleware**
- [ ] **Middleware** protège `/dashboard` et `/(protected)`
- [ ] **Page `/debug`** bloquée en production (403)
- [ ] **Headers de sécurité** configurés dans `next.config.js`
- [ ] **Cache désactivé** sur les routes sensibles

### 4. ✅ **Tests manuels rapides**
- [ ] **`/dashboard`** → redirige vers `/login` si non connecté
- [ ] **Magic link** → connexion réussie → `/dashboard`
- [ ] **`/api/supa-check`** → 200 si loggé, 403 sinon
- [ ] **`/debug`** → OK en dev, 403 en production

### 5. ✅ **Tests automatisés**
```bash
# Lancer les tests de fumée
npx playwright test tests/smoke.spec.ts

# Tous les tests
npx playwright test
```

## 🔧 Configuration détaillée

### Supabase Auth URLs
```
Site URL: https://votre-domaine.com
Redirect URLs: 
  - https://votre-domaine.com/auth/callback
  - https://votre-domaine.com
  - http://localhost:3000/auth/callback
  - http://localhost:3000
```

### Variables d'environnement (.env.local)
```bash
# Public (exposées au client)
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Server-only (jamais côté client)
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Vercel (optionnel)
```json
{
  "redirects": [
    { "source": "http://www.:path*", "destination": "https://:path*", "permanent": true },
    { "source": "http://:path*", "destination": "https://:path*", "permanent": true }
  ]
}
```

## 🧪 Tests de validation

### Test rapide de connexion
1. Aller sur `/dashboard` → doit rediriger vers `/login`
2. Saisir email → recevoir magic link
3. Cliquer sur le lien → doit arriver sur `/dashboard`
4. Vérifier que `/api/supa-check` retourne 200

### Test de sécurité
1. Se déconnecter
2. Aller sur `/dashboard` → doit rediriger vers `/login`
3. Aller sur `/debug` → doit retourner 403 en prod

## 🚨 Problèmes courants

### 403 aléatoires
- Vérifier que `NEXT_PUBLIC_SITE_URL` correspond exactement à l'URL de déploiement
- S'assurer que les cookies `sb-access-token` et `sb-refresh-token` sont présents
- Vérifier les policies RLS dans Supabase

### Magic links qui ne fonctionnent pas
- Vérifier les Redirect URLs dans Supabase
- S'assurer que le domaine d'envoi des emails est configuré (DKIM/SPF)
- Vérifier que `emailRedirectTo` pointe vers `/auth/callback`

### Middleware qui ne fonctionne pas
- Vérifier le `matcher` dans `middleware.ts`
- S'assurer que `export const runtime = 'nodejs'` est présent sur les routes auth

## 📚 Ressources

- [Documentation Supabase Auth](https://supabase.com/docs/guides/auth)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Playwright E2E Testing](https://playwright.dev/docs/intro)

---

**✅ Prêt pour la production !** 

Après avoir validé tous les points de cette checklist, votre application Next.js + Supabase est prête pour le déploiement.








