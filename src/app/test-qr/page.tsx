"use client";

import { useState } from "react";
import StyledQRCode from "@/components/StyledQRCode";
import { Download } from "lucide-react";

export default function TestQRPage() {
  // ID de test - Remplacer par un vrai UUID de client
  const [clientId, setClientId] = useState("550e8400-e29b-41d4-a716-446655440000");
  
  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `qr-code-test.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#17BFA0]/10 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-[#123456] mb-6 text-center">
            🧪 Page de Test - QR Code Client
          </h1>

          {/* Input pour changer l'ID */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client ID (UUID)
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
              placeholder="Entrer un UUID"
            />
            <p className="text-xs text-gray-500 mt-1">
              Ce sera l'ID scanné par le commerçant
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <StyledQRCode
                value={clientId}
                size={250}
                title="Client Test"
                subtitle="100 points"
                points={100}
                type="client"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={downloadQRCode}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger le QR Code</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(clientId);
                alert("✅ Client ID copié !");
              }}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Copier le Client ID
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              📝 Instructions de test
            </h3>
            <ol className="text-sm text-blue-700 space-y-2">
              <li>1. Téléchargez le QR code ou affichez-le sur un autre appareil</li>
              <li>2. Ouvrez le dashboard commerçant : <code className="bg-blue-100 px-1">/dashboard-commercant</code></li>
              <li>3. Cliquez sur "Scanner client"</li>
              <li>4. Scannez ce QR code ou utilisez "Test manuel" avec l'UUID ci-dessus</li>
              <li>5. Vérifiez que le scan est enregistré</li>
            </ol>
          </div>

          {/* Lien rapides */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href="/dashboard-commercant"
              className="block text-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Dashboard Commerçant
            </a>
            <a
              href="/client/qr-code"
              className="block text-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              QR Code Client
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
