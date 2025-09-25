# 🌍 **Exemple d'utilisation multilingue - Messages de bienvenue Kanpanya**

Ce document montre comment utiliser le système de messages de bienvenue multilingues avec le paramètre `lang_input`.

## 🚀 **Utilisation de base**

### 1. **Appel RPC Supabase direct**

```typescript
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

// Français (par défaut)
const { data, error } = await supabase.rpc('get_random_welcome_message', {
  username: 'Sarah',
  lang_input: 'fr'
});

// Anglais
const { data, error } = await supabase.rpc('get_random_welcome_message', {
  username: 'Sarah',
  lang_input: 'en'
});

// Espagnol
const { data, error } = await supabase.rpc('get_random_welcome_message', {
  username: 'Sarah',
  lang_input: 'es'
});

// Créole haïtien
const { data, error } = await supabase.rpc('get_random_welcome_message', {
  username: 'Sarah',
  lang_input: 'gcf'
});

if (error) {
  console.error("Erreur RPC:", error);
} else {
  console.log("Message personnalisé :", data[0].message);
}
```

### 2. **Utilisation avec le hook React**

```typescript
import { useWelcomeMessage } from '@/hooks/useWelcomeMessage';

export default function DashboardPage() {
  const userName = "Sarah";
  const language = 'fr'; // 'fr', 'en', 'es', 'gcf'
  
  const { welcomeMessage, loading, error, refetch } = useWelcomeMessage(userName, language);

  return (
    <div>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <h1>{welcomeMessage}</h1>
      )}
      {error && <p>Erreur: {error}</p>}
      <button onClick={refetch}>🔄 Changer le message</button>
    </div>
  );
}
```

## 🎯 **Exemples de résultats**

### Français (fr)
- **Matin :** "Bonjour Sarah ☀️ 💪 Commence ta semaine avec énergie !"
- **Après-midi :** "Salut Sarah 🔥"
- **Soir :** "Bonsoir Sarah 🌙"

### Anglais (en)
- **Matin :** "Good morning Sarah ☀️ 💪 Start your week with energy!"
- **Après-midi :** "Hey Sarah 🔥"
- **Soir :** "Good evening Sarah 🌙"

### Espagnol (es)
- **Matin :** "Buenos días Sarah ☀️ 💪 ¡Comienza tu semana con energía!"
- **Après-midi :** "Hola Sarah 🔥"
- **Soir :** "Buenas noches Sarah 🌙"

### Créole haïtien (gcf)
- **Matin :** "Sarah, bonjou ! ☀️ 💪 Kòmanse semèn ou ak enèji !"
- **Après-midi :** "Salut Sarah 🔥"
- **Soir :** "Bonswa Sarah 🌙"

## 🔧 **Configuration avancée**

### Détection automatique de la langue utilisateur

```typescript
import { useWelcomeMessage } from '@/hooks/useWelcomeMessage';

export default function DashboardPage() {
  const userName = "Sarah";
  
  // Détecter la langue du navigateur
  const browserLanguage = navigator.language.split('-')[0];
  const supportedLanguages = ['fr', 'en', 'es', 'gcf'];
  const userLanguage = supportedLanguages.includes(browserLanguage) 
    ? browserLanguage as 'fr' | 'en' | 'es' | 'gcf'
    : 'fr'; // Fallback vers le français
  
  const { welcomeMessage, loading, error, refetch } = useWelcomeMessage(userName, userLanguage);

  return (
    <div>
      <h1>{welcomeMessage}</h1>
      <p>Langue détectée: {userLanguage}</p>
    </div>
  );
}
```

### Sélecteur de langue dynamique

```typescript
import { useState } from 'react';
import { useWelcomeMessage } from '@/hooks/useWelcomeMessage';

export default function LanguageSelector() {
  const [userName, setUserName] = useState('Sarah');
  const [selectedLanguage, setSelectedLanguage] = useState<'fr' | 'en' | 'es' | 'gcf'>('fr');
  
  const { welcomeMessage, loading, error, refetch } = useWelcomeMessage(userName, selectedLanguage);

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label>Nom d'utilisateur:</label>
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        
        <div>
          <label>Langue:</label>
          <select 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value as 'fr' | 'en' | 'es' | 'gcf')}
          >
            <option value="fr">🇫🇷 Français</option>
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Español</option>
            <option value="gcf">🇭🇹 Créole haïtien</option>
          </select>
        </div>
        
        <button onClick={refetch}>🔄 Nouveau message</button>
      </div>
      
      <div className="mt-4">
        <h2>Message de bienvenue:</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <p className="text-lg font-semibold">{welcomeMessage}</p>
        )}
        {error && <p className="text-red-500">Erreur: {error}</p>}
      </div>
    </div>
  );
}
```

## 🧪 **Test avec la page dédiée**

Visitez `/test-welcome` pour tester toutes les langues :

1. **Entrez un prénom** (ex: "Sarah", "Kevin", "Amélie")
2. **Sélectionnez une langue** (🇫🇷 Français, 🇺🇸 English, 🇪🇸 Español, 🇭🇹 Créole haïtien)
3. **Cliquez sur "Tester la fonction RPC"**
4. **Observez le message** généré selon la langue et l'heure

## 📝 **Codes de langue supportés**

| Code | Langue | Exemple |
|------|--------|---------|
| `fr` | Français | "Bonjour Sarah ☀️" |
| `en` | Anglais | "Good morning Sarah ☀️" |
| `es` | Espagnol | "Buenos días Sarah ☀️" |
| `gcf` | Créole haïtien | "Sarah, bonjou ! ☀️" |

## 🎯 **Fonctionnalités spéciales**

### Messages selon le jour de la semaine

- **Lundi :** Suffixe motivationnel dans chaque langue
- **Vendredi :** Suffixe week-end dans chaque langue  
- **Week-end :** Suffixe détente dans chaque langue

### Fallback intelligent

1. **Langue demandée** → Message dans cette langue
2. **Langue non trouvée** → Fallback vers le français
3. **Aucun message** → Message de fallback selon la langue
4. **Erreur Supabase** → Messages locaux selon la langue

## 🚀 **Prochaines étapes**

1. **Exécuter le script SQL** `supabase-welcome-messages-rpc.sql` dans Supabase
2. **Tester avec** `/test-welcome`
3. **Intégrer dans votre app** avec le hook `useWelcomeMessage`
4. **Personnaliser** selon vos besoins (ajouter d'autres langues, messages, etc.)
