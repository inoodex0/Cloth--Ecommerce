import type { CartItem } from "@/providers/CartProvider";

export type StoredOrder = {
  id: string;
  placedAt: number;
  payment: string;
  wallet?: string;
  trx?: string;
  total: number;
  items: Pick<
    CartItem,
    "id" | "name" | "price" | "oldPrice" | "color" | "src" | "size" | "qty"
  >[];
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    area: string;
    postcode: string;
    delivery: string;
  };
};

const STORAGE_KEY = "loomora-orders";

export function loadOrders(): StoredOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as StoredOrder[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: StoredOrder) {
  try {
    const orders = loadOrders();
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([order, ...orders].slice(0, 30))
    );
  } catch {
    // storage full / unavailable — tracking will simply not find this order
  }
}

export function findOrder(
  id: string,
  phone: string
): StoredOrder | undefined {
  const cleanId = id.trim().toUpperCase();
  const cleanPhone = phone.replace(/\D/g, "");
  return loadOrders().find(
    (order) =>
      order.id.toUpperCase() === cleanId &&
      order.customer.phone.replace(/\D/g, "") === cleanPhone
  );
}
