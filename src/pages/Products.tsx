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
  image_url?: string | null;
}

const Products = () => {
  const [dbProducts, setDbProducts] = useState<DbProduct[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase
      .from("products")
      .select("id,name,price,category,description,image_url")
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {combined.map((p) => {
              return (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="group block border border-border p-6 transition-all hover:border-foreground hover:shadow-md space-y-2 bg-muted/5"
                >
                  <p className="text-xs font-light text-muted-foreground uppercase tracking-widest">{p.category}</p>
                  <div className="pt-1">
                    <h3 className="text-base font-medium text-foreground group-hover:underline">{p.name}</h3>
                  </div>
                  <p className="line-clamp-3 text-xs font-light text-muted-foreground leading-relaxed pt-1">
                    {p.description}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Products;