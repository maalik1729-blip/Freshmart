import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SimpleNav from "@/components/SimpleNav";
import Footer from "@/components/footer/Footer";
import { supabase } from "@/integrations/supabase/client";
import { loremProducts } from "@/lib/loremProducts";
import { Button } from "@/components/ui/button";

interface Product {
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

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    if (id.startsWith("lorem-")) {
      const p = loremProducts.find((x) => x.id === id);
      setProduct(p ? { ...p, description: p.description } : null);
      setLoading(false);
      return;
    }
    supabase
      .from("products")
      .select("id,name,price,category,description")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        setProduct(data as Product | null);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <SimpleNav />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to products
        </Link>

        {loading ? (
          <p className="mt-8 text-sm text-muted-foreground">Loading…</p>
        ) : !product ? (
          <p className="mt-8">Product not found.</p>
        ) : (
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <div className="flex aspect-square items-center justify-center bg-muted/20 text-9xl select-none relative border border-border">
              {getEmoji(product.category, product.name)}
              <div className="absolute inset-0 bg-black/[0.02]" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{product.category}</p>
              <h1 className="mt-1 text-3xl font-light">{product.name}</h1>
              <p className="mt-6 text-sm font-light leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <Link to="/enquiry">
                <Button className="mt-10 h-12 w-full rounded-none">Enquire about this product</Button>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;