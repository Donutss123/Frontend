
import { useMemo } from "react";
import {
  LayoutGrid,
  BookOpen,
  Monitor,
  Shirt,
  Coffee,
  BriefcaseBusiness,
  Store,
  ChevronRight,
  Flame,
  Search,
} from "lucide-react";

import HeroBanner from "../components/HeroBanner";
import ServiceFeatures from "../components/ServiceFeatures";
import ProductCard from "../components/productCard";
import { products } from "../data/products";

// TIPE PROPS HALAMAN HOME
interface HomeProps {
  search: string;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onAddToCart: (id: number) => void;
}

// DATA KATEGORI
const categories = [
  { name: "Buku & Referensi", icon: BookOpen },
  { name: "Elektronik", icon: Monitor },
  { name: "Perlengkapan Kuliah", icon: BriefcaseBusiness },
  { name: "Fashion", icon: Shirt },
  { name: "Makanan & Minuman", icon: Coffee },
  { name: "Jasa & Layanan", icon: Store },
];

function Home({
  search,
  activeCategory,
  onCategoryChange,
  favorites,
  onToggleFavorite,
  onAddToCart,
}: HomeProps) {

  // FILTER PRODUK
// Memfilter produk berdasarkan kategori dan kata pencarian
const filteredProducts = useMemo(() => {
  return products.filter((product) => {
    
    // Memeriksa apakah kategori produk sesuai pilihan
    const matchesCategory =
      activeCategory === "Semua" ||
      product.category === activeCategory;

    // Memeriksa apakah nama produk mengandung teks pencarian
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    // Produk ditampilkan jika kedua kondisi terpenuhi
    return matchesCategory && matchesSearch;
  });
}, [search, activeCategory]);

  return (
    <main className="mx-auto max-w-[1500px] px-5 py-7 lg:px-10">

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">

        {/* SIDEBAR KATEGORI */}
        <aside className="hidden h-fit overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">

          <div className="flex items-center gap-3 bg-gray-50 px-5 py-5">
            <LayoutGrid size={26} />
            <h2 className="text-xl font-bold">Kategori</h2>
          </div>

          <div className="p-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => onCategoryChange(category.name)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm transition ${
                    activeCategory === category.name
                      ? "bg-emerald-50 font-bold text-emerald-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <Icon size={22} />
                    {category.name}
                  </span>

                  <ChevronRight size={19} />
                </button>
              );
            })}

            <div className="my-2 border-t" />

            <button
              type="button"
              onClick={() => onCategoryChange("Semua")}
              className="flex w-full items-center justify-between rounded-xl px-4 py-4 text-sm font-semibold hover:bg-gray-50"
            >
              <span className="flex items-center gap-4">
                <LayoutGrid size={22} />
                Lihat Semua
              </span>
              <ChevronRight size={19} />
            </button>
          </div>
        </aside>

        {/* HERO DAN FITUR LAYANAN */}
        <section className="min-w-0">

          <HeroBanner
            onShopClick={() =>
              document
                .getElementById("produk")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          />

          <ServiceFeatures />

        </section>
      </div>

      {/* BAGIAN PRODUK */}
      <section id="produk" className="mt-9 scroll-mt-40">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-3 text-xl font-extrabold md:text-2xl">
            <Flame className="fill-emerald-600 text-emerald-600" />
            Produk Populer
          </h2>

          <button
            type="button"
            onClick={() => onCategoryChange("Semua")}
            className="flex items-center gap-1 text-sm font-bold text-emerald-700"
          >
            Lihat Semua
            <ChevronRight size={19} />
          </button>
        </div>

        {/* FILTER KATEGORI */}
        <div className="mb-5 flex gap-2 overflow-x-auto pb-2">

          <button
            type="button"
            onClick={() => onCategoryChange("Semua")}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
              activeCategory === "Semua"
                ? "bg-emerald-600 text-white"
                : "border bg-white text-gray-700"
            }`}
          >
            Semua Produk
          </button>

          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() => onCategoryChange(category.name)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
                activeCategory === category.name
                  ? "bg-emerald-600 text-white"
                  : "border bg-white text-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
                onAddToCart={onAddToCart}
              />
            ))}

          </div>
        ) : (
          <div className="rounded-2xl border bg-white py-16 text-center">
            <Search
              className="mx-auto mb-3 text-gray-400"
              size={35}
            />

            <h3 className="font-bold">
              Produk tidak ditemukan
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Coba kata kunci atau kategori lainnya.
            </p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-gray-200 py-8 text-center">
        <h2 className="text-xl font-extrabold">
          Campus<span className="text-emerald-600">Mart</span>
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Marketplace kebutuhan mahasiswa dan kampus.
        </p>

        <p className="mt-5 text-xs text-gray-400">
          © 2026 CampusMart. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

export default Home;
