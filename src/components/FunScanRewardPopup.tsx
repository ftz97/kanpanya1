"use client";

interface FunScanRewardPopupProps {
  isOpen: boolean;
  onClose: () => void;
  reward: {
    points: number;
    merchantName: string;
    message: string;
  };
}

export default function FunScanRewardPopup({
  isOpen,
  onClose,
  reward
}: FunScanRewardPopupProps) {
  if (!isOpen) return null;

  const getEmoji = () => {
    if (reward.points >= 20) return "💎";
    if (reward.points >= 10) return "🎁";
    return "✨";
  };

  const getBackground = () => {
    if (reward.points >= 20) return "bg-gradient-to-br from-green-100 to-emerald-100 border-green-300";
    if (reward.points >= 10) return "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-300";
    return "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300";
  };

  const getCelebrationText = () => {
    if (reward.points >= 20) return "🎉 INCROYABLE ! 🎉";
    if (reward.points >= 10) return "🌟 BRAVO ! 🌟";
    return "🎊 SUPER ! 🎊";
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
          <div className="text-7xl mb-4 animate-bounce">
            {getEmoji()}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {getCelebrationText()}
          </h2>
          
          <div className="bg-white/80 rounded-xl p-4 mt-4 border-2 border-yellow-400">
            <div className="text-4xl font-bold text-green-700 mb-1">
              +{reward.points} points
            </div>
            <p className="text-sm text-gray-600 mb-2">Ajoutés à votre compte !</p>
            <p className="text-sm text-gray-500">
              Chez {reward.merchantName}
            </p>
          </div>
        </div>

        {/* Message fun */}
        <div className="text-center mb-6">
          <div className="bg-white/60 rounded-xl p-3 border border-gray-200">
            <p className="text-gray-700 font-medium">
              {reward.message}
            </p>
          </div>
        </div>

        {/* Boutons fun */}
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg transform hover:scale-105"
          >
            🚀 C'est parti !
          </button>
          
          <button
            onClick={() => {
              onClose();
              window.location.href = "/reward";
            }}
            className="w-full py-2 text-purple-600 font-medium hover:text-purple-700 transition-colors"
          >
            📊 Voir mes statistiques
          </button>
        </div>
        
        {/* Message fun en bas */}
        <p className="text-center text-sm text-gray-600 mt-3">
          🎉 Merci d'avoir scanné !
        </p>
      </div>
    </div>
  );
}
