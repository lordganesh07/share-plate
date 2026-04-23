import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLang } from "@/context/LanguageContext";
import heroImg from "@/assets/hero-food.jpg";
import { Sparkles, Clock, MapPin, Heart, Leaf, Users } from "lucide-react";

const Index = () => {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="landing" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-sun pointer-events-none" />
        <div className="container grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="animate-fade-up space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> {t.appTagline}
            </span>
            <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              {t.hero_title.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-gradient-warm">{t.hero_title.split(" ").slice(-2).join(" ")}</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">{t.hero_sub}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-warm text-primary-foreground shadow-warm hover:opacity-95">
                <Link to="/signup">{t.cta_get_started}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-secondary/40 hover:bg-secondary/5">
                <Link to="/login">{t.cta_browse}</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Leaf className="h-4 w-4 text-accent" /> 12k+ meals saved</div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> 800+ providers</div>
            </div>
          </div>

          <div className="relative animate-float">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-warm opacity-30 blur-3xl" />
            <img
              src={heroImg}
              alt="Hands sharing a bowl of fresh food"
              width={1600}
              height={1100}
              className="relative rounded-[2rem] shadow-warm"
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">{t.about_title}</h2>
          <p className="mt-6 text-lg text-muted-foreground">{t.about_body}</p>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="bg-muted/40 py-20">
        <div className="container">
          <h2 className="text-center font-display text-4xl font-bold md:text-5xl">{t.how_title}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: <Heart className="h-6 w-6" />, t: t.how_1_t, d: t.how_1_d },
              { icon: <MapPin className="h-6 w-6" />, t: t.how_2_t, d: t.how_2_d },
              { icon: <Clock className="h-6 w-6" />, t: t.how_3_t, d: t.how_3_d },
            ].map((s, i) => (
              <Card key={i} className="group relative overflow-hidden border-border/60 p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-warm">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-warm opacity-10 transition-opacity group-hover:opacity-20" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-warm text-primary-foreground shadow-warm">
                    {s.icon}
                  </div>
                  <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Step {i + 1}</div>
                  <h3 className="font-display text-2xl font-semibold">{s.t}</h3>
                  <p className="mt-3 text-muted-foreground">{s.d}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="container py-20">
        <h2 className="text-center font-display text-4xl font-bold md:text-5xl">{t.features_title}</h2>
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
          {t.feat.map((f, i) => (
            <div key={i} className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-soft transition-all hover:border-primary/40">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-warm text-primary-foreground font-bold">
                {i + 1}
              </div>
              <p className="pt-1 font-medium">{f}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" className="bg-secondary text-secondary-foreground py-20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">{t.privacy_title}</h2>
          <p className="mt-6 text-lg opacity-90">{t.privacy_body}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-10">
        <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} ShareFood. {t.footer}</p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-foreground">{t.nav_about}</a>
            <a href="#how" className="hover:text-foreground">{t.nav_how}</a>
            <a href="#privacy" className="hover:text-foreground">{t.nav_privacy}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
