# 🚀 Guide de Déploiement - Konpanya

## Configuration des Domaines

### 1. **Domaines configurés** :
- `konpanya.xyz` (domaine principal)
- `kanpanya1.vercel.app` (domaine Vercel)

### 2. **Configuration DNS pour konpanya.xyz** :
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

### 3. **Configuration Vercel** :
1. Allez sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet
3. **Settings** → **Domains**
4. Ajoutez : `konpanya.xyz`
5. Ajoutez : `www.konpanya.xyz`

### 4. **Redirection automatique** :
Le middleware redirige automatiquement `padavwa.com` vers `konpanya.xyz`

## Fichiers de Configuration

- ✅ `next.config.js` - Configuration Next.js (CommonJS)
- ✅ `vercel.json` - Configuration Vercel
- ✅ `src/middleware.ts` - Redirection de domaine
- ✅ `.vercelignore` - Fichiers ignorés

## Build et Déploiement

```bash
# Test local
pnpm run build

# Déploiement automatique via Git
git add .
git commit -m "Deploy: Configuration domaines"
git push origin main
```

## Vérification

Après déploiement, vérifiez :
- ✅ `https://konpanya.xyz` fonctionne
- ✅ `https://kanpanya1.vercel.app` fonctionne  
- ✅ Redirection `padavwa.com` → `konpanya.xyz`
