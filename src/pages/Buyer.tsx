import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Countdown } from "@/components/Countdown";
import { generateListings, FoodListing } from "@/data/listings";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import {
  MapPin, Users, Utensils, Menu as MenuIcon, Moon, Sun, Settings, UserCog,
  PlusCircle, ShoppingCart, Heart, Bell, ShoppingBag, MapPinned,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const FREE_THRESHOLD_MS = 10 * 60 * 1000;

const Buyer = () => {
  const { t } = useLang();
  const { user } = useAuth();
  const { theme, toggle } = useTheme();
  const { cart, addToCart, toggleWishlist, toggleNotify, isWished, isNotified } = useCart();
  const navigate = useNavigate();
  const [listings, setListings] = useState<FoodListing[]>(() => generateListings());
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // 1s tick so the "auto-free at ≤10 min" state updates live
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);

  const providerListings = useMemo<FoodListing[]>(() => {
    try { return JSON.parse(localStorage.getItem("sharefood:providerListings") || "[]"); }
    catch { return []; }
  }, []);

  const all = [...providerListings, ...listings].filter((l) => l.expiresAt > now);

  // Effective price: anything within 10 minutes of expiry becomes FREE
  const effective = (l: FoodListing) => {
    const remaining = l.expiresAt - now;
    const isFree = l.price === 0 || remaining <= FREE_THRESHOLD_MS;
    return { ...l, price: isFree ? 0 : l.price, _autoFree: isFree && l.price > 0 };
  };

  const order = (l: FoodListing) => {
    const e = effective(l);
    sessionStorage.setItem("sharefood:current", JSON.stringify(e));
    navigate("/payment");
  };

  const track = (l: FoodListing) => {
    sessionStorage.setItem("sharefood:current", JSON.stringify(effective(l)));
    navigate("/tracking");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />
      <div className="container py-10">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="font-display text-4xl font-bold md:text-5xl">{t.buyer_title}</h1>
            <p className="text-muted-foreground">{t.buyer_sub}</p>
            <Button variant="outline" className="w-fit" onClick={() => setListings(generateListings())}>
              ↻ Refresh listings
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/cart")}
              className="relative"
              aria-label="Open cart"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart
              {cart.length > 0 && (
                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                  {cart.length}
                </span>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-warm text-primary-foreground shadow-warm hover:opacity-95">
                  <MenuIcon className="mr-2 h-4 w-4" />
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel>Quick actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/provider")}>
                  <PlusCircle className="mr-2 h-4 w-4" /> List your food
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/wishlist")}>
                  <Heart className="mr-2 h-4 w-4" /> Wishlist
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/cart")}>
                  <ShoppingBag className="mr-2 h-4 w-4" /> Cart ({cart.length})
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggle}>
                  {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <UserCog className="mr-2 h-4 w-4" /> Edit profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((raw) => {
            const l = effective(raw);
            const wished = isWished(l.id);
            const notified = isNotified(l.id);
            return (
              <Card key={l.id} className="group flex flex-col overflow-hidden border-border/60 shadow-soft transition-all hover:-translate-y-1 hover:shadow-warm">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img src={l.photo} alt={l.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
                    {l.price === 0 ? (
                      <Badge className="bg-accent text-accent-foreground shadow-soft">
                        FREE{l._autoFree ? " · Auto" : " · Donation"}
                      </Badge>
                    ) : (
                      <Badge className="bg-gradient-warm text-primary-foreground shadow-warm">₹{l.price}</Badge>
                    )}
                    {l._autoFree && (
                      <Badge variant="outline" className="bg-background/90 text-xs">
                        Pickup only
                      </Badge>
                    )}
                  </div>
                  <div className="absolute left-3 top-3 flex gap-2">
                    <button
                      onClick={() => { toggleWishlist(raw); toast.success(wished ? "Removed from wishlist" : "Added to wishlist"); }}
                      className="rounded-full bg-background/90 p-2 shadow-soft backdrop-blur transition-colors hover:bg-background"
                      aria-label="Wishlist"
                    >
                      <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : "text-foreground"}`} />
                    </button>
                    <button
                      onClick={() => { toggleNotify(raw.id); toast.success(notified ? "Notifications off" : "We'll notify you"); }}
                      className="rounded-full bg-background/90 p-2 shadow-soft backdrop-blur transition-colors hover:bg-background"
                      aria-label="Notify me"
                    >
                      <Bell className={`h-4 w-4 ${notified ? "fill-secondary text-secondary" : "text-foreground"}`} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-1 flex-col space-y-3 p-5">
                  <div>
                    <h3 className="font-display text-xl font-bold">{l.name}</h3>
                    <p className="text-sm font-medium text-primary">{l.hotel}</p>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    <Utensils className="mr-1 inline h-3.5 w-3.5" /> {l.ingredients}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground"><Users className="h-4 w-4" />{t.qty}: {l.quantity}</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" />{l.location.split(",")[0]}</span>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-muted/40 p-3 text-center">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.expires_in}</div>
                    <div className="text-2xl font-bold"><Countdown expiresAt={l.expiresAt} /></div>
                    {l._autoFree && (
                      <div className="mt-1 text-xs font-semibold text-accent">
                        Now free — pickup at venue
                      </div>
                    )}
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-1">
                    <Button onClick={() => order(l)} className="bg-gradient-warm text-primary-foreground shadow-warm hover:opacity-95">
                      <ShoppingBag className="mr-1 h-4 w-4" /> Order
                    </Button>
                    <Button
                      onClick={() => { addToCart(raw); toast.success("Added to cart"); }}
                      variant="outline"
                    >
                      <ShoppingCart className="mr-1 h-4 w-4" /> Add to cart
                    </Button>
                    <Button onClick={() => track(l)} variant="outline" className="col-span-2 border-secondary/40">
                      <MapPinned className="mr-1 h-4 w-4" /> {t.track}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Buyer;
