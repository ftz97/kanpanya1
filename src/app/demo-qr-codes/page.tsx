"use client";

import { motion } from "framer-motion";
import StyledQRCode from "@/components/StyledQRCode";
import GiftQRCode from "@/components/GiftQRCode";

export default function DemoQRCodesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2F2F2] to-[#E8F4F8] p-8">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#212E40] mb-4">
            🎨 QR Codes Stylisés Kanpanya
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos nouveaux QR codes avec des designs magnifiques qui s'harmonisent parfaitement avec vos cadeaux et récompenses !
          </p>
        </motion.div>

        {/* Grille des QR codes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* QR Code Client */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center"
          >
            <StyledQRCode
              value="client_frantz_12345"
              size={200}
              title="QR Code Client"
              subtitle="Votre passeport Kanpanya"
              points={1250}
              type="client"
              showDecoration={true}
            />
          </motion.div>

          {/* QR Code Commerçant */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <StyledQRCode
              value="merchant_pizzeria_centrale"
              size={200}
              title="QR Code Commerçant"
              subtitle="Pizzeria du Centre"
              type="merchant"
              showDecoration={true}
            />
          </motion.div>

          {/* QR Code Cadeau */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <StyledQRCode
              value="gift_coupon_pizza_50"
              size={200}
              title="QR Code Cadeau"
              subtitle="Pizza -50% ce soir"
              type="gift"
              showDecoration={true}
            />
          </motion.div>

          {/* QR Code Cadeau Spécial avec composant GiftQRCode */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center md:col-span-2 lg:col-span-3"
          >
            <GiftQRCode
              value="special_reward_tombola_ticket"
              rewardTitle="🎫 Ticket Tombola"
              rewardDescription="Gagné au quiz Kanpanya"
              points={100}
            />
          </motion.div>
        </div>

        {/* Comparaison avant/après */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-white rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-[#212E40]">
            🔄 Avant vs Après
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Avant */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-600 mb-4">❌ Avant (QR Code noir)</h3>
              <div className="bg-gray-100 rounded-2xl p-6">
                <div className="bg-white rounded-xl p-4 shadow-inner">
                  <div className="w-48 h-48 bg-black mx-auto rounded"></div>
                </div>
                <p className="text-sm text-gray-500 mt-4">QR Code basique et peu attrayant</p>
              </div>
            </div>

            {/* Après */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#17BFA0] mb-4">✅ Après (QR Code stylisé)</h3>
              <div className="flex justify-center">
                <StyledQRCode
                  value="demo_comparison"
                  size={150}
                  title="Nouveau Style"
                  subtitle="Magnifique !"
                  points={500}
                  type="client"
                  showDecoration={true}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fonctionnalités */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-[#212E40]">
            ✨ Fonctionnalités du nouveau design
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold mb-2">Gradients colorés</h3>
              <p className="text-sm text-gray-600">Couleurs harmonisées selon le type</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold mb-2">Animations fluides</h3>
              <p className="text-sm text-gray-600">Effets de brillance et rotation</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl mb-3">🎁</div>
              <h3 className="font-semibold mb-2">Style cadeau</h3>
              <p className="text-sm text-gray-600">Design spécial pour les récompenses</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-3xl mb-3">🌟</div>
              <h3 className="font-semibold mb-2">Décorations</h3>
              <p className="text-sm text-gray-600">Particules et effets visuels</p>
            </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#17BFA0] to-[#14B8A6] rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">🎉 Vos QR codes n'ont jamais été aussi beaux !</h2>
            <p className="text-lg mb-6 opacity-90">
              Désormais, vos QR codes s'harmonisent parfaitement avec vos cadeaux et récompenses
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-white/20 rounded-full px-4 py-2 text-sm">✨ Animations fluides</span>
              <span className="bg-white/20 rounded-full px-4 py-2 text-sm">🎨 Gradients colorés</span>
              <span className="bg-white/20 rounded-full px-4 py-2 text-sm">🎁 Style cadeau</span>
              <span className="bg-white/20 rounded-full px-4 py-2 text-sm">🌟 Effets visuels</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
