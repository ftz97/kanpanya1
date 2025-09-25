"use client";

interface ScanRewardPopupProps {
  isOpen: boolean;
  onClose: () => void;
  reward: {
    points: number;
    merchantName: string;
    message: string;
  };
}

export default function ScanRewardPopup({
  isOpen,
  onClose,
  reward
}: ScanRewardPopupProps) {
  if (!isOpen) return null;

  const getEmoji = () => {
    if (reward.points >= 20) return "🎉";
    if (reward.points >= 10) return "🌟";
    return "⭐";
  };

  const getColor = () => {
    if (reward.points >= 20) return "from-green-400 to-emerald-500";
    if (reward.points >= 10) return "from-blue-400 to-cyan-500";
    return "from-purple-400 to-pink-500";
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Récompense */}
        <div className={`relative p-6 rounded-2xl bg-gradient-to-r ${getColor()} text-white text-center shadow-lg mb-4`}>
          <div className="text-5xl mb-3">
            {getEmoji()}
          </div>
          
          <h3 className="text-xl font-bold mb-2">
            Scan réussi !
          </h3>
          
          <div className="text-2xl font-bold mb-2">
            +{reward.points} points
          </div>
          
          <p className="text-sm opacity-90">
            Chez {reward.merchantName}
          </p>
        </div>

        {/* Message personnalisé */}
        <div className="text-center mb-4">
          <p className="text-gray-700 font-medium">
            {reward.message}
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="space-y-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg"
          >
            🎊 Continuer
          </button>
          
          <button
            onClick={() => {
              onClose();
              window.location.href = "/reward";
            }}
            className="w-full py-2 text-green-600 font-medium hover:text-green-700 transition-colors"
          >
            Voir toutes mes récompenses
          </button>
        </div>
      </div>
    </div>
  );
}
