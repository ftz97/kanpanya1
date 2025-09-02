"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, X } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onVideoEnd?: () => void;
  onStartQuiz?: () => void;
};

export default function VideoModalSimple({ isOpen, onOpenChange, onVideoEnd, onStartQuiz }: Props) {
  const [videoEnded, setVideoEnded] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setVideoEnded(false);
    }
  }, [isOpen]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    onVideoEnd?.();
  };

  const handleClose = () => {
    onOpenChange(false);
    setVideoEnded(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-teal-700 text-center flex items-center justify-between">
            <span>🎥 Mutuelle Locale - Vidéo Interactive</span>
            <button
              onClick={handleClose}
              className="btn btn-ghost btn-icon"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!videoEnded ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gray-100 rounded-2xl aspect-video overflow-hidden"
            >
              {/* Zone vidéo avec triangle de lecture superposé */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Triangle de lecture centré sur la vidéo */}
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
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-2xl text-center space-y-4"
            >
              <h3 className="text-xl font-semibold text-teal-700">
                Vidéo terminée !
              </h3>
              <p className="text-gray-600">
                Vous avez gagné 5 points ! Voulez-vous continuer avec le quiz ?
              </p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStartQuiz}
                className="btn btn-primary"
              >
                Commencer le Quiz
              </motion.button>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
