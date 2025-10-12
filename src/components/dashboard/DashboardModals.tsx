"use client";

import * as React from "react";
import dynamic from "next/dynamic";

// Dynamic imports
const StyledQRCode = dynamic(() => import("@/components/StyledQRCode"), { ssr: false });
const ScratchCardStableV3 = dynamic(() => import("@/components/scratch/ScratchCardStableV3"), { ssr: false });

interface DashboardModalsProps {
  // QR Modal
  showQRPopup: boolean;
  setShowQRPopup: (show: boolean) => void;
  
  // Rewards Modal
  showRewardsPopup: boolean;
  setShowRewardsPopup: (show: boolean) => void;
  
  // Tickets Modal
  isTicketPopupOpen: boolean;
  setIsTicketPopupOpen: (show: boolean) => void;
  tickets: number;
  ticketKey: number;
  onScratch: () => void;
  onRevealReward: (reward: { type: string; amount: number }) => void;
}

export default function DashboardModals({
  showQRPopup,
  setShowQRPopup,
  showRewardsPopup,
  setShowRewardsPopup,
  isTicketPopupOpen,
  setIsTicketPopupOpen,
  tickets,
  ticketKey,
  onScratch,
  onRevealReward,
}: DashboardModalsProps) {
  return (
    <>
      {/* Popup QR Code */}
      {showQRPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-5 w-full max-w-xs text-center shadow-md relative">
            {/* Bouton fermer */}
            <button
              onClick={() => setShowQRPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Fermer"
            >
              ×
            </button>

            {/* Titre */}
            <h3 className="text-lg font-bold text-[#123456] mb-4">Mon QR Code</h3>

            {/* QR code simple (sans déco) */}
            <div className="flex justify-center mb-4">
              <StyledQRCode
                value={`${typeof window !== 'undefined' ? window.location.origin : 'https://kanpanya.com'}/scan?client=kevin`}
                size={160}
                type="client"
                showDecoration={false}
              />
            </div>

            {/* Texte explicatif */}
            <p className="text-sm text-gray-600 mb-4">
              Montrez ce QR aux commerçants pour gagner des points.
            </p>

            {/* Bouton fermer */}
            <button
              onClick={() => setShowQRPopup(false)}
              className="w-full bg-[#17BFA0] text-white py-2 rounded-lg font-medium hover:bg-[#14a58e] active:scale-95 transition-all duration-200"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Popup Récompenses */}
      {showRewardsPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs relative shadow-lg text-center">
            {/* Bouton fermer */}
            <button
              onClick={() => setShowRewardsPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
              aria-label="Fermer"
            >
              ×
            </button>

            {/* Titre */}
            <h3 className="text-lg font-bold text-[#123456] mb-4">
              🎁 Mes Récompenses
            </h3>

            {/* Liste des récompenses */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">10% chez ton coiffeur</span>
                <span className="text-xs bg-[#17BFA0] text-white px-2 py-1 rounded-lg">150 pts</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">1 boisson offerte</span>
                <span className="text-xs bg-[#17BFA0] text-white px-2 py-1 rounded-lg">80 pts</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">🎉 Ticket Tombola</span>
                <span className="text-xs bg-[#17BFA0] text-white px-2 py-1 rounded-lg">50 pts</span>
              </div>
            </div>

            {/* Petit texte fun */}
            <p className="text-sm text-gray-600 mb-4">
              Continue à scanner pour débloquer encore plus de 🎊 surprises !
            </p>

            {/* Bouton fermer */}
            <button
              onClick={() => setShowRewardsPopup(false)}
              className="w-full bg-[#17BFA0] text-white py-2 rounded-lg font-medium hover:bg-[#14a58e] active:scale-95 transition-all duration-200"
            >
              🚀 Fermer
            </button>
          </div>
        </div>
      )}

      {/* Popup Tickets */}
      {isTicketPopupOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 relative">
            {/* Bouton fermer */}
            <button
              onClick={() => setIsTicketPopupOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            {/* Titre + compteur */}
            <div className="flex justify-center items-center gap-2 mb-4">
              <h2 className="text-xl font-bold">🎟️ Gratte ton ticket</h2>
              {tickets > 0 && (
                <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {tickets}
                </span>
              )}
            </div>

            {/* Zone ticket avec ScratchCardStableV3 */}
            <div className="flex justify-center mb-4">
              <ScratchCardStableV3
                key={ticketKey}
                threshold={0.4}
                goldenTicketChance={1.0}
                userId="dashboard-user"
                onReveal={onRevealReward}
              />
            </div>

            {/* Texte d'aide */}
            <p className="text-sm text-gray-600 text-center mb-4">
              Gratte pour découvrir ta récompense 🎁
            </p>

            {/* Boutons d'action */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsTicketPopupOpen(false)}
                className="flex-1 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 active:scale-95 transition-all duration-200 py-2"
              >
                ⏸️ Plus tard
              </button>
              {tickets > 0 ? (
                <button
                  onClick={onScratch}
                  className="flex-1 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 active:scale-95 transition-all duration-200 py-2"
                >
                  🎟️ Gratter un autre
                </button>
              ) : (
                <button
                  className="flex-1 bg-gray-400 text-white rounded-xl font-semibold cursor-not-allowed py-2"
                  disabled
                >
                  🔒 Plus de tickets
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

