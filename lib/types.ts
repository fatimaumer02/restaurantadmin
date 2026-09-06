export type Category =
  | "Pizza"
  | "Burgers"
  | "Fast Food"
  | "Chicken"
  | "Pasta"
  | "Drinks"
  | "Desserts"
  | "Fries"
  | "Sandwich"
  | "Nuggets"
  | "Wing"
  | "Paratha Roll"
  | "Shawarma"
  | "Other";

export interface SizeOption {
  label: string; // e.g. "S", "M", "L", "XL"
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number; // used when sizes is empty (single-price item)
  sizes: SizeOption[]; // empty array = single price, no size picker
  image: string;
  available: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface Bill {
  id: string;
  orderNumber: number;
  date: string;
  items: CartItem[];
  totalQty: number;
  grandTotal: number;
  taxRate: number;
}

export interface Settings {
  restaurantName: string;
  currency: string;
  taxRate: number;
}