"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VideoEndModal from "./VideoEndModal";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVideoEnd?: () => void;
  onStartQuiz?: () => void;
};

export default function VideoModal({ open, onOpenChange, onVideoEnd, onStartQuiz }: Props) {
  const [videoEnded, setVideoEnded] = React.useState(false);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [showEndModal, setShowEndModal] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setVideoEnded(false);
      setShowQuiz(false);
      setShowEndModal(false);
    }
  }, [open]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setShowEndModal(true);
    onVideoEnd?.();
  };

  const handleStartQuiz = () => {
    setShowEndModal(false);
    setShowQuiz(true);
    onStartQuiz?.();
  };

  const handleCloseEndModal = () => {
    setShowEndModal(false);
    setVideoEnded(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setVideoEnded(false);
    setShowQuiz(false);
    setShowEndModal(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
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
                className="relative bg-gray-100 rounded-2xl aspect-video flex items-center justify-center"
              >
                {/* Placeholder pour la vidéo */}
                <div className="text-center space-y-4">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto"
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      Vidéo Mutuelle Locale
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Découvrez nos services et gagnez des points !
                    </p>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleVideoEnd}
                    className="btn btn-primary"
                  >
                    Simuler la fin de vidéo
                  </motion.button>
                </div>
              </motion.div>
            ) : showQuiz ? (
              <div className="text-center space-y-4 py-4">
                <h3 className="text-xl font-semibold text-teal-700">
                  Quiz Nutrition - Mutuelle Locale
                </h3>
                <p className="text-gray-600">
                  Répondez aux questions pour gagner des points supplémentaires !
                </p>
                {/* Le quiz sera intégré ici via props ou context */}
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                  <p className="text-sm text-teal-700">
                    Le quiz sera lancé dans une nouvelle modal pour une meilleure expérience.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de fin de vidéo avec animation */}
      <VideoEndModal
        isOpen={showEndModal}
        onClose={handleCloseEndModal}
        onStartQuiz={handleStartQuiz}
        points={5}
      />
    </>
  );
}
