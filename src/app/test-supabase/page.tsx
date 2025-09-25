"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function TestSupabasePage() {
  const [status, setStatus] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  const testConnection = async () => {
    try {
      const supabase = createClient();
      
      // Test de connexion
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        setStatus(`❌ Erreur: ${error.message}`);
      } else {
        setStatus("✅ Connexion Supabase OK");
        setUser(data.session?.user || null);
      }
    } catch (err: any) {
      setStatus(`❌ Erreur: ${err.message}`);
    }
  };

  const testSignup = async () => {
    try {
      const supabase = createClient();
      
      const { data, error } = await supabase.auth.signUp({
        email: "test@example.com",
        password: "test123456"
      });
      
      if (error) {
        setStatus(`❌ Erreur signup: ${error.message}`);
      } else {
        setStatus("✅ Signup OK");
        setUser(data.user);
      }
    } catch (err: any) {
      setStatus(`❌ Erreur: ${err.message}`);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Supabase</h1>
      
      <div className="space-y-4">
        <button 
          onClick={testConnection}
          className="w-full p-3 bg-blue-500 text-white rounded"
        >
          Tester la connexion
        </button>
        
        <button 
          onClick={testSignup}
          className="w-full p-3 bg-green-500 text-white rounded"
        >
          Tester signup
        </button>
        
        <div className="p-4 bg-gray-100 rounded">
          <p><strong>Status:</strong> {status}</p>
          {user && (
            <div>
              <p><strong>User:</strong> {user.email}</p>
              <p><strong>ID:</strong> {user.id}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
