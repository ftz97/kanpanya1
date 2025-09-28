"use client";

export default function AuthSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-emerald-600 mb-4">
          ✅ Inscription réussie !
        </h1>
        <p className="text-gray-700 mb-6">
          Votre inscription a bien été prise en compte.<br />
          Vérifiez votre boîte mail pour confirmer votre adresse.
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
