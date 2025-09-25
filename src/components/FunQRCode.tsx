"use client";

import { useState, useEffect } from "react";

interface FunQRCodeProps {
  value: string;
  size?: number;
  title?: string;
  emoji?: string;
  className?: string;
}

export default function FunQRCode({
  value,
  size = 150,
  title,
  emoji = "🎁",
  className = ""
}: FunQRCodeProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&format=png&color=000000&bgcolor=ffffff&margin=5`;
    setQrCodeUrl(qrApiUrl);
  }, [value, size]);

  return (
    <div className={`bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-5 shadow-lg border-2 border-yellow-300 ${className}`}>
      {title && (
        <div className="text-center mb-4">
          <div className="text-2xl mb-1">{emoji}</div>
          <h3 className="text-lg font-bold text-orange-600">
            {title}
          </h3>
        </div>
      )}
      
      <div className="flex justify-center">
        <div className="bg-white rounded-xl p-3 shadow-md border-2 border-yellow-200">
          {qrCodeUrl && (
            <img
              src={qrCodeUrl}
              alt="QR Code"
              className="rounded-lg"
              style={{ width: size, height: size }}
            />
          )}
        </div>
      </div>
      
      <div className="text-center mt-3">
        <p className="text-sm font-medium text-orange-700">
          ✨ Scannez pour gagner !
        </p>
      </div>
    </div>
  );
}
