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

  const trigger = (type: "happy" | "sad" | "money") => {
    // Reset all states
    setState({ happy: false, sad: false, money: false });
    
    // Activate the requested animation
    setState((prev) => ({ ...prev, [type]: true }));
    
    // Auto-clear after 3 seconds
    setTimeout(() => {
      setState({ happy: false, sad: false, money: false });
    }, 3000);
  };

  return { 
    ...state, 
    trigger 
  };
};

