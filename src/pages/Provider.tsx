import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { FoodListing } from "@/data/listings";
import { toast } from "sonner";

const KEY = "sharefood:providerListings";

const Provider = () => {
  const { t } = useLang();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<FoodListing[]>(() => JSON.parse(localStorage.getItem(KEY) || "[]"));
  const [form, setForm] = useState({
    name: "", hotel: "", ingredients: "", quantity: 4, location: "Bandra West, Mumbai",
    photo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800", expiryMin: 30, price: 0,
  });

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: FoodListing = {
      id: crypto.randomUUID(),
      name: form.name,
      hotel: form.hotel,
      ingredients: form.ingredients,
      photo: form.photo || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
      quantity: Number(form.quantity),
      location: form.location,
      lat: 19.0596 + (Math.random() - 0.5) * 0.02,
      lng: 72.8295 + (Math.random() - 0.5) * 0.02,
      expiresAt: Date.now() + Number(form.expiryMin) * 60 * 1000,
      price: Number(form.price),
    };
    const next = [newItem, ...items];
    setItems(next);
    localStorage.setItem(KEY, JSON.stringify(next));
    toast.success(t.listed);
    setForm({ ...form, name: "", ingredients: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />
      <div className="container grid gap-8 py-10 lg:grid-cols-[1fr_1fr]">
        <Card className="border-border/60 p-8 shadow-soft">
          <h1 className="font-display text-3xl font-bold">{t.provider_title}</h1>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2"><Label>{t.food_name}</Label><Input required maxLength={60} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div className="space-y-2"><Label>{t.hotel}</Label><Input required maxLength={60} value={form.hotel} onChange={(e) => setForm({ ...form, hotel: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>{t.ingredients}</Label><Textarea required maxLength={300} value={form.ingredients} onChange={(e) => setForm({ ...form, ingredients: e.target.value })} /></div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2"><Label>{t.quantity}</Label><Input type="number" min={1} max={500} required value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} /></div>
              <div className="space-y-2"><Label>{t.expiry_min}</Label><Input type="number" min={1} max={1440} required value={form.expiryMin} onChange={(e) => setForm({ ...form, expiryMin: Number(e.target.value) })} /></div>
              <div className="space-y-2"><Label>Price ₹ (0 = donate)</Label><Input type="number" min={0} max={5000} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
            </div>
            <div className="space-y-2"><Label>{t.location}</Label><Input required maxLength={120} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
            <div className="space-y-2"><Label>{t.photo_url}</Label><Input value={form.photo} maxLength={500} onChange={(e) => setForm({ ...form, photo: e.target.value })} /></div>
            <Button type="submit" size="lg" className="w-full bg-gradient-warm text-primary-foreground shadow-warm hover:opacity-95">
              {t.publish}
            </Button>
          </form>
        </Card>

        <div>
          <h2 className="mb-4 font-display text-2xl font-bold">My listings</h2>
          <div className="space-y-4">
            {items.length === 0 && <p className="text-muted-foreground">No listings yet.</p>}
            {items.map((l) => (
              <Card key={l.id} className="flex gap-4 overflow-hidden border-border/60 p-3 shadow-soft">
                <img src={l.photo} alt={l.name} className="h-24 w-24 rounded-lg object-cover" loading="lazy" />
                <div className="flex-1">
                  <h3 className="font-bold">{l.name}</h3>
                  <p className="text-sm text-muted-foreground">{l.hotel} · {l.location}</p>
                  <p className="text-sm">{l.quantity} servings · {l.price === 0 ? "Donation" : `₹${l.price}`}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Provider;
