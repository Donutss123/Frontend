
import { Heart, Plus } from "lucide-react";
import type { Product } from "../data/products";
// Mengambil fungsi navigasi dari React Router
import { useNavigate } from "react-router-dom";

// MENENTUKAN DATA YANG DITERIMA KOMPONEN
interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onAddToCart: (id: number) => void;
}



// FUNGSI FORMAT HARGA
function formatRupiah(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

// KOMPONEN PRODUCT CARD
function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}: ProductCardProps) {

  // Membuat fungsi untuk berpindah halaman
const navigate = useNavigate();

// Fungsi untuk membuka halaman detail produk
const handleProductClick = () => {
  navigate(`/produk/${product.id}`);
};
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-3">

      {/* GAMBAR PRODUK */}
      <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gray-50 md:h-44">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          onClick={handleProductClick}
        />

        {/* TOMBOL FAVORIT */}
        <button
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          aria-label={
            isFavorite
              ? `Hapus ${product.name} dari favorit`
              : `Tambahkan ${product.name} ke favorit`
          }
          className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-sm"
        >
          <Heart
            size={20}
            className={
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-900"
            }
          />
        </button>
      </div>

      {/* INFORMASI PRODUK */}
      <div className="p-2">
        <p className="mb-1 text-[10px] text-gray-500">
          {product.category}
        </p>

        <h3 className="line-clamp-2 min-h-10 text-sm font-bold">
          {product.name}
        </h3>

        <p className="mt-1 text-base font-extrabold text-emerald-700">
          {formatRupiah(product.price)}
        </p>

        {/* RATING */}
        <div className="mt-2 flex items-center gap-1 text-xs text-gray-600">
          <span className="text-base text-amber-400">★</span>
          {product.rating}
          <span>
            ({product.reviews.toLocaleString("id-ID")})
          </span>
        </div>

        {/* TOMBOL KERANJANG */}
        <button
          type="button"
          onClick={() => onAddToCart(product.id)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700"
        >
          <Plus size={17} />
          Keranjang
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
