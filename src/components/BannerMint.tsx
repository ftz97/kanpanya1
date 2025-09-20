export default function BannerMint({children}:{children:React.ReactNode}){
  return (
    <div
      className="
        group rounded-3xl p-6 md:p-8 border
        bg-gradient-to-r from-[#BDF2D0] via-[#17BFA0] to-[#F2F2F2]
        shadow-[0_24px_48px_-20px_rgba(23,191,160,.35)]
        transition-all duration-300
        hover:shadow-[0_32px_64px_-16px_rgba(23,191,160,.45)]
      "
    >
      {children}
    </div>
  );
}

