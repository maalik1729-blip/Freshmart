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
          <div className="mt-12 max-w-xl mx-auto border border-border p-8 md:p-12 space-y-6 bg-muted/5">
            <div>
              <p className="text-xs font-light text-muted-foreground uppercase tracking-widest">{product.category}</p>
              <h1 className="mt-2 text-3xl font-light text-foreground">{product.name}</h1>
            </div>
            <p className="text-sm font-light leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <div className="pt-4">
              <Link to="/enquiry" className="block">
                <Button className="h-12 w-full rounded-none">Enquire about this product</Button>
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