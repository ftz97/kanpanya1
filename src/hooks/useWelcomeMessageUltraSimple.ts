import { useState, useEffect } from 'react';

interface UseWelcomeMessageReturn {
  welcomeMessage: string;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useWelcomeMessageUltraSimple(
  userName: string, 
  language: 'fr' | 'en' | 'es' | 'gcf' = 'fr'
): UseWelcomeMessageReturn {
  const [welcomeMessage, setWelcomeMessage] = useState("Bienvenue ! 🌟");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMessage = () => {
    const hour = new Date().getHours();
    let period: string;
    if (hour >= 7 && hour < 12) period = 'morning';
    else if (hour >= 12 && hour < 19) period = 'afternoon';
    else period = 'evening';

    const messages = {
      fr: {
        morning: `Bonjour ${userName} ☀️`,
        afternoon: `Bon après-midi ${userName} 🌱`,
        evening: `Bonsoir ${userName} 🌙`,
      },
      en: {
        morning: `Good morning ${userName} ☀️`,
        afternoon: `Good afternoon ${userName} 🌱`,
        evening: `Good evening ${userName} 🌙`,
      },
      es: {
        morning: `Buenos días ${userName} ☀️`,
        afternoon: `Buenas tardes ${userName} 🌱`,
        evening: `Buenas noches ${userName} 🌙`,
      },
      gcf: {
        morning: `${userName}, bonjou ! ☀️`,
        afternoon: `Bon apremidi ${userName} 🌱`,
        evening: `Bonswa ${userName} 🌙`,
      },
    };

    const langMessages = messages[language] || messages.fr;
    return langMessages[period as keyof typeof langMessages] || `Bonjour ${userName} ! 🌟`;
  };

  const fetchWelcomeMessage = () => {
    try {
      setLoading(true);
      setError(null);
      
      const message = getMessage();
      setWelcomeMessage(message);
      
    } catch (err: any) {
      console.error('Erreur:', err);
      setError(err.message || 'Erreur inconnue');
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
