
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, ShoppingBag } from "lucide-react";

import { products } from "../data/products";

interface CheckoutProps {
  cart: number[];
}

function Checkout({ cart }: CheckoutProps) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank");

  // Mengelompokkan produk dan menghitung jumlahnya
  const cartItems = useMemo(() => {
    return products
      .filter((product) => cart.includes(product.id))
      .map((product) => ({
        ...product,
        quantity: cart.filter((id) => id === product.id).length,
      }));
  }, [cart]);

  // Menghitung subtotal
  const subtotal = cartItems.reduce(
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
      <main className="mx-auto max-w-7xl px-5 py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-gray-300" />

        <h1 className="mt-5 text-2xl font-extrabold text-gray-800">
          Keranjang Kamu Kosong
        </h1>

        <p className="mt-2 text-gray-500">
          Tambahkan produk sebelum melakukan checkout.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700"
        >
          Mulai Belanja
        </button>
      </main>
    );
  }

  
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  // Mencegah browser melakukan refresh ketika form dikirim
  event.preventDefault();

  // Menghapus spasi di awal dan akhir nomor HP
  const cleanPhone = phone.trim();

  // Memastikan nomor hanya berisi angka, tanda +, atau -
  const phonePattern = /^[0-9+\-]+$/;

  // Memastikan nomor memiliki panjang yang masuk akal
  if (
    !phonePattern.test(cleanPhone) ||
    cleanPhone.replace(/\D/g, "").length < 10 ||
    cleanPhone.replace(/\D/g, "").length > 15
  ) {
    alert("Nomor WhatsApp tidak valid. Periksa kembali nomor kamu.");
    return; // Menghentikan proses jika nomor tidak valid
  }

  // Jika semua validasi lolos, tampilkan konfirmasi
  alert("Data checkout berhasil divalidasi!");
};


  return (
    <main className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
      <button
        onClick={() => navigate("/keranjang")}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-600"
      >
        <ArrowLeft size={18} />
        Kembali ke Keranjang
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Checkout
        </h1>
        <p className="mt-2 text-gray-500">
          Lengkapi informasi pengiriman dan pembayaran.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          {/* Form pengiriman dan pembayaran */}
          <div className="space-y-6">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <MapPin className="text-emerald-600" />
                <h2 className="text-lg font-extrabold text-gray-800">
                  Informasi Pengiriman
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Nomor WhatsApp
                  </label>
                  <input
                      type="tel"
                      required
                      maxLength={16}
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Contoh: 081234567890"
                    />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Alamat Lengkap
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, kota..."
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <CreditCard className="text-emerald-600" />
                <h2 className="text-lg font-extrabold text-gray-800">
                  Metode Pembayaran
                </h2>
              </div>

              <div className="space-y-3">
                {[
                  "Transfer Bank",
                  "E-Wallet",
                  "COD (Bayar di Tempat)",
                ].map((method) => (
                  <label
                    key={method}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      paymentMethod === method
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-emerald-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value)
                      }
                      className="accent-emerald-600"
                    />

                    <span className="text-sm font-semibold text-gray-700">
                      {method}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Ringkasan pesanan */}
          <aside className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-800">
              Ringkasan Pesanan
            </h2>

            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold text-gray-800">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.quantity} × {formatRupiah(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-gray-100" />

            <div className="flex justify-between text-sm text-gray-500">
              <span>Total barang</span>
              <span>{cart.length} item</span>
            </div>

            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-800">
                {formatRupiah(subtotal)}
              </span>
            </div>

            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>Ongkos kirim</span>
              <span>Ditentukan kemudian</span>
            </div>

            <div className="my-5 border-t border-gray-100" />

            <div className="flex justify-between gap-3">
              <span className="font-bold text-gray-800">Total sementara</span>
              <span className="text-lg font-extrabold text-emerald-700">
                {formatRupiah(subtotal)}
              </span>
            </div>

            <button
              type="submit"
              className="mt-7 w-full rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white transition hover:bg-emerald-700"
            >
              Buat Pesanan
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
              Dengan melanjutkan, kamu menyetujui proses pemesanan di CampusMart.
            </p>
          </aside>
        </div>
      </form>
    </main>
  );
}

export default Checkout;
