import { useState, useEffect } from 'react';

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

export function useWelcomeMessageSimple(
  userName: string, 
  language: 'fr' | 'en' | 'es' | 'gcf' = 'fr'
): UseWelcomeMessageReturn {
  const [welcomeMessage, setWelcomeMessage] = useState("Bienvenue ! 🌟");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRandomFallbackMessage = (period: string) => {
    const messages = {
      fr: {
        morning: [`Bonjour ${userName} ☀️`, `Salut ${userName} 👋`, `Bon matin ${userName} 🌸`],
        afternoon: [`Bon après-midi ${userName} 🌱`, `Salut ${userName} 🔥`, `Hey ${userName} 👋`],
        evening: [`Bonsoir ${userName} 🌙`, `Bonne soirée ${userName} 🌟`, `Salut ${userName} ✨`],
      },
      en: {
        morning: [`Good morning ${userName} ☀️`, `Hello ${userName} 👋`, `Morning ${userName} 🌸`],
        afternoon: [`Good afternoon ${userName} 🌱`, `Hey ${userName} 🔥`, `Hi ${userName} 👋`],
        evening: [`Good evening ${userName} 🌙`, `Good night ${userName} 🌟`, `Hey ${userName} ✨`],
      },
      es: {
        morning: [`Buenos días ${userName} ☀️`, `Hola ${userName} 👋`, `Buen día ${userName} 🌸`],
        afternoon: [`Buenas tardes ${userName} 🌱`, `Hola ${userName} 🔥`, `Hey ${userName} 👋`],
        evening: [`Buenas noches ${userName} 🌙`, `Buenas tardes ${userName} 🌟`, `Hola ${userName} ✨`],
      },
      gcf: {
        morning: [`${userName}, bonjou ! ☀️`, `Salut ${userName} 👋`, `Bon maten ${userName} 🌸`],
        afternoon: [`Bon apremidi ${userName} 🌱`, `Salut ${userName} 🔥`, `Hey ${userName} 👋`],
        evening: [`Bonswa ${userName} 🌙`, `Bon aswè ${userName} 🌟`, `Salut ${userName} ✨`],
      },
    };

    const langMessages = messages[language] || messages.fr;
    const periodMessages = langMessages[period as keyof typeof langMessages];
    
    if (periodMessages) {
      return periodMessages[Math.floor(Math.random() * periodMessages.length)];
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

      // Simuler un délai pour tester
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Utiliser directement les messages locaux pour simplifier
      const message = getRandomFallbackMessage(period);
      setWelcomeMessage(message);

    } catch (err: any) {
      console.error('Erreur lors du chargement du message:', err);
      const errorMessage = err.message || err.toString() || 'Erreur inconnue';
      setError(errorMessage);
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
