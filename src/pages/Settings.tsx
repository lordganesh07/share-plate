import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/ThemeContext";
import { useLang } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Settings = () => {
  const { theme, toggle } = useTheme();
  const { lang, setLang } = useLang();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />
      <div className="container py-10">
        <Card className="mx-auto max-w-xl space-y-6 p-8">
          <h1 className="font-display text-3xl font-bold">Settings</h1>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <Label className="text-base">Dark mode</Label>
              <p className="text-sm text-muted-foreground">Toggle between light and dark theme.</p>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggle} />
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <Label className="text-base">Language</Label>
              <p className="text-sm text-muted-foreground">Choose your preferred language.</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant={lang === "en" ? "default" : "outline"} onClick={() => setLang("en")}>English</Button>
              <Button size="sm" variant={lang === "hi" ? "default" : "outline"} onClick={() => setLang("hi")}>हिन्दी</Button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <Label className="text-base">Edit profile</Label>
              <p className="text-sm text-muted-foreground">Update your name, phone and email.</p>
            </div>
            <Button variant="outline" onClick={() => navigate("/profile")}>Open</Button>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <Label className="text-base">List your food</Label>
              <p className="text-sm text-muted-foreground">Become a provider and post surplus food.</p>
            </div>
            <Button onClick={() => navigate("/provider")} className="bg-gradient-warm text-primary-foreground">Go</Button>
          </div>

          <div className="border-t border-border pt-4">
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => { logout(); toast.success("Logged out"); navigate("/"); }}
            >
              Log out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
