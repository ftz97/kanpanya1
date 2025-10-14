"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, CheckCircle, XCircle, Clock } from "lucide-react";
import Image from "next/image";

interface ScanData {
  id: string;
  clientName: string;
  clientAvatar: string;
  points: number;
  timestamp: Date;
  type: "purchase" | "quiz" | "fidelity";
  amount?: number;
  status: "pending" | "accepted" | "rejected";
}

export default function ScanReceiver() {
  const [scans, setScans] = useState<ScanData[]>([]);
  const [isListening, setIsListening] = useState(false);

  // Simulation de scans reçus
  useEffect(() => {
    const interval = setInterval(() => {
      if (isListening && Math.random() > 0.7) {
        const newScan: ScanData = {
          id: Date.now().toString(),
          clientName: ["Marie Dubois", "Jean Martin", "Sophie Laurent", "Pierre Durand"][Math.floor(Math.random() * 4)],
          clientAvatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 10000000000000000)}?w=80&h=80&fit=crop`,
          points: Math.floor(Math.random() * 100) + 50,
          timestamp: new Date(),
          type: ["purchase", "quiz", "fidelity"][Math.floor(Math.random() * 3)] as any,
          amount: Math.floor(Math.random() * 50) + 10,
          status: "pending"
        };
        setScans(prev => [newScan, ...prev.slice(0, 4)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isListening]);

  const handleScanAction = (scanId: string, action: "accept" | "reject") => {
    setScans(prev => prev.map(scan => 
      scan.id === scanId 
        ? { ...scan, status: action === "accept" ? "accepted" : "rejected" }
        : scan
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "purchase": return "🛒";
      case "quiz": return "🧠";
      case "fidelity": return "🎟️";
      default: return "📱";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "purchase": return "Achat";
      case "quiz": return "Quiz";
      case "fidelity": return "Fidélité";
      default: return "Scan";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#123456]">
          📱 Scans reçus
        </h3>
        <button
          onClick={() => setIsListening(!isListening)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isListening 
              ? "bg-red-500 text-white hover:bg-red-600" 
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {isListening ? "⏸️ Arrêter" : "▶️ Écouter"}
        </button>
      </div>

      {/* Statut d'écoute */}
      <div className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${
        isListening ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
      }`}>
        <div className={`w-3 h-3 rounded-full ${isListening ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
        <span className="text-sm font-medium">
          {isListening ? "En écoute - Prêt à recevoir les scans" : "Arrêté - Aucun scan reçu"}
        </span>
      </div>

      {/* Liste des scans */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {scans.map((scan) => (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className={`border rounded-lg p-3 ${
                scan.status === "pending" ? "border-yellow-200 bg-yellow-50" :
                scan.status === "accepted" ? "border-green-200 bg-green-50" :
                "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Avatar client */}
                <div className="relative">
                  <Image
                    src={scan.clientAvatar}
                    alt={scan.clientName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="absolute -bottom-1 -right-1 text-lg">
                    {getTypeIcon(scan.type)}
                  </div>
                </div>

                {/* Infos scan */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[#123456]">{scan.clientName}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {getTypeLabel(scan.type)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {scan.type === "purchase" && `Achat de ${scan.amount}€`}
                    {scan.type === "quiz" && "Quiz complété"}
                    {scan.type === "fidelity" && "Carte fidélité"}
                    <span className="ml-2">• {scan.points} points</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {scan.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                {/* Actions */}
                {scan.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleScanAction(scan.id, "accept")}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      title="Accepter"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleScanAction(scan.id, "reject")}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      title="Refuser"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Statut */}
                {scan.status !== "pending" && (
                  <div className="flex items-center gap-1">
                    {scan.status === "accepted" ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="text-xs font-medium">
                      {scan.status === "accepted" ? "Accepté" : "Refusé"}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Message si aucun scan */}
        {scans.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <QrCode className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Aucun scan reçu</p>
            <p className="text-sm">Les scans des clients apparaîtront ici</p>
          </div>
        )}
      </div>

      {/* Statistiques */}
      {scans.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-[#17BFA0]">
                {scans.filter(s => s.status === "pending").length}
              </div>
              <div className="text-xs text-gray-500">En attente</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">
                {scans.filter(s => s.status === "accepted").length}
              </div>
              <div className="text-xs text-gray-500">Acceptés</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">
                {scans.filter(s => s.status === "rejected").length}
              </div>
              <div className="text-xs text-gray-500">Refusés</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
