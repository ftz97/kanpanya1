# 🎫 Système Scratch Cards avec Supabase - V1.5

## 📋 Vue d'ensemble

Cette version remplace le système localStorage par une solution persistante et sécurisée avec Supabase. Le système maintient la même API côté UI pour une migration transparente.

## 🗄️ Base de données

### Tables créées :

1. **`user_scratch_tickets`** - Tickets à gratter des utilisateurs
2. **`points_ledger`** - Journal des points (audit trail)
3. **`user_points`** - Vue des totaux de points

### RPC Functions :

- `get_pending_scratch()` - Récupère le ticket en attente
- `grant_scratch_after_quiz()` - Crée un ticket après un quiz
- `reveal_scratch()` - Révèle un ticket et crédite les points
- `get_my_points()` - Récupère le total de points

## 🚀 Installation

### 1. Exécuter le SQL dans Supabase

```bash
# Copier le contenu de supabase-scratch-system.sql
# et l'exécuter dans l'éditeur SQL de Supabase
```

### 2. Variables d'environnement

Assurez-vous d'avoir ces variables dans votre `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔧 Utilisation

### Hook principal

```typescript
import { useScratchAvailability } from '@/hooks/useScratchAvailability';

const { state, activate, markUsed, clear, refresh } = useScratchAvailability();

// Activer un ticket après un quiz
await activate({ 
  quizId: 'quiz-uuid', 
  points: 50, 
  label: '+50 points' 
});

// Marquer un ticket comme utilisé (après révélation)
await markUsed();
```

### Hook pour les points

```typescript
import { useUserPoints } from '@/hooks/useUserPoints';

const { points, isLoading, refresh } = useUserPoints();
```

## 🔄 Flux complet

1. **Quiz terminé** → `activate()` crée un ticket en base
2. **Page d'accueil** → `get_pending_scratch()` vérifie s'il y a un ticket
3. **Grattage** → L'utilisateur gratte la carte
4. **Révélation** → `markUsed()` révèle le ticket et crédite les points
5. **Points** → `get_my_points()` affiche le total

## 🔒 Sécurité

- **RLS activé** sur toutes les tables
- **Politiques** : chaque utilisateur ne voit que ses propres données
- **RPC sécurisées** avec `security definer`
- **Validation** des types de récompenses et statuts

## 🎯 Avantages vs localStorage

- ✅ **Persistance** : Les tickets survivent aux redémarrages
- ✅ **Sécurité** : RLS et validation côté serveur
- ✅ **Audit** : Journal complet des points
- ✅ **Multi-device** : Synchronisation entre appareils
- ✅ **Anti-triche** : Validation côté serveur

## 🔌 Migration depuis localStorage

L'API reste identique, seule l'implémentation change :

```typescript
// Avant (localStorage)
activate({ type: 'points', amount: 50 });

// Après (Supabase)
activate({ quizId: 'uuid', points: 50, label: '+50 points' });
```

## 🧪 Tests

```bash
# Tester la page d'accueil
curl http://localhost:3000/

# Tester la page de résultat de quiz
curl http://localhost:3000/quiz/result
```

## 📁 Fichiers modifiés

- `src/hooks/useScratchAvailability.ts` - Version Supabase
- `src/app/quiz/result/page.tsx` - Utilise la nouvelle API
- `src/hooks/useUserPoints.ts` - Nouveau hook pour les points
- `supabase-scratch-system.sql` - Script SQL complet

## 🚀 Prochaines étapes

1. **Déployer le SQL** dans Supabase
2. **Tester** avec un utilisateur authentifié
3. **Intégrer** avec le système de quiz existant
4. **Ajouter** des quotas et limites par campagne
5. **Implémenter** les notifications push
