// Generates 30 placeholder FMCG products with lorem-style names.

export interface LoremProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  isPlaceholder: true;
}

const NAMES = [
  "Fresh Orange Juice",
  "Mineral Water 1.5L",
  "Green Tea 25 Bags",
  "Cola 2L",
  "Potato Chips 200g",
  "Granola Bar 6-Pack",
  "Butter Biscuits 300g",
  "Microwave Popcorn",
  "Shampoo 400ml",
  "Body Wash 250ml",
  "Toothpaste 100ml",
  "Moisturiser 200ml",
  "Full Cream Milk 1L",
  "Greek Yoghurt 500g",
  "Unsalted Butter 250g",
  "Cheddar Cheese 400g",
  "Dish Soap 750ml",
  "Laundry Detergent 2kg",
  "Paper Towels 6-Roll",
  "Floor Cleaner 1L",
  "Frozen Peas 500g",
  "Vanilla Ice Cream 1L",
  "Frozen Pizza 400g",
  "Mixed Vegetables 1kg",
  "Energy Drink 500ml",
  "Oat Milk 1L",
  "Peanut Butter 340g",
  "Honey 500g",
  "Olive Oil 500ml",
  "Brown Rice 2kg",
];

const CATEGORIES = ["Beverages", "Snacks", "Personal Care", "Dairy", "Household", "Frozen Foods"];

const DESC =
  "A quality FMCG product sourced from trusted suppliers. Delivered fresh to your door. Enquire for bulk pricing, availability, or delivery options.";

export const loremProducts: LoremProduct[] = NAMES.map((name, i) => ({
  id: `lorem-${i + 1}`,
  name,
  price: 0,
  category: CATEGORIES[i % CATEGORIES.length],
  description: DESC,
  isPlaceholder: true,
}));