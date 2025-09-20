# 🔧 Guide de Dépannage Mapbox

## ✅ Statut Actuel
- ✅ Serveur Next.js démarré sur http://localhost:3000
- ✅ Token Mapbox configuré dans .env.local
- ✅ Composant RealMapboxMap.tsx créé
- ✅ Page de test accessible sur /test-geocoder
- ✅ Page de test simple accessible sur /test-simple

## 🧪 Tests à Effectuer

### 1. Test Basique
Visitez: **http://localhost:3000/test-simple**
- Si vous voyez une carte avec un marqueur vert → Mapbox fonctionne ✅
- Si vous voyez une erreur → Problème de token ou de configuration ❌

### 2. Test Complet
Visitez: **http://localhost:3000/test-geocoder**
- Recherchez une adresse dans la barre en haut à gauche
- Ajoutez plusieurs points pour voir les lignes vertes et polygones
- Testez les boutons de suppression

## 🚨 Problèmes Courants

### Problème: "Token Mapbox manquant"
**Solution:**
1. Vérifiez que .env.local existe: `cat .env.local`
2. Redémarrez le serveur: `npm run dev`

### Problème: Carte ne se charge pas
**Solutions:**
1. Vérifiez la console du navigateur (F12)
2. Testez d'abord /test-simple
3. Vérifiez votre connexion internet

### Problème: Géocodeur ne fonctionne pas
**Solutions:**
1. Vérifiez que @mapbox/mapbox-gl-geocoder est installé
2. Redémarrez le serveur après installation

## 📋 Commandes Utiles

```bash
# Redémarrer le serveur
npm run dev

# Vérifier le token
cat .env.local

# Tester les pages
curl http://localhost:3000/test-simple
curl http://localhost:3000/test-geocoder
```

## 🎯 Fonctionnalités du Composant

### RealMapboxMap.tsx
- ✅ Carte Mapbox responsive
- ✅ Géocodeur en français
- ✅ Marqueurs bleus cliquables
- ✅ Ligne verte entre points (2+ points)
- ✅ Polygone translucide (3+ points)
- ✅ Liste des points avec suppression
- ✅ Gestion des doublons
- ✅ Navigation interactive

### Utilisation
```typescript
<RealMapboxMap 
  height="600px"
  center={[-61.5314, 16.2412]} // Guadeloupe
  zoom={13}
/>
```

## 🔗 Liens de Test
- **Test Simple**: http://localhost:3000/test-simple
- **Test Complet**: http://localhost:3000/test-geocoder
- **Page d'accueil**: http://localhost:3000

---

**Si le problème persiste, vérifiez:**
1. La console du navigateur (erreurs JavaScript)
2. Le terminal du serveur (erreurs de compilation)
3. Votre connexion internet
4. La validité de votre token Mapbox
