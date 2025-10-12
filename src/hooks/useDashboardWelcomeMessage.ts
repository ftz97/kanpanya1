import { useState, useMemo } from "react";

interface WelcomeMessages {
  morning: string[];
  afternoon: string[];
  evening: string[];
}

export const useDashboardWelcomeMessage = (userName: string) => {
  const [messageIndex] = useState(0);

  const { period, messages } = useMemo(() => {
    const hour = new Date().getHours();
    let currentPeriod: keyof WelcomeMessages;
    
    if (hour >= 7 && hour < 12) currentPeriod = 'morning';
    else if (hour >= 12 && hour < 19) currentPeriod = 'afternoon';
    else currentPeriod = 'evening';

    const welcomeMessages: WelcomeMessages = {
      morning: [
        `Bonjour ${userName} ☀️`,
        `Salut ${userName} 👋`,
        `Bon matin ${userName} 🌸`,
        `Hello ${userName} 🌞`,
        `Coucou ${userName} 🌱`
      ],
      afternoon: [
        `Bon après-midi ${userName} 🌱`,
        `Salut ${userName} 🔥`,
        `Hey ${userName} 👋`,
        `Yo ${userName} 😎`,
        `Coucou ${userName} 🛍️`
      ],
      evening: [
        `Bonsoir ${userName} 🌙`,
        `Bonne soirée ${userName} 🌟`,
        `Salut ${userName} ✨`,
        `Hey ${userName} 🛋️`,
        `Coucou ${userName} 🎉`
      ],
    };

    return { period: currentPeriod, messages: welcomeMessages };
  }, [userName]);

  const welcomeMessage = messages[period][messageIndex % messages[period].length];

  return { welcomeMessage, period };
};

