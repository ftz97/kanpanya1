"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirection automatique vers l'onboarding
    router.push("/onboarding/qr-code");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
        <p className="text-lg font-medium text-gray-700">Redirection vers l'onboarding...</p>
        <p className="text-sm text-gray-500">Si la redirection ne fonctionne pas, <a href="/onboarding/qr-code" className="text-teal-600 underline">cliquez ici</a></p>
      </div>
    </div>
  );
}