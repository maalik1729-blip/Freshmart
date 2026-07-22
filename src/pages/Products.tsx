import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleNav from "@/components/SimpleNav";
import Footer from "@/components/Footer";

interface DbProduct {
  id: string;
  name: string;
  price: number;
  category: string | null;
  description: string | null;
  imageUrl?: string;
}

const Products = () => {
  const [dbProducts, setDbProducts] = useState<DbProduct[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => {
        setDbProducts(data ?? []);
        setLoaded(true);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoaded(true);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SimpleNav />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="mb-2 text-3xl font-light">Products</h1>
        <p className="mb-10 text-sm text-muted-foreground">
          Showing {dbProducts.length} items
        </p>

        {!loaded ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {dbProducts.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="group block border border-border p-4 transition-colors hover:border-foreground"
              >
                <div className="mb-4 flex aspect-square items-center justify-center bg-muted text-xs uppercase tracking-widest text-muted-foreground overflow-hidden relative">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <span>{p.category ?? "Product"}</span>
                  )}
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