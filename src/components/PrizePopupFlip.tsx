"use client";
import Popup from "./Popup";

export default function PrizePopupFlip({
  visible,
  won,
  prize,
  onClose,
}: {
  visible: boolean;
  won: boolean;
  prize: string;
  onClose: () => void;
}) {
  if (!visible) return null;

  const title = won ? "🎁 Félicitations !" : "💔 Pas de chance...";
  
  return (
    <Popup
      variant="banniere"
      title={title}
      message={prize}
      onClose={onClose}
    />
  );
}
