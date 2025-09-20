import { colors } from "@/lib/kanpa-theme";

export default function NavigationHeader() {
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3">
        {/* Logo */}
        <a href="/" className={`text-base sm:text-lg font-bold transition hover:opacity-80`} style={{ color: colors.primary }} aria-label="Kanpanya - Retour à l'accueil">
          Kanpanya
        </a>

        {/* Menu desktop */}
        <nav className={`hidden sm:flex items-center gap-4 lg:gap-6 font-medium`} style={{ color: colors.secondary }} aria-label="Navigation principale">
          <a href="#" className={`text-sm lg:text-base transition hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-1`} style={{ ':hover': { color: colors.primary }, ':focus': { color: colors.primary } }}>Accueil</a>
          <a href="#" className={`text-sm lg:text-base transition hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-1`} style={{ ':hover': { color: colors.primary }, ':focus': { color: colors.primary } }}>Commerçants</a>
          <a href="#" className={`text-sm lg:text-base transition hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-1`} style={{ ':hover': { color: colors.primary }, ':focus': { color: colors.primary } }}>Offres</a>
          <a href="#" className={`text-sm lg:text-base transition hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-1`} style={{ ':hover': { color: colors.primary }, ':focus': { color: colors.primary } }}>Plus</a>
        </nav>

        {/* Bouton "Ma carte" */}
        <button 
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-md font-semibold bg-white border border-gray-200 text-xs sm:text-sm transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          style={{ color: colors.secondary }}
          aria-label="Voir ma carte de points Kanpanya"
        >
          <span style={{ color: colors.tertiary }} aria-hidden="true">▢</span>
          <span className="hidden xs:inline">Ma carte</span>
        </button>
      </div>
    </nav>
  );
}
