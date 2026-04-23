import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Heart } from "lucide-react";

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />
      <div className="container py-10">
        <h1 className="mb-6 font-display text-4xl font-bold">Your wishlist</h1>

        {wishlist.length === 0 ? (
          <Card className="p-10 text-center">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Nothing saved yet.</p>
            <Button className="mt-4 bg-gradient-warm text-primary-foreground" onClick={() => navigate("/buyer")}>
              Browse listings
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((l) => (
              <Card key={l.id} className="overflow-hidden">
                <img src={l.photo} alt={l.name} className="aspect-[4/3] w-full object-cover" />
                <div className="space-y-2 p-4">
                  <h3 className="font-display text-lg font-bold">{l.name}</h3>
                  <p className="text-sm text-primary">{l.hotel}</p>
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-gradient-warm text-primary-foreground" onClick={() => addToCart(l)}>
                      Add to cart
                    </Button>
                    <Button variant="outline" onClick={() => toggleWishlist(l)}>Remove</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
