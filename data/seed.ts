import type { MenuItem } from "@/lib/types";

// Real photos hosted directly on Unsplash's CDN, one per food category.
// Free to use under the Unsplash License (https://unsplash.com/license) —
// these are genuine stand-in photos, not photos of your actual dishes.
// Swap the Image URL field on any item (via Edit) for your own photography
// whenever you're ready.
const IMG = {
  pizza: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=60&fm=jpg&fit=crop&auto=format",
  burger: "https://images.unsplash.com/photo-1599474151439-9f3c4e972009?w=800&q=60&fm=jpg&fit=crop&auto=format",
  wrap: "https://images.unsplash.com/photo-1768257164310-5f53c8d83a4e?w=800&q=60&fm=jpg&fit=crop&auto=format",
  sandwich: "https://images.unsplash.com/photo-1709689156420-4de2c03a2e9e?w=800&q=60&fm=jpg&fit=crop&auto=format",
  chickenSando: "https://images.unsplash.com/photo-1670710029403-607db8eeec83?w=800&q=60&fm=jpg&fit=crop&auto=format",
  shawarma: "https://images.unsplash.com/photo-1699728088614-7d1d4277414b?w=800&q=60&fm=jpg&fit=crop&auto=format",
  wings: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800&q=60&fm=jpg&fit=crop&auto=format",
  nuggets: "https://images.unsplash.com/photo-1696265498747-efc4c0dd7b98?w=800&q=60&fm=jpg&fit=crop&auto=format",
  pasta: "https://images.unsplash.com/photo-1693820206848-6ad84857832a?w=800&q=60&fm=jpg&fit=crop&auto=format",
  fries: "https://images.unsplash.com/photo-1615485290836-4ebcebf44aaf?w=800&q=60&fm=jpg&fit=crop&auto=format",
  dipSauce: "https://images.unsplash.com/photo-1681821671644-de136784e47d?w=800&q=60&fm=jpg&fit=crop&auto=format",
  drink: "https://images.unsplash.com/photo-1605005601738-6404a2caffc5?w=800&q=60&fm=jpg&fit=crop&auto=format",
};

