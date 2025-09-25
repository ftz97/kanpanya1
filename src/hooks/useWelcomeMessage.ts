import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface UseWelcomeMessageReturn {
  welcomeMessage: string;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Messages de fallback locaux (français + créole haïtien)
const getFallbackMessages = (userName: string) => ({
  morning: [
    `Bonjour ${userName} ☀️`,
    `Salut ${userName} 👋`,
    `Bon matin ${userName} 🌸`,
    `${userName}, bonjou ! ☀️`,
    `Salut ${userName} 👋`,
  ],
  afternoon: [
    `Bon après-midi ${userName} 🌱`,
    `Salut ${userName} 🔥`,
    `Hey ${userName} 👋`,
    `Bon apremidi ${userName} 🌱`,
    `Hey ${userName} 🔥`,
  ],
  evening: [
    `Bonsoir ${userName} 🌙`,
    `Bonne soirée ${userName} 🌟`,
    `Salut ${userName} ✨`,
    `Bonswa ${userName} 🌙`,
    `Bon aswè ${userName} 🌟`,
  ],
});

export function useWelcomeMessage(userName: string): UseWelcomeMessageReturn {
  const [welcomeMessage, setWelcomeMessage] = useState("Bienvenue ! 🌟");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRandomFallbackMessage = (period: string) => {
    const fallbackMessages = getFallbackMessages(userName);
    const messages = fallbackMessages[period as keyof typeof fallbackMessages];
    if (messages) {
      return messages[Math.floor(Math.random() * messages.length)];
    }
    return `Bonjour ${userName} ! 🌟`;
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
          });

        if (rpcError) {
          console.error('Erreur RPC:', rpcError);
          setError(rpcError.message);
          // Fallback vers un message local en cas d'erreur
          setWelcomeMessage(getRandomFallbackMessage(period));
        } else if (data && data.length > 0) {
          setWelcomeMessage(data[0].message);
        } else {
          // Fallback si pas de données - message créole par défaut
          setWelcomeMessage(`${userName}, byenveni anlè Kanpanya 🌱`);
        }
      } catch (supabaseError) {
        console.log('Supabase non disponible, utilisation des messages locaux');
        // Utiliser les messages locaux si Supabase n'est pas disponible
        setWelcomeMessage(getRandomFallbackMessage(period));
      }
    } catch (err: any) {
      console.error('Erreur lors du chargement du message:', err);
      setError(err.message);
      // Fallback en cas d'erreur réseau
      setWelcomeMessage(`Hello ${userName} ! 🚀`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWelcomeMessage();
  }, [userName]);

  return {
    welcomeMessage,
    loading,
    error,
    refetch: fetchWelcomeMessage,
  };
}
