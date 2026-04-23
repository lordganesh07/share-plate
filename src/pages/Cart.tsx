import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, l) => {
    const remaining = l.expiresAt - Date.now();
    const price = remaining <= 10 * 60 * 1000 ? 0 : l.price;
    return sum + price;
  }, 0);

  const checkout = (l: typeof cart[number]) => {
    sessionStorage.setItem("sharefood:current", JSON.stringify(l));
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />
      <div className="container py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-display text-4xl font-bold">Your cart</h1>
          {cart.length > 0 && (
            <Button variant="outline" onClick={() => { clearCart(); toast.success("Cart cleared"); }}>
              Clear cart
            </Button>
          )}
        </div>

        {cart.length === 0 ? (
          <Card className="p-10 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
            <Button className="mt-4 bg-gradient-warm text-primary-foreground" onClick={() => navigate("/buyer")}>
              Browse listings
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {cart.map((l) => {
              const remaining = l.expiresAt - Date.now();
              const isFree = l.price === 0 || remaining <= 10 * 60 * 1000;
              return (
                <Card key={l.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <img src={l.photo} alt={l.name} className="h-24 w-24 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold">{l.name}</h3>
                    <p className="text-sm text-primary">{l.hotel}</p>
                    <p className="text-sm text-muted-foreground">{l.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xl font-bold">{isFree ? "FREE" : `₹${l.price}`}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => checkout(l)} className="bg-gradient-warm text-primary-foreground">
                      Order
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => removeFromCart(l.id)} aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
            <Card className="flex items-center justify-between p-6">
              <span className="text-muted-foreground">Estimated total</span>
              <span className="font-display text-3xl font-bold text-gradient-warm">₹{total}</span>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
