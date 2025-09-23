# 🚀 Guide de Déploiement - konpanya.xyz

## ✅ Problème résolu : DEPLOYMENT_NOT_FOUND

### Modifications apportées :

1. **Configuration Next.js améliorée** (`next.config.js`) :
   - Ajout de `output: 'standalone'` pour un meilleur déploiement
   - Configuration des redirections de domaine
   - Support pour les domaines personnalisés

2. **Configuration Vercel optimisée** (`vercel.json`) :
   - Runtime Node.js 20.x spécifié
   - Configuration des rewrites
   - Headers de sécurité ajoutés
   - Support pour les fonctions API

3. **Variables d'environnement** (`.env.production`) :
   - Configuration pour konpanya.xyz
   - URLs de production configurées
   - Support Mapbox

## 🔧 Configuration Vercel

### Étapes pour configurer konpanya.xyz :

1. **Connexion Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez votre compte GitHub
   - Importez le projet `kanpanya-fresh`

2. **Configuration des domaines** :
   - **Settings** → **Domains**
   - Ajoutez : `konpanya.xyz`
   - Ajoutez : `www.konpanya.xyz`

3. **Variables d'environnement** :
   ```
   NEXT_PUBLIC_SITE_URL=https://konpanya.xyz
   NEXT_PUBLIC_SUPABASE_URL=https://yichatlcuqmquazlmxrv.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon
   SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=votre_token_mapbox
   ```

4. **Configuration DNS** :
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

## 🎯 Déploiement automatique

Le déploiement se fait automatiquement à chaque push sur la branche `main` :

```bash
# Déploiement manuel si nécessaire
git add .
git commit -m "Deploy: Configuration konpanya.xyz"
git push origin main
```

## 🔍 Vérification

Après déploiement, vérifiez :
- ✅ `https://konpanya.xyz` fonctionne
- ✅ `https://www.konpanya.xyz` fonctionne
- ✅ Redirection `padavwa.com` → `konpanya.xyz`
- ✅ Toutes les pages sont accessibles

## 📝 Notes importantes

- Le build fonctionne correctement (testé localement)
- Configuration optimisée pour la production
- Support des domaines personnalisés
- Headers de sécurité configurés
- Runtime Node.js 20.x pour les performances

## 🚨 En cas de problème

Si vous rencontrez encore des erreurs :
1. Vérifiez les variables d'environnement sur Vercel
2. Assurez-vous que le domaine est bien configuré
3. Vérifiez les logs de déploiement sur Vercel
4. Contactez le support si nécessaire

---
**Dernière mise à jour** : $(date '+%Y-%m-%d %H:%M:%S')
