"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { Camera, CameraOff, X, CheckCircle, AlertCircle } from "lucide-react";

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function QRScanner({ onScan, onClose, isOpen }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // Nettoyer le scanner quand la modal se ferme
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
      }
      setIsScanning(false);
      setError(null);
      setLastScannedCode(null);
      return;
    }

    // Initialiser le scanner quand la modal s'ouvre
    const initScanner = async () => {
      if (!videoRef.current) return;

      try {
        // Vérifier les permissions caméra
        const hasCamera = await QrScanner.hasCamera();
        if (!hasCamera) {
          setError("Aucune caméra détectée sur cet appareil");
          setHasPermission(false);
          return;
        }

        // Demander les permissions
        const hasPermission = await QrScanner.hasCamera();
        if (!hasPermission) {
          setError("Permission caméra requise pour scanner les QR codes");
          setHasPermission(false);
          return;
        }

        setHasPermission(true);

        // Créer le scanner
        qrScannerRef.current = new QrScanner(
          videoRef.current,
          (result) => {
            if (result.data && result.data !== lastScannedCode) {
              setLastScannedCode(result.data);
              setIsScanning(false);
              onScan(result.data);
            }
          },
          {
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            highlightCodeOutline: true,
            maxScansPerSecond: 5,
          }
        );

        // Démarrer le scanner
        await qrScannerRef.current.start();
        setIsScanning(true);
        setError(null);

      } catch (err) {
        console.error("Erreur lors de l'initialisation du scanner:", err);
        setError("Impossible d'accéder à la caméra");
        setHasPermission(false);
      }
    };

    // Délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(initScanner, 100);
    return () => clearTimeout(timer);

  }, [isOpen, lastScannedCode, onScan]);

  const handleManualInput = () => {
    const input = prompt("Entrez le code client manuellement:");
    if (input && input.trim()) {
      onScan(input.trim());
    }
  };

  const retryCamera = async () => {
    setError(null);
    setHasPermission(null);
    
    if (qrScannerRef.current) {
      try {
        await qrScannerRef.current.start();
        setIsScanning(true);
        setHasPermission(true);
      } catch (err) {
        setError("Impossible de redémarrer la caméra");
        setHasPermission(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#123456]">Scanner QR Code</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Zone de scan */}
          <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
            
            {/* Overlay de scan */}
            {isScanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-[#17BFA0] rounded-xl relative">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#17BFA0] rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#17BFA0] rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#17BFA0] rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#17BFA0] rounded-br-lg"></div>
                </div>
              </div>
            )}

            {/* État de la caméra */}
            {!isScanning && hasPermission === true && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-center text-white">
                  <CameraOff className="w-12 h-12 mx-auto mb-2" />
                  <p>Caméra arrêtée</p>
                </div>
              </div>
            )}

            {/* Erreur ou pas de permission */}
            {(error || hasPermission === false) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-center text-white p-4">
                  <AlertCircle className="w-12 h-12 mx-auto mb-2 text-red-400" />
                  <p className="text-sm mb-3">{error}</p>
                  <button
                    onClick={retryCamera}
                    className="px-4 py-2 bg-[#17BFA0] text-white rounded-lg text-sm hover:bg-[#14a58e]"
                  >
                    Réessayer
                  </button>
                </div>
              </div>
            )}

            {/* Chargement */}
            {hasPermission === null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#17BFA0] mx-auto mb-2"></div>
                  <p>Initialisation...</p>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center text-sm text-gray-600">
            <p>Positionnez le QR code du client dans le cadre</p>
            <p className="text-xs mt-1">La caméra scanne automatiquement</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleManualInput}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
            >
              Saisie manuelle
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
            >
              Annuler
            </button>
          </div>

          {/* Dernier code scanné */}
          {lastScannedCode && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Code scanné avec succès</span>
              </div>
              <p className="text-xs text-green-600 mt-1 font-mono">
                {lastScannedCode}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
