"use client";

interface FunRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  reward: {
    type: "points" | "coupon";
    amount?: number;
    code?: string;
    label: string;
  };
}

export default function FunRewardModal({
  isOpen,
  onClose,
  reward
}: FunRewardModalProps) {
  if (!isOpen) return null;

  const getEmoji = () => {
    if (reward.type === "coupon") return "🎫";
    if (reward.amount && reward.amount > 25) return "💎";
    if (reward.amount && reward.amount > 0) return "🌟";
    return "🎊";
  };

  const getBackground = () => {
    if (reward.type === "coupon") return "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-300";
    if (reward.amount && reward.amount > 25) return "bg-gradient-to-br from-green-100 to-emerald-100 border-green-300";
    if (reward.amount && reward.amount > 0) return "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-300";
    return "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300";
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className={`rounded-3xl p-6 max-w-sm w-full shadow-2xl border-2 ${getBackground()}`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Récompense fun */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">
            {getEmoji()}
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {reward.label}
          </h3>
          
          {reward.type === "coupon" && reward.code && (
            <div className="bg-white/80 rounded-xl p-3 mt-3 border-2 border-yellow-400">
              <p className="text-sm text-gray-600 mb-1">Votre code :</p>
              <div className="text-xl font-bold text-yellow-700 font-mono">
                {reward.code}
              </div>
            </div>
          )}
          
          {reward.type === "points" && reward.amount && reward.amount > 0 && (
            <div className="bg-white/80 rounded-xl p-3 mt-3 border-2 border-green-400">
              <div className="text-3xl font-bold text-green-700">
                +{reward.amount} points
              </div>
              <p className="text-sm text-gray-600">Ajoutés à votre compte !</p>
            </div>
          )}
        </div>

        {/* Bouton fun */}
        <button
          onClick={onClose}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg transform hover:scale-105"
        >
          🚀 C'est parti !
        </button>
        
        {/* Message fun */}
        <p className="text-center text-sm text-gray-600 mt-3">
          🎉 Merci d'avoir joué !
        </p>
      </div>
    </div>
  );
}
