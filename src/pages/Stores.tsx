
import { useMemo, useState } from "react";
import { Search, Store as StoreIcon, Package } from "lucide-react";

// Mengambil data toko dan produk
import { stores } from "../data/stores";
import { products } from "../data/products";
import { Link } from "react-router-dom";

function Stores() {
  // State untuk pencarian toko
  const [search, setSearch] = useState("");

  // Memfilter toko berdasarkan nama
  const filteredStores = useMemo(() => {
    return stores.filter((store) =>
      store.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-10">

      {/* HEADER HALAMAN */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Semua Toko
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Temukan toko dan produk pilihan di CampusMart.
        </p>
      </div>

      {/* SEARCH TOKO */}
      <div className="relative mb-8 max-w-md">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama toko..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm outline-none transition focus:border-gray-400"
        />

      </div>

      {/* DAFTAR TOKO */}
      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-lg font-semibold text-gray-900">
          Daftar Toko
        </h2>

        <span className="text-sm text-gray-500">
          {filteredStores.length} Toko
        </span>

      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {filteredStores.map((store) => {

          // Menghitung jumlah produk milik toko
          const productCount = products.filter(
            (product) => product.storeId === store.id
          ).length;

          return (
            <Link
  key={store.id}
  to={`/toko/${store.id}`}
  className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-gray-300 hover:shadow-sm"
>

              {/* ICON TOKO */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                <StoreIcon size={26} className="text-gray-600" />
              </div>

              {/* INFORMASI TOKO */}
              <div className="min-w-0 flex-1">

                <h3 className="truncate font-semibold text-gray-900">
                  {store.name}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                  {store.description}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                  <Package size={14} />

                  <span>
                    {productCount} Produk
                  </span>
                </div>

              </div>

            </Link>
          );
        })}

      </div>

      {/* KONDISI JIKA TOKO TIDAK DITEMUKAN */}
      {filteredStores.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 py-16 text-center">

          <StoreIcon
            size={36}
            className="mx-auto text-gray-400"
          />

          <h3 className="mt-4 font-semibold text-gray-700">
            Toko tidak ditemukan
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Coba gunakan nama toko yang berbeda.
          </p>

        </div>
      )}

    </main>
  );
}

export default Stores;
