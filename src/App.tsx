
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorites from "./pages/Favorites";
import Stores from "./pages/Stores";
import StoreDetail from "./pages/StoresDetail";

// HALAMAN SEMENTARA
function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="mx-auto max-w-[1500px] px-5 py-16 lg:px-10">
      <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-extrabold">
          {title}
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Halaman {title} sedang dalam tahap pengembangan.
        </p>
      </div>
    </main>
  );
}


// Mengambil data ID produk yang pernah disimpan di browser
function getStoredIds(key: string): number[] {
  try {
    // Mengambil data berdasarkan nama key
    const savedData = localStorage.getItem(key);

    // Jika ada data, ubah JSON menjadi array
    // Jika belum ada, kembalikan array kosong
    return savedData ? (JSON.parse(savedData) as number[]) : [];
  } catch {
    // Jika data rusak atau gagal dibaca, gunakan array kosong
    return [];
  }
}


function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // STATE PENCARIAN
  const [search, setSearch] = useState("");

  // STATE KATEGORI
  const [activeCategory, setActiveCategory] = useState("Semua");
  
  // Mengambil data keranjang dari localStorage saat aplikasi pertama kali dibuka
  const [cart, setCart] = useState<number[]>(() =>
    getStoredIds("campusmart-cart"),
  );
  
  // Mengambil data favorit dari localStorage saat aplikasi pertama kali dibuka
  const [favorites, setFavorites] = useState<number[]>(() =>
    getStoredIds("campusmart-favorites"),
  );

  // Menyimpan perubahan keranjang ke localStorage
  useEffect(() => {
    localStorage.setItem("campusmart-cart", JSON.stringify(cart));
  }, [cart]);

  // Menyimpan perubahan favorit ke localStorage
  useEffect(() => {
    localStorage.setItem("campusmart-favorites", JSON.stringify(favorites));
  }, [favorites]);

  // MENENTUKAN MENU NAVBAR AKTIF
  const activePage =
    {
      "/": "Beranda",
      "/kategori": "Kategori",
      "/promo": "Promo",
      "/toko": "Toko",
      "/keranjang": "Keranjang",
      "/checkout": "Keranjang",
      "/pesanan": "Pesanan Saya",
    }[location.pathname] ?? "";

  // FUNGSI NAVIGASI
  function handleNavigate(page: string) {
    const routes: Record<string, string> = {
      Beranda: "/",
      Kategori: "/kategori",
      Promo: "/promo",
      Toko: "/toko",
      Keranjang: "/keranjang",
      Favorit: "/favorit",
      "Pesanan Saya": "/pesanan",
    };

    const destination = routes[page];

    if (destination) {
      navigate(destination);
    }
  }

  // TAMBAH PRODUK KE KERANJANG
  function addToCart(id: number) {
    setCart((current) => [...current, id]);
  }

  
  const removeFromCart = (id: number) => {
    setCart((currentCart) => {
      const index = currentCart.indexOf(id);

      if (index === -1) return currentCart;

      return currentCart.filter((_, i) => i !== index);
    });
  };


  // TAMBAH / HAPUS FAVORIT
  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900">

      {/* NAVBAR */}
      <Navbar
        cartCount={cart.length}
        search={search}
        onSearchChange={setSearch}
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* ROUTING HALAMAN */}
      <Routes>

        {/* BERANDA */}
        <Route
          path="/"
          element={
            <Home
              search={search}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
            />
          }
        />

        {/* KATEGORI */}
        <Route
          path="/kategori"
          element={
            <Category
              search={search}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
            />
          }
        />

        {/* Halaman produk favorit */}
        <Route
          path="/favorit"
          element={
            <Favorites
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
            />
          }
        />


        {/* PROMO */}
        <Route
          path="/promo"
          element={<PlaceholderPage title="Promo CampusMart" />}
        />

        {/* HALAMAN DAFTAR TOKO */}
        <Route
          path="/toko"
          element={<Stores />}
        />

        {/* DETAIL TOKO */}
        <Route
          path="/toko/:storeId"
          element={<StoreDetail />}
        />

        {/* DETAIL PRODUK */}
        <Route
          path="/produk/:id"
          element={<ProductDetail onAddToCart={addToCart} />}
          />

        {/* KERANJANG */}
        <Route
          path="/keranjang"
          element={
            <Cart
              cart={cart}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
            />
          }
          />

        {/* CHECKOUT */}
       <Route
          path="/checkout"
          element={<Checkout cart={cart} />}
          />

        {/* PESANAN */}
        <Route
          path="/pesanan"
          element={<PlaceholderPage title="Pesanan Saya" />}
        />

        {/* HALAMAN TIDAK DITEMUKAN */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </div>
  );
}

export default App;
