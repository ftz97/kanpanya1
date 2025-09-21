"use client";
import { rainSlow, rainMedium, rainFast } from "@/lib/emojiSpeedDensityPresets";

export default function EmojiSpeedDensityTest() {
  return (
    <div className="flex flex-col gap-6 items-center p-6">
      {/* Slow */}
      <div className="flex gap-2">
        <button onClick={() => rainSlow("low")} className="px-4 py-2 rounded bg-blue-500 text-white">🌙 Slow Low</button>
        <button onClick={() => rainSlow("medium")} className="px-4 py-2 rounded bg-blue-600 text-white">🌙 Slow Med</button>
        <button onClick={() => rainSlow("high")} className="px-4 py-2 rounded bg-blue-700 text-white">🌙 Slow High</button>
      </div>

      {/* Medium */}
      <div className="flex gap-2">
        <button onClick={() => rainMedium("low")} className="px-4 py-2 rounded bg-purple-500 text-white">☁️ Med Low</button>
        <button onClick={() => rainMedium("medium")} className="px-4 py-2 rounded bg-purple-600 text-white">☁️ Med Med</button>
        <button onClick={() => rainMedium("high")} className="px-4 py-2 rounded bg-purple-700 text-white">☁️ Med High</button>
      </div>

      {/* Fast */}
      <div className="flex gap-2">
        <button onClick={() => rainFast("low")} className="px-4 py-2 rounded bg-red-500 text-white">⚡ Fast Low</button>
        <button onClick={() => rainFast("medium")} className="px-4 py-2 rounded bg-red-600 text-white">⚡ Fast Med</button>
        <button onClick={() => rainFast("high")} className="px-4 py-2 rounded bg-red-700 text-white">⚡ Fast High</button>
      </div>
    </div>
  );
}
