"use client";
import { useState } from "react";

export default function TicketPage() {
  // nombre de tickets en stock
  const [tickets, setTickets] = useState(3);
  // état du ticket courant
  const [revealed, setRevealed] = useState(false);
  // message révélé
  const [message, setMessage] = useState("");

  // simulation gain/perte
  const revealTicket = () => {
    const win = Math.random() > 0.5;
    setMessage(win ? "🎁 Bravo, +50 points !" : "😔 Dommage, retente bientôt !");
    setRevealed(true);
    setTickets((prev) => prev - 1);
  };

  // reset pour gratter un autre
  const nextTicket = () => {
    setRevealed(false);
    setMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-sm w-full space-y-4">
        {tickets === 0 && !revealed ? (
          // État : pas de ticket
          <div className="p-6 bg-white rounded-2xl shadow-md text-center">
            <p className="text-lg font-semibold">🎟️ Pas de ticket pour le moment</p>
            <p className="text-gray-500 mt-1 text-sm">
              Regarde une vidéo ou scanne chez un commerçant pour en gagner un.
            </p>
          </div>
        ) : (
          // État : ticket dispo
          <div className="p-6 bg-white rounded-2xl shadow-lg text-center relative">
            {/* Titre + compteur */}
            <div className="flex justify-center items-center gap-2 mb-4">
              <h2 className="text-xl font-bold">🎟️ Gratte ton ticket</h2>
              {tickets > 0 && (
                <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {tickets}
                </span>
              )}
            </div>

            {/* Zone grattage ou résultat */}
            {!revealed ? (
              <button
                onClick={revealTicket}
                className="w-full h-28 flex items-center justify-center rounded-xl bg-gradient-to-r from-gray-300 via-gray-200 to-gray-400 text-white font-bold shadow-inner"
              >
                ✨ Gratte ici ✨
              </button>
            ) : (
              <div className="space-y-4">
                <div className="w-full h-28 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 text-gray-800 font-bold shadow-inner">
                  {message}
                </div>

                {/* Options après grattage */}
                {tickets > 0 ? (
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={nextTicket}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-semibold shadow hover:bg-emerald-600"
                    >
                      🎟️ Gratter un autre
                    </button>
                    <button
                      onClick={() => {
                        setRevealed(false);
                        setMessage("");
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300"
                    >
                      ⏸️ Plus tard
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Plus de ticket disponible</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
