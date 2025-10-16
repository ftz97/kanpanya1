# 🎯 Système QR Code Kanpanya

## Vue d'ensemble

Le système QR Code permet aux clients de gagner des points chez les commerçants partenaires grâce à un QR code unique et permanent.

## 🔑 Principe

### Chaque client possède :
- **Un QR code unique** contenant son `client_id` (UUID)
- **Un code permanent** : le même code pour toujours
- **Accessible** via `/client/qr-code`

### Chaque commerçant possède :
- **Un scanner QR** intégré dans son dashboard
- **Lecture automatique** du `client_id`
- **Attribution automatique** de points

## 📱 Flux d'utilisation

### 1️⃣ Client : Obtenir son QR code

```
Dashboard client → Bouton "Mon QR" → Page /client/qr-code
```

**Fonctionnalités :**
- ✅ Affichage du QR code unique
- ✅ Points actuels du client
- ✅ Téléchargement du QR code (PNG)
- ✅ Partage du QR code
- ✅ Instructions d'utilisation

**QR Code contient :** `client_id` (UUID)

---

### 2️⃣ Commerçant : Scanner le client

```
Dashboard commerçant → Bouton "Scanner client" → Scanner QR → Points attribués
```

**Processus de scan :**

1. **Lecture QR** : Extraction du `client_id`
2. **Vérification** : Le client existe-t-il ?
3. **Insertion scan** : Ajout dans la table `scans`
   ```sql
   INSERT INTO scans (client_id, commercant_id, points, created_at)
   VALUES ('uuid-client', 'uuid-commercant', 10, NOW())
   ```
4. **Mise à jour points** : Ajout des points au client
   ```sql
   UPDATE clients 
   SET points = points + 10 
   WHERE id = 'uuid-client'
   ```
5. **Confirmation** : Message de succès avec nom du client

---

## 🗄️ Structure de la base de données

### Table `clients`
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  nom TEXT,
  email TEXT,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Table `scans`
```sql
CREATE TABLE scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  commercant_id UUID REFERENCES commercants(id),
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 Fonctionnalités techniques

### Temps réel Supabase

Le dashboard commerçant se met à jour automatiquement :

```typescript
supabase
  .channel("realtime")
  .on("postgres_changes", {
    event: "*",
    schema: "public",
    table: "scans",
    filter: `commercant_id=eq.${merchantId}`
  }, refreshData)
  .subscribe();
```

**Avantages :**
- ✅ Mise à jour instantanée des statistiques
- ✅ Pas besoin de recharger la page
- ✅ Multi-utilisateur supporté

---

## 📊 Points attribués

### Configuration actuelle
- **Points par scan** : 10 points
- **Modifiable** : Dans `handleScan()` du dashboard commerçant

### Possibilités d'évolution
- Points variables selon le montant d'achat
- Points bonus selon l'heure / le jour
- Points de parrainage
- Points de fidélité cumulatifs

---

## 🔐 Sécurité

### Vérifications effectuées
1. ✅ **Authentification** : Le commerçant doit être connecté
2. ✅ **Validation client** : Le `client_id` doit exister
3. ✅ **Transactions** : Insertion scan + mise à jour points
4. ✅ **Filtrage temps réel** : Seulement les scans du commerçant

### Améliorations possibles
- ⚠️ Limite de scans par client/jour
- ⚠️ Vérification géolocalisation
- ⚠️ Détection de fraude
- ⚠️ Historique des scans

---

## 📂 Fichiers du système

### Pages
- `/src/app/client/qr-code/page.tsx` : Page QR code client
- `/src/app/dashboard-commercant-simple/page.tsx` : Dashboard commerçant
- `/src/app/dashboard/page.tsx` : Dashboard client

### Composants
- `/src/components/ScannerQR.tsx` : Scanner QR caméra
- `/src/components/StyledQRCode.tsx` : Affichage QR code stylisé

### Hooks
- `/src/hooks/useMerchantData.ts` : Données commerçant + temps réel

---

## 🎨 Design

### Page QR Code Client
- **Gradient background** : Vert Kanpanya dégradé
- **QR code stylisé** : Avec nom et points
- **Actions** : Télécharger, Partager
- **Instructions** : Guide d'utilisation

### Scanner Commerçant
- **Overlay caméra** : Cadre de détection
- **Feedback visuel** : États de scan
- **Messages** : Succès / Erreur clairs

---

## 🧪 Tests recommandés

### Test 1 : QR Code client
1. Se connecter en tant que client
2. Accéder à `/client/qr-code`
3. Vérifier l'affichage du QR code
4. Télécharger le QR code
5. Vérifier que le fichier PNG est valide

### Test 2 : Scan commerçant
1. Se connecter en tant que commerçant
2. Accéder au dashboard commerçant
3. Cliquer sur "Scanner client"
4. Scanner le QR code d'un client (ou saisir le UUID)
5. Vérifier le message de succès
6. Vérifier la mise à jour des statistiques

### Test 3 : Temps réel
1. Ouvrir 2 fenêtres : client + commerçant
2. Scanner le QR code du client
3. Vérifier que les points du client se mettent à jour
4. Vérifier que les stats commerçant se mettent à jour

---

## 📱 URLs

- **Client QR Code** : `/client/qr-code`
- **Dashboard Commerçant** : `/dashboard-commercant-simple`
- **Dashboard Client** : `/dashboard`

---

## 💡 Améliorations futures

1. **Historique des scans** : Liste des derniers scans avec détails
2. **Notifications** : Push quand le client gagne des points
3. **Récompenses automatiques** : À X points → cadeau
4. **Statistiques avancées** : Graphiques, tendances
5. **Mode hors-ligne** : Cache local + sync
6. **Multi-commerçants** : Points partagés entre plusieurs commerces
7. **Niveaux de fidélité** : Bronze, Argent, Or
8. **Challenges** : Objectifs à atteindre

---

## 🆘 Support

En cas de problème :
1. Vérifier les logs console (F12)
2. Vérifier la connexion Supabase
3. Vérifier les permissions caméra
4. Vérifier que le client existe dans la DB
5. Vérifier les RLS policies Supabase

