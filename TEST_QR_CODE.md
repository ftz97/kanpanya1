# 🧪 Guide de Test - Système QR Code

## 🎯 Problème à résoudre

Le scanner QR ne fonctionne pas toujours. Ce guide vous aide à tester et déboguer le système.

## 📱 Pages de test disponibles

### 1. Page de test QR : `/test-qr`
- **URL** : http://localhost:3000/test-qr
- **Fonction** : Générer un QR code de test
- **UUID par défaut** : `550e8400-e29b-41d4-a716-446655440000`

### 2. Dashboard commerçant : `/dashboard-commercant`
- **URL** : http://localhost:3000/dashboard-commercant
- **Fonction** : Scanner les QR codes clients

### 3. QR Code client réel : `/client/qr-code`
- **URL** : http://localhost:3000/client/qr-code
- **Fonction** : QR code du client connecté

---

## 🧪 Méthode de test recommandée

### Option 1 : Test manuel (plus simple)

1. **Aller sur le dashboard commerçant**
   ```
   http://localhost:3000/dashboard-commercant
   ```

2. **Cliquer sur "Scanner client"**

3. **Cliquer sur "Test manuel"**

4. **Entrer un UUID de test** :
   ```
   550e8400-e29b-41d4-a716-446655440000
   ```

5. **Vérifier** :
   - Message de succès ou d'erreur
   - Console du navigateur (F12)
   - Points attribués au client

### Option 2 : Test avec QR code réel

1. **Ouvrir 2 onglets ou 2 appareils** :
   - Onglet 1 : `/test-qr` (pour afficher le QR)
   - Onglet 2 : `/dashboard-commercant` (pour scanner)

2. **Sur `/test-qr`** :
   - Télécharger le QR code
   - OU afficher à l'écran

3. **Sur `/dashboard-commercant`** :
   - Cliquer "Scanner client"
   - Scanner le QR code
   - OU utiliser "Test manuel" avec l'UUID

---

## 🔍 Débogage

### Étape 1 : Vérifier la console (F12)

Ouvrez les outils développeur et cherchez :

```javascript
// ✅ Bon signe
"✅ QR Code scanné: 550e8400-e29b-41d4-a716-446655440000"
"QR scanné: 550e8400-e29b-41d4-a716-446655440000"

// ❌ Problème
"Erreur scanner: ..."
"❌ Client non trouvé"
"Erreur scan: ..."
```

### Étape 2 : Vérifier la caméra

Si le scanner ne démarre pas :
1. Vérifier les permissions caméra du navigateur
2. Vérifier qu'une caméra est disponible
3. Essayer un autre navigateur (Chrome recommandé)

### Étape 3 : Vérifier la base de données

Le client doit exister dans Supabase :

```sql
-- Créer un client de test
INSERT INTO clients (id, nom, email, points)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'Client Test',
  'test@example.com',
  0
);

-- Vérifier que le client existe
SELECT * FROM clients 
WHERE id = '550e8400-e29b-41d4-a716-446655440000';
```

### Étape 4 : Vérifier le commerçant

Le merchantId doit être valide :

```sql
-- Créer un commerçant de test
INSERT INTO commercants (id, nom, email)
VALUES (
  'UUID_TEST',
  'Commerce Test',
  'commerce@example.com'
);
```

---

## 🛠️ Améliorations apportées au scanner

### 1. Logs de débogage
```typescript
console.log("✅ QR Code scanné:", result.data);
```

### 2. Affichage du dernier scan
- Zone verte qui affiche le QR code détecté
- Permet de vérifier que le scan fonctionne

### 3. Bouton "Test manuel"
- Permet de tester sans caméra
- Utile pour le développement

### 4. Fermeture automatique
- Le scanner se ferme après un scan réussi
- Timeout de 500ms pour voir le feedback

### 5. MaxScansPerSecond
```typescript
maxScansPerSecond: 5
```
- Évite les scans multiples
- Meilleure performance

---

## 📊 Scénarios de test

