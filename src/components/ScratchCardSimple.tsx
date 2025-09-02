"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

export default function ScratchCardSimple({ configId, userId }: { configId: string; userId?: string }) {
  const supabase = createClientComponentClient();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const play = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("use_scratch_ticket", {
      p_config_id: configId,
      p_user_id: userId ?? null,
    });
    setLoading(false);
    if (error) {
      console.error(error);
    } else {
      setResult(data);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <motion.button
        whileTap={{ scale: 0.95 }}
        disabled={loading}
        onClick={play}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow"
      >
        {loading ? "⏳ Grattage..." : "🎟️ Gratter mon ticket"}
      </motion.button>

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
    </div>
  );
}
