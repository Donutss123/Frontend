
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { products } from "../data/products";

interface CartProps {
  cart: number[];
  onAddToCart: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
}

function Cart({ cart, onAddToCart, onRemoveFromCart }: CartProps) {
  const navigate = useNavigate();

  // Mengelompokkan produk berdasarkan ID dan menghitung jumlahnya
  const cartItems = useMemo(() => {
    return products
      .filter((product) => cart.includes(product.id))
      .map((product) => ({
        ...product,
        quantity: cart.filter((id) => id === product.id).length,
      }));
  }, [cart]);

  // Menghitung total seluruh harga produk
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const formatRupiah = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  // Jika keranjang kosong
  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
            <ShoppingBag size={36} className="text-emerald-600" />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-gray-800">
            Keranjang Kamu Masih Kosong
          </h1>

          <p className="mt-3 text-gray-500">
            Yuk, cari produk menarik untuk memenuhi kebutuhan kuliahmu!
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-7 rounded-xl bg-emerald-600 px-7 py-3 font-bold text-white transition hover:bg-emerald-700"
          >
            Mulai Belanja
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-600"
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        <h1 className="text-3xl font-extrabold text-gray-900">
          Keranjang Belanja
        </h1>

        <p className="mt-2 text-gray-500">
          Periksa kembali produk yang ingin kamu beli.
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
        {/* Daftar produk */}
        <section className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm sm:flex-row"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-32 w-full rounded-xl object-cover sm:w-32"
              />

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-emerald-600">
                    {item.category}
                  </p>

                  <h2 className="mt-1 font-bold text-gray-800">
                    {item.name}
                  </h2>

                  <p className="mt-2 font-extrabold text-emerald-700">
                    {formatRupiah(item.price)}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  {/* Kontrol jumlah produk */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
                      aria-label="Kurangi jumlah produk"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="min-w-5 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => onAddToCart(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
                      aria-label="Tambah jumlah produk"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      for (let i = 0; i < item.quantity; i++) {
                        onRemoveFromCart(item.id);
                      }
                    }}
                    className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Ringkasan belanja */}
        <aside className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-extrabold text-gray-800">
            Ringkasan Belanja
          </h2>

          <div className="mt-6 flex justify-between text-sm text-gray-500">
            <span>Total produk</span>
            <span>
              {cart.reduce((total, id) => total + (cart.includes(id) ? 1 : 0), 0)}
              {" "}item
            </span>
          </div>

          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-800">
              {formatRupiah(totalPrice)}
            </span>
          </div>

          <div className="my-5 border-t border-gray-100" />

          <div className="flex justify-between gap-3">
            <span className="font-bold text-gray-800">Total pembayaran</span>
            <span className="text-lg font-extrabold text-emerald-700">
              {formatRupiah(totalPrice)}
            </span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-7 w-full rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white transition hover:bg-emerald-700"
          >
            Lanjut ke Checkout
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-gray-400">
            Biaya pengiriman dan metode pembayaran akan ditentukan pada tahap
            checkout.
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
