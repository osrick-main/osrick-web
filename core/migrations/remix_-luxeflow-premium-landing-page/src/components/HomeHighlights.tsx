import { motion } from "motion/react";
import { Sparkles, Clock, MapPin, PhoneCall, CalendarRange, ArrowRight, ShieldCheck, Gem, Compass } from "lucide-react";
import { SiteData } from "../types";
import RippleButton from "./RippleButton";

interface HomeHighlightsProps {
  siteData: SiteData;
  setActiveTab: (tab: string) => void;
}

export default function HomeHighlights({ siteData, setActiveTab }: HomeHighlightsProps) {
  // Select a few premium signature services to showcase as highlights
  const featuredServices = siteData.services.filter(s => 
    ["s10", "s15", "s3", "s6"].includes(s.id) || 
    ["Gold Facial", "Diamond Facial", "Massage", "Special Fair Polish"].includes(s.name)
  ).slice(0, 3);

  // If filtered featured items are empty, grab the first 3 services
  const highlights = featuredServices.length > 0 ? featuredServices : siteData.services.slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. BRAND STORY & PHILOSOPHY TEASER */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200/60 px-3 py-1 rounded-full text-gold-700">
              <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] font-bold">Imperial Heritage</span>
            </div>
            
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 leading-[1.15]">
              Sanctuary of <br />
              <span className="font-semibold text-gold-600 font-serif">Aesthetic Perfection</span>
            </h3>
            
            <p className="font-sans text-neutral-600 text-sm md:text-base font-light leading-relaxed">
              Step inside a secluded realm designed to soothe and rejuvenate. At Asha Signature, we believe that true self-care is an art form. We combine age-old Ayurvedic wisdom, botanical essences, and advanced dermal science to celebrate your individual natural allure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-serif text-sm font-semibold text-neutral-900">Medical-Grade Hygiene</h5>
                  <p className="font-sans text-neutral-500 text-xs">Aseptic sterilization and single-use professional tools.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-serif text-sm font-semibold text-neutral-900">Ayurvedic Customization</h5>
                  <p className="font-sans text-neutral-500 text-xs">Tailored herbal blends matched exactly to your skin profile.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <RippleButton
                variant="gold"
                onClick={() => setActiveTab("about")}
                className="!px-6 !py-3 text-[10px] font-bold uppercase tracking-widest"
              >
                Learn Our Philosophy <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </RippleButton>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/50">
              <img 
                src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80" 
                alt="Imperial Care" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent" />
            </div>

            {/* Float badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white border border-gold-300 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 max-w-[240px] z-10"
            >
              <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 shrink-0 font-serif font-bold text-lg">
                100%
              </div>
              <div>
                <p className="font-serif text-xs font-semibold text-neutral-900">Premium Botanicals</p>
                <p className="font-sans text-[10px] text-neutral-500">Naturally active botanical pulps & organic oils.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED TREATMENTS PREVIEW */}
      <section className="bg-neutral-50 py-24 border-y border-neutral-200/40 relative overflow-hidden">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#b8863b05_1px,transparent_1px),linear-gradient(to_bottom,#b8863b05_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <span className="font-sans text-[10px] tracking-[0.35em] font-bold text-gold-600 uppercase block">
                CURATED EXPERIENCES
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light leading-tight text-neutral-900">
                Signature Treatment <span className="font-semibold italic">Rituals</span>
              </h3>
            </div>
            
            <RippleButton
              variant="outline"
              onClick={() => setActiveTab("services")}
              className="!px-6 !py-3 text-[10px] font-bold uppercase tracking-widest border-gold-400 text-gold-700 hover:bg-gold-50 self-start md:self-auto"
            >
              View Full Menu ({siteData.services.length} items) <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </RippleButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="group bg-white border border-neutral-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Showcase */}
                <div className="relative aspect-[16/11] overflow-hidden bg-neutral-100 shrink-0">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/25 to-transparent" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/40 shadow-sm">
                    <span className="font-sans text-[8px] uppercase tracking-wider font-bold text-neutral-800">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Info and Price */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg font-semibold text-neutral-950 group-hover:text-gold-600 transition-colors">
                      {service.name}
                    </h4>
                    <p className="font-sans text-neutral-500 text-xs font-light leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-100">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-neutral-400 font-sans uppercase tracking-wider">Investment</span>
                      <span className="font-sans text-gold-600 font-bold text-base">
                        {service.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-neutral-400 font-sans text-xs">
                      <Clock className="w-3.5 h-3.5 text-gold-400" /> {service.duration}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BENTO INFORMATIONAL RESERVATIONS & LOCATION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Bento Block 1: Contact & Hours (Highly structured/Informational) */}
          <div className="lg:col-span-7 bg-neutral-950 text-white rounded-3xl p-8 sm:p-10 border border-neutral-900 flex flex-col justify-between relative overflow-hidden shadow-xl">
            {/* Ambient gold glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-gold-950/20 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="space-y-6">
              <span className="font-sans text-[9px] tracking-[0.3em] font-bold text-gold-400 uppercase block">
                Sanctuary Hours & Location
              </span>
              
              <h3 className="font-serif text-2xl sm:text-3xl font-light leading-tight">
                Plan Your Experience of <span className="font-semibold italic text-gold-300">Absolute Rest</span>
              </h3>

              <p className="font-sans text-neutral-400 text-xs sm:text-sm font-light max-w-xl leading-relaxed">
                Whether dropping in for a swift revitalizing grooming session or scheduling a full Ayurvedic facial therapy cycle, our expert cosmetologists are here to cater to your specific aesthetic needs. 
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gold-400">
                    <CalendarRange className="w-4 h-4" />
                    <span className="font-serif text-xs uppercase tracking-wider font-semibold">Opening Hours</span>
                  </div>
                  <p className="font-sans text-sm text-neutral-200">Sunday – Saturday</p>
                  <p className="font-sans text-xs text-neutral-400">10:00 AM – 9:00 PM</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gold-400">
                    <MapPin className="w-4 h-4" />
                    <span className="font-serif text-xs uppercase tracking-wider font-semibold">Our Suites</span>
                  </div>
                  <p className="font-sans text-sm text-neutral-200">Gulshan-2, Dhaka</p>
                  <p className="font-sans text-xs text-neutral-400">House 45, Road 11, Gulshan Sector</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-neutral-900 mt-8">
              <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-5 py-3 rounded-2xl w-full sm:w-auto">
                <PhoneCall className="w-4 h-4 text-gold-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[8px] text-neutral-500 font-sans uppercase tracking-wider">Suite Concierge</span>
                  <span className="font-sans text-xs sm:text-sm text-neutral-200 font-semibold">+880 1712-XXXXXX</span>
                </div>
              </div>
              <RippleButton
                variant="gold"
                onClick={() => setActiveTab("contact")}
                className="w-full sm:w-auto !px-6 !py-3.5 text-[10px] font-bold uppercase tracking-widest text-center"
              >
                Inquire Appointment
              </RippleButton>
            </div>
          </div>

          {/* Bento Block 2: Royal Membership Teaser */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#FAF8F5] to-[#F1EDE7] rounded-3xl p-8 sm:p-10 border border-neutral-200/60 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            {/* Decorative subtle texture or vector detail */}
            <div className="absolute right-0 bottom-0 opacity-10 shrink-0 pointer-events-none">
              <Gem className="w-72 h-72 text-gold-900" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center text-gold-600">
                <Gem className="w-5 h-5" />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-xl sm:text-2xl font-semibold text-neutral-900">
                  Prestige Circle Membership
                </h4>
                <p className="font-sans text-neutral-600 text-xs sm:text-sm font-light leading-relaxed">
                  Join our exclusive subscription circles to secure permanent weekly slots, unlock prioritized VIP bookings, and enjoy complimentary treatment credits with customized refreshments.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-neutral-700 font-sans font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full shrink-0" />
                  Weekly priority reservation slots
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full shrink-0" />
                  Complimentary Premium Welcome Teas
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-400 rounded-full shrink-0" />
                  Exclusive member-only organic treatments
                </li>
              </ul>
            </div>

            <button 
              onClick={() => setActiveTab("membership")}
              className="mt-8 flex items-center justify-between w-full font-sans text-[10px] font-bold uppercase tracking-widest text-neutral-900 group-hover:text-gold-600 border-t border-neutral-200 pt-5 cursor-pointer transition-colors relative z-10"
            >
              <span>Explore Member Tiers</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
