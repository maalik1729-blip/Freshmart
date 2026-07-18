import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleNav from "@/components/SimpleNav";
import Footer from "@/components/footer/Footer";
import { supabase } from "@/integrations/supabase/client";
import { loremProducts } from "@/lib/loremProducts";

interface DbProduct {
  id: string;
  name: string;
  price: number;
  category: string | null;
  description: string | null;
}

const getEmoji = (category: string | null, name: string) => {
  const n = name.toLowerCase();
  if (n.includes("water")) return "💧";
  if (n.includes("juice") || n.includes("orange")) return "🍊";
  if (n.includes("tea")) return "🍵";
  if (n.includes("cola") || n.includes("soda")) return "🥤";
  if (n.includes("chips")) return "🥔";
  if (n.includes("bar") || n.includes("granola")) return "🌾";
  if (n.includes("biscuit") || n.includes("cookie")) return "🍪";
  if (n.includes("popcorn")) return "🍿";
  if (n.includes("shampoo")) return "🧴";
  if (n.includes("wash") || n.includes("soap")) return "🧼";
  if (n.includes("toothpaste")) return "🦷";
  if (n.includes("moisturiser") || n.includes("cream")) return "🧴";
  if (n.includes("milk")) return "🥛";
  if (n.includes("yoghurt")) return "🫙";
  if (n.includes("butter")) return "🧈";
  if (n.includes("cheese")) return "🧀";
  if (n.includes("laundry") || n.includes("detergent")) return "🧺";
  if (n.includes("paper") || n.includes("towel")) return "🧻";
  if (n.includes("cleaner") || n.includes("floor")) return "🪣";
  if (n.includes("peas")) return "🟢";
  if (n.includes("ice cream")) return "🍦";
  if (n.includes("pizza")) return "🍕";
  if (n.includes("veg")) return "🥦";

  const c = (category || "").toLowerCase();
  if (c.includes("bev")) return "🥤";
  if (c.includes("snack")) return "🍪";
  if (c.includes("personal")) return "🧴";
  if (c.includes("dairy")) return "🥛";
  if (c.includes("house")) return "🧼";
  if (c.includes("froz")) return "❄️";
  return "📦";
};

const Products = () => {
  const [dbProducts, setDbProducts] = useState<DbProduct[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase
      .from("products")
      .select("id,name,price,category,description")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setDbProducts((data as DbProduct[]) ?? []);
        setLoaded(true);
      });
  }, []);

  const realCount = dbProducts.length;
  const combined = [
    ...dbProducts.map((p) => ({ ...p, isPlaceholder: false as const })),
    ...loremProducts.slice(0, Math.max(0, 30 - realCount)),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SimpleNav />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="mb-2 text-3xl font-light">Products</h1>
        <p className="mb-10 text-sm text-muted-foreground">
          Showing {combined.length} items{realCount > 0 ? ` · ${realCount} real, ${combined.length - realCount} placeholder` : ""}
        </p>

        {!loaded ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {combined.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="group block border border-border p-4 transition-all hover:border-foreground hover:shadow-md"
              >
                <div className="mb-4 flex aspect-square items-center justify-center bg-muted/20 text-6xl group-hover:scale-105 transition-transform duration-300 select-none relative">
                  {getEmoji(p.category, p.name)}
                  <div className="absolute inset-0 bg-black/[0.02]" />
                </div>
                <p className="text-xs font-light text-muted-foreground">{p.category}</p>
                <div className="mt-1">
                  <h3 className="text-sm font-medium">{p.name}</h3>
                </div>
                <p className="mt-2 line-clamp-2 text-xs font-light text-muted-foreground">
                  {p.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Products;