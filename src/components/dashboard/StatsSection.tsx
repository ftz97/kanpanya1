"use client";

interface Stat {
  icon: string;
  number: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="max-w-7xl mx-auto mt-8 sm:mt-12 px-3 sm:px-6 pb-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="rounded-xl bg-white shadow p-3 sm:p-6 text-center flex flex-col items-center"
        >
          <span className="text-xl sm:text-2xl">{stat.icon}</span>
          <p className="text-sm sm:text-lg font-bold text-[#123456] mt-1">{stat.number}</p>
          <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}