export const SEED_MENU: MenuItem[] = [
  // --- Delicious Pizzas ---
  { id: "seed-1", name: "Fork & Fire Special", category: "Pizza", description: "", price: 499, sizes: [{ label: "S", price: 499 }, { label: "M", price: 999 }, { label: "L", price: 1400 }, { label: "XL", price: 1650 }], image: IMG.pizza, available: true },
  { id: "seed-2", name: "Born Fire", category: "Pizza", description: "", price: 499, sizes: [{ label: "S", price: 499 }, { label: "M", price: 999 }, { label: "L", price: 1400 }, { label: "XL", price: 1650 }], image: IMG.pizza, available: true },
  { id: "seed-3", name: "Chicken Supreme", category: "Pizza", description: "", price: 450, sizes: [{ label: "S", price: 450 }, { label: "M", price: 950 }, { label: "L", price: 1350 }, { label: "XL", price: 1550 }], image: IMG.pizza, available: true },
  { id: "seed-4", name: "Chicken Fajita", category: "Pizza", description: "", price: 450, sizes: [{ label: "S", price: 450 }, { label: "M", price: 950 }, { label: "L", price: 1350 }, { label: "XL", price: 1550 }], image: IMG.pizza, available: true },
  { id: "seed-5", name: "Chicken Tikka", category: "Pizza", description: "", price: 450, sizes: [{ label: "S", price: 450 }, { label: "M", price: 950 }, { label: "L", price: 1350 }, { label: "XL", price: 1550 }], image: IMG.pizza, available: true },
  { id: "seed-6", name: "Bihari Kabab", category: "Pizza", description: "", price: 550, sizes: [{ label: "S", price: 550 }, { label: "M", price: 1200 }, { label: "L", price: 1500 }, { label: "XL", price: 1750 }], image: IMG.pizza, available: true },
  { id: "seed-7", name: "Malai Boti", category: "Pizza", description: "", price: 550, sizes: [{ label: "S", price: 550 }, { label: "M", price: 1200 }, { label: "L", price: 1500 }, { label: "XL", price: 1750 }], image: IMG.pizza, available: true },
  { id: "seed-8", name: "Macaroni Pizza", category: "Pizza", description: "", price: 550, sizes: [{ label: "S", price: 550 }, { label: "M", price: 1200 }, { label: "L", price: 1500 }, { label: "XL", price: 1750 }], image: IMG.pizza, available: true },
  { id: "seed-9", name: "Chicken Cheese Stuffer", category: "Pizza", description: "", price: 1300, sizes: [{ label: "M", price: 1300 }, { label: "L", price: 1700 }, { label: "XL", price: 1900 }], image: IMG.pizza, available: true },
  { id: "seed-10", name: "Pepperoni (Extra Cheese)", category: "Pizza", description: "", price: 1300, sizes: [{ label: "M", price: 1300 }, { label: "L", price: 1700 }, { label: "XL", price: 1900 }], image: IMG.pizza, available: true },
  { id: "seed-11", name: "Creamy Mushroom Chicken", category: "Pizza", description: "", price: 1200, sizes: [{ label: "M", price: 1200 }, { label: "L", price: 1500 }, { label: "XL", price: 1700 }], image: IMG.pizza, available: true },

  // --- Burgers & Mains ---
  { id: "seed-12", name: "Smash Burger", category: "Burgers", description: "", price: 700, sizes: [], image: IMG.burger, available: true },
  { id: "seed-13", name: "Masala Burger + Fries", category: "Burgers", description: "", price: 380, sizes: [], image: IMG.burger, available: true },
  { id: "seed-14", name: "Zinger Burger + Fries", category: "Burgers", description: "", price: 350, sizes: [], image: IMG.burger, available: true },
  { id: "seed-15", name: "Patty Burger", category: "Burgers", description: "", price: 280, sizes: [], image: IMG.burger, available: true },

  // --- Sandwiches ---
  { id: "seed-16", name: "Chicken Sando", category: "Sandwich", description: "", price: 250, sizes: [], image: IMG.chickenSando, available: true },
  { id: "seed-17", name: "Chicken Sandwich", category: "Sandwich", description: "", price: 450, sizes: [], image: IMG.sandwich, available: true },
  { id: "seed-18", name: "Bar B Q Sandwich", category: "Sandwich", description: "", price: 250, sizes: [], image: IMG.sandwich, available: true },
  { id: "seed-19", name: "Club Sandwich + Fries", category: "Sandwich", description: "", price: 240, sizes: [], image: IMG.sandwich, available: true },

  // --- Nuggets ---
  { id: "seed-20", name: "Chicken Nugget + Fries", category: "Nuggets", description: "", price: 450, sizes: [], image: IMG.nuggets, available: true },

  // --- Shawarma & Rolls ---
  { id: "seed-21", name: "Chicken Fajita (Pizza Shawarma)", category: "Shawarma", description: "", price: 350, sizes: [], image: IMG.shawarma, available: true },
  { id: "seed-22", name: "Zinger Shawarma", category: "Shawarma", description: "", price: 300, sizes: [], image: IMG.shawarma, available: true },
  { id: "seed-23", name: "Chicken Shawarma", category: "Shawarma", description: "", price: 200, sizes: [], image: IMG.shawarma, available: true },
  { id: "seed-24", name: "Zinger Paratha", category: "Paratha Roll", description: "", price: 330, sizes: [], image: IMG.wrap, available: true },
  { id: "seed-25", name: "Pizza Paratha Roll", category: "Paratha Roll", description: "", price: 320, sizes: [], image: IMG.wrap, available: true },
  { id: "seed-26", name: "Chicken Paratha", category: "Paratha Roll", description: "", price: 250, sizes: [], image: IMG.wrap, available: true },

  // --- Pasta, Sides & Starters ---
  { id: "seed-27", name: "Macaroni Pasta", category: "Pasta", description: "", price: 350, sizes: [{ label: "S", price: 350 }, { label: "L", price: 680 }], image: IMG.pasta, available: true },
  { id: "seed-28", name: "White Sauce Pasta", category: "Pasta", description: "", price: 450, sizes: [], image: IMG.pasta, available: true },
  { id: "seed-29", name: "Crunchy Pasta / Creamy Pasta", category: "Pasta", description: "", price: 360, sizes: [], image: IMG.pasta, available: true },
  { id: "seed-30", name: "Mexican Hot Wings (Honey)", category: "Wing", description: "", price: 400, sizes: [], image: IMG.wings, available: true },
  { id: "seed-31", name: "Peri Peri Wings", category: "Wing", description: "", price: 350, sizes: [], image: IMG.wings, available: true },
  { id: "seed-32", name: "Thai Fried Chicken (200 GM)", category: "Chicken", description: "", price: 350, sizes: [], image: IMG.wings, available: true },
  { id: "seed-33", name: "Chicken Popcorn", category: "Chicken", description: "", price: 300, sizes: [], image: IMG.nuggets, available: true },
  { id: "seed-34", name: "Chicken Corn Dogs", category: "Fast Food", description: "", price: 180, sizes: [], image: IMG.fries, available: true },
  { id: "seed-35", name: "Potato Rings", category: "Fries", description: "", price: 150, sizes: [], image: IMG.fries, available: true },
  { id: "seed-36", name: "Dip Sauce", category: "Other", description: "", price: 50, sizes: [], image: IMG.dipSauce, available: true },

  // --- Crispy Fries ---
  { id: "seed-37", name: "Plain Fries", category: "Fries", description: "", price: 180, sizes: [{ label: "S", price: 180 }, { label: "L", price: 350 }], image: IMG.fries, available: true },
  { id: "seed-38", name: "Masala Fries", category: "Fries", description: "", price: 180, sizes: [{ label: "S", price: 180 }, { label: "L", price: 350 }], image: IMG.fries, available: true },
  { id: "seed-39", name: "Loaded Fries", category: "Fries", description: "", price: 350, sizes: [{ label: "S", price: 350 }, { label: "L", price: 650 }], image: IMG.fries, available: true },
  { id: "seed-40", name: "Garlic Mayo Fries", category: "Fries", description: "", price: 230, sizes: [{ label: "S", price: 230 }, { label: "L", price: 430 }], image: IMG.fries, available: true },

  // --- Cold Drinks & Beverages ---
  { id: "seed-41", name: "Rob Roy", category: "Drinks", description: "", price: 320, sizes: [], image: IMG.drink, available: true },
  { id: "seed-42", name: "Fork & Fire Drink (Slush)", category: "Drinks", description: "", price: 300, sizes: [], image: IMG.drink, available: true },
  { id: "seed-43", name: "Pink Lady Cocktail / Pina Colada", category: "Drinks", description: "", price: 300, sizes: [], image: IMG.drink, available: true },
  { id: "seed-44", name: "Cold Coffee", category: "Drinks", description: "", price: 280, sizes: [], image: IMG.drink, available: true },
  { id: "seed-45", name: "Milk Pot", category: "Drinks", description: "", price: 250, sizes: [], image: IMG.drink, available: true },
  { id: "seed-46", name: "Mint Margarita", category: "Drinks", description: "", price: 150, sizes: [], image: IMG.drink, available: true },
];