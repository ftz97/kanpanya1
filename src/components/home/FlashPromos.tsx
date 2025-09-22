import { gradients, colors } from "@/lib/kanpa-theme";

export default function FlashPromos() {
  const promos = ["Pizza -50% ce soir", "Happy Hour 14h-16h", "Légumes frais -30%", "Parapharmacie -15%"];

  return (
    <section className="max-w-7xl mx-auto mt-10 px-4 sm:px-6">
      <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[${colors.secondary}]`}>
        🔥 Promos Flash
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {promos.map((offer, i) => (
          <div key={i} className="rounded-2xl bg-white shadow-md p-4 sm:p-5">
            <h3 className={`font-semibold text-sm text-[${colors.secondary}]`}>{offer}</h3>
            <p className="text-xs text-gray-500">Commerçant</p>
            <span className={`inline-block mt-2 sm:mt-3 px-3 py-1 text-xs font-semibold rounded-full text-white ${gradients.flash}`}>
              Flash
            </span>
            <button 
              className="mt-3 sm:mt-4 w-full py-2 rounded-lg border font-medium transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              style={{ 
                borderColor: colors.primary,
                color: colors.primary
              }}
              aria-label={`Voir les détails de l'offre ${offer}`}
            >
              Voir l'offre
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
