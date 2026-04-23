import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth, UserRole } from "@/context/AuthContext";
import { useLang } from "@/context/LanguageContext";
import { toast } from "sonner";
import logo from "@/assets/sharefood-logo.png";

const Signup = () => {
  const { signup } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "buyer" as UserRole });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters.");
    const res = signup(form);
    if (!res.ok) return toast.error(res.error || "Signup failed");
    toast.success(t.signup_success);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="landing" />
      <div className="container grid min-h-[calc(100vh-4rem)] place-items-center py-12">
        <Card className="w-full max-w-md overflow-hidden border-border/60 shadow-warm">
          <div className="bg-gradient-warm p-8 text-center text-primary-foreground">
            <img src={logo} alt="" width={56} height={56} className="mx-auto h-14 w-14" />
            <h1 className="mt-3 font-display text-3xl font-bold">{t.create_account}</h1>
          </div>
          <form onSubmit={submit} className="space-y-4 p-8">
            <div className="space-y-2">
              <Label>{t.name}</Label>
              <Input required maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t.email}</Label>
              <Input type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t.phone}</Label>
              <Input type="tel" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t.password}</Label>
              <Input type="password" required minLength={6} maxLength={100} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>{t.role}</Label>
              <div className="grid grid-cols-2 gap-2">
                {(["buyer", "provider"] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm({ ...form, role: r })}
                    className={`rounded-lg border-2 p-3 text-sm font-semibold transition-all ${
                      form.role === r
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {r === "buyer" ? t.buyer : t.provider}
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-warm text-primary-foreground shadow-warm hover:opacity-95" size="lg">
              {t.sign_up}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {t.have_account}{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">{t.log_in}</Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
