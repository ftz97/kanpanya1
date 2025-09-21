"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

// Import de tous les composants principaux
import ScratchSection from "@/components/home/ScratchSection";
import PartnerSection from "@/components/home/PartnerSection";
import FlashPromos from "@/components/home/FlashPromos";
import CategoryGrid from "@/components/home/CategoryGrid";
import CommunityBlock from "@/components/home/CommunityBlock";
import StatsSection from "@/components/home/StatsSection";
import RecommendationSection from "@/components/RecommendationSection";
import InteractiveOfferQuiz from "@/components/InteractiveOfferQuiz";
import VideoModal from "@/components/modals/VideoModal";
import VideoEndModal from "@/components/modals/VideoEndModal";
import ResultModal from "@/components/ResultModal";
import SearchValidate from "@/components/SearchValidate";
import SearchMulti from "@/components/SearchMulti";
import PageHeader from "@/components/PageHeader";
import NavigationHeader from "@/components/home/NavigationHeader";

export default function DebugPage() {
  const [isClient, setIsClient] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoEndModalOpen, setVideoEndModalOpen] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);

  // Simuler le côté client
  useState(() => {
    setIsClient(true);
  });

  const handleOpenVideo = () => {
    setVideoModalOpen(true);
  };

  const handleVideoEnd = () => {
    setVideoModalOpen(false);
    setVideoEndModalOpen(true);
  };

  const handleQuizComplete = (result: { score: number; total: number; points: number }) => {
    console.log("Quiz terminé:", result);
    setQuizOpen(false);
    setResultModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de debug */}
      <div className="bg-blue-600 text-white p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">🧪 Page de Debug - Composants Kanpanya</h1>
          <div className="flex gap-2">
            <Button 
              onClick={() => setQuizOpen(true)}
              variant="secondary"
              size="sm"
            >
              Test Quiz
            </Button>
            <Button 
              onClick={handleOpenVideo}
              variant="secondary"
              size="sm"
            >
              Test Vidéo
            </Button>
            <Button 
              onClick={() => setResultModalOpen(true)}
              variant="secondary"
              size="sm"
            >
              Test Result
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-12">
        
        {/* Navigation Header */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">🧭 Navigation Header</h2>
          <NavigationHeader />
        </section>

        {/* Page Header */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">📄 Page Header</h2>
          <PageHeader />
        </section>

        {/* Scratch Section */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">🎫 Scratch Section</h2>
          <ScratchSection isClient={isClient} />
        </section>

        {/* Partner Section */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">🤝 Partner Section</h2>
          <PartnerSection 
            onOpenVideo={handleOpenVideo}
            onOpenSponsor={() => console.log("Sponsor clicked")}
          />
        </section>

        {/* Flash Promos */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">⚡ Flash Promos</h2>
          <FlashPromos />
        </section>

        {/* Recommendation Section */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">🌟 Recommendation Section</h2>
          <RecommendationSection clientId="debug-client-123" />
        </section>

        {/* Category Grid */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">📂 Category Grid</h2>
          <CategoryGrid />
        </section>

        {/* Community Block */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">👥 Community Block</h2>
          <CommunityBlock />
        </section>

        {/* Stats Section */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">📊 Stats Section</h2>
          <StatsSection />
        </section>

        {/* Search Components */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">🔍 Search Components</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-medium mb-2 text-gray-700">Search Validate</h3>
              <SearchValidate onValidate={() => console.log("Search validated")} />
            </div>
            <div>
              <h3 className="text-md font-medium mb-2 text-gray-700">Search Multi</h3>
              <SearchMulti onChange={() => console.log("Search changed")} />
            </div>
          </div>
        </section>

        {/* Modals */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">🪟 Modals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={() => setQuizOpen(true)}>
              Test Quiz Modal
            </Button>
            <Button onClick={handleOpenVideo}>
              Test Video Modal
            </Button>
            <Button onClick={() => setResultModalOpen(true)}>
              Test Result Modal
            </Button>
          </div>
        </section>

        {/* Footer de debug */}
        <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-600">
          <p className="text-sm">
            🧪 Page de debug pour tester le rendu visuel de tous les composants Kanpanya
          </p>
          <p className="text-xs mt-2 opacity-75">
            Utilisez cette page pour vérifier l'apparence et le comportement des composants
          </p>
        </div>
      </div>

      {/* Modals */}
      <InteractiveOfferQuiz 
        open={quizOpen} 
        onOpenChange={setQuizOpen}
        pointsPerCorrect={15}
        onComplete={handleQuizComplete}
      />

      {videoModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <VideoModal onEnd={handleVideoEnd} />
          </div>
        </div>
      )}

      {videoEndModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <VideoEndModal />
          </div>
        </div>
      )}

      {resultModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <ResultModal 
              isOpen={resultModalOpen}
              onClose={() => setResultModalOpen(false)}
              score={3}
              totalQuestions={4}
              pointsEarned={45}
            />
          </div>
        </div>
      )}
    </div>
  );
}