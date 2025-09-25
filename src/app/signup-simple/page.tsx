"use client";

import { useState } from "react";

export default function SignupSimplePage() {
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setMessage("✅ Bouton cliqué ! Le JavaScript fonctionne !");
    console.log("Bouton cliqué !");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Test Simple</h1>
        
        <div className="space-y-4">
          <button
            onClick={handleClick}
            className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl"
          >
            Cliquer ici pour tester
          </button>
          
          {message && (
            <div className="p-4 bg-green-100 border border-green-400 rounded-lg">
              <p className="text-green-800">{message}</p>
            </div>
          )}
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Instructions :</h3>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Cliquez sur le bouton ci-dessus</li>
              <li>2. Un message vert devrait apparaître</li>
              <li>3. Ouvrez la console (F12) pour voir les logs</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
