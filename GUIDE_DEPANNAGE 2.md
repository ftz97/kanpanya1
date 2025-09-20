# 🔧 Guide de Dépannage - Problème "Impossible d'ajouter des points"

## 🎯 **Problème Identifié**
Vous ne pouvez pas ajouter des points via le géocodeur. La carte reste en "Chargement..." et le géocodeur ne fonctionne pas.

## 📋 **Étapes de Diagnostic**

### 1. **Test de Base - Page Simple**
Visitez: **http://localhost:3000/test-simple**
- ✅ Si vous voyez une carte avec un marqueur vert → Mapbox fonctionne
- ❌ Si vous voyez une erreur → Problème de token ou configuration

### 2. **Test de Debug - Diagnostic Complet**
Visitez: **http://localhost:3000/test-debug**
- Cette page affiche le statut en temps réel
- Vérifiez la console du navigateur (F12) pour les logs détaillés

### 3. **Test Principal - Page Complète**
Visitez: **http://localhost:3000/test-geocoder**
- Ouvrez la console du navigateur (F12)
- Regardez les logs qui commencent par 🚀, 🔑, 🗺️, ✅, ❌

## 🔍 **Diagnostic Console**

### Logs Attendus (Console F12):
```
🚀 Initialisation du composant RealMapboxMap
🔑 Token présent: OUI
🔑 Token Mapbox défini
🗺️ Création de la carte Mapbox...
✅ Carte Mapbox créée
✅ Contrôles ajoutés
✅ Carte Mapbox chargée
🔍 Ajout du géocodeur...
✅ Géocodeur ajouté
```

### Si vous voyez des erreurs:
- **"Token présent: NON"** → Problème de .env.local
- **"mapContainer.current est null"** → Problème de ref React
- **Erreur Mapbox** → Problème de token ou réseau

## 🛠️ **Solutions par Problème**

### Problème 1: Token Manquant
```bash
# Vérifier le token
cat .env.local

# Redémarrer le serveur
npm run dev
```

### Problème 2: Carte ne se charge pas
1. Vérifiez votre connexion internet
2. Testez d'abord `/test-simple`
3. Vérifiez la console pour les erreurs réseau

### Problème 3: Géocodeur ne fonctionne pas
1. Vérifiez que `@mapbox/mapbox-gl-geocoder` est installé
2. Regardez les logs de la console
3. Testez `/test-debug` pour voir le statut

## 🧪 **Tests à Effectuer**

### Test 1: Fonctionnement de Base
1. Allez sur `/test-simple`
2. Vérifiez qu'une carte s'affiche
3. Vérifiez qu'il y a un marqueur vert sur Paris

### Test 2: Géocodeur
1. Allez sur `/test-debug`
2. Attendez que le statut soit "✅ Géocodeur ajouté!"
3. Tapez "Paris" dans la barre de recherche
4. Sélectionnez une suggestion
5. Vérifiez qu'un marqueur vert apparaît

### Test 3: Composant Complet
1. Allez sur `/test-geocoder`
2. Ouvrez la console (F12)
3. Vérifiez les logs d'initialisation
4. Testez l'ajout de points

## 📞 **Informations à Fournir**

Si le problème persiste, fournissez:

1. **URL testée**: `/test-simple`, `/test-debug`, ou `/test-geocoder`
2. **Message d'erreur**: Copiez-collez depuis la console
3. **Statut affiché**: Ce que vous voyez sur la page
4. **Comportement**: La carte se charge-t-elle? Le géocodeur apparaît-il?

## 🎯 **Résolution Rapide**

### Solution Express:
1. **Ouvrez la console** (F12)
2. **Allez sur** `/test-debug`
3. **Regardez le statut** affiché sur la page
4. **Copiez les logs** de la console
5. **Partagez ces informations** pour un diagnostic précis

---

**💡 Astuce**: Commencez toujours par `/test-debug` car cette page affiche le statut en temps réel et vous aide à identifier exactement où le problème se situe.
