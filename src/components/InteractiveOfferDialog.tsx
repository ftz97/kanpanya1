"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function InteractiveOfferDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [step, setStep] = React.useState<"video" | "quiz">("video");

  React.useEffect(() => {
    if (!open) setStep("video");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl kp-text-mint-600">
            Offre interactive
          </DialogTitle>
        </DialogHeader>

        {step === "video" ? (
          <div className="space-y-6">
            <div className="bg-black/90 rounded-xl overflow-hidden">
              <video controls className="w-full aspect-video">
                <source src="/video-demo.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setStep("quiz")}
                className="kp-btn-green rounded-full px-6 h-11"
              >
                👉 Passer au quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-center text-xl font-semibold">
              Quel fruit est le plus riche en vitamine C ?
            </p>
            <div className="space-y-4">
              {["Orange", "Kiwi", "Pomme", "Banane"].map((label) => (
                <button
                  key={label}
                  className="w-full rounded-2xl border-2 border-[hsl(var(--kp-mint-300))] h-14 kp-text-mint-600 text-xl font-medium hover:bg-[hsl(var(--kp-mint-50))] transition"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
