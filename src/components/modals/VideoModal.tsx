"use client";

import * as React from "react";
import { Play, X } from "lucide-react";
import { motion } from "framer-motion";
import { useModal } from "@/components/modal/ModalManager";
import VideoEndModal from "./VideoEndModal";

export default function VideoModal() {
  const { replace } = useModal();
  const [videoEnded, setVideoEnded] = React.useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Remplacer par le modal de fin de vidéo
    replace(<VideoEndModal />);
  };

  const handleClose = () => {
    // Le ModalManager gère la fermeture
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-teal-700 font-bold text-lg">🎥 Mutuelle Locale - Vidéo Interactive</h2>
        <button
          onClick={handleClose}
          className="btn btn-ghost btn-icon"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Zone vidéo avec triangle de lecture superposé */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-gray-100 rounded-2xl aspect-video overflow-hidden"
      >
        {/* Triangle de lecture centré sur la vidéo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleVideoEnd}
            className="w-20 h-20 bg-teal-600/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto shadow-2xl hover:bg-teal-700/90 transition-colors"
          >
            <Play className="w-8 h-8 text-white ml-1" />
          </motion.button>
        </div>
        
        {/* Informations de la vidéo en bas */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white"
          >
            <h3 className="text-xl font-semibold">
              Vidéo Mutuelle Locale
            </h3>
            <p className="text-white/80 mt-1">
              Découvrez nos services et gagnez des points !
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
