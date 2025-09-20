"use client";

import { Play, X, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { useModal } from "@/components/modal/ModalManager";
import { useState, useEffect } from "react";

interface VideoModalProps {
  onEnd?: () => void;
}

export default function VideoModal({ onEnd }: VideoModalProps = {}) {
  const { close } = useModal();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration] = useState(15); // Durée mock de 15 secondes

  // Effet pour simuler la lecture de la vidéo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= duration) {
            setIsPlaying(false);
            handleVideoEnd();
            return duration;
          }
          return newProgress;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration]);

  const handleVideoEnd = () => {
    console.log("🎬 Vidéo terminée, appel du callback onEnd");
    if (onEnd) {
      onEnd();
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    close();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-teal-700 font-bold text-lg">🎥 Mutuelle Locale - Vidéo Interactive</h2>
        <button
          onClick={handleClose}
          className="btn btn-ghost btn-icon"
          aria-label="Fermer la vidéo"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Zone vidéo avec lecteur mock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl aspect-video overflow-hidden"
      >
        {/* Contenu vidéo mock */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-32 h-20 bg-teal-600/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🎥</span>
            </div>
            <p className="text-sm opacity-80">Vidéo Mutuelle Locale</p>
          </div>
        </div>

        {/* Contrôles de lecture */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="w-20 h-20 bg-teal-600/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto shadow-2xl hover:bg-teal-700/90 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            style={{ zIndex: 999 }}
            aria-label={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </button>
        </div>

        {/* Barre de progression */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="mb-2">
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(progress / duration) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-white text-sm">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
