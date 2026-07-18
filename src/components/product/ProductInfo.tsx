import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const ProductInfo = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb - Show only on desktop */}
      <div className="hidden lg:block">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/products">Beverages</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Fresh Orange Juice 1L</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Product title - no price */}
      <div className="space-y-2">
        <div>
          <p className="text-sm font-light text-muted-foreground mb-1">Beverages</p>
          <h1 className="text-2xl md:text-3xl font-light text-foreground">Fresh Orange Juice 1L</h1>
        </div>
      </div>

      {/* Product details */}
      <div className="space-y-4 py-4 border-b border-border">
        <div className="space-y-2">
          <h3 className="text-sm font-light text-foreground">Ingredients</h3>
          <p className="text-sm font-light text-muted-foreground">100% Freshly Squeezed Orange Juice — No Preservatives</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-light text-foreground">Volume</h3>
          <p className="text-sm font-light text-muted-foreground">1 Litre (1000ml)</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-light text-foreground">Storage</h3>
          <p className="text-sm font-light text-muted-foreground">Keep refrigerated. Consume within 3 days of opening.</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-light text-foreground">Editor's notes</h3>
          <p className="text-sm font-light text-muted-foreground italic">
            "Cold-pressed from sun-ripened oranges — no added sugar, just pure refreshing goodness."
          </p>
        </div>
      </div>

      {/* Enquire Button */}
      <div className="pt-2">
        <Link to="/enquiry">
          <Button className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-light rounded-none">
            Enquire about this product
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductInfo;