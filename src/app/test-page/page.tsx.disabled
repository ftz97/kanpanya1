"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PrizePopup from "@/components/PrizePopup";

export default function TestPage() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="p-6">
      <button
        onClick={() => setShowPopup(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Ouvrir le popup
      </button>

      <AnimatePresence>
        {showPopup && (
          <PrizePopup
            won={true}
            prize="+100 points"
            onClose={() => setShowPopup(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
