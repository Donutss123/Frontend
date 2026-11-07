
import type { Product } from "../data/products";

// Informasi setiap produk yang masuk ke dalam pesanan
export interface OrderItem {
  product: Product;
  quantity: number;
}

// Struktur data satu pesanan
export interface Order {
  id: string;
  items: OrderItem[];
  recipientName: string;
  phone: string;
  address: string;
  paymentMethod: string;
  total: number;
  status: "Menunggu Pembayaran" | "Diproses" | "Selesai";
  createdAt: string;
}

// Data yang dikirim Checkout saat pengguna membuat pesanan
// id, status, dan createdAt akan dibuat oleh App.tsx
export type NewOrder = Omit<Order, "id" | "status" | "createdAt">;
