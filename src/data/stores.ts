
// Struktur data untuk setiap toko
export interface Store {
  id: number;
  name: string;
  description: string;
  category: string;
}

// Data toko sementara untuk prototype CampusMart
export const stores: Store[] = [
  {
    id: 1,
    name: "Kedai Mahasiswa",
    description: "Menyediakan buku dan perlengkapan belajar mahasiswa.",
    category: "Buku & Perlengkapan Kuliah",
  },
  {
    id: 2,
    name: "Campus Gear",
    description: "Berbagai perlengkapan untuk menunjang aktivitas kuliah.",
    category: "Perlengkapan Kuliah",
  },
  {
    id: 3,
    name: "Tech Corner",
    description: "Perlengkapan elektronik untuk kebutuhan mahasiswa.",
    category: "Elektronik",
  },
];
