"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVideoEnd?: () => void;
  onStartQuiz?: () => void;
};

export default function VideoModal({ open, onOpenChange, onVideoEnd, onStartQuiz }: Props) {
  const [videoEnded, setVideoEnded] = React.useState(false);
  const [showQuiz, setShowQuiz] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setVideoEnded(false);
      setShowQuiz(false);
    }
  }, [open]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    onVideoEnd?.();
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    onStartQuiz?.();
  };

  const handleClose = () => {
    onOpenChange(false);
    setVideoEnded(false);
    setShowQuiz(false);
  };

  return (
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
            <div className="relative bg-gray-100 rounded-2xl aspect-video flex items-center justify-center">
              {/* Placeholder pour la vidéo */}
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Vidéo Mutuelle Locale
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Découvrez nos services et gagnez des points !
                  </p>
                </div>
                <button
                  onClick={handleVideoEnd}
                  className="btn btn-primary"
                >
                  Simuler la fin de vidéo
                </button>
              </div>
            </div>
          ) : !showQuiz ? (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Vidéo terminée !
                </h3>
                <p className="text-gray-600">
                  Vous avez gagné <span className="font-semibold text-teal-600">5 points</span> pour avoir regardé la vidéo.
                </p>
                <p className="text-gray-600 mt-2">
                  Maintenant, testez vos connaissances avec notre quiz nutrition et gagnez encore plus de points !
                </p>
              </div>
              <button
                onClick={handleStartQuiz}
                className="btn btn-primary btn-lg"
              >
                🧠 Lancer le quiz nutrition
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
