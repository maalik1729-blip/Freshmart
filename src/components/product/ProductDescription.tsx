import { useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewProduct from "./ReviewProduct";


const ProductDescription = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isStorageOpen, setIsStorageOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  return (
    <div className="space-y-0 mt-8 border-t border-border">
      {/* Description */}
      <div className="border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>Description</span>
          {isDescriptionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isDescriptionOpen && (
          <div className="pb-6 space-y-4">
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Our Fresh Orange Juice is cold-pressed daily from hand-picked, sun-ripened oranges.
              Every bottle delivers a burst of natural vitamins and minerals — no added sugar,
              no preservatives, just pure refreshing goodness.
            </p>
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Packed with Vitamin C and natural antioxidants, this juice is the perfect start
              to your morning or a healthy pick-me-up at any time of the day.
            </p>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>Product Details</span>
          {isDetailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isDetailsOpen && (
          <div className="pb-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">SKU</span>
              <span className="text-sm font-light text-foreground">FM-BEV-OJ-001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">Brand</span>
              <span className="text-sm font-light text-foreground">FreshMart Own Brand</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">Shelf Life</span>
              <span className="text-sm font-light text-foreground">7 days from production date</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">Organic Certified</span>
              <span className="text-sm font-light text-foreground">Yes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">Allergens</span>
              <span className="text-sm font-light text-foreground">None</span>
            </div>
          </div>
        )}
      </div>

      {/* Storage Instructions */}
      <div className="border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsStorageOpen(!isStorageOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>Storage Instructions</span>
          {isStorageOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isStorageOpen && (
          <div className="pb-6 space-y-4">
            <ul className="space-y-2">
              <li className="text-sm font-light text-muted-foreground">• Store in the refrigerator between 1°C – 4°C</li>
              <li className="text-sm font-light text-muted-foreground">• Keep away from direct sunlight</li>
              <li className="text-sm font-light text-muted-foreground">• Consume within 3 days of opening</li>
              <li className="text-sm font-light text-muted-foreground">• Shake well before serving</li>
            </ul>
            <p className="text-sm font-light text-muted-foreground">
              Do not freeze. Best consumed chilled for optimal taste.
            </p>
          </div>
        )}
      </div>

      {/* Customer Reviews */}
      <div className="border-b border-border lg:mb-16">
        <Button
          variant="ghost"
          onClick={() => setIsReviewsOpen(!isReviewsOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <div className="flex items-center gap-3">
            <span>Customer Reviews</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`w-3 h-3 ${star <= 4.7 ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} />
              ))}
              <span className="text-sm font-light text-muted-foreground ml-1">4.7</span>
            </div>
          </div>
          {isReviewsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isReviewsOpen && (
          <div className="pb-6 space-y-6">
            <ReviewProduct />
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-3 h-3 text-amber-400 fill-amber-400`} />
                    ))}
                  </div>
                  <span className="text-sm font-light text-muted-foreground">Priya S.</span>
                </div>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  "Absolutely delicious and fresh! Tastes just like freshly squeezed at home.
                  Will definitely be ordering every week. Great value for money!"
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <CustomStar key={star} filled={star <= 4} />
                    ))}
                  </div>
                  <span className="text-sm font-light text-muted-foreground">James T.</span>
                </div>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  "Very fresh quality. No added sugar which is exactly what I look for.
                  Packaging is secure and arrived perfectly chilled."
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-3 h-3 text-amber-400 fill-amber-400`} />
                    ))}
                  </div>
                  <span className="text-sm font-light text-muted-foreground">Meena R.</span>
                </div>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  "Organic certified and the taste is amazing. My kids love it every morning.
                  Best orange juice I've bought online!"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;