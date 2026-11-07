
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { products } from "../data/products";

interface ProductDetailProps {
  onAddToCart: (id: number) => void;
}

function ProductDetail({ onAddToCart }: ProductDetailProps) {
  // Mengambil ID produk dari URL
  const { id } = useParams();

  // Mengubah ID dari string menjadi number
  const productId = Number(id);

  // Mencari produk berdasarkan ID
  const product = products.find((item) => item.id === productId);

  const navigate = useNavigate();

  // Jika produk tidak ditemukan
  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Produk tidak ditemukan
        </h1>

        <p className="mt-2 text-gray-500">
          Produk yang kamu cari mungkin sudah tidak tersedia.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Kembali ke Beranda
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
      {/* Tombol kembali */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-600"
      >
        <ArrowLeft size={18} />
        Kembali
      </button>

      <div className="grid gap-10 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2 lg:p-10">
        {/* Gambar produk */}
        <div className="overflow-hidden rounded-2xl bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="h-full max-h-[500px] w-full object-cover"
          />
        </div>

        {/* Informasi produk */}
        <div className="flex flex-col">
          <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            {product.category}
          </span>

          <h1 className="mt-5 text-3xl font-extrabold text-gray-900">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <Star size={17} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-800">
              {product.rating}
            </span>
            <span>({product.reviews} ulasan)</span>
          </div>

          <p className="mt-7 text-3xl font-extrabold text-emerald-700">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(product.price)}
          </p>

          <div className="my-8 border-t border-gray-100" />

          <h2 className="text-lg font-bold text-gray-800">
            Deskripsi Produk
          </h2>

          <p className="mt-3 leading-7 text-gray-500">
            {product.name} merupakan salah satu produk pilihan di CampusMart.
            Produk ini tersedia untuk memenuhi kebutuhan mahasiswa dengan
            kualitas dan harga yang kompetitif.
          </p>

          <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row">
            <button
              onClick={() => onAddToCart(product.id)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-600 px-5 py-4 font-bold text-emerald-700 transition hover:bg-emerald-50"
            >
              <ShoppingCart size={20} />
              Tambah ke Keranjang
            </button>

            <button
              onClick={() => {
                onAddToCart(product.id);
                navigate("/keranjang");
              }}
              className="flex-1 rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white transition hover:bg-emerald-700"
            >
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
