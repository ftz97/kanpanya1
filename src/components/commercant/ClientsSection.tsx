"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import Image from "next/image";

interface Client {
  id: string;
  name: string;
  avatar: string;
  points: number;
  visits: number;
  lastVisit: string;
  status: "active" | "inactive" | "vip";
}

export default function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Marie Dubois",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop",
      points: 1250,
      visits: 23,
      lastVisit: "Il y a 2 jours",
      status: "vip"
    },
    {
      id: "2",
      name: "Jean Martin",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
      points: 890,
      visits: 15,
      lastVisit: "Il y a 1 semaine",
      status: "active"
    },
    {
      id: "3",
      name: "Sophie Laurent",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
      points: 450,
      visits: 8,
      lastVisit: "Il y a 3 jours",
      status: "active"
    },
    {
      id: "4",
      name: "Pierre Durand",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
      points: 120,
      visits: 3,
      lastVisit: "Il y a 2 semaines",
      status: "inactive"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "vip">("all");

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip": return "bg-yellow-100 text-yellow-800";
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "vip": return "⭐ VIP";
      case "active": return "✅ Actif";
      case "inactive": return "⏸️ Inactif";
      default: return "❓ Inconnu";
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-[#123456]">
          👥 Mes clients
        </h2>
        <div className="text-sm text-gray-500">
          {filteredClients.length} client{filteredClients.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#17BFA0] focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          {["all", "vip", "active", "inactive"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? "bg-[#17BFA0] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status === "all" ? "Tous" :
               status === "vip" ? "⭐ VIP" :
               status === "active" ? "✅ Actifs" : "⏸️ Inactifs"}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des clients */}
      <div className="space-y-3">
        {filteredClients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={client.avatar}
                  alt={client.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  client.status === "vip" ? "bg-yellow-400" :
                  client.status === "active" ? "bg-green-400" : "bg-gray-400"
                }`} />
              </div>

              {/* Infos client */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[#123456]">{client.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(client.status)}`}>
                    {getStatusLabel(client.status)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>🎯 {client.points} points</span>
                  <span>👥 {client.visits} visites</span>
                  <span>🕒 {client.lastVisit}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200 transition-colors">
                  📧 Contacter
                </button>
                <button className="px-3 py-1 bg-[#17BFA0] text-white rounded text-xs font-medium hover:bg-[#14a58e] transition-colors">
                  👁️ Voir profil
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message si aucun client */}
      {filteredClients.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">👥</div>
          <p>Aucun client trouvé</p>
          <p className="text-sm">Essayez de modifier vos filtres</p>
        </div>
      )}
    </section>
  );
}
