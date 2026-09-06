import {
  Pizza, Beef, Sandwich, Soup, CupSoda, Cookie, Package, Drumstick,
  Utensils, Egg, Wheat, UtensilsCrossed, LucideIcon,
} from "lucide-react";
import type { Category } from "./types";

export const CATEGORY_META: Record<Category, { icon: LucideIcon; color: string }> = {
  Pizza: { icon: Pizza, color: "#B8433A" },
  Burgers: { icon: Beef, color: "#8B5E34" },
  "Fast Food": { icon: Sandwich, color: "#C97B2E" },
  Chicken: { icon: Drumstick, color: "#A6642C" },
  Pasta: { icon: Soup, color: "#B5773A" },
  Drinks: { icon: CupSoda, color: "#3F6B4F" },
  Desserts: { icon: Cookie, color: "#9C6B3E" },
  Fries: { icon: Utensils, color: "#C9932E" },
  Sandwich: { icon: Sandwich, color: "#A6642C" },
  Nuggets: { icon: Egg, color: "#D9A23B" },
  Wing: { icon: Drumstick, color: "#8B4A2B" },
  "Paratha Roll": { icon: Wheat, color: "#B98650" },
  Shawarma: { icon: UtensilsCrossed, color: "#9C5B2E" },
  Other: { icon: Package, color: "#5B5850" },
};

export const CATEGORIES = Object.keys(CATEGORY_META) as Category[];