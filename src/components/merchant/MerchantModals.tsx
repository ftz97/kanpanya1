"use client";

import { useState } from "react";
import { X, PlusCircle, QrCode, Camera } from "lucide-react";
import { MerchantActions, CreateOfferData, ScanClientData } from "@/services/merchantActions";
import { QRScanner } from "./QRScanner";

interface CreateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  onSuccess: () => void;
}

export function CreateOfferModal({ isOpen, onClose, merchantId, onSuccess }: CreateOfferModalProps) {
  const [formData, setFormData] = useState<CreateOfferData>({
    titre: "",
    description: "",
    type: "promotion",
    date_debut: "",
    date_fin: "",
    points: 0
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await MerchantActions.createOffer(merchantId, formData);
    
    if (result.success) {
      onSuccess();
      onClose();
      setFormData({
        titre: "",
        description: "",
        type: "promotion",
        date_debut: "",
        date_fin: "",
        points: 0
      });
    }
    
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#123456]">Nouvelle offre</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre de l'offre
            </label>
            <input
              type="text"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type d'offre
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
            >
              <option value="promotion">Promotion</option>
              <option value="jeu">Jeu</option>
              <option value="actu">Actualité</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de début
              </label>
              <input
                type="date"
                value={formData.date_debut}
                onChange={(e) => setFormData({ ...formData, date_debut: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de fin
              </label>
              <input
                type="date"
                value={formData.date_fin}
                onChange={(e) => setFormData({ ...formData, date_fin: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Points à distribuer (optionnel)
            </label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
              min="0"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] disabled:opacity-50"
            >
              {loading ? "Création..." : "Créer l'offre"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface ScanClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  onSuccess: () => void;
}

export function ScanClientModal({ isOpen, onClose, merchantId, onSuccess }: ScanClientModalProps) {
  const [formData, setFormData] = useState<ScanClientData>({
    client_email: "",
    points: 10
  });
  const [loading, setLoading] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await MerchantActions.scanClient(merchantId, formData);
    
    if (result.success) {
      onSuccess();
      onClose();
      setFormData({ client_email: "", points: 10 });
    }
    
    setLoading(false);
  };

  const handleQRScan = (qrData: string) => {
    // Le QR code contient l'email du client
    setFormData({ ...formData, client_email: qrData });
    setShowQRScanner(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#123456]">Scanner un client</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email du client
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={formData.client_email}
                onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
                placeholder="client@example.com"
                required
              />
              <button
                type="button"
                onClick={() => setShowQRScanner(true)}
                className="px-3 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] transition-colors"
                title="Scanner QR Code"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Cliquez sur l'icône caméra pour scanner le QR code du client
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Points à attribuer
            </label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
              min="1"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-[#17BFA0] text-white rounded-lg hover:bg-[#14a58e] disabled:opacity-50"
            >
              {loading ? "Scan en cours..." : "Scanner"}
            </button>
          </div>
        </form>

        {/* Scanner QR Code */}
        <QRScanner
          isOpen={showQRScanner}
          onScan={handleQRScan}
          onClose={() => setShowQRScanner(false)}
        />
      </div>
    </div>
  );
}
