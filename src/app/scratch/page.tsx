"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScratchCardSimple from "@/components/ScratchCardSimple";
import AdminDashboard from "@/components/AdminDashboard";
import ScratchHistory from "@/components/ScratchHistory";

export default function ScratchPage() {
  // Exemple : ID de la campagne et user
  const campaignId = "8b3d662b-b75d-43cf-b4d1-3f3b25dcb946"; // à remplacer dynamiquement
  const userId = "550e8400-e29b-41d4-a716-446655440001"; // idem (auth Supabase)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🎟️ Espace Scratch</h1>

      <Tabs defaultValue="scratch" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="scratch">🎟️ Jouer</TabsTrigger>
          <TabsTrigger value="admin">📊 Admin</TabsTrigger>
          <TabsTrigger value="history">📝 Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="scratch">
          <ScratchCardSimple configId={campaignId} userId={userId} />
        </TabsContent>

        <TabsContent value="admin">
          <AdminDashboard />
        </TabsContent>

        <TabsContent value="history">
          <ScratchHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
