import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";


const ReviewProduct = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const submitReview = () => {
    // Simple submission logic - in a real app this would send to backend
    console.log("Review submitted:", { rating, review });
    setIsOpen(false);
    setRating(0);
    setReview("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full h-12 font-light rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background"
        >
          Review product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md !rounded-none">
        <DialogHeader>
          <DialogTitle className="font-light text-xl">Review product</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-light text-foreground">Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 cursor-pointer transition-colors ${
                    star <= rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-light text-foreground">Your review</label>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your thoughts about this product..."
              className="min-h-24 resize-none rounded-none font-light"
            />
          </div>
          
          <Button 
            onClick={submitReview}
            disabled={rating === 0 || review.trim() === ""}
            className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-light rounded-none"
          >
            Submit review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewProduct;