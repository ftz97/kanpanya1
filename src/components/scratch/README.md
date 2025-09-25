# ScratchCardStableV3

✅ **Version validée du scratch Kanpanya** (mobile + desktop optimisé)

## 🛡️ Statut

⚠️ **Ne pas modifier ce fichier directement.**

👉 **Pour nouvelles features** : dupliquer et créer `ScratchCardV4`.

## 📋 Fonctionnalités Validées

- ✅ Canvas optimisé avec requestAnimationFrame
- ✅ Support mobile natif (tactile)
- ✅ Accessibilité complète (ARIA + clavier)
- ✅ Animations fluides (emojis + confettis)
- ✅ Golden Ticket (10% de chance)
- ✅ Système de récompenses avancé
- ✅ Threshold configurable (0.1-0.9)
- ✅ Performance optimisée (sampling intelligent)

## 🧪 Tests

### Tests E2E (Playwright)
- ✅ Canvas s'affiche correctement
- ✅ Grattage souris et tactile fonctionnel
- ✅ Popup s'affiche à 40% de grattage
- ✅ Bouton "Fermer" ferme le popup
- ✅ Pas de scroll sur mobile pendant grattage
- ✅ Accessibilité clavier
- ✅ Performance < 5s de chargement

### Tests Visuels (Chromatic)
- ✅ Screenshots automatiques des popups
- ✅ Détection des changements visuels
- ✅ Multi-viewports (mobile, tablet, desktop)
- ✅ Modes clair/sombre

## 🎯 Types de Récompenses

1. **Points** : 50, 100, 200 points Kanpanya
2. **Réductions** : 5%, 10%, 15% de réduction
3. **Offres** : Réductions chez commerçants (10%, 15%, 20%)
4. **Golden Ticket** : 500 points spéciaux (10% de chance)

## 📱 Responsive

- **Mobile** : 375px+ (optimisé tactile)
- **Tablet** : 768px+ (équilibré)
- **Desktop** : 1200px+ (pleine fonctionnalité)

## 🎨 Animations

- **Emojis** : Pluie d'emojis selon le type de gain
- **Confettis** : Canvas-confetti pour les victoires
- **Transitions** : Animations fluides avec Framer Motion
- **Performance** : requestAnimationFrame pour 60fps

## 🔧 Configuration

```tsx
<ScratchCardStableV3 
  threshold={0.4}              // 40% de grattage requis
  goldenTicketChance={0.1}     // 10% de chance Golden Ticket
  onReveal={(reward) => {      // Callback récompense
    console.log(reward);
  }}
  userId="user-123"            // ID utilisateur
/>
```

## 📊 Performance

- **Bundle size** : ~15KB (compressé)
- **First Paint** : < 1s
- **Interaction** : < 100ms
- **Memory** : Optimisé avec cleanup

## 🏷️ Version Git

**Tag** : `scratch-v3-stable`

**Commit** : Version validée et figée

## 🚀 Utilisation

```tsx
import ScratchCardStableV3 from '@/components/scratch/ScratchCardStableV3';

export default function MyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ScratchCardStableV3 
        threshold={0.4}
        goldenTicketChance={0.1}
        onReveal={(reward) => {
          // Gérer la récompense
        }}
        userId="current-user"
      />
    </div>
  );
}
```

## 📚 Storybook

- **Stories** : 8 variantes de test
- **Controls** : Props interactives
- **Docs** : Documentation complète
- **Chromatic** : Screenshots automatiques

## 🔄 Workflow de Développement

1. **Modifications** : Créer `ScratchCardV4`
2. **Tests** : E2E + Chromatic
3. **Validation** : Code review
4. **Déploiement** : Nouveau tag Git
5. **Documentation** : Mettre à jour ce README

---

**Dernière mise à jour** : Version stable validée
**Prochaine version** : ScratchCardV4 (en développement)



