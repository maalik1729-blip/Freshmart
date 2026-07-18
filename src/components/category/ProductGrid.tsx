import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  emoji: string;
  isNew?: boolean;
}

const products: Product[] = [
  { id: 1,  name: "Mineral Water 1.5L",     category: "Beverages",     price: "€0.99",  emoji: "💧", isNew: true },
  { id: 2,  name: "Fresh Orange Juice 1L",  category: "Beverages",     price: "€2.49",  emoji: "🍊", isNew: true },
  { id: 3,  name: "Green Tea 25 Bags",      category: "Beverages",     price: "€3.99",  emoji: "🍵" },
  { id: 4,  name: "Cola 2L",                category: "Beverages",     price: "€1.79",  emoji: "🥤" },
  { id: 5,  name: "Potato Chips 200g",      category: "Snacks",        price: "€2.29",  emoji: "🥔" },
  { id: 6,  name: "Granola Bar 6-Pack",     category: "Snacks",        price: "€4.49",  emoji: "🌾", isNew: true },
  { id: 7,  name: "Butter Biscuits 300g",   category: "Snacks",        price: "€1.99",  emoji: "🍪" },
  { id: 8,  name: "Microwave Popcorn",      category: "Snacks",        price: "€1.49",  emoji: "🍿" },
  { id: 9,  name: "Shampoo 400ml",          category: "Personal Care", price: "€5.99",  emoji: "🧴" },
  { id: 10, name: "Body Wash 250ml",        category: "Personal Care", price: "€4.29",  emoji: "🚿" },
  { id: 11, name: "Toothpaste 100ml",       category: "Personal Care", price: "€2.79",  emoji: "🦷" },
  { id: 12, name: "Moisturiser 200ml",      category: "Personal Care", price: "€7.99",  emoji: "🧴", isNew: true },
  { id: 13, name: "Full Cream Milk 1L",     category: "Dairy",         price: "€1.29",  emoji: "🥛" },
  { id: 14, name: "Greek Yoghurt 500g",     category: "Dairy",         price: "€2.99",  emoji: "🫙" },
  { id: 15, name: "Unsalted Butter 250g",   category: "Dairy",         price: "€3.49",  emoji: "🧈" },
  { id: 16, name: "Cheddar Cheese 400g",    category: "Dairy",         price: "€4.99",  emoji: "🧀" },
  { id: 17, name: "Dish Soap 750ml",        category: "Household",     price: "€2.49",  emoji: "🧼" },
  { id: 18, name: "Laundry Detergent 2kg",  category: "Household",     price: "€8.99",  emoji: "🧺" },
  { id: 19, name: "Paper Towels 6-Roll",    category: "Household",     price: "€5.49",  emoji: "🧻" },
  { id: 20, name: "Floor Cleaner 1L",       category: "Household",     price: "€3.79",  emoji: "🪣" },
  { id: 21, name: "Frozen Peas 500g",       category: "Frozen Foods",  price: "€1.89",  emoji: "🟢" },
  { id: 22, name: "Vanilla Ice Cream 1L",   category: "Frozen Foods",  price: "€4.99",  emoji: "🍦", isNew: true },
  { id: 23, name: "Frozen Pizza 400g",      category: "Frozen Foods",  price: "€3.99",  emoji: "🍕" },
  { id: 24, name: "Mixed Vegetables 1kg",   category: "Frozen Foods",  price: "€2.79",  emoji: "🥦" },
];

const ProductGrid = () => {
  return (
    <section className="w-full px-6 mb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <Card className="border border-border shadow-none bg-transparent group cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-square mb-3 overflow-hidden bg-muted/20 relative flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300 select-none">
                    {product.emoji}
                  </span>
                  <div className="absolute inset-0 bg-black/[0.02]" />
                  {product.isNew && (
                    <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-green-600 text-white rounded-sm">
                      NEW
                    </div>
                  )}
                </div>
                <div className="space-y-1 px-3 pb-3">
                  <p className="text-xs font-light text-muted-foreground uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h3 className="text-sm font-medium text-foreground leading-tight">
                    {product.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <Pagination />
    </section>
  );
};

export default ProductGrid;