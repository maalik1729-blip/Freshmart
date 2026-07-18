import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  emoji: string;
  isNew?: boolean;
}

const featuredProducts: Product[] = [
  { id: 2,  name: "Fresh Orange Juice 1L",  category: "Beverages",     price: "€2.49",  emoji: "🍊", isNew: true },
  { id: 6,  name: "Granola Bar 6-Pack",     category: "Snacks",        price: "€4.49",  emoji: "🌾", isNew: true },
  { id: 9,  name: "Shampoo 400ml",          category: "Personal Care", price: "€5.99",  emoji: "🧴" },
  { id: 14, name: "Greek Yoghurt 500g",     category: "Dairy",         price: "€2.99",  emoji: "🫙" },
  { id: 18, name: "Laundry Detergent 2kg",  category: "Household",     price: "€8.99",  emoji: "🧺" },
  { id: 22, name: "Vanilla Ice Cream 1L",   category: "Frozen Foods",  price: "€4.99",  emoji: "🍦", isNew: true },
];

const ProductCarousel = () => {
  return (
    <section className="w-full mb-16 px-6">
      <h2 className="text-lg font-light mb-6 text-foreground">Featured Products</h2>
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent>
          {featuredProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 pr-2 md:pr-4"
            >
              <Link to={`/product/${product.id}`}>
                <Card className="border border-border shadow-none bg-transparent group hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-square mb-3 overflow-hidden bg-muted/20 relative flex items-center justify-center">
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-300 select-none">
                        {product.emoji}
                      </span>
                      {product.isNew && (
                        <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-green-600 text-white rounded-sm">
                          NEW
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 px-3 pb-3">
                      <p className="text-xs font-light text-foreground uppercase tracking-wide">
                        {product.category}
                      </p>
                      <h3 className="text-sm font-medium text-foreground leading-tight">
                        {product.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default ProductCarousel;