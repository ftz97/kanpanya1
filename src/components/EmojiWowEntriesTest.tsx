"use client";
import { 
  rainEntryExplosive, 
  rainEntry3D, 
  rainEntryJackpot, 
  rainEntryFlash, 
  rainEntryWowJackpot 
} from "@/lib/emojiEntryPresets";

export default function EmojiWowEntriesTest() {
  return (
    <div className="flex flex-col gap-4 items-center p-6">
      <button onClick={() => rainEntryExplosive()} className="px-4 py-2 rounded bg-red-500 text-white">
        💥 Explosif
      </button>
      <button onClick={() => rainEntry3D()} className="px-4 py-2 rounded bg-blue-500 text-white">
        🪂 Perspective 3D
      </button>
      <button onClick={() => rainEntryJackpot()} className="px-4 py-2 rounded bg-green-500 text-white">
        🎰 Jackpot Burst
      </button>
      <button onClick={() => rainEntryFlash()} className="px-4 py-2 rounded bg-yellow-500 text-black">
        ✨ Flash lumineux
      </button>
      <button onClick={() => rainEntryWowJackpot()} className="px-4 py-2 rounded bg-purple-600 text-white font-bold">
        🏆 WOW Jackpot
      </button>
    </div>
  );
}
