"use client";
import { 
  rainExitBounce, 
  rainExitSplash, 
  rainExitSlide, 
  rainExitZoomOut, 
  rainExitMagnet 
} from "@/lib/emojiExitPresets";

export default function EmojiExitTest() {
  return (
    <div className="flex flex-col gap-4 items-center p-6">
      <button onClick={() => rainExitBounce()} className="px-4 py-2 rounded-lg bg-blue-500 text-white">
        ⬇️ Bounce
      </button>
      <button onClick={() => rainExitSplash()} className="px-4 py-2 rounded-lg bg-pink-500 text-white">
        ✨ Splash
      </button>
      <button onClick={() => rainExitSlide()} className="px-4 py-2 rounded-lg bg-green-500 text-white">
        ↔️ Slide Out
      </button>
      <button onClick={() => rainExitZoomOut()} className="px-4 py-2 rounded-lg bg-purple-500 text-white">
        🔍 Zoom Out
      </button>
      <button onClick={() => rainExitMagnet()} className="px-4 py-2 rounded-lg bg-yellow-500 text-black">
        🧲 Magnet
      </button>
    </div>
  );
}
