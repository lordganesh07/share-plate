import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LanguageContext";
import { toast } from "sonner";
import logo from "@/assets/sharefood-logo.png";

const Login = () => {
  const { login } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(email, password);
    if (!res.ok) return toast.error(res.error || "Login failed");
    toast.success("Welcome back!");
    // after login → buyer or provider home
    const session = JSON.parse(localStorage.getItem("sharefood:session") || "{}");
    navigate(session.role === "provider" ? "/provider" : "/buyer");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="landing" />
      <div className="container grid min-h-[calc(100vh-4rem)] place-items-center py-12">
        <Card className="w-full max-w-md overflow-hidden border-border/60 shadow-warm">
          <div className="bg-gradient-warm p-8 text-center text-primary-foreground">
            <img src={logo} alt="" width={56} height={56} className="mx-auto h-14 w-14" />
            <h1 className="mt-3 font-display text-3xl font-bold">{t.welcome_back}</h1>
          </div>
          <form onSubmit={submit} className="space-y-4 p-8">
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} maxLength={100} />
            </div>
            <Button type="submit" className="w-full bg-gradient-warm text-primary-foreground shadow-warm hover:opacity-95" size="lg">
              {t.log_in}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {t.no_account}{" "}
              <Link to="/signup" className="font-semibold text-primary hover:underline">{t.sign_up}</Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
