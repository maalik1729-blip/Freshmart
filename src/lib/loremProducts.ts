// Generates 30 placeholder FMCG products with correct categories and high-quality image URLs.

export interface LoremProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  isPlaceholder: true;
}

const PRODUCT_DATA: { name: string; category: string; imageUrl: string }[] = [
  {
    name: "Fresh Orange Juice 1L",
    category: "Beverages",
    imageUrl: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Mineral Water 1.5L",
    category: "Beverages",
    imageUrl: "https://images.unsplash.com/photo-1608885898957-a599fb15238f?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Green Tea 25 Bags",
    category: "Beverages",
    imageUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Cola 2L",
    category: "Beverages",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Potato Chips 200g",
    category: "Snacks",
    imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Granola Bar 6-Pack",
    category: "Snacks",
    imageUrl: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Butter Biscuits 300g",
    category: "Snacks",
    imageUrl: "https://images.unsplash.com/photo-1558961309-dbdf717a1a40?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Microwave Popcorn",
    category: "Snacks",
    imageUrl: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Shampoo 400ml",
    category: "Personal Care",
    imageUrl: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Body Wash 250ml",
    category: "Personal Care",
    imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Toothpaste 100ml",
    category: "Personal Care",
    imageUrl: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Moisturiser 200ml",
    category: "Personal Care",
    imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Full Cream Milk 1L",
    category: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Greek Yoghurt 500g",
    category: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Unsalted Butter 250g",
    category: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Cheddar Cheese 400g",
    category: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Dish Soap 750ml",
    category: "Household",
    imageUrl: "https://images.unsplash.com/photo-1607006342411-9a9aa5f1712a?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Laundry Detergent 2kg",
    category: "Household",
    imageUrl: "https://images.unsplash.com/photo-1610557892470-76618c8140ec?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Paper Towels 6-Roll",
    category: "Household",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Floor Cleaner 1L",
    category: "Household",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Frozen Peas 500g",
    category: "Frozen Foods",
    imageUrl: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Vanilla Ice Cream 1L",
    category: "Frozen Foods",
    imageUrl: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Frozen Pizza 400g",
    category: "Frozen Foods",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Mixed Vegetables 1kg",
    category: "Frozen Foods",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Energy Drink 500ml",
    category: "Beverages",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Oat Milk 1L",
    category: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Peanut Butter 340g",
    category: "Snacks",
    imageUrl: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Honey 500g",
    category: "Snacks",
    imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Olive Oil 500ml",
    category: "Household",
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80"
  },
  {
    name: "Brown Rice 2kg",
    category: "Snacks",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80"
  }
];

const DESC =
  "A quality FMCG product sourced from trusted suppliers. Delivered fresh to your door. Enquire for bulk pricing, availability, or delivery options.";

export const loremProducts: LoremProduct[] = PRODUCT_DATA.map((item, i) => ({
  id: `lorem-${i + 1}`,
  name: item.name,
  price: 0,
  category: item.category,
  description: DESC,
  imageUrl: item.imageUrl,
  isPlaceholder: true,
}));