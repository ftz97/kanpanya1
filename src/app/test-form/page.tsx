"use client";

import { useState } from "react";

export default function TestFormPage() {
  const [formData, setFormData] = useState({
    prenom: "",
    email: "",
    acceptCGU: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Formulaire soumis !\nPrénom: ${formData.prenom}\nEmail: ${formData.email}\nCGU: ${formData.acceptCGU}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Test Formulaire</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prénom
            </label>
            <input
              type="text"
              value={formData.prenom}
              onChange={(e) => setFormData(prev => ({ ...prev, prenom: e.target.value }))}
              className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Ton prénom"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="ton@email.com"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.acceptCGU}
              onChange={(e) => setFormData(prev => ({ ...prev, acceptCGU: e.target.checked }))}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label className="text-sm text-gray-600">
              J'accepte les conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-xl"
          >
            Tester le formulaire
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">État du formulaire :</h3>
          <p>Prénom: {formData.prenom}</p>
          <p>Email: {formData.email}</p>
          <p>CGU: {formData.acceptCGU ? "✅ Accepté" : "❌ Non accepté"}</p>
        </div>
      </div>
    </div>
  );
}
