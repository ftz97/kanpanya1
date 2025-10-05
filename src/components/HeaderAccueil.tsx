"use client";

export default function HeaderAccueil() {
  const userName = "Kevin"; // à remplacer par le prénom dynamique
  const heure = new Date().getHours();

  // Emoji jour/nuit selon l'heure
  const emoji =
    heure >= 6 && heure < 12
      ? "☀️"
      : heure >= 12 && heure < 18
      ? "🌇"
      : "🌙";

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 mt-4 mb-6">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
        {`Bonsoir ${userName} ${emoji} — découvre les offres exclusives de tes commerçants locaux ✨`}
      </h1>
      <p className="text-slate-600 mt-1 text-sm">
        Soutiens tes commerces de proximité et profite de récompenses uniques.
      </p>
    </div>
  );
}
