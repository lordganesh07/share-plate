import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LanguageContext";
import { toast } from "sonner";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", email: user?.email || "" });

  if (!user) {
    navigate("/login");
    return null;
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: form.name, phone: form.phone });
    toast.success(t.saved);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />
      <div className="container py-10">
        <Card className="mx-auto max-w-xl border-border/60 p-8 shadow-soft">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-warm text-2xl font-bold text-primary-foreground shadow-warm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">{t.profile_title}</h1>
              <p className="text-sm capitalize text-muted-foreground">{user.role}</p>
            </div>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2"><Label>{t.name}</Label><Input required maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-2"><Label>{t.email}</Label><Input value={form.email} disabled /></div>
            <div className="space-y-2"><Label>{t.phone}</Label><Input type="tel" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <Button type="submit" className="w-full bg-gradient-warm text-primary-foreground shadow-warm hover:opacity-95">{t.save}</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
