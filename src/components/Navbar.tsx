import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Globe, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/sharefood-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = ({ variant = "landing" }: { variant?: "landing" | "app" }) => {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useLang();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to={user ? (user.role === "provider" ? "/provider" : "/buyer") : "/"} className="flex items-center gap-2">
          <img src={logo} alt="ShareFood logo" width={36} height={36} className="h-9 w-9" />
          <span className="font-display text-xl font-bold text-gradient-warm">ShareFood</span>
        </Link>

        {variant === "landing" && (
          <nav className="hidden items-center gap-7 lg:flex">
            <a href="#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{t.nav_about}</a>
            <a href="#how" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{t.nav_how}</a>
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{t.features_title}</a>
            <a href="#privacy" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{t.nav_privacy}</a>
          </nav>
        )}

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Language">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang("en")} className={lang === "en" ? "font-semibold text-primary" : ""}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("hi")} className={lang === "hi" ? "font-semibold text-primary" : ""}>हिन्दी</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {user ? (
            <>
              <Button variant="ghost" size="icon" onClick={() => navigate("/profile")} aria-label="Profile">
                <UserIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => { logout(); navigate("/"); }} aria-label="Log out">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")} className="hidden sm:inline-flex">{t.nav_login}</Button>
              <Button onClick={() => navigate("/signup")} className="bg-gradient-warm text-primary-foreground shadow-warm hover:opacity-95">
                {t.nav_signup}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
