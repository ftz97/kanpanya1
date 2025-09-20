"use client";
import { useEffect, useState } from "react";
import Popup from "./Popup";

export default function ResultPopup({
  won,
  visible,
  prize,
}: {
  won: boolean;
  visible: boolean;
  prize: string;
}) {
  const [count, setCount] = useState(0);

  // compteur qui monte
  useEffect(() => {
    if (visible && won && prize.includes("points")) {
      const value = parseInt(prize.match(/\d+/)?.[0] || "0");
      let i = 0;
      const interval = setInterval(() => {
        i += 5;
        if (i >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(i);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [visible, won, prize]);

  if (!visible) return null;

  const title = won ? "🎁 Carte Collector !" : "💔 Pas de chance...";
  const message = won && prize.includes("points") 
    ? `+${count} points` 
    : prize;

  return (
    <Popup
      variant="banniere"
      title={title}
      message={message}
      onClose={() => {}} // Pas de fermeture pour ce composant
    />
  );
}