import { colors } from "@/lib/kanpa-theme";

export default function StatsSection() {
  const stats = [
    { icon: "🏬", number: "89", label: "Commerçants" },
    { icon: "👥", number: "1,247", label: "Utilisateurs" },
    { icon: "🎁", number: "156", label: "Offres actives" },
    { icon: "⭐", number: "4.8", label: "Note moyenne" },
  ];

  return (
    <section className="max-w-7xl mx-auto mt-10 sm:mt-12 px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white shadow-md p-4 sm:p-6 text-center flex flex-col items-center"
        >
          <span className="text-xl sm:text-2xl">{stat.icon}</span>
          <p className={`text-base sm:text-lg font-bold mt-1 sm:mt-2`} style={{ color: colors.secondary }}>{stat.number}</p>
          <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