### Test 1 : Scan basique
```
1. Ouvrir /dashboard-commercant
2. Cliquer "Scanner client"
3. Cliquer "Test manuel"
4. Entrer : 550e8400-e29b-41d4-a716-446655440000
5. Vérifier le message de succès
```

**Résultat attendu** :
- ✅ "Scan réussi ! Client Test a gagné 10 points."
- Points du client : 0 → 10
- Nouveau scan dans la table `scans`

### Test 2 : Client inexistant
```
1. Ouvrir /dashboard-commercant
2. Cliquer "Scanner client"
3. Cliquer "Test manuel"
4. Entrer : 00000000-0000-0000-0000-000000000000
5. Vérifier le message d'erreur
```

**Résultat attendu** :
- ❌ "Client non trouvé. QR code invalide."

### Test 3 : Temps réel
```
1. Ouvrir 2 onglets du dashboard commerçant
2. Sur l'onglet 1 : Scanner un client
3. Sur l'onglet 2 : Vérifier la mise à jour auto
```

**Résultat attendu** :
- Les statistiques se mettent à jour dans les 2 onglets

---

## 🔧 Problèmes courants

### Problème 1 : "Aucune caméra détectée"

**Solutions** :
- Utiliser le bouton "Test manuel"
- Vérifier les permissions caméra
- Essayer sur mobile
- Utiliser HTTPS (requis pour la caméra)

### Problème 2 : "Client non trouvé"

**Solutions** :
- Créer le client dans Supabase
- Vérifier l'UUID exact
- Vérifier que la table `clients` existe

### Problème 3 : Scan ne se déclenche pas

**Solutions** :
- Rapprocher le QR code
- Améliorer l'éclairage
- Utiliser un QR code de meilleure qualité
- Essayer "Test manuel"

### Problème 4 : "Erreur lors de l'enregistrement du scan"

**Solutions** :
- Vérifier que la table `scans` existe
- Vérifier les RLS policies Supabase
- Vérifier que merchantId existe
- Regarder la console Supabase pour l'erreur exacte

---

## 📝 Checklist de vérification

Avant de tester :

- [ ] Supabase est configuré
- [ ] Tables créées : `clients`, `commercants`, `scans`, `stats_cache`
- [ ] Au moins 1 client de test existe
- [ ] Au moins 1 commerçant existe
- [ ] Les RLS policies sont désactivées (pour test) ou configurées
- [ ] Le package `qr-scanner` est installé
- [ ] La caméra fonctionne (ou utiliser test manuel)

---

## 🎯 Commandes utiles

### Créer des données de test dans Supabase

```sql
-- Client de test
INSERT INTO clients (id, nom, email, points) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Alice Dupont', 'alice@test.com', 0),
('660e8400-e29b-41d4-a716-446655440001', 'Bob Martin', 'bob@test.com', 50);

-- Commerçant de test
INSERT INTO commercants (id, nom, email) VALUES
('UUID_TEST', 'Boulangerie du Port', 'boulangerie@test.com');

-- Vérifier les scans
SELECT s.*, c.nom as client_nom, co.nom as commercant_nom
FROM scans s
JOIN clients c ON s.client_id = c.id
JOIN commercants co ON s.commercant_id = co.id
ORDER BY s.created_at DESC
LIMIT 10;
```

---

## 💡 Conseils

1. **Toujours tester en mode manuel d'abord**
   - Plus rapide
   - Pas de problème de caméra
   - Permet de valider la logique

2. **Regarder la console**
   - F12 → Console
   - Tous les logs y sont

3. **Tester sur mobile**
   - Meilleure qualité de caméra
   - Expérience réelle

4. **Utiliser HTTPS en production**
   - Requis pour l'accès caméra
   - Sur localhost, HTTP fonctionne

---

## 📱 URLs de test rapides

- **Page de test** : http://localhost:3000/test-qr
- **Dashboard commerçant** : http://localhost:3000/dashboard-commercant
- **Dashboard client** : http://localhost:3000/dashboard
- **QR client** : http://localhost:3000/client/qr-code

