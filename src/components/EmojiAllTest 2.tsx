"use client";
import { 
  rainSlowMotionOscillating, 
  rainSlowMotionDepth, 
  rainOrganic,
  rainSlowMotionDynamic 
} from "@/lib/emojiAllPresets";

export default function EmojiAllTest() {
  return (
    <div className="flex flex-col gap-4 items-center p-6">
      <button
        onClick={() => rainSlowMotionOscillating()}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white"
      >
        1️⃣ Slow Motion Oscillating
      </button>

      <button
        onClick={() => rainSlowMotionDepth()}
        className="px-4 py-2 rounded-lg bg-purple-600 text-white"
      >
        2️⃣ Slow Motion Depth + Glow
      </button>

      <button
        onClick={() => rainOrganic()}
        className="px-4 py-2 rounded-lg bg-green-600 text-white"
      >
        3️⃣ Pluie Organique
      </button>

      <button
        onClick={() => rainSlowMotionDynamic()}
        className="px-4 py-2 rounded-lg bg-orange-600 text-white"
      >
        4️⃣ Slow Motion Dynamic
      </button>
    </div>
  );
}
