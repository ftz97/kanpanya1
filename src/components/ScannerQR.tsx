"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { X, AlertCircle } from "lucide-react";

interface ScannerQRProps {
  onResult: (qrData: string) => void;
  onClose: () => void;
}

export default function ScannerQR({ onResult, onClose }: ScannerQRProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastScan, setLastScan] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    
    const initScanner = async () => {
      if (!videoRef.current || !isMounted) return;

      try {
        // Vérifier les permissions caméra
        const hasCamera = await QrScanner.hasCamera();
        if (!hasCamera) {
          setError("Aucune caméra détectée");
          return;
        }

        // Créer le scanner
        qrScannerRef.current = new QrScanner(
          videoRef.current,
          (result) => {
            console.log("✅ QR Code scanné:", result.data);
            if (result.data && isMounted) {
              setLastScan(result.data);
              setIsScanning(false);
              // Appeler le callback après un court délai
              setTimeout(() => {
                if (isMounted) {
                  onResult(result.data);
                  onClose();
                }
              }, 500);
            }
          },
          {
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            highlightCodeOutline: true,
            maxScansPerSecond: 3,
          }
        );

        // Démarrer le scanner avec gestion d'erreur
        if (isMounted) {
          await qrScannerRef.current.start();
          setIsScanning(true);
          setError(null);
        }

      } catch (err) {
        console.error("Erreur scanner:", err);
        if (isMounted) {
          setError("Impossible d'accéder à la caméra");
        }
      }
    };

    // Délai pour éviter les conflits
    const timer = setTimeout(initScanner, 100);

    // Nettoyage
    return () => {
      isMounted = false;
      clearTimeout(timer);
      
      if (qrScannerRef.current) {
        try {
          qrScannerRef.current.stop();
          qrScannerRef.current.destroy();
                    } catch {
                      console.log("Scanner déjà arrêté");
                    }
        qrScannerRef.current = null;
      }
    };
  }, [onResult, onClose]);

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

            {/* Erreur */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-center text-white p-4">
                  <AlertCircle className="w-12 h-12 mx-auto mb-2 text-red-400" />
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Chargement */}
            {!isScanning && !error && (
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
            <p>Positionnez le QR code dans le cadre</p>
          </div>

          {/* Dernier scan */}
          {lastScan && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm font-medium text-green-700">✅ QR Code détecté !</p>
              <p className="text-xs text-green-600 mt-1 font-mono break-all">
                {lastScan}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                const testId = prompt("Entrer un client_id pour test (UUID):");
                if (testId) {
                  console.log("📝 Test manuel avec ID:", testId);
                  onResult(testId);
                  onClose();
                }
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
            >
              Test manuel
            </button>
            <button
              onClick={() => {
                // Redémarrer le scanner
                if (qrScannerRef.current) {
                  qrScannerRef.current.stop();
                  qrScannerRef.current.start();
                }
              }}
              className="flex-1 px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 text-sm"
            >
              Redémarrer
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
