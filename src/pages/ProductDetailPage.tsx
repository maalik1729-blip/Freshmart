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
  image_url?: string | null;
  imageUrl?: string;
  isPlaceholder?: boolean;
}

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
      .select("id,name,price,category,description,image_url")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        setProduct(data as Product | null);
        setLoading(false);
      });
  }, [id]);

  const img = product?.isPlaceholder 
    ? product.imageUrl 
    : (product?.image_url || "https://images.unsplash.com/photo-1540340061720-c2f3df3273ee?w=600&auto=format&fit=crop&q=80");

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
            <div className="flex aspect-square items-center justify-center bg-muted/20 overflow-hidden relative border border-border">
              <img 
                src={img} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
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