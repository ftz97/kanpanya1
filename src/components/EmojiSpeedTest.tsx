"use client";
import { rainSlow, rainMedium, rainFast } from "@/lib/emojiSpeedPresets";

export default function EmojiSpeedTest() {
  return (
    <div className="flex flex-col gap-4 items-center p-6">
      <button
        onClick={() => rainSlow()}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white"
      >
        🌙 Slow
      </button>

      <button
        onClick={() => rainMedium()}
        className="px-4 py-2 rounded-lg bg-purple-600 text-white"
      >
        ☁️ Medium
      </button>

      <button
        onClick={() => rainFast()}
        className="px-4 py-2 rounded-lg bg-red-600 text-white"
      >
        ⚡ Fast
      </button>
    </div>
  );
}
