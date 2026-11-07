
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react";

import { products } from "../data/products";
import ProductCard from "../components/productCard";

interface FavoritesProps {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onAddToCart: (id: number) => void;
}

function Favorites({
  favorites,
  onToggleFavorite,
  onAddToCart,
}: FavoritesProps) {
  const navigate = useNavigate();

  // Mengambil produk yang ID-nya ada di daftar favorit
  const favoriteProducts = useMemo(() => {
    return products.filter((product) =>
      favorites.includes(product.id),
    );
  }, [favorites]);

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
      {/* Header halaman */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-600"
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        <div className="flex items-center gap-3">
          <Heart className="fill-rose-500 text-rose-500" size={30} />

          <h1 className="text-3xl font-extrabold text-gray-900">
            Produk Favorit
          </h1>
        </div>

        <p className="mt-2 text-gray-500">
          Kumpulan produk yang kamu sukai.
        </p>
      </div>

      {/* Jika belum ada produk favorit */}
      {favoriteProducts.length === 0 ? (
        <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
          <ShoppingBag
            size={48}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-5 text-xl font-extrabold text-gray-800">
            Belum Ada Produk Favorit
          </h2>

          <p className="mt-3 text-gray-500">
            Klik ikon hati pada produk untuk menyimpannya di sini.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-7 rounded-xl bg-emerald-600 px-7 py-3 font-bold text-white hover:bg-emerald-700"
          >
            Cari Produk
          </button>
        </div>
      ) : (
        <>
          {/* Jumlah produk favorit */}
          <p className="mb-5 text-sm text-gray-500">
            Menampilkan {favoriteProducts.length} produk favorit
          </p>

          {/* Grid produk favorit */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default Favorites;
