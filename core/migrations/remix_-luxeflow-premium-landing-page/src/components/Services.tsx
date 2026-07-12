import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Clock, Tag, ArrowRight, Sparkles } from "lucide-react";
import { SiteData, Service } from "../types";
import RippleButton from "./RippleButton";

interface ServicesProps {
  siteData: SiteData;
}

export default function Services({ siteData }: ServicesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Extract all distinct categories
  const categories = ["All", ...Array.from(new Set(siteData.services.map((s) => s.category)))];

  const filteredServices =
    activeCategory === "All"
      ? siteData.services
      : siteData.services.filter((s) => s.category === activeCategory);

  const handleBookService = () => {
    const el = document.querySelector("#contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Background radial soft light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl aspect-square rounded-full bg-gold-50/40 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
          <span className="font-sans text-[10px] tracking-[0.35em] font-bold text-gold-600 uppercase block">
            CHOOSE YOUR EXPERIENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 leading-tight">
            Our Signature Treatments
          </h2>
          <p className="font-sans text-neutral-500 text-xs md:text-sm font-light">
            Indulge in a curated collection of absolute luxury and therapeutic precision, tailored entirely for your body, crown, and skin.
          </p>
        </div>

        {/* Elegant Pill Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 py-2.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "text-white bg-neutral-900 border border-neutral-950 shadow-md"
                  : "text-neutral-500 bg-neutral-50 hover:bg-neutral-100 hover:text-neutral-800 border border-neutral-200/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filterable Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service: Service) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                key={service.id}
                className="group relative bg-white border border-neutral-200/40 hover:border-gold-300/30 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col interactive-card h-[280px] sm:h-[310px]"
              >
                {/* Image area */}
                <div className="relative w-full h-[170px] sm:h-[190px] overflow-hidden bg-neutral-100 shrink-0">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/85 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/40 shadow-sm flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5 text-gold-600" />
                    <span className="font-sans text-[8px] uppercase tracking-widest font-bold text-neutral-800">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Compact Content body (visible by default) */}
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between bg-white relative z-10">
                  <h4 className="font-serif text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-2 leading-snug group-hover:text-gold-600 transition-colors">
                    {service.name}
                  </h4>
                  
                  <div className="flex items-center justify-between pt-1 border-t border-neutral-100 mt-2">
                    <span className="font-sans text-gold-600 font-bold text-xs sm:text-sm">
                      {service.price}
                    </span>
                    <span className="font-sans text-[9px] text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold-400" /> {service.duration}
                    </span>
                  </div>
                </div>

                {/* LUXURY HOVER DETAILS POP-UP OVERLAY */}
                <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md p-4 sm:p-5 flex flex-col justify-between z-20 border-2 border-gold-400/60 rounded-2xl opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 ease-out shadow-[0_15px_30px_rgba(184,134,59,0.25)]">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[8px] tracking-[0.2em] font-bold text-gold-400 uppercase">
                        {service.category}
                      </span>
                      <span className="font-sans text-[9px] text-neutral-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gold-400 animate-pulse" /> {service.duration}
                      </span>
                    </div>
                    
                    <div className="h-[1px] bg-gradient-to-r from-gold-400/40 via-gold-400/20 to-transparent" />

                    <h5 className="font-serif text-sm sm:text-base font-semibold text-white tracking-wide leading-tight">
                      {service.name}
                    </h5>

                    <p className="font-sans text-neutral-300 text-[10px] sm:text-xs font-light leading-relaxed line-clamp-4">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-sans">Investment</span>
                      <span className="text-gold-300 font-sans font-bold text-sm sm:text-base">
                        {service.price}
                      </span>
                    </div>

                    <button
                      onClick={handleBookService}
                      className="w-full flex items-center justify-between text-left font-sans text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-gold-400 border-t border-white/10 pt-2.5 cursor-pointer hover:text-white transition-colors"
                    >
                      <span>Book Session</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold-400 transform group-hover:translate-x-1 duration-300" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Global Action Footer */}
        <div className="text-center mt-16">
          <p className="font-sans text-neutral-400 text-[11px] mb-4">
            Need a fully customized, multi-therapy routine or bridal booking?
          </p>
          <RippleButton
            variant="outline"
            onClick={handleBookService}
            className="border-neutral-200/80"
          >
            Request Bespoke Consultation <Sparkles className="w-3.5 h-3.5 ml-1.5 text-gold-500" />
          </RippleButton>
        </div>
      </div>
    </section>
  );
}
