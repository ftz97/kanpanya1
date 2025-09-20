"use client";
import Popup from "./Popup";

export default function PrizePopup({
  won,
  prize,
  onClose,
}: {
  won: boolean;
  prize: string;
  onClose: () => void;
}) {
  const title = won ? "🎁 Félicitations !" : "😢 Pas de chance...";
  
  return (
    <Popup
      variant="banniere"
      title={title}
      message={prize}
      onClose={onClose}
    />
  );
}
