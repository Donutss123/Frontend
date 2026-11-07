
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Store as StoreIcon, Package } from "lucide-react";

// Mengambil data toko dan produk
import { stores } from "../data/stores";
import { products } from "../data/products";

function StoreDetail() {
  // Mengambil storeId dari URL
  const { storeId } = useParams();

  // Mencari toko berdasarkan ID dari URL
  const store = stores.find(
    (item) => item.id === Number(storeId)
  );

  // Mengambil semua produk milik toko tersebut
  const storeProducts = products.filter(
    (product) => product.storeId === Number(storeId)
  );

  // Jika toko tidak ditemukan
  if (!store) {
    return (
      <main className="mx-auto max-w-[1500px] px-5 py-16 text-center">
        <StoreIcon size={40} className="mx-auto text-gray-400" />

        <h1 className="mt-4 text-xl font-bold text-gray-900">
          Toko tidak ditemukan
        </h1>

        <Link
          to="/toko"
          className="mt-5 inline-block text-sm font-medium text-green-600"
        >
          Kembali ke daftar toko
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-10">

      {/* TOMBOL KEMBALI */}
      <Link
        to="/toko"
        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
      >
        <ArrowLeft size={18} />
        Kembali ke semua toko
      </Link>

      {/* INFORMASI TOKO */}
      <section className="mb-10 rounded-2xl border border-gray-100 bg-white p-6">

        <div className="flex items-center gap-4">

          {/* ICON TOKO */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100">
            <StoreIcon size={30} className="text-gray-600" />
          </div>

          {/* IDENTITAS TOKO */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {store.name}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {store.category}
            </p>
          </div>

        </div>

        <p className="mt-5 text-sm leading-relaxed text-gray-600">
          {store.description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
          <Package size={17} />
          {storeProducts.length} Produk
        </div>

      </section>

      {/* DAFTAR PRODUK TOKO */}
      <section>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            Produk Toko
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Temukan produk yang tersedia di {store.name}.
          </p>
        </div>

        {storeProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

            {storeProducts.map((product) => (

              <Link
                key={product.id}
                to={`/produk/${product.id}`}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:shadow-md"
              >

                {/* GAMBAR PRODUK */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                />

                {/* INFORMASI PRODUK */}
                <div className="p-3">

                  <h3 className="line-clamp-2 text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>

                  <p className="mt-2 font-bold text-gray-900">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </p>

                </div>

              </Link>

            ))}

          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">
            <Package size={36} className="mx-auto text-gray-400" />

            <p className="mt-3 text-sm text-gray-500">
              Belum ada produk di toko ini.
            </p>
          </div>
        )}

      </section>

    </main>
  );
}

export default StoreDetail;
