"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  color: string;
}

export default function ProgressBar({ progress, color }: ProgressBarProps) {
  return (
    <div className="h-1 bg-gray-200 rounded-full mt-3 overflow-hidden">
      <motion.div
        className={`h-full ${color}`}
        initial={{ width: "0%" }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
      />
    </div>
  );
}

