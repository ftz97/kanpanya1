# 📋 Liste Complète - ScratchCard & Administration

## 🎯 **COMPOSANTS SCRATCHCARD**

### **Versions Principales**
1. **ScratchCardStableV3** - `src/components/scratch/ScratchCardStableV3.tsx` ⭐⭐⭐⭐⭐
   - Version stable et corrigée (threshold fixé)
   - Tag Git: `scratch-v3-threshold-fixed`

2. **ScratchCardV3** - `src/components/ScratchCardV3.tsx` ⭐⭐⭐⭐
   - Version originale avec problèmes de threshold

3. **ScratchCard** - `src/components/ScratchCard.tsx` ⭐⭐
   - Version avec react-scratchcard-v2 (bibliothèque externe)

4. **ScratchCardSimple** - `src/components/ScratchCardSimple.tsx` ⭐⭐
   - Version simplifiée avec Supabase

5. **ScratchCardAdmin** - `src/components/ScratchCardAdmin.tsx` ⭐
   - Version admin avec configuration

### **Architecture Layers**
6. **ScratchCardUI** - `src/layers/ui/components/ScratchCardUI.tsx` ⭐⭐
   - Version architecture en couches

7. **ScratchCardContainer** - `src/layers/ui/components/ScratchCardContainer.tsx` ⭐⭐
   - Conteneur pour l'architecture en couches

### **Stories Storybook**
8. **ScratchCard.stories** - `src/components/ScratchCard.stories.tsx` ⭐
   - Stories pour Storybook

9. **ScratchCardFixed.stories** - `src/components/scratch/ScratchCardFixed.stories.tsx` ⭐
   - Stories pour la version corrigée

---

## 🏢 **ADMINISTRATION**

### **Composants Admin**
1. **AdminDashboard** - `src/components/AdminDashboard.tsx` ⭐⭐⭐
   - Dashboard principal d'administration

2. **ScratchCardAdmin** - `src/components/ScratchCardAdmin.tsx` ⭐⭐
   - Administration des cartes à gratter

### **Pages Admin**
3. **Admin Principal** - `src/app/admin/page.tsx` ⭐⭐⭐
   - Page d'accueil admin

4. **Dashboard Admin** - `src/app/admin/dashboard/page.tsx` ⭐⭐⭐
   - Dashboard avec statistiques

5. **Scratch Cards Admin** - `src/app/admin/scratch-cards/page.tsx` ⭐⭐⭐
   - Gestion des cartes à gratter

6. **Config Scratch** - `src/app/admin/config-scratch/page.tsx` ⭐⭐⭐
   - Configuration des scratch cards

7. **AI Insights** - `src/app/admin/ai-insights/page.tsx` ⭐⭐
   - Insights IA

8. **Macro Analysis** - `src/app/admin/macro-analysis/page.tsx` ⭐⭐
   - Analyse macro

9. **Collectivité** - `src/app/admin/collectivite/page.tsx` ⭐⭐
   - Gestion des collectivités

10. **IA Descriptive** - `src/app/admin/ia-descriptive/page.tsx` ⭐⭐
    - IA descriptive

11. **Mapbox Test** - `src/app/admin/mapbox-test/page.tsx` ⭐
    - Tests Mapbox

12. **Quiz Scratch** - `src/app/admin/quiz-scratch/page.tsx` ⭐⭐
    - Quiz scratch cards

13. **Quiz Tester** - `src/app/admin/quiz-tester/page.tsx` ⭐
    - Testeur de quiz

14. **Recommandations** - `src/app/admin/recommandations/page.tsx` ⭐⭐
    - Système de recommandations

15. **Street Segmentation** - `src/app/admin/street-segmentation/page.tsx` ⭐⭐
    - Segmentation des rues

### **Admin Alternatif**
16. **Admin Dashboard Alt** - `src/app/admin%20-%20Dashboard%20Admin/page.tsx` ⭐
    - Version alternative du dashboard

---

## 🧪 **PAGES DE TEST SCRATCHCARD**

### **Pages de Test Principales** ⭐⭐⭐
1. **Test Stable** - `src/app/test-scratch-stable/page.tsx`
   - Test de la version stable

2. **Test Threshold Fix** - `src/app/test-threshold-fix/page.tsx`
   - Test de la correction du threshold

### **Pages de Test Secondaires** ⭐⭐
3. **Test V3** - `src/app/test-scratch-v3/page.tsx`
   - Test de la version V3

4. **Test Fixed** - `src/app/test-scratch-fixed/page.tsx`
   - Test de la version corrigée

5. **Test Simple Fixed** - `src/app/test-scratch-simple-fixed/page.tsx`
   - Test simple de la correction

### **Pages de Test Obsolètes** ⭐ (À SUPPRIMER)
6. **Test Scratch** - `src/app/test-scratch/page.tsx`
7. **Test Comparison** - `src/app/test-scratch-comparison/page.tsx`
8. **Test Simple** - `src/app/test-scratch-simple/page.tsx`
9. **Scratch** - `src/app/scratch/page.tsx`
10. **Scratch Anime** - `src/app/scratch-anime/page.tsx`
11. **Scratch Clean** - `src/app/scratch-clean/page.tsx`
12. **Scratch Demo** - `src/app/scratch-demo/page.tsx`
13. **Scratch Demo Option 2** - `src/app/scratch-demo-option2.tsx`
14. **Scratch Demo Option 3** - `src/app/scratch-demo-option3.tsx`
15. **Scratch Demo Option 4** - `src/app/scratch-demo-option4.tsx`

### **Dossiers de Test Vides** ⭐ (À SUPPRIMER)
16. **Test Scratch Hook** - `src/app/test-scratch-hook/`
17. **Test Scratch Speed** - `src/app/test-scratch-speed/`
18. **Test Scratch Working** - `src/app/test-scratch-working/`

---

## 🎯 **RÉSUMÉ PAR PRIORITÉ**

### **À CONSERVER (PRIORITÉ MAXIMALE)** ⭐⭐⭐⭐⭐
- `ScratchCardStableV3.tsx` - Version de production
- `AdminDashboard.tsx` - Dashboard principal
- `admin/dashboard/page.tsx` - Page admin principale
- `admin/scratch-cards/page.tsx` - Gestion scratch cards
- `test-scratch-stable/page.tsx` - Test de production
- `test-threshold-fix/page.tsx` - Test de validation

### **À CONSERVER (IMPORTANT)** ⭐⭐⭐⭐
- `ScratchCardV3.tsx` - Version de référence
- `admin/page.tsx` - Accueil admin
- `admin/config-scratch/page.tsx` - Configuration
- `test-scratch-v3/page.tsx` - Test de référence

### **À SUPPRIMER (OBSOLÈTES)** ⭐
- Tous les autres composants ScratchCard
- Toutes les pages de test obsolètes
- Architecture en layers
- Stories obsolètes

---

## 📊 **STATISTIQUES**

**Total des fichiers ScratchCard :** 9 composants
**Total des pages Admin :** 16 pages
**Total des pages de test :** 18 pages
**Total général :** 43 fichiers

**Recommandation :** Garder 6 fichiers essentiels, supprimer 37 fichiers obsolètes
