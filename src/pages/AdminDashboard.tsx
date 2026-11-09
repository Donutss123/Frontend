
import { useState } from "react";

import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  ShoppingBag,
  ClipboardList,
  Settings,
  LogOut,
  Search,
  Bell,
  Menu,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  CircleDollarSign,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

// =====================================
// DATA SIMULASI DASHBOARD
// Nanti bagian ini diganti dengan API database
// =====================================

const statistics = [
  {
    title: "Total Pengguna",
    value: "1.248",
    growth: "+12,5%",
    positive: true,
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Total Toko",
    value: "86",
    growth: "+8,2%",
    positive: true,
    icon: Store,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Total Produk",
    value: "432",
    growth: "+15,3%",
    positive: true,
    icon: Package,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Total Pesanan",
    value: "1.024",
    growth: "-3,2%",
    positive: false,
    icon: ShoppingBag,
    color: "bg-purple-50 text-purple-600",
  },
];

const activities = [
  {
    name: "Ahmad Fauzi",
    action: "Mendaftarkan toko baru",
    time: "5 menit lalu",
    icon: Store,
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "Siti Rahma",
    action: "Menambahkan produk baru",
    time: "20 menit lalu",
    icon: Package,
    color: "bg-green-50 text-green-600",
  },
  {
    name: "Rizky Maulana",
    action: "Membuat pesanan baru",
    time: "1 jam lalu",
    icon: ShoppingBag,
    color: "bg-orange-50 text-orange-600",
  },
  {
    name: "Nadia Putri",
    action: "Mendaftar sebagai pengguna",
    time: "2 jam lalu",
    icon: Users,
    color: "bg-purple-50 text-purple-600",
  },
];

const pendingStores = [
  {
    name: "Fauzi Store",
    owner: "Ahmad Fauzi",
    date: "09 Nov 2026",
  },
  {
    name: "Nadia Fashion",
    owner: "Nadia Putri",
    date: "09 Nov 2026",
  },
  {
    name: "Tech Campus",
    owner: "Rizky Maulana",
    date: "08 Nov 2026",
  },
];

