import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLang } from "@/context/LanguageContext";
import { toast } from "sonner";
import { Banknote, QrCode, Smartphone, Truck, CheckCircle2 } from "lucide-react";
import { FoodListing } from "@/data/listings";

const Payment = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const item: FoodListing | null = (() => {
    try { return JSON.parse(sessionStorage.getItem("sharefood:current") || "null"); } catch { return null; }
  })();
  const [method, setMethod] = useState<"upi" | "net" | "qr" | "cod">("upi");
  const [done, setDone] = useState(false);

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    toast.success(t.pay_done);
    setTimeout(() => navigate("/tracking"), 1200);
  };

  if (!item) {
    navigate("/buyer");
    return null;
  }

  const methods = [
    { id: "upi" as const, label: t.pay_upi, icon: <Smartphone className="h-5 w-5" /> },
    { id: "net" as const, label: t.pay_net, icon: <Banknote className="h-5 w-5" /> },
    { id: "qr" as const, label: t.pay_qr, icon: <QrCode className="h-5 w-5" /> },
    { id: "cod" as const, label: t.pay_cod, icon: <Truck className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />
      <div className="container grid gap-6 py-10 lg:grid-cols-[1fr_1.4fr]">
        <Card className="border-border/60 p-6 shadow-soft">
          <img src={item.photo} alt={item.name} className="aspect-video w-full rounded-lg object-cover" />
          <h2 className="mt-4 font-display text-2xl font-bold">{item.name}</h2>
          <p className="text-primary">{item.hotel}</p>
          <p className="mt-2 text-sm text-muted-foreground">{item.ingredients}</p>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="text-muted-foreground">Total</span>
            <span className="font-display text-3xl font-bold text-gradient-warm">{item.price === 0 ? "FREE" : `₹${item.price}`}</span>
          </div>
        </Card>

        <Card className="border-border/60 p-8 shadow-soft">
          <h1 className="font-display text-3xl font-bold">{t.pay_title}</h1>
          {done ? (
            <div className="mt-12 flex flex-col items-center text-center">
              <CheckCircle2 className="h-20 w-20 text-accent animate-pulse-warm" />
              <p className="mt-4 font-display text-2xl font-bold">{t.pay_done}</p>
            </div>
          ) : (
            <form onSubmit={pay} className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {methods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left font-semibold transition-all ${
                      method === m.id ? "border-primary bg-primary/10 text-primary shadow-warm" : "border-border hover:border-primary/40"
                    }`}
                  >
                    {m.icon}{m.label}
                  </button>
                ))}
              </div>

              {method === "upi" && (
                <div className="space-y-2"><Label>UPI ID</Label><Input placeholder="yourname@bank" required /></div>
              )}
              {method === "net" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2"><Label>Bank</Label><Input placeholder="HDFC / ICICI / SBI" required /></div>
                  <div className="space-y-2"><Label>Account</Label><Input placeholder="XXXX-1234" required /></div>
                </div>
              )}
              {method === "qr" && (
                <div className="flex flex-col items-center rounded-xl bg-muted p-6">
                  <div className="grid h-44 w-44 grid-cols-8 grid-rows-8 gap-px bg-foreground p-2">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className={Math.random() > 0.45 ? "bg-background" : "bg-foreground"} />
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">Scan with any UPI app (demo)</p>
                </div>
              )}
              {method === "cod" && (
                <div className="rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground">Pay ₹{item.price} in cash on delivery / pickup.</div>
              )}

              <Button type="submit" size="lg" className="w-full bg-gradient-warm text-primary-foreground shadow-warm hover:opacity-95">
                Confirm payment
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Payment;
