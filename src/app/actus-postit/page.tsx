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

export default function ActusPostIt() {
  return (
    <section className="px-4">
      <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        📰 Actus commerçants
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {actus.map((a, idx) => {
          const color = colors[idx % colors.length];
          const rotation = idx % 2 === 0 ? "-rotate-1" : "rotate-1";
          return (
            <div
              key={idx}
              className={`p-4 rounded-lg shadow-md border ${color} transform ${rotation} hover:rotate-0 transition w-full min-h-[180px] max-w-[200px]`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📌</span>
                <span className="text-xs font-semibold">{a.merchant}</span>
              </div>
              <p className="font-bold text-sm mb-1">{a.title}</p>
              <p className="text-xs text-gray-700">{a.desc}</p>
              <p className="mt-2 text-xs text-right font-semibold text-slate-600">
                → Découvrir
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
