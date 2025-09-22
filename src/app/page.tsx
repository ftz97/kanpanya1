import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 space-y-10">
      {/* Titre */}
      <section className="space-y-2 mt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#17BFA0]">Bienvenue sur Kanpanya 🌿</h1>
        <p className="text-muted-foreground">
          Découvrez les nouvelles offres de vos commerçants préférés et gagnez des points exclusifs
        </p>
      </section>

      {/* CTA vers la page complète */}
      <section className="rounded-3xl p-8 border bg-white shadow-[0_18px_40px_-16px_rgba(23,191,160,.15)]">
        <h3 className="text-2xl font-semibold text-center text-[#17BFA0]">Découvrez notre nouvelle interface ! 🌱</h3>
        <p className="text-center text-muted-foreground mt-2">
          Une expérience utilisateur moderne et élégante vous attend
        </p>
        <div className="flex justify-center gap-3 mt-6">
          <Link 
            href="/home" 
            className="rounded-full px-6 h-11 bg-[#17BFA0] text-white hover:bg-gradient-to-r hover:from-[#17BFA0] hover:to-[#BDF2D0] transition inline-flex items-center"
          >
            Voir la nouvelle interface
          </Link>
        </div>
      </section>
    </div>
  );
}
