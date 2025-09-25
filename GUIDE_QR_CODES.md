# 🎯 Guide Système QR Codes - Kanpanya

## Vue d'ensemble

Le système QR codes permet aux clients et commerçants d'interagir via des scans pour gagner des points, des tickets scratch et des récompenses de fidélité.

## 🗄️ Base de données Supabase

### Tables modifiées
- `clients` : Ajout colonne `qr_code_url`
- `commercants` : Ajout colonne `qr_code_url`

### Nouvelles tables
- `scan_rewards_log` : Log des récompenses attribuées
- `client_scan_stats` : Vue statistiques clients
- `merchant_scan_stats` : Vue statistiques commerçants

### Fonctions créées
- `handle_scan_rewards()` : Gère les récompenses automatiques
- `generate_qr_code_url()` : Génère les URLs QR codes
- `update_qr_codes()` : Met à jour tous les QR codes

## 🚀 Installation

### 1. Exécuter le SQL Supabase
```sql
-- Exécuter le fichier complet
\i supabase-qr-codes-system.sql
```

### 2. Variables d'environnement
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Utilisation Frontend

### URLs QR Codes générées
- **Client** : `https://votre-domaine.com/scan?client=UUID_CLIENT`
- **Commerçant** : `https://votre-domaine.com/scan?merchant=UUID_COMMERCANT`

### Flux de scan

#### Cas 1 : Client scanne un commerçant
1. Client ouvre QR code commerçant
2. Redirection vers `/scan?merchant=UUID`
3. Vérification auth client
4. Insert dans `scan_logs`
5. Trigger `handle_scan_rewards()` exécuté
6. Redirection vers `/reward`

#### Cas 2 : Commerçant scanne un client
1. Commerçant ouvre QR code client
2. Redirection vers `/scan?client=UUID`
3. Vérification auth commerçant
4. Insert dans `scan_logs`
5. Trigger `handle_scan_rewards()` exécuté
6. Redirection vers `/reward`

## 🎁 Système de récompenses

### Points attribués
- **Base** : 10 points par scan
- **Bonus** : Configurable par commerçant

### Récompenses automatiques
1. **Points client** : Ajoutés à `client_points`
2. **Fidélité** : Incrément si carte fidélité active
3. **Ticket scratch** : Attribué si config scratch active

### Conditions tickets scratch
- Commerçant doit avoir `scratch_configs` active
- Client doit avoir suffisamment de points (`min_points`)
- Un ticket par scan (évite spam)

## 🔧 API Endpoints

### Pages créées
- `/scan` : Traitement des scans QR
- `/reward` : Affichage des récompenses

### Fonctions utilitaires
```typescript
// Générer QR code pour un client
const qrUrl = await supabase.rpc('generate_qr_code_url', {
  entity_type: 'client',
  entity_id: clientId
});

// Générer QR code pour un commerçant
const qrUrl = await supabase.rpc('generate_qr_code_url', {
  entity_type: 'commercant',
  entity_id: merchantId
});
```

## 🛡️ Sécurité

### RLS Policies
- Clients : Peuvent voir leurs propres logs
- Commerçants : Peuvent voir les logs de leurs scans
- Isolation des données par utilisateur

### Validations
- Vérification existence client/commerçant
- Vérification statut actif
- Authentification obligatoire
- Protection contre les scans multiples

## 📊 Monitoring

### Vues statistiques
```sql
-- Statistiques client
SELECT * FROM client_scan_stats WHERE client_id = 'UUID';

-- Statistiques commerçant
SELECT * FROM merchant_scan_stats WHERE commercant_id = 'UUID';
```

### Logs de récompenses
```sql
-- Historique des récompenses
SELECT * FROM scan_rewards_log 
WHERE client_id = 'UUID' 
ORDER BY created_at DESC;
```

## 🐛 Debug

### Mode développement
La page `/scan` affiche des informations de debug en mode développement :
- Merchant ID
- Client ID
- Status du scan

### Logs console
- `🔍 Scan commerçant/client` : Début du scan
- `✅ Scan enregistré` : Succès
- `❌ Erreur scan` : Erreur avec détails

## 🔄 Maintenance

### Mise à jour QR codes
```sql
-- Régénérer tous les QR codes
SELECT update_qr_codes();
```

### Nettoyage logs
```sql
-- Supprimer logs anciens (optionnel)
DELETE FROM scan_rewards_log 
WHERE created_at < NOW() - INTERVAL '1 year';
```

## 🚨 Troubleshooting

### Erreurs communes
1. **"Client ou commerçant introuvable"**
   - Vérifier que l'UUID existe dans la table
   - Vérifier le statut actif

2. **"Profil client/commerçant introuvable"**
   - Vérifier la liaison `user_id` dans Supabase Auth
   - Vérifier que le profil est créé

3. **"Erreur d'authentification"**
   - Vérifier la session utilisateur
   - Redirection vers signup si nécessaire

### Tests recommandés
1. Créer un client et un commerçant de test
2. Générer leurs QR codes
3. Tester les deux flux de scan
4. Vérifier les récompenses attribuées
5. Contrôler les logs de récompenses

## 📈 Évolutions futures

### Fonctionnalités possibles
- QR codes avec expiration
- Limite de scans par période
- Récompenses différenciées par commerçant
- Géolocalisation des scans
- Notifications push des récompenses

### Optimisations
- Cache des statistiques
- Batch processing des récompenses
- Compression des logs
- Index supplémentaires pour performance
