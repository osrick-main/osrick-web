export interface Stat {
  value: string;
  label: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price: string;
  duration: string;
  description: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  avatar: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  buttonText: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  pinterest: string;
}

export interface SiteData {
  siteName: string;
  logo: string;
  heroSubtitle: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroStats: Stat[];
  aboutImage: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutFeatures: string[];
  services: Service[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  pricing: PricingPlan[];
  contact: ContactInfo;
  socialLinks: SocialLinks;
}

export const initialSiteData: SiteData = {
  siteName: "Asha Bridal Beauty Parlor",
  logo: "ASHA",
  heroSubtitle: "BRIDAL • HAIR • BEAUTY • MAKEUP",
  heroTitle: "The Art of Elegance & Regal Bridal Beauty",
  heroDescription: "Experience Bangladesh's premier luxury wellness sanctuary, where bespoke hair styling meets world-class dermatological therapies to elevate your personal style and restore ultimate tranquility.",
  heroImage: "/src/assets/images/luxury_spa_hero_1782574178094.jpg",
  heroStats: [
    { value: "15k+", label: "Happy Clients" },
    { value: "24+", label: "Elite Stylists" },
    { value: "99.8%", label: "Satisfaction Rate" }
  ],
  aboutImage: "/src/assets/images/about_beauty_1782574197675.jpg",
  aboutTitle: "A Sanctuary of Uncompromised Bridal & Queenly Beauty",
  aboutDescription: "For over a decade, we have redefined luxury styling, bridal makeup, and parlor therapies. Inspired by the highest international standards, Asha Bridal Beauty Parlor offers a meticulous blend of global artistry and sensory indulgence, designed exclusively for those who demand nothing less than absolute perfection. From private VIP suites to our award-winning master team, every detail is engineered for your rejuvenation.",
  aboutFeatures: [
    "Bespoke Private VIP Styling Suites",
    "Internationally Certified Masters & Beauticians",
    "Premium Organic Cruelty-Free Active Botanicals",
    "Advanced Non-Invasive Hydraderm Facial Services"
  ],
  services: [
    {
      id: "s1",
      name: "Eyebrow Pluck / Threading",
      category: "Grooming",
      price: "50 BDT",
      duration: "15 mins",
      description: "High-precision expert threading and shaping to frame your eyes beautifully with a clean, sharp look.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "s2",
      name: "Clean-up",
      category: "Grooming",
      price: "150 BDT",
      duration: "30 mins",
      description: "Deep pore cleansing, steaming, and gentle exfoliation to remove dirt, blackheads, and skin impurities.",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "s3",
      name: "Massage",
      category: "Massage",
      price: "200 BDT",
      duration: "30 mins",
      description: "Therapeutic and deeply relaxing muscle massage to relieve built-up stress, improve circulation, and soothe tension.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "s4",
      name: "Gold Bleach",
      category: "Polish & Bleach",
      price: "300 BDT",
      duration: "30 mins",
      description: "Luxury bleaching treatment formulated with active gold dust to lighten facial hair and reveal a uniform golden luster.",
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "s5",
      name: "Fair Polish",
      category: "Polish & Bleach",
      price: "600 BDT",
      duration: "45 mins",
      description: "Classic full-face skin polishing to smoothly exfoliate, target dark spots, and enhance overall skin tone.",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "s6",
      name: "Special Fair Polish",
      category: "Polish & Bleach",
      price: "800 / 1500 BDT",
      duration: "60 mins",
      description: "Premium high-potency fair polish utilizing advanced serum infusions to yield a remarkably bright and hydrated skin texture.",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "s7",
      name: "Normal Facial",
      category: "Facials",
      price: "250 BDT",
      duration: "45 mins",
      description: "Everyday refreshing facial including facial massage, scrub, and hydrating mask to maintain healthy, soft skin.",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "s8",
      name: "Herbal Facial",
      category: "Facials",
      price: "350 BDT",
      duration: "50 mins",
      description: "Pure botanical treatment using soothing organic herbal formulations, ideal for gentle skin healing and nourishment.",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "s9",
      name: "Papaya Facial",
      category: "Facials",
      price: "500 / 800 BDT",
      duration: "60 mins",
      description: "Enzymatic papaya facial that actively dissolves dead skin layers, reduces tan, and reveals an incredibly fresh skin texture.",
      image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "s10",
      name: "Gold Facial",
      category: "Facials",
      price: "500 / 1000 BDT",
      duration: "60 mins",
      description: "Regal treatment featuring high-grade gold leaf extracts that boost skin elasticity, reduce pigmentation, and leave a sparkling glow.",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "s11",
      name: "Pearl Facial",
      category: "Facials",
      price: "750 BDT",
      duration: "60 mins",
      description: "Anti-tan and brightening therapy infused with crushed pearl powder to restore lost hydration and a velvety, radiant glow.",
      image: "https://images.unsplash.com/photo-1590156546746-c231a5be716a?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "s12",
      name: "Shahnaz Facial",
      category: "Facials",
      price: "800 BDT",
      duration: "60 mins",
      description: "Acclaimed Ayurvedic session powered by Shahnaz Husain's signature formulations to target complex skin conditions.",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "s13",
      name: "Fruit Facial",
      category: "Facials",
      price: "800 BDT",
      duration: "60 mins",
      description: "Antioxidant-rich fresh fruit pulps loaded with natural vitamins and AHAs to instantly revitalize and hydrate weary skin.",
      image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "s14",
      name: "Mix Facial",
      category: "Facials",
      price: "900 BDT",
      duration: "60 mins",
      description: "Bespoke multi-step facial customized with specialized skin cocktails to address dry, oily, or mixed skin needs in one go.",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "s15",
      name: "Diamond Facial",
      category: "Facials",
      price: "1000 BDT",
      duration: "70 mins",
      description: "Elite cellular repair therapy utilizing premium diamond dust to exfoliate, enhance elasticity, and bestow an extraordinary, crystal-clear radiance.",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80"
    }
  ],
  gallery: [
    {
      id: "g1",
      url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      caption: "The Premium Hair Styling Bay",
      category: "Hair"
    },
    {
      id: "g2",
      url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
      caption: "Aromatic Hot Stone Therapy Suite",
      category: "Spa"
    },
    {
      id: "g3",
      url: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=800&q=80",
      caption: "Radiant Skin Aesthetic Room",
      category: "Aesthetics"
    },
    {
      id: "g4",
      url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
      caption: "Exclusive Master Barber Chair",
      category: "Hair"
    },
    {
      id: "g5",
      url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80",
      caption: "Royalty Bridal Consultation Room",
      category: "Bridal"
    },
    {
      id: "g6",
      url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      caption: "Asha Premium Lounge Reception",
      category: "Lounge"
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Sadia Rahman",
      role: "Fashion Designer & Influencer",
      rating: 5,
      review: "Aura is simply peerless. The private suites are incredibly comfortable, and my master bridal stylist was fantastic—elegant, subtle, and truly glowing. It is the absolute peak of luxury in Dhaka.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "t2",
      name: "Zayn Ahmed",
      role: "Tech Entrepreneur",
      rating: 5,
      review: "The Himalayan Stone Spa is a masterclass in restorative wellness. After long business sprints, coming here is a ritual. The service is flawless, discreet, and extremely welcoming.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "t3",
      name: "Nila Chowdhury",
      role: "Creative Director",
      rating: 5,
      review: "Their Caviar Facial treatment was an absolute game changer. The deep cellular hydration is instant. From the aromatic organic teas to the tailored skin assessments, Aura is unmatched.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    }
  ],
  pricing: [
    {
      id: "p1",
      name: "Asha Classic Circle",
      price: "৳15,000",
      period: "yearly",
      description: "Perfect for routine beauty, grooming, and luxury styling rituals with elite member points.",
      features: [
        "10% off all standard hair & aesthetic services",
        "Complimentary personalized hair & scalp report",
        "Weekend priority booking reservations",
        "Access to our herbal tea hospitality bar",
        "1 guest pass for a complimentary therapy"
      ],
      popular: false,
      buttonText: "Begin Journey"
    },
    {
      id: "p2",
      name: "Royal Gold VIP Club",
      price: "৳35,000",
      period: "yearly",
      description: "Our signature elite tier, offering full private styling suites, direct concierge, and VIP privileges.",
      features: [
        "20% off all therapies and aesthetic services",
        "Complimentary private VIP styling suite access",
        "1 Free Golden Facial or Hot Stone massage",
        "Dedicated 24/7 personal beauty concierge",
        "Complimentary beverage and patisserie lounge access",
        "4 priority guest vouchers per year"
      ],
      popular: true,
      buttonText: "Embrace Gold VIP"
    },
    {
      id: "p3",
      name: "Imperial Elite Onyx",
      price: "৳75,000",
      period: "yearly",
      description: "The pinnacle of bespoke beauty and private wellness, crafted for absolute exclusivity.",
      features: [
        "30% off all services, treatments & beauty products",
        "Guaranteed priority private suite reservations",
        "Direct stylist home counseling calls",
        "Tailored custom-blended facial oils every quarter",
        "6 fully complimentary signature therapies",
        "8 premium VIP lounge guest passes"
      ],
      popular: false,
      buttonText: "Inquire Elite Access"
    }
  ],
  contact: {
    address: "House 12, Road 45, Gulshan-2, Dhaka 1212, Bangladesh",
    phone: "+880 1711-223344",
    email: "concierge@ashabridal.com",
    hours: "Daily: 10:00 AM - 9:00 PM (Holiday: Tuesday)"
  },
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    pinterest: "https://pinterest.com"
  }
};
