"use client";

import { useState, useEffect } from "react";

interface SimpleQRCodeProps {
  value: string;
  size?: number;
  title?: string;
  className?: string;
}

export default function SimpleQRCode({
  value,
  size = 150,
  title,
  className = ""
}: SimpleQRCodeProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  useEffect(() => {
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&format=png&color=000000&bgcolor=ffffff&margin=5`;
    setQrCodeUrl(qrApiUrl);
  }, [value, size]);

  return (
    <div className={`bg-white rounded-2xl p-4 shadow-lg border-2 border-green-200 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-green-600 text-center mb-3">
          {title}
        </h3>
      )}
      
      <div className="flex justify-center">
        <div className="bg-white rounded-xl p-3 shadow-inner">
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
      
      <p className="text-center text-sm text-gray-600 mt-3">
        📱 Scannez pour récupérer
      </p>
    </div>
  );
}
