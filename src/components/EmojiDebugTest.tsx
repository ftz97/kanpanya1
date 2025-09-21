"use client";
import { rainMajestic } from "@/lib/emojiMajesticPresets";

export default function EmojiDebugTest() {
  const handleTest = async () => {
    console.log("🚀 Début de l'animation majestueuse");
    
    // Test direct avec startEmojiRain
    const { startEmojiRain } = await import("@/lib/emojiRain");
    
    const result = startEmojiRain({
      emojis: ["🎁", "💰", "💎", "✨", "🌟", "🤑"],
      count: 5, // Peu d'emojis pour debug
      durationRange: [3000, 4000],
      sizeRange: [40, 60],
      driftRange: [80, 160],
      spinRange: [0, 2],
      staggerRange: [0, 500],
      fullOpacity: true,
    });
    
    console.log("📊 Résultat:", result);
  };

  const handleTestOriginal = () => {
    console.log("🎯 Test avec rainMajestic original");
    rainMajestic();
  };

  return (
    <div className="flex flex-col gap-6 items-center p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4">🔍 DEBUG OPACITÉ</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <button 
          onClick={handleTest} 
          className="px-6 py-4 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
        >
          🧪 Test Direct Debug
        </button>
        
        <button 
          onClick={handleTestOriginal} 
          className="px-6 py-4 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors"
        >
          👑 Test Original
        </button>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg max-w-2xl w-full">
        <h3 className="text-lg font-semibold mb-2">📋 Instructions Debug :</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Ouvrez la console du navigateur (F12)</li>
          <li>Cliquez sur &quot;Test Direct Debug&quot;</li>
          <li>Vérifiez les logs dans la console</li>
          <li>Observez l&apos;opacité des emojis qui apparaissent</li>
          <li>Comparez avec &quot;Test Original&quot;</li>
        </ol>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg max-w-2xl w-full">
        <h3 className="text-lg font-semibold mb-2">🎯 Ce qu&apos;il faut vérifier :</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Les emojis apparaissent-ils avec 100% d&apos;opacité ?</li>
          <li>Y a-t-il un fade-in ou fade-out ?</li>
          <li>Les emojis restent-ils visibles pendant toute la chute ?</li>
          <li>Y a-t-il des erreurs dans la console ?</li>
        </ul>
      </div>
    </div>
  );
}
