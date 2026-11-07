
import { ChevronRight } from "lucide-react";
import heroImage from "../assets/hero.png";

// ATURAN PROPS HERO BANNER
interface HeroBannerProps {
  onShopClick: () => void;
}

function HeroBanner({ onShopClick }: HeroBannerProps) {
  return (
    <section className="relative flex min-h-[300px] overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-700 to-teal-500 md:min-h-[350px]">

      {/* HERO TEXT */}
      <div className="relative z-10 flex w-full flex-col justify-center p-7 text-white md:w-[58%] md:p-12">

        <span className="mb-4 w-fit rounded-full bg-white/15 px-4 py-2 text-xs font-semibold tracking-wide">
          MARKETPLACE MAHASISWA
        </span>

        <h2 className="max-w-xl text-3xl font-extrabold leading-tight md:text-5xl">
          Belanja Kebutuhan Kuliah Jadi Lebih Mudah
        </h2>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 md:text-lg">
          Temukan buku, perlengkapan, hingga jasa mahasiswa dalam satu tempat.
        </p>

        {/* TOMBOL BELANJA */}
        <button
          type="button"
          onClick={onShopClick}
          className="mt-7 flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3 font-bold text-gray-900 transition hover:bg-gray-100"
        >
          Belanja Sekarang
          <ChevronRight size={20} />
        </button>
      </div>

      {/* HERO IMAGE */}
      <div className="absolute bottom-0 right-0 hidden h-full w-[48%] md:block">

        <img
          src={heroImage}
          alt="Ilustrasi kebutuhan kuliah CampusMart"
          className="h-full w-full object-cover opacity-90"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 via-emerald-800/20 to-transparent" />
      </div>

      {/* SLIDER INDICATOR */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
        <span className="h-3 w-3 rounded-full bg-white" />
        <span className="h-3 w-3 rounded-full bg-white/40" />
        <span className="h-3 w-3 rounded-full bg-white/40" />
      </div>

    </section>
  );
}

export default HeroBanner;
