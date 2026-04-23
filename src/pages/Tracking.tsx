import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLang } from "@/context/LanguageContext";
import { FoodListing } from "@/data/listings";
import { Navigation, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

// Fix default leaflet icon paths
const makeIcon = (color: string, label: string) =>
  L.divIcon({
    className: "",
    iconSize: [36, 46],
    iconAnchor: [18, 46],
    html: `<div style="position:relative;width:36px;height:46px">
      <div style="position:absolute;top:0;left:0;width:36px;height:36px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};box-shadow:0 6px 14px rgba(0,0,0,.3);display:grid;place-items:center;">
        <span style="transform:rotate(45deg);color:#fff;font-weight:700;font-size:14px;font-family:Inter,sans-serif">${label}</span>
      </div>
    </div>`,
  });

const Tracking = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const item: FoodListing | null = (() => {
    try { return JSON.parse(sessionStorage.getItem("sharefood:current") || "null"); } catch { return null; }
  })();

  const [me, setMe] = useState<[number, number] | null>(null);
  const [delivery, setDelivery] = useState<[number, number] | null>(null);
  const [watching, setWatching] = useState(false);

  // Animated delivery person — only for paid items (free = pickup only)
  useEffect(() => {
    if (!item || item.price === 0) return;
    const target: [number, number] = me || [item.lat - 0.01, item.lng - 0.01];
    let pos: [number, number] = [item.lat, item.lng];
    setDelivery(pos);
    const id = setInterval(() => {
      const dLat = (target[0] - pos[0]) * 0.05;
      const dLng = (target[1] - pos[1]) * 0.05;
      pos = [pos[0] + dLat + (Math.random() - 0.5) * 0.0002, pos[1] + dLng + (Math.random() - 0.5) * 0.0002];
      setDelivery([...pos]);
    }, 1500);
    return () => clearInterval(id);
  }, [item, me]);

  const enableGps = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation not supported on this device.");
      return;
    }
    setWatching(true);
    navigator.geolocation.watchPosition(
      (p) => setMe([p.coords.latitude, p.coords.longitude]),
      (err) => { toast.error("GPS denied: " + err.message); setWatching(false); },
      { enableHighAccuracy: true, maximumAge: 5000 }
    );
  };

  if (!item) {
    navigate("/buyer");
    return null;
  }

  const center: [number, number] = [item.lat, item.lng];

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />
      <div className="container grid gap-6 py-10 lg:grid-cols-[1fr_1.6fr]">
        <Card className="border-border/60 p-6 shadow-soft">
          <h1 className="font-display text-3xl font-bold">{t.track_title}</h1>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="text-xs uppercase tracking-wider text-primary">{t.provider_loc}</div>
                <div className="font-semibold">{item.hotel}</div>
                <div className="text-sm text-muted-foreground">{item.location}</div>
              </div>
            </div>
            {item.price === 0 ? (
              <div className="flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/5 p-4">
                <MapPin className="mt-0.5 h-5 w-5 text-accent" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-accent">Pickup only</div>
                  <div className="font-semibold">Free food — no delivery</div>
                  <div className="text-sm text-muted-foreground">Please come to the venue to collect and eat on-site.</div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/5 p-4">
                <Navigation className="mt-0.5 h-5 w-5 text-accent" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-accent">{t.delivery}</div>
                  <div className="font-semibold">Rahul · 2 min away</div>
                  <div className="text-sm text-muted-foreground">Live position updating…</div>
                </div>
              </div>
            )}
            <Button onClick={enableGps} disabled={watching} className="w-full bg-gradient-warm text-primary-foreground shadow-warm hover:opacity-95">
              {watching ? "GPS active ✓" : t.enable_gps}
            </Button>
            {item.price !== 0 && (
              <Button variant="outline" className="w-full"><Phone className="mr-2 h-4 w-4" /> Call delivery</Button>
            )}
          </div>
        </Card>

        <Card className="overflow-hidden border-border/60 p-0 shadow-soft" style={{ height: "70vh" }}>
          <MapContainer center={center} zoom={14} scrollWheelZoom className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center} icon={makeIcon("#ea580c", "P")}>
              <Popup>{item.hotel}<br />{item.location}</Popup>
            </Marker>
            {delivery && (
              <Marker position={delivery} icon={makeIcon("#16a34a", "D")}>
                <Popup>{t.delivery}</Popup>
              </Marker>
            )}
            {me && (
              <Marker position={me} icon={makeIcon("#1e40af", "U")}>
                <Popup>{t.you}</Popup>
              </Marker>
            )}
            {delivery && me && <Polyline positions={[delivery, me]} pathOptions={{ color: "#16a34a", dashArray: "6 8" }} />}
            {delivery && <Polyline positions={[center, delivery]} pathOptions={{ color: "#ea580c", dashArray: "4 6" }} />}
          </MapContainer>
        </Card>
      </div>
    </div>
  );
};

export default Tracking;
