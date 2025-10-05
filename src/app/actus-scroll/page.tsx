"use client";

const actus = [
  { merchant: "Épicerie Bio", title: "🌱 Nouveaux fruits locaux", desc: "Mangez frais, achetez pays" },
  { merchant: "Café du Coin", title: "🎶 Soirée Jazz vendredi", desc: "Ambiance live dès 20h" },
  { merchant: "Fleuriste Antilles", title: "💐 Atelier bouquet samedi", desc: "Apprenez à composer le vôtre" },
  { merchant: "Boulangerie Artisanale", title: "🥖 Pain complet dispo", desc: "Cuit ce matin, encore chaud" },
];

const colors = [
  "bg-yellow-100 border-yellow-300",
  "bg-green-100 border-green-300",
  "bg-blue-100 border-blue-300",
  "bg-pink-100 border-pink-300",
];

export default function ActusScroll() {
  return (
    <section className="px-4 py-6 bg-gray-50 min-h-screen">
      <h2 className="text-lg font-bold text-slate-900 mb-6">📰 Actus commerçants</h2>
      <div className="space-y-6">
        {actus.map((a, idx) => {
          const color = colors[idx % colors.length];
          return (
            <div
              key={idx}
              className={`p-6 rounded-lg shadow-md border ${color} max-w-sm mx-auto`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span>📌</span>
                <span className="font-semibold text-sm">{a.merchant}</span>
              </div>
              <p className="font-bold text-lg mb-2">{a.title}</p>
              <p className="text-sm text-gray-700">{a.desc}</p>
              <p className="mt-4 text-xs text-right font-semibold text-slate-600">
                → Découvrir
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
