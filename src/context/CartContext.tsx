import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { FoodListing } from "@/data/listings";

interface CartCtx {
  cart: FoodListing[];
  wishlist: FoodListing[];
  notifies: string[]; // listing ids
  addToCart: (l: FoodListing) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (l: FoodListing) => void;
  toggleNotify: (id: string) => void;
  isWished: (id: string) => boolean;
  isNotified: (id: string) => boolean;
  clearCart: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const CART_KEY = "sharefood:cart";
const WISH_KEY = "sharefood:wishlist";
const NOTIFY_KEY = "sharefood:notify";

const load = <T,>(k: string, fallback: T): T => {
  try { return JSON.parse(localStorage.getItem(k) || "null") ?? fallback; } catch { return fallback; }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<FoodListing[]>(() => load(CART_KEY, [] as FoodListing[]));
  const [wishlist, setWishlist] = useState<FoodListing[]>(() => load(WISH_KEY, [] as FoodListing[]));
  const [notifies, setNotifies] = useState<string[]>(() => load(NOTIFY_KEY, [] as string[]));

  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem(WISH_KEY, JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem(NOTIFY_KEY, JSON.stringify(notifies)); }, [notifies]);

  const addToCart = (l: FoodListing) =>
    setCart((c) => (c.some((x) => x.id === l.id) ? c : [...c, l]));
  const removeFromCart = (id: string) => setCart((c) => c.filter((x) => x.id !== id));
  const toggleWishlist = (l: FoodListing) =>
    setWishlist((w) => (w.some((x) => x.id === l.id) ? w.filter((x) => x.id !== l.id) : [...w, l]));
  const toggleNotify = (id: string) =>
    setNotifies((n) => (n.includes(id) ? n.filter((x) => x !== id) : [...n, id]));
  const isWished = (id: string) => wishlist.some((x) => x.id === id);
  const isNotified = (id: string) => notifies.includes(id);
  const clearCart = () => setCart([]);

  return (
    <Ctx.Provider value={{ cart, wishlist, notifies, addToCart, removeFromCart, toggleWishlist, toggleNotify, isWished, isNotified, clearCart }}>
      {children}
    </Ctx.Provider>
  );
};

export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be within CartProvider");
  return v;
};