// =====================================
// KOMPONEN UTAMA
// =====================================

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800">

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          border-r border-gray-100 bg-white
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* LOGO */}
        <div className="flex h-16 items-center gap-3 border-b border-gray-100 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white">
            <ShoppingBag size={20} />
          </div>

          <div>
            <h1 className="text-lg font-bold">
              CampusMart
            </h1>
            <p className="text-[10px] tracking-widest text-gray-400">
              ADMIN PANEL
            </p>
          </div>
        </div>

        {/* MENU */}
        <div className="px-4 py-6">

          <p className="mb-3 px-3 text-[10px] font-bold tracking-widest text-gray-400">
            MENU UTAMA
          </p>

          <nav className="space-y-1">

            <SidebarItem
              icon={LayoutDashboard}
              label="Dashboard"
              active
            />

            <SidebarItem
              icon={Users}
              label="Pengguna"
              onClick={() => navigate("/admin/users")}
            />

            <SidebarItem
              icon={Store}
              label="Manajemen Toko"
              badge="3"
            />

            <SidebarItem
              icon={Package}
              label="Manajemen Produk"
            />

            <SidebarItem
              icon={ShoppingBag}
              label="Pesanan"
            />

            <SidebarItem
              icon={ClipboardList}
              label="Laporan"
            />

          </nav>

          <p className="mb-3 mt-9 px-3 text-[10px] font-bold tracking-widest text-gray-400">
            PENGATURAN
          </p>

          <nav className="space-y-1">

            <SidebarItem
              icon={Settings}
              label="Pengaturan"
            />

          </nav>

        </div>

        {/* ADMIN PROFILE */}
        <div className="absolute bottom-0 w-full border-t border-gray-100 p-4">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">
              AD
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">
                Administrator
              </p>
              <p className="text-xs text-gray-400">
                Super Admin
              </p>
            </div>

            <LogOut size={17} className="text-gray-400" />
          </div>

        </div>
      </aside>

      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* MAIN CONTENT */}
      <main className="min-h-screen lg:ml-64">

        {/* TOPBAR */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-5 lg:px-8">

          <div className="flex items-center gap-3">

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div>
              <p className="text-sm font-semibold">
                Admin Dashboard
              </p>
              <p className="hidden text-xs text-gray-400 sm:block">
                CampusMart Management System
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            {/* SEARCH */}
            <div className="hidden items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 md:flex">
              <Search size={16} className="text-gray-400" />
              <input
                placeholder="Cari sesuatu..."
                className="w-36 text-xs outline-none"
              />
            </div>

            {/* NOTIFICATION */}
            <button className="relative rounded-lg p-2 hover:bg-gray-100">
              <Bell size={19} />

              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
              AD
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <div className="p-5 lg:p-8">

          {/* PAGE TITLE */}
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">

            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Dashboard
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Selamat datang kembali, Admin!
                Berikut ringkasan CampusMart.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs text-gray-500">
              9 November 2026
            </div>

          </div>

          {/* STATISTICS CARDS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {statistics.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                >

                  <div className="flex items-center justify-between">

                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}>
                      <Icon size={21} />
                    </div>

                    <MoreHorizontal size={20} className="text-gray-300" />

                  </div>

                  <p className="mt-5 text-sm text-gray-400">
                    {item.title}
                  </p>

                  <div className="mt-1 flex items-center justify-between">

                    <h3 className="text-2xl font-bold">
                      {item.value}
                    </h3>

                    <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${
                      item.positive
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-500"
                    }`}>
                      {item.positive
                        ? <TrendingUp size={12} />
                        : <TrendingDown size={12} />
                      }
                      {item.growth}
                    </span>

                  </div>

                </div>
              );
            })}

          </div>

          {/* CHART + PENDING */}
          <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-3">

            {/* REVENUE CHART */}
            <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2">

              <div className="mb-6 flex items-center justify-between">

                <div>
                  <h3 className="font-bold">
                    Aktivitas Marketplace
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Pertumbuhan aktivitas bulanan
                  </p>
                </div>

                <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs outline-none">
                  <option>12 Bulan Terakhir</option>
                  <option>6 Bulan Terakhir</option>
                  <option>30 Hari Terakhir</option>
                </select>

              </div>

              {/* GRAFIK SVG SEDERHANA */}
              <div className="w-full overflow-hidden">

                <svg
                  viewBox="0 0 700 260"
                  className="h-auto w-full"
                  preserveAspectRatio="none"
                >

                  {/* GRID */}
                  {[40, 90, 140, 190, 240].map((y) => (
                    <line
                      key={y}
                      x1="35"
                      y1={y}
                      x2="690"
                      y2={y}
                      stroke="#f1f5f9"
                      strokeWidth="1"
                    />
                  ))}

                  {/* AREA */}
                  <path
                    d="M35 190
                    C80 170 95 175 130 155
                    S195 125 240 145
                    S305 85 350 105
                    S410 125 455 75
                    S530 100 565 65
                    S640 30 690 20
                    L690 240 L35 240 Z"
                    fill="#0d9488"
                    opacity="0.10"
                  />

                  {/* LINE */}
                  <path
                    d="M35 190
                    C80 170 95 175 130 155
                    S195 125 240 145
                    S305 85 350 105
                    S410 125 455 75
                    S530 100 565 65
                    S640 30 690 20"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                </svg>

                <div className="mt-2 flex justify-between text-[10px] text-gray-400">
                  {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"].map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>

              </div>

              <div className="mt-5 flex gap-5 text-xs text-gray-500">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-teal-600" />
                  Aktivitas marketplace
                </span>
              </div>

            </section>

            {/* PENDING VERIFICATION */}
            <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold">
                    Verifikasi Toko
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Menunggu persetujuan
                  </p>
                </div>

                <span className="rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
                  3 Pending
                </span>
              </div>

              <div className="space-y-5">

                {pendingStores.map((store) => (
                  <div key={store.name} className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                      <Store size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {store.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {store.owner}
                      </p>
                    </div>

                    <Clock size={16} className="text-orange-400" />

                  </div>
                ))}

              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 py-2.5 text-xs font-semibold text-white transition hover:bg-teal-700">
                Lihat Semua
                <ArrowUpRight size={14} />
              </button>

            </section>

          </div>

          {/* BOTTOM CONTENT */}
          <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">

            {/* RECENT ACTIVITIES */}
            <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-bold">
                  Aktivitas Terbaru
                </h3>
                <button className="text-xs font-medium text-teal-600">
                  Lihat Semua
                </button>
              </div>

              <div className="space-y-5">

                {activities.map((activity, index) => {
                  const Icon = activity.icon;

                  return (
                    <div key={index} className="flex items-center gap-3">

                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activity.color}`}>
                        <Icon size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">
                          {activity.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {activity.action}
                        </p>
                      </div>

                      <span className="text-[10px] text-gray-400">
                        {activity.time}
                      </span>

                    </div>
                  );
                })}

              </div>

            </section>

            {/* PLATFORM SUMMARY */}
            <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

              <h3 className="mb-5 font-bold">
                Status Marketplace
              </h3>

              <div className="space-y-5">

                <StatusItem
                  label="Toko Terverifikasi"
                  value="83"
                  icon={CheckCircle2}
                  color="text-green-600"
                />

                <StatusItem
                  label="Menunggu Verifikasi"
                  value="3"
                  icon={Clock}
                  color="text-orange-500"
                />

                <StatusItem
                  label="Produk Ditolak"
                  value="5"
                  icon={XCircle}
                  color="text-red-500"
                />

                <StatusItem
                  label="Total Transaksi"
                  value="1.024"
                  icon={CircleDollarSign}
                  color="text-teal-600"
                />

              </div>

            </section>

          </div>

          <p className="mt-8 text-center text-xs text-gray-400">
            © 2026 CampusMart. Admin Dashboard.
          </p>

        </div>

      </main>

    </div>
  );
}

// =====================================
// KOMPONEN SIDEBAR ITEM
// =====================================

function SidebarItem({
  icon: Icon,
  label,
  active = false,
  badge,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
        active
          ? "bg-teal-600 font-semibold text-white shadow-sm"
          : "text-gray-500 hover:bg-gray-50 hover:text-teal-700"
      }`}
    >
      <Icon size={18} />

      <span className="flex-1 text-left">
        {label}
      </span>

      {badge && (
        <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] text-orange-600">
          {badge}
        </span>
      )}
    </button>
  );
}

// =====================================
// KOMPONEN STATUS
// =====================================

function StatusItem({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">
        <Icon size={19} className={color} />
        <span className="text-sm text-gray-500">
          {label}
        </span>
      </div>

      <span className="text-sm font-bold">
        {value}
      </span>

    </div>
  );
}

export default AdminDashboard;
