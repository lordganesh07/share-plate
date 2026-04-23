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
import { MapPin, Users, Utensils } from "lucide-react";

const Buyer = () => {
  const { t } = useLang();
  const { user } = useAuth();
  const navigate = useNavigate();
  // generated fresh on every mount → satisfies "reset randomly every visit"
  const [listings, setListings] = useState<FoodListing[]>(() => generateListings());

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // include user-created provider listings
  const providerListings = useMemo<FoodListing[]>(() => {
    try { return JSON.parse(localStorage.getItem("sharefood:providerListings") || "[]"); }
    catch { return []; }
  }, []);

  const all = [...providerListings, ...listings].filter((l) => l.expiresAt > Date.now());

  const reserve = (l: FoodListing) => {
    sessionStorage.setItem("sharefood:current", JSON.stringify(l));
    navigate("/payment");
  };

  const track = (l: FoodListing) => {
    sessionStorage.setItem("sharefood:current", JSON.stringify(l));
    navigate("/tracking");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />
      <div className="container py-10">
        <div className="mb-10 flex flex-col gap-3">
          <h1 className="font-display text-4xl font-bold md:text-5xl">{t.buyer_title}</h1>
          <p className="text-muted-foreground">{t.buyer_sub}</p>
          <Button variant="outline" className="w-fit" onClick={() => setListings(generateListings())}>
            ↻ Refresh listings
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((l) => (
            <Card key={l.id} className="group overflow-hidden border-border/60 shadow-soft transition-all hover:-translate-y-1 hover:shadow-warm">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img src={l.photo} alt={l.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute right-3 top-3">
                  {l.price === 0 ? (
                    <Badge className="bg-accent text-accent-foreground shadow-soft">FREE · Donation</Badge>
                  ) : (
                    <Badge className="bg-gradient-warm text-primary-foreground shadow-warm">₹{l.price}</Badge>
                  )}
                </div>
              </div>
              <div className="space-y-3 p-5">
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
                </div>
                <div className="flex gap-2 pt-1">
                  <Button onClick={() => reserve(l)} className="flex-1 bg-gradient-warm text-primary-foreground shadow-warm hover:opacity-95">
                    {t.reserve}
                  </Button>
                  <Button onClick={() => track(l)} variant="outline" className="flex-1 border-secondary/40">
                    {t.track}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buyer;
