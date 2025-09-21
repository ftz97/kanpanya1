"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import SadEmojiRain from "./SadEmojiRain";
import HappyEmojiRain from "./HappyEmojiRain";
import MoneyEmojiRain from "./MoneyEmojiRain";

export default function ScratchCardSimple({ configId, userId }: { configId: string; userId?: string }) {
  const supabase = createClientComponentClient();
  const [result, setResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [creatingTicket, setCreatingTicket] = useState(false);
  
  // États pour les animations d'emojis
  const [showSadEmojis, setShowSadEmojis] = useState(false);
  const [showHappyEmojis, setShowHappyEmojis] = useState(false);
  const [showMoneyEmojis, setShowMoneyEmojis] = useState(false);
  
  // Configuration des emojis
  const emojiConfig = {
    count: 20,
    speedConfig: { duration: 3, delay: 1.5 }
  };

  const play = async () => {
    setLoading(true);
    console.log("Début du grattage avec configId:", configId, "userId:", userId);
    
    try {
      // Vérifier d'abord si l'utilisateur est authentifié
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.log("Mode démo : Simulation d'un grattage");
        // Simuler un résultat aléatoire pour la démo
        const isWin = Math.random() > 0.5;
        const rewardAmount = isWin ? Math.floor(Math.random() * 100) + 10 : 0;
        setResult({
          status: isWin ? "win" : "lose",
          reward: isWin ? `+${rewardAmount} points bonus !` : "Pas de gain cette fois...",
          remaining_jackpots: 0
        });
        
        // Déclencher les animations d'emojis selon le résultat simulé
        if (isWin) {
          if (rewardAmount >= 50) {
            // Gros gain = emojis d'argent
            setShowMoneyEmojis(true);
            setTimeout(() => setShowMoneyEmojis(false), 5000);
          } else {
            // Petit gain = emojis heureux
            setShowHappyEmojis(true);
            setTimeout(() => setShowHappyEmojis(false), 5000);
          }
        } else {
          // Perte = emojis tristes
          setShowSadEmojis(true);
          setTimeout(() => setShowSadEmojis(false), 5000);
        }
        return;
      }

      console.log("Utilisateur authentifié:", user.id);
      
      // D'abord, récupérer un ticket en attente
      const { data: pendingTicket, error: pendingError } = await supabase.rpc("get_pending_scratch");
      
      console.log("Réponse get_pending_scratch:", { pendingTicket, pendingError });
      
      if (pendingError) {
        console.error("Erreur lors de la récupération du ticket:", pendingError);
        setResult({ status: "error", message: pendingError.message || "Erreur lors de la récupération du ticket" });
        return;
      }
      
      if (!pendingTicket || pendingTicket.length === 0) {
        console.log("Aucun ticket en attente");
        setResult({ status: "lose", reward: "Aucun ticket disponible. Terminez un quiz pour en obtenir un !" });
        return;
      }
      
      // Si c'est un tableau, prendre le premier élément
      const ticket = Array.isArray(pendingTicket) ? pendingTicket[0] : pendingTicket;
      console.log("Ticket en attente trouvé:", ticket);
      
      // Révéler le ticket
      const { data: revealedTicket, error: revealError } = await supabase.rpc("reveal_scratch", {
        p_ticket_id: ticket.id
      });
      
      if (revealError) {
        console.error("Erreur lors de la révélation:", revealError);
        setResult({ status: "error", message: revealError.message || "Erreur lors du grattage" });
        // Afficher des emojis tristes en cas d'erreur
        setShowSadEmojis(true);
        setTimeout(() => setShowSadEmojis(false), 5000);
      } else {
        console.log("Ticket révélé:", revealedTicket);
        const isWin = revealedTicket.reward_amount > 0;
        setResult({
          status: isWin ? "win" : "lose",
          reward: revealedTicket.reward_label || `+${revealedTicket.reward_amount} points`,
          remaining_jackpots: 0 // Pas de jackpots dans ce système
        });
        
        // Déclencher les animations d'emojis selon le résultat
        if (isWin) {
          if (revealedTicket.reward_amount >= 50) {
            // Gros gain = emojis d'argent
            setShowMoneyEmojis(true);
            setTimeout(() => setShowMoneyEmojis(false), 5000);
          } else {
            // Petit gain = emojis heureux
            setShowHappyEmojis(true);
            setTimeout(() => setShowHappyEmojis(false), 5000);
          }
        } else {
          // Perte = emojis tristes
          setShowSadEmojis(true);
          setTimeout(() => setShowSadEmojis(false), 5000);
        }
      }
    } catch (err) {
      console.error("Erreur inattendue:", err);
      setResult({ status: "error", message: "Une erreur inattendue s'est produite" });
    } finally {
      setLoading(false);
    }
  };

  const createTestTicket = async () => {
    setCreatingTicket(true);
    try {
      // Vérifier d'abord si l'utilisateur est authentifié
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.log("Utilisateur non authentifié, création d'un ticket simulé");
        setResult({ 
          status: "success", 
          message: "Mode démo : Ticket simulé créé ! Cliquez sur 'Gratter' pour tester l'animation." 
        });
        return;
      }

      console.log("Utilisateur authentifié:", user.id);
      
      const { data, error } = await supabase.rpc("grant_scratch_after_quiz", {
        p_quiz_id: "test-quiz-" + Date.now(),
        p_points: 20,
        p_label: "Ticket de test"
      });
      
      console.log("Réponse grant_scratch_after_quiz:", { data, error });
      
      if (error) {
        console.error("Erreur création ticket:", error);
        setResult({ status: "error", message: `Erreur lors de la création du ticket: ${error.message || 'API non disponible'}` });
      } else {
        console.log("Ticket créé:", data);
        setResult({ status: "success", message: "Ticket de test créé ! Vous pouvez maintenant gratter." });
      }
    } catch (err) {
      console.error("Erreur création ticket:", err);
      setResult({ status: "error", message: `Erreur lors de la création du ticket: ${err.message || 'Erreur inconnue'}` });
    } finally {
      setCreatingTicket(false);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center space-y-4">
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          onClick={play}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow"
        >
          {loading ? "⏳ Grattage..." : "🎟️ Gratter mon ticket"}
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={creatingTicket}
          onClick={createTestTicket}
          className="bg-green-600 text-white px-6 py-3 rounded-xl shadow"
        >
          {creatingTicket ? "⏳ Création..." : "🎫 Créer ticket test"}
        </motion.button>
      </div>

      {result && (
        <div className="mt-6 text-center">
          {result.status === "win" ? (
            <>
              <Confetti />
              <h2 className="text-2xl font-bold text-green-600">🥳 Bravo !</h2>
              <p className="mt-2">{result.reward}</p>
              <p className="text-sm text-gray-500">
                Jackpots restants : {result.remaining_jackpots}
              </p>
            </>
          ) : result.status === "error" ? (
            <>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-red-600">❌ Erreur</h2>
                <p className="mt-2 text-red-500">{result.message}</p>
              </motion.div>
            </>
          ) : result.status === "success" ? (
            <>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-green-600">✅ Succès</h2>
                <p className="mt-2 text-green-500">{result.message}</p>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-red-600">😢 Perdu</h2>
                <p className="mt-2">{result.reward}</p>
              </motion.div>
            </>
          )}
        </div>
      )}

      {/* Animations d'emojis */}
      {showSadEmojis && <SadEmojiRain count={emojiConfig.count} speedConfig={emojiConfig.speedConfig} />}
      {showHappyEmojis && <HappyEmojiRain count={emojiConfig.count} speedConfig={emojiConfig.speedConfig} />}
      {showMoneyEmojis && <MoneyEmojiRain count={emojiConfig.count} speedConfig={emojiConfig.speedConfig} />}
    </div>
  );
}
