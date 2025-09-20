import { colors } from "@/lib/kanpa-theme";

export default function CategoryGrid() {
  const categories = [
    { icon: "🍔", name: "Restauration" },
    { icon: "💇‍♀️", name: "Beauté" },
    { icon: "👗", name: "Mode" },
    { icon: "🎉", name: "Loisirs" },
    { icon: "🛒", name: "Alimentation" },
    { icon: "💊", name: "Santé" },
  ];

  return (
    <section className="max-w-7xl mx-auto mt-12 px-4 sm:px-6">
      <h2 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6`} style={{ color: colors.secondary }}>
        📂 Explorez par catégorie
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((cat, i) => (
          <button
            key={i}
            className="rounded-2xl bg-white shadow-md p-4 sm:p-6 flex flex-col items-center justify-center transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            aria-label={`Explorer la catégorie ${cat.name}`}
          >
            <span className="text-xl sm:text-2xl" aria-hidden="true">{cat.icon}</span>
            <p className={`mt-1 sm:mt-2 font-medium text-sm sm:text-base`} style={{ color: colors.secondary }}>
              {cat.name}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
