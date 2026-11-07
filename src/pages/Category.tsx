
import { useMemo } from "react";
import {
  BookOpen,
  Monitor,
  Shirt,
  Coffee,
  BriefcaseBusiness,
  Store,
  LayoutGrid,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import ProductCard from "../components/productCard";
import { products } from "../data/products";

// TIPE PROPS CATEGORY
interface CategoryProps {
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

function Category({
  search,
  activeCategory,
  onCategoryChange,
  favorites,
  onToggleFavorite,
  onAddToCart,
}: CategoryProps) {

  // FILTER PRODUK
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        activeCategory === "Semua" ||
        product.category === activeCategory;

      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="mx-auto min-h-screen max-w-[1500px] px-5 py-8 lg:px-10">

      {/* HEADER HALAMAN */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-emerald-700">
          CAMPUSMART / KATEGORI
        </p>

        <h1 className="text-3xl font-extrabold">
          Kategori Produk
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Temukan berbagai kebutuhan kuliah sesuai kategori yang kamu cari.
        </p>
      </div>

      {/* DAFTAR KATEGORI */}
      <section className="mb-10">

        <div className="mb-5 flex items-center gap-2">
          <LayoutGrid className="text-emerald-700" size={23} />

          <h2 className="text-xl font-bold">
            Jelajahi Kategori
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

          {/* SEMUA KATEGORI */}
          <button
            type="button"
            onClick={() => onCategoryChange("Semua")}
            className={`flex flex-col items-center gap-3 rounded-2xl border p-5 transition ${
              activeCategory === "Semua"
                ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                : "border-gray-100 bg-white hover:border-emerald-300"
            }`}
          >
            <LayoutGrid size={30} />

            <span className="text-center text-xs font-bold">
              Semua Produk
            </span>
          </button>

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => onCategoryChange(category.name)}
                className={`flex flex-col items-center gap-3 rounded-2xl border p-5 transition ${
                  activeCategory === category.name
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                    : "border-gray-100 bg-white hover:border-emerald-300"
                }`}
              >
                <Icon size={30} />

                <span className="text-center text-xs font-bold">
                  {category.name}
                </span>
              </button>
            );
          })}

        </div>
      </section>

      {/* DAFTAR PRODUK */}
      <section>

        {/* HEADER PRODUK */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

          <div>
            <h2 className="text-xl font-extrabold">
              {activeCategory === "Semua"
                ? "Semua Produk"
                : activeCategory}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Menampilkan {filteredProducts.length} produk
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm text-gray-600">
            <SlidersHorizontal size={17} />
            <span>Filter Produk</span>
          </div>

        </div>

        {/* SEARCH INFO */}
        {search && (
          <div className="mb-5 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
            <Search size={18} />
            Hasil pencarian: "{search}"
          </div>
        )}

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
              Coba pilih kategori atau kata kunci lainnya.
            </p>

            <button
              type="button"
              onClick={() => onCategoryChange("Semua")}
              className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
            >
              Reset Kategori
            </button>

          </div>

        )}

      </section>

    </main>
  );
}

export default Category;