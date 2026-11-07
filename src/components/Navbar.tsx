
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Bell,
  Heart,
  Home,
  LayoutGrid,
  Tag,
  Store,
  Package,
  Menu,
  X,
} from "lucide-react";

// ATURAN PROPS NAVBAR
interface NavbarProps {
  cartCount: number;
  search: string;
  onSearchChange: (value: string) => void;
  activePage: string;
  onNavigate: (page: string) => void;
}

function Navbar({
  cartCount,
  search,
  onSearchChange,
  activePage,
  onNavigate,
}: NavbarProps) {
  // STATE MENU MOBILE
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">

        {/* TOP NAVBAR */}
        <div className="flex h-[76px] items-center justify-between gap-6">

          {/* LOGO */}
          <button
            onClick={() => onNavigate("Beranda")}
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <ShoppingCart size={25} />
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight">
              Campus<span className="text-emerald-600">Mart</span>
            </h1>
          </button>

          {/* DESKTOP SEARCH */}
          <div className="hidden max-w-[720px] flex-1 items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 md:flex">
            <Search size={23} className="text-gray-700" />

            <input
              type="text"
              placeholder="Cari produk, layanan, atau toko..."
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              className="h-12 w-full bg-transparent px-4 text-sm outline-none"
            />

            <button
              type="button"
              className="rounded-xl bg-emerald-600 p-3 text-white transition hover:bg-emerald-700"
            >
              <Search size={21} />
            </button>
          </div>

          {/* NAVBAR ACTIONS */}
          <div className="flex items-center gap-4">

            {/* NOTIFICATION */}
            <button
              type="button"
              className="relative hidden sm:block"
              aria-label="Notifikasi"
            >
              <Bell size={25} />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-600" />
            </button>

            
            {/* FAVORITES */}
            <button
              type="button"
              // Ketika diklik, pengguna diarahkan ke halaman Favorit
              onClick={() => onNavigate("Favorit")}
              className="relative"
              aria-label="Produk favorit"
            >
              <Heart
                size={25}
                className="transition hover:fill-rose-500 hover:text-rose-500"
              />
            </button>


            {/* CART */}
            <button
              type="button"
              onClick={() => onNavigate("Keranjang")}
              className="relative"
              aria-label="Keranjang belanja"
            >
              <ShoppingCart size={27} />

              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-xs text-white">
                {cartCount}
              </span>
            </button>

            {/* USER */}
            <button
              type="button"
              className="rounded-full bg-gray-100 p-2"
              aria-label="Profil pengguna"
            >
              <User size={24} />
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden"
              aria-label="Buka menu navigasi"
            >
              {mobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="pb-3 md:hidden">
          <div className="flex items-center rounded-xl border bg-gray-50 px-3">
            <Search size={20} />

            <input
              type="text"
              placeholder="Cari produk, layanan, atau toko..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-11 w-full bg-transparent px-3 text-sm outline-none"
            />
          </div>
        </div>

        {/* NAVIGATION MENU */}
        <nav
          className={`${
            mobileMenu ? "flex" : "hidden"
          } flex-col gap-2 border-t border-gray-100 py-3 md:flex md:flex-row md:items-center md:gap-3`}
        >
          {[
            { name: "Beranda", icon: Home },
            { name: "Kategori", icon: LayoutGrid },
            { name: "Promo", icon: Tag },
            { name: "Toko", icon: Store },
            { name: "Pesanan Saya", icon: Package },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  onNavigate(item.name);
                  setMobileMenu(false);
                }}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activePage === item.name
                    ? "bg-emerald-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
