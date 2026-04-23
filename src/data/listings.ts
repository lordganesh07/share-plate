// Sample pool of food + a randomiser. Listings rotate every visit per spec.
export interface FoodListing {
  id: string;
  name: string;
  hotel: string;
  ingredients: string;
  quantity: number;
  photo: string;
  location: string;
  // approximate provider coordinates (Mumbai default)
  lat: number;
  lng: number;
  expiresAt: number; // timestamp
  price: number; // INR; 0 = donation
}

const POOL = [
  { name: "Veg Biryani", hotel: "Spice Garden", ingredients: "Basmati rice, mixed vegetables, spices, ghee", photo: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800" },
  { name: "Margherita Pizza", hotel: "Bella Napoli", ingredients: "Wheat flour, tomato, mozzarella, basil", photo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800" },
  { name: "Paneer Tikka", hotel: "Tandoor Junction", ingredients: "Paneer, capsicum, onion, yoghurt, spices", photo: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800" },
  { name: "Croissants (6)", hotel: "La Boulangerie", ingredients: "Flour, butter, yeast, sugar", photo: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800" },
  { name: "Sushi Platter", hotel: "Tokyo Bites", ingredients: "Rice, nori, salmon, tuna, avocado", photo: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800" },
  { name: "Chole Bhature", hotel: "Punjabi Dhaba", ingredients: "Chickpeas, flour, spices, onion", photo: "https://images.unsplash.com/photo-1626132647523-66c4d8a04af7?w=800" },
  { name: "Pasta Alfredo", hotel: "Roma Kitchen", ingredients: "Pasta, cream, parmesan, garlic", photo: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800" },
  { name: "Masala Dosa", hotel: "South Spice", ingredients: "Rice batter, potato, onion, chutney", photo: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800" },
  { name: "Fresh Salad Bowl", hotel: "Green Leaf", ingredients: "Lettuce, cucumber, tomato, olives, feta", photo: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800" },
  { name: "Choco Brownies (8)", hotel: "Sweet Studio", ingredients: "Cocoa, butter, sugar, flour, eggs", photo: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800" },
  { name: "Sandwich Tray", hotel: "Daily Bites", ingredients: "Bread, vegetables, cheese, sauces", photo: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=800" },
  { name: "Idli Sambar", hotel: "Madras Cafe", ingredients: "Rice, lentils, vegetables, spices", photo: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800" },
];

const LOCATIONS = [
  { location: "Bandra West, Mumbai", lat: 19.0596, lng: 72.8295 },
  { location: "Andheri East, Mumbai", lat: 19.1136, lng: 72.8697 },
  { location: "Powai, Mumbai", lat: 19.1176, lng: 72.9060 },
  { location: "Lower Parel, Mumbai", lat: 19.0144, lng: 72.8302 },
  { location: "Juhu, Mumbai", lat: 19.1075, lng: 72.8263 },
  { location: "Dadar, Mumbai", lat: 19.0186, lng: 72.8434 },
];

const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export const generateListings = (): FoodListing[] => {
  const count = 6 + Math.floor(Math.random() * 3); // 6–8
  const used = new Set<number>();
  const out: FoodListing[] = [];
  while (out.length < count) {
    const idx = Math.floor(Math.random() * POOL.length);
    if (used.has(idx)) continue;
    used.add(idx);
    const item = POOL[idx];
    const loc = rand(LOCATIONS);
    const minutes = 5 + Math.floor(Math.random() * 90); // 5–95 min
    const price = Math.random() < 0.25 ? 0 : 20 + Math.floor(Math.random() * 180);
    out.push({
      id: crypto.randomUUID(),
      name: item.name,
      hotel: item.hotel,
      ingredients: item.ingredients,
      photo: item.photo,
      quantity: 2 + Math.floor(Math.random() * 12),
      location: loc.location,
      lat: loc.lat + (Math.random() - 0.5) * 0.01,
      lng: loc.lng + (Math.random() - 0.5) * 0.01,
      expiresAt: Date.now() + minutes * 60 * 1000,
      price,
    });
  }
  return out;
};
