import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Bill, CartItem, MenuItem, Settings, SizeOption } from "./types";
import { SEED_MENU } from "@/data/seed";
import { uid } from "./utils";

interface StoreState {
  menuItems: MenuItem[];
  cart: CartItem[];
  bills: Bill[];
  settings: Settings;

  addMenuItem: (data: Omit<MenuItem, "id">) => void;
  updateMenuItem: (id: string, data: Omit<MenuItem, "id">) => void;
  deleteMenuItem: (id: string) => void;

  addToCart: (item: MenuItem, size?: SizeOption) => void;
  incCartItem: (id: string) => void;
  decCartItem: (id: string) => void;
  removeCartItem: (id: string) => void;
  clearCart: () => void;

  createBill: (items: CartItem[]) => void;
  updateBill: (bill: Bill) => void;
  deleteBill: (id: string) => void;

  updateSettings: (data: Partial<Settings>) => void;
  resetAll: () => void;
}

const DEFAULT_SETTINGS: Settings = { restaurantName: "Fork & Fire", currency: "Rs", taxRate: 0 };

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      menuItems: SEED_MENU,
      cart: [],
      bills: [],
      settings: DEFAULT_SETTINGS,

      addMenuItem: (data) =>
        set((s) => ({ menuItems: [{ id: uid(), ...data }, ...s.menuItems] })),

      updateMenuItem: (id, data) =>
        set((s) => ({
          menuItems: s.menuItems.map((i) => (i.id === id ? { ...i, ...data } : i)),
        })),

      deleteMenuItem: (id) =>
        set((s) => ({
          menuItems: s.menuItems.filter((i) => i.id !== id),
          // sized cart lines are stored as "<itemId>::<sizeLabel>", so clear those too
          cart: s.cart.filter((i) => i.id !== id && !i.id.startsWith(`${id}::`)),
        })),

      addToCart: (item, size) =>
        set((s) => {
          const unitPrice = size ? size.price : item.price;
          const cartId = size ? `${item.id}::${size.label}` : item.id;
          const displayName = size ? `${item.name} (${size.label})` : item.name;

          const existing = s.cart.find((i) => i.id === cartId);
          if (existing) {
            return { cart: s.cart.map((i) => (i.id === cartId ? { ...i, qty: i.qty + 1 } : i)) };
          }
          return { cart: [...s.cart, { id: cartId, name: displayName, price: unitPrice, qty: 1 }] };
        }),

      incCartItem: (id) =>
        set((s) => ({ cart: s.cart.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) })),

      decCartItem: (id) =>
        set((s) => ({
          cart: s.cart.map((i) => (i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i)),
        })),

      removeCartItem: (id) => set((s) => ({ cart: s.cart.filter((i) => i.id !== id) })),

      clearCart: () => set({ cart: [] }),

      createBill: (items) =>
        set((s) => {
          const nextNumber = s.bills.length ? Math.max(...s.bills.map((b) => b.orderNumber)) + 1 : 1;
          const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
          const grandTotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
          const bill: Bill = {
            id: uid(),
            orderNumber: nextNumber,
            date: new Date().toISOString(),
            items: items.map((i) => ({ ...i })),
            totalQty,
            grandTotal,
            taxRate: get().settings.taxRate ?? 0,
          };
          return { bills: [bill, ...s.bills], cart: [] };
        }),

      updateBill: (bill) =>
        set((s) => {
          if (bill.items.length === 0) {
            return { bills: s.bills.filter((b) => b.id !== bill.id) };
          }
          return { bills: s.bills.map((b) => (b.id === bill.id ? bill : b)) };
        }),

      deleteBill: (id) => set((s) => ({ bills: s.bills.filter((b) => b.id !== id) })),

      updateSettings: (data) => set((s) => ({ settings: { ...s.settings, ...data } })),

      resetAll: () =>
        set({ menuItems: SEED_MENU, cart: [], bills: [], settings: DEFAULT_SETTINGS }),
    }),
    { name: "restaurant-admin-storage" }
  )
);