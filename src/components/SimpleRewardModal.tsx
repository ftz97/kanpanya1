"use client";

interface SimpleRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  reward: {
    type: "points" | "coupon";
    amount?: number;
    code?: string;
    label: string;
  };
}

export default function SimpleRewardModal({
  isOpen,
  onClose,
  reward
}: SimpleRewardModalProps) {
  if (!isOpen) return null;

  const getEmoji = () => {
    if (reward.type === "coupon") return "🎫";
    if (reward.amount && reward.amount > 25) return "💰";
    if (reward.amount && reward.amount > 0) return "⭐";
    return "😊";
  };

  const getColor = () => {
    if (reward.type === "coupon") return "from-yellow-400 to-orange-500";
    if (reward.amount && reward.amount > 25) return "from-green-400 to-emerald-500";
    if (reward.amount && reward.amount > 0) return "from-blue-400 to-cyan-500";
    return "from-gray-300 to-gray-400";
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Récompense */}
        <div className={`relative p-6 rounded-2xl bg-gradient-to-r ${getColor()} text-white text-center shadow-lg mb-4`}>
          <div className="text-4xl mb-3">
            {getEmoji()}
          </div>
          
          <h3 className="text-xl font-bold mb-2">
            {reward.label}
          </h3>
          
          {reward.type === "coupon" && reward.code && (
            <div className="text-lg font-mono bg-white/20 rounded-lg p-2 mt-2">
              Code: {reward.code}
            </div>
          )}
          
          {reward.type === "points" && reward.amount && reward.amount > 0 && (
            <div className="text-2xl font-bold">
              +{reward.amount} points
            </div>
          )}
        </div>

        {/* Bouton continuer */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg"
        >
          🎉 Continuer
        </button>
      </div>
    </div>
  );
}
