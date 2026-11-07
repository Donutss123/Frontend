
export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  storeId: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Tafsir Al-Qur'an Jilid Lengkap",
    price: 125000,
    rating: 4.9,
    reviews: 328,
    category: "Buku & Referensi",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
    storeId: 1,
  },
  {
    id: 2,
    name: "Tas Kuliah Multifungsi",
    price: 149000,
    rating: 4.8,
    reviews: 512,
    category: "Perlengkapan Kuliah",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    storeId: 2,
  },
  {
    id: 3,
    name: "Stand Laptop Aluminium",
    price: 89000,
    rating: 4.9,
    reviews: 241,
    category: "Elektronik",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600",
    storeId: 3,
  },
  {
    id: 4,
    name: "Tumbler Stainless 500 ml",
    price: 79000,
    rating: 4.8,
    reviews: 376,
    category: "Perlengkapan Kuliah",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600",
    storeId: 2,
  },
  {
    id: 5,
    name: "Notebook A5 100 Lembar",
    price: 24000,
    rating: 4.9,
    reviews: 1200,
    category: "Perlengkapan Kuliah",
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600",
    storeId: 2,
  },
];
