"use client";

import { useState } from "react";

interface EmojiState {
  happy: boolean;
  sad: boolean;
  money: boolean;
}

export const useEmojiAnimation = () => {
  const [state, setState] = useState<EmojiState>({ 
    happy: false, 
    sad: false, 
    money: false 
  });
  const [cooldown, setCooldown] = useState(false);

  const trigger = (type: "happy" | "sad" | "money") => {
    // Ignorer si en cooldown
    if (cooldown) return;
    
    // Activer le cooldown
    setCooldown(true);
    
    // Reset all states
    setState({ happy: false, sad: false, money: false });
    
    // Activate the requested animation
    setState((prev) => ({ ...prev, [type]: true }));
    
    // Auto-clear after 3 seconds
    setTimeout(() => {
      setState({ happy: false, sad: false, money: false });
    }, 3000);
    
    // Reset cooldown after 2 seconds
    setTimeout(() => {
      setCooldown(false);
    }, 2000);
  };

  return { 
    ...state, 
    trigger 
  };
};

