import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface UseWelcomeMessageReturn {
  welcomeMessage: string;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseWelcomeMessageOptions {
  userName: string;
  language?: 'fr' | 'en' | 'es' | 'gcf';
}

// Messages de fallback locaux multilingues
const getFallbackMessages = (userName: string, language: 'fr' | 'en' | 'es' | 'gcf' = 'fr') => {
  const messages = {
    fr: {
      morning: [
        `Bonjour ${userName} ☀️`,
        `Salut ${userName} 👋`,
        `Bon matin ${userName} 🌸`,
      ],
      afternoon: [
        `Bon après-midi ${userName} 🌱`,
        `Salut ${userName} 🔥`,
        `Hey ${userName} 👋`,
      ],
      evening: [
        `Bonsoir ${userName} 🌙`,
        `Bonne soirée ${userName} 🌟`,
        `Salut ${userName} ✨`,
      ],
    },
    en: {
      morning: [
        `Good morning ${userName} ☀️`,
        `Hello ${userName} 👋`,
        `Morning ${userName} 🌸`,
      ],
      afternoon: [
        `Good afternoon ${userName} 🌱`,
        `Hey ${userName} 🔥`,
        `Hi ${userName} 👋`,
      ],
      evening: [
        `Good evening ${userName} 🌙`,
        `Good night ${userName} 🌟`,
        `Hey ${userName} ✨`,
      ],
    },
    es: {
      morning: [
        `Buenos días ${userName} ☀️`,
        `Hola ${userName} 👋`,
        `Buen día ${userName} 🌸`,
      ],
      afternoon: [
        `Buenas tardes ${userName} 🌱`,
        `Hola ${userName} 🔥`,
        `Hey ${userName} 👋`,
      ],
      evening: [
        `Buenas noches ${userName} 🌙`,
        `Buenas tardes ${userName} 🌟`,
        `Hola ${userName} ✨`,
      ],
    },
    gcf: {
      morning: [
        `${userName}, bonjou ! ☀️`,
        `Salut ${userName} 👋`,
        `Bon maten ${userName} 🌸`,
      ],
      afternoon: [
        `Bon apremidi ${userName} 🌱`,
        `Salut ${userName} 🔥`,
        `Hey ${userName} 👋`,
      ],
      evening: [
        `Bonswa ${userName} 🌙`,
        `Bon aswè ${userName} 🌟`,
        `Salut ${userName} ✨`,
      ],
    },
  };

  return messages[language] || messages.fr;
};

export function useWelcomeMessage(
  userName: string, 
  language: 'fr' | 'en' | 'es' | 'gcf' = 'fr'
): UseWelcomeMessageReturn {
  const [welcomeMessage, setWelcomeMessage] = useState("Bienvenue ! 🌟");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRandomFallbackMessage = (period: string) => {
    const fallbackMessages = getFallbackMessages(userName, language);
    const messages = fallbackMessages[period as keyof typeof fallbackMessages];
    if (messages) {
      return messages[Math.floor(Math.random() * messages.length)];
    }
    
    // Fallback par défaut selon la langue
    const defaultMessages = {
      fr: `Bonjour ${userName} ! 🌟`,
      en: `Hello ${userName} ! 🌟`,
      es: `¡Hola ${userName} ! 🌟`,
      gcf: `${userName}, bonjou ! 🌟`,
    };
    return defaultMessages[language] || defaultMessages.fr;
  };

  const fetchWelcomeMessage = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Déterminer la période de la journée
      const hour = new Date().getHours();
      let period: string;
      if (hour >= 7 && hour < 12) period = 'morning';
      else if (hour >= 12 && hour < 19) period = 'afternoon';
      else period = 'evening';

             try {
               const supabase = createClient();

               const { data, error: rpcError } = await supabase
                 .rpc('get_random_welcome_message', {
                   username: userName,
                   lang_input: language,
                 });

               if (rpcError) {
                 console.error('Erreur RPC:', rpcError);
                 const errorMessage = rpcError.message || rpcError.details || 'Erreur RPC inconnue';
                 setError(errorMessage);
                 // Fallback vers un message local en cas d'erreur
                 setWelcomeMessage(getRandomFallbackMessage(period));
               } else if (data && data.length > 0) {
                 setWelcomeMessage(data[0].message);
               } else {
                 // Fallback si pas de données - message selon la langue
                 const fallbackMessages = {
                   fr: `Bonjour ${userName} ! Bienvenue sur Kanpanya 🌱`,
                   en: `Hello ${userName} ! Welcome to Kanpanya 🌱`,
                   es: `¡Hola ${userName} ! Bienvenido a Kanpanya 🌱`,
                   gcf: `${userName}, byenveni anlè Kanpanya 🌱`,
                 };
                 setWelcomeMessage(fallbackMessages[language] || fallbackMessages.fr);
               }
             } catch (supabaseError) {
               console.log('Supabase non disponible, utilisation des messages locaux');
               // Utiliser les messages locaux si Supabase n'est pas disponible
               setWelcomeMessage(getRandomFallbackMessage(period));
             }
           } catch (err: any) {
             console.error('Erreur lors du chargement du message:', err);
             const errorMessage = err.message || err.toString() || 'Erreur inconnue';
             setError(errorMessage);
             // Fallback en cas d'erreur réseau
             setWelcomeMessage(`Hello ${userName} ! 🚀`);
           } finally {
             setLoading(false);
           }
         };

         useEffect(() => {
           fetchWelcomeMessage();
         }, [userName, language]);

         return {
           welcomeMessage,
           loading,
           error,
           refetch: fetchWelcomeMessage,
         };
       }
