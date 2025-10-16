"use client";

import { useState } from "react";
import { QrCode, Download, Copy } from "lucide-react";

interface QRCodeGeneratorProps {
  clientEmail: string;
  onClose: () => void;
}

export function QRCodeGenerator({ clientEmail, onClose }: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  // Générer le QR code avec l'email du client
  const generateQRCode = () => {
    const qrData = clientEmail;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
    setQrCodeUrl(qrUrl);
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `qr-code-${clientEmail.replace('@', '-at-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(clientEmail);
    // Vous pourriez ajouter une notification ici
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#123456]">QR Code Client</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Email du client */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600 mb-1">Email du client :</p>
            <div className="flex items-center gap-2">
              <p className="font-mono text-sm">{clientEmail}</p>
              <button
                onClick={copyEmail}
                className="p-1 text-gray-400 hover:text-gray-600"
                title="Copier l'email"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            {qrCodeUrl ? (
              <div className="text-center">
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-48 h-48 border border-gray-200 rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-2">
                  QR Code contenant l'email du client
                </p>
              </div>
            ) : (
              <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <QrCode className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">QR Code non généré</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={generateQRCode}
              className="flex-1 px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] text-sm"
            >
              Générer QR Code
            </button>
            {qrCodeUrl && (
              <button
                onClick={downloadQRCode}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
              >
                <Download className="w-4 h-4" />
                Télécharger
              </button>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-700">
              <strong>Instructions :</strong>
            </p>
            <ul className="text-xs text-blue-600 mt-1 space-y-1">
              <li>• Générez le QR Code pour ce client</li>
              <li>• Le client peut l'utiliser pour se faire scanner</li>
              <li>• Le commerçant scanne ce code pour attribuer des points</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
