import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "hi";

const dict = {
  en: {
    appTagline: "Share surplus. Feed neighbours. Waste less.",
    nav_home: "Home",
    nav_about: "About",
    nav_how: "How it works",
    nav_privacy: "Privacy",
    nav_login: "Log in",
    nav_signup: "Sign up",
    hero_title: "Good food deserves a second chance",
    hero_sub: "ShareFood connects restaurants, stores and households with nearby people, shelters and food banks to redistribute surplus food before it expires.",
    cta_get_started: "Get started — it's free",
    cta_browse: "Browse surplus near me",
    about_title: "About ShareFood",
    about_body: "Every day, tonnes of perfectly good food are thrown away while people go hungry. ShareFood is a community platform that closes that gap. Providers list what they have left at the end of service, and buyers, NGOs and shelters claim it within a tight freshness window — at a discount, by donation, or for free.",
    how_title: "How it works",
    how_1_t: "Providers list surplus",
    how_1_d: "Restaurants, stores and households post leftover food with quantity, ingredients, photo and a freshness timer.",
    how_2_t: "Buyers discover nearby",
    how_2_d: "Browse live listings on a map, filter by distance and pickup window, and reserve in one tap.",
    how_3_t: "Pick up or get delivered",
    how_3_d: "Track the provider on a live map, choose pickup or delivery, and pay by UPI, net-banking, QR or cash.",
    features_title: "Everything you need",
    feat: [
      "Live countdown timers for each listing",
      "Real-time GPS tracking of providers & delivery",
      "Dummy payments — UPI, Net-banking, QR, COD",
      "Bilingual interface — English & हिन्दी",
      "Light & dark mode",
      "Profile management with phone & email",
      "Provider listings with photo, ingredients, hotel & location",
      "Auto-randomised buyer feed every visit",
    ],
    privacy_title: "Privacy & policies",
    privacy_body: "We store your account details locally on your device for this hackathon prototype. No data is shared with third parties. You can delete your account anytime from your profile. Food safety remains the responsibility of the provider; ShareFood is a discovery and coordination layer.",
    footer: "Built with care for people, food and the planet.",

    // auth
    welcome_back: "Welcome back",
    create_account: "Create your account",
    name: "Full name",
    email: "Email address",
    password: "Password",
    phone: "Phone number",
    role: "I am a…",
    buyer: "Buyer / Recipient",
    provider: "Food provider",
    have_account: "Already have an account?",
    no_account: "Don't have an account?",
    log_in: "Log in",
    sign_up: "Sign up",
    signup_success: "Account created! Please log in.",
    logout: "Log out",

    // buyer
    buyer_title: "Surplus near you",
    buyer_sub: "Listings refresh every visit. Claim before the timer runs out.",
    qty: "Qty",
    expires_in: "Expires in",
    reserve: "Reserve & pay",
    track: "Live track",
    expired: "Expired",

    // provider
    provider_title: "List surplus food",
    food_name: "Food name",
    ingredients: "Ingredients",
    quantity: "Quantity (servings)",
    hotel: "Hotel / store name",
    location: "Pickup location",
    photo_url: "Photo URL (optional)",
    expiry_min: "Expires in (minutes)",
    publish: "Publish listing",
    listed: "Listing published!",

    // payment
    pay_title: "Choose payment",
    pay_upi: "UPI",
    pay_net: "Net-banking",
    pay_qr: "QR Code",
    pay_cod: "Cash on delivery",
    pay_done: "Payment confirmed (demo)",

    // tracking
    track_title: "Live tracking",
    provider_loc: "Provider",
    you: "You",
    delivery: "Delivery person",
    enable_gps: "Enable my live GPS",

    // profile
    profile_title: "Your profile",
    save: "Save changes",
    saved: "Profile updated",
  },
  hi: {
    appTagline: "अधिशेष साझा करें। पड़ोसियों को खिलाएँ। कम बर्बादी।",
    nav_home: "मुख्य",
    nav_about: "हमारे बारे में",
    nav_how: "कैसे काम करता है",
    nav_privacy: "गोपनीयता",
    nav_login: "लॉग इन",
    nav_signup: "साइन अप",
    hero_title: "अच्छे भोजन को एक और मौका मिलना चाहिए",
    hero_sub: "ShareFood रेस्तरां, दुकानों और घरों को आस-पास के लोगों, आश्रयों और फ़ूड बैंकों से जोड़ता है ताकि अधिशेष भोजन समाप्त होने से पहले बाँटा जा सके।",
    cta_get_started: "शुरू करें — मुफ़्त",
    cta_browse: "पास का अधिशेष देखें",
    about_title: "ShareFood के बारे में",
    about_body: "हर दिन टनों अच्छा भोजन फेंक दिया जाता है जबकि लोग भूखे रहते हैं। ShareFood एक समुदाय मंच है जो इस अंतर को पाटता है। प्रदाता बचा हुआ भोजन सूचीबद्ध करते हैं, और खरीदार, NGO और आश्रय इसे कम समय में दावा करते हैं — छूट पर, दान या मुफ़्त।",
    how_title: "कैसे काम करता है",
    how_1_t: "प्रदाता सूची बनाते हैं",
    how_1_d: "रेस्तरां, दुकानें और घर बचे हुए भोजन को मात्रा, सामग्री, फ़ोटो और ताज़गी टाइमर के साथ पोस्ट करते हैं।",
    how_2_t: "खरीदार पास में खोजते हैं",
    how_2_d: "मानचित्र पर लाइव लिस्टिंग देखें, दूरी और समय से फ़िल्टर करें और एक टैप में आरक्षित करें।",
    how_3_t: "उठाएँ या डिलीवरी लें",
    how_3_d: "प्रदाता को लाइव मानचित्र पर ट्रैक करें, पिकअप या डिलीवरी चुनें, UPI/नेट-बैंकिंग/QR/नकद से भुगतान करें।",
    features_title: "जो भी आपको चाहिए",
    feat: [
      "हर लिस्टिंग के लिए लाइव काउंटडाउन टाइमर",
      "प्रदाताओं और डिलीवरी की रीयल-टाइम GPS ट्रैकिंग",
      "डमी भुगतान — UPI, नेट-बैंकिंग, QR, COD",
      "द्विभाषी इंटरफ़ेस — English और हिन्दी",
      "लाइट और डार्क मोड",
      "फ़ोन व ईमेल के साथ प्रोफ़ाइल प्रबंधन",
      "फ़ोटो, सामग्री, होटल व स्थान के साथ प्रदाता लिस्टिंग",
      "हर बार ऑटो-रैंडम बायर फ़ीड",
    ],
    privacy_title: "गोपनीयता और नीतियाँ",
    privacy_body: "इस हैकाथॉन प्रोटोटाइप के लिए हम आपकी जानकारी आपके डिवाइस पर ही संग्रहीत करते हैं। कोई डेटा साझा नहीं होता। आप कभी भी अपना अकाउंट हटा सकते हैं। भोजन सुरक्षा प्रदाता की ज़िम्मेदारी है; ShareFood केवल खोज और समन्वय परत है।",
    footer: "लोगों, भोजन और ग्रह के लिए बनाया गया।",

    welcome_back: "वापसी पर स्वागत है",
    create_account: "अपना अकाउंट बनाएँ",
    name: "पूरा नाम",
    email: "ईमेल पता",
    password: "पासवर्ड",
    phone: "फ़ोन नंबर",
    role: "मैं हूँ…",
    buyer: "खरीदार / प्राप्तकर्ता",
    provider: "खाद्य प्रदाता",
    have_account: "पहले से अकाउंट है?",
    no_account: "अकाउंट नहीं है?",
    log_in: "लॉग इन",
    sign_up: "साइन अप",
    signup_success: "अकाउंट बन गया! कृपया लॉग इन करें।",
    logout: "लॉग आउट",

    buyer_title: "आपके पास का अधिशेष",
    buyer_sub: "हर बार ताज़ा लिस्टिंग। टाइमर ख़त्म होने से पहले दावा करें।",
    qty: "मात्रा",
    expires_in: "समाप्त होगा",
    reserve: "आरक्षित और भुगतान",
    track: "लाइव ट्रैक",
    expired: "समाप्त",

    provider_title: "अधिशेष भोजन सूचीबद्ध करें",
    food_name: "भोजन का नाम",
    ingredients: "सामग्री",
    quantity: "मात्रा (सर्विंग)",
    hotel: "होटल / दुकान का नाम",
    location: "पिकअप स्थान",
    photo_url: "फ़ोटो URL (वैकल्पिक)",
    expiry_min: "समाप्ति (मिनट में)",
    publish: "लिस्टिंग प्रकाशित करें",
    listed: "लिस्टिंग प्रकाशित हुई!",

    pay_title: "भुगतान चुनें",
    pay_upi: "UPI",
    pay_net: "नेट-बैंकिंग",
    pay_qr: "QR कोड",
    pay_cod: "डिलीवरी पर नकद",
    pay_done: "भुगतान पुष्टि (डेमो)",

    track_title: "लाइव ट्रैकिंग",
    provider_loc: "प्रदाता",
    you: "आप",
    delivery: "डिलीवरी पर्सन",
    enable_gps: "मेरा लाइव GPS चालू करें",

    profile_title: "आपकी प्रोफ़ाइल",
    save: "सहेजें",
    saved: "प्रोफ़ाइल अपडेट हुई",
  },
} as const;

type Dict = typeof dict.en;
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict } | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem("sharefood:lang") as Lang) || "en");
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("sharefood:lang", l);
  };
  return <Ctx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</Ctx.Provider>;
};

export const useLang = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLang must be used within LanguageProvider");
  return v;
};
