import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, CalendarRange, MapPin } from "lucide-react";
import { SiteData } from "../types";
import RippleButton from "./RippleButton";

interface CTAProps {
  siteData: SiteData;
}

export default function CTA({ siteData }: CTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleBookNow = () => {
    const contactEl = document.querySelector("#contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="cta"
      className="py-24 md:py-32 relative overflow-hidden flex items-center justify-center"
    >
      {/* Background Cover Image with Zoom on Load */}
      <div className="absolute inset-0 z-0 bg-neutral-900">
        <motion.img
          initial={{ scale: 1.15, opacity: 0.35 }}
          animate={isInView ? { scale: 1, opacity: 0.45 } : { scale: 1.15, opacity: 0.35 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/src/assets/images/cta_wellness_1782574213866.jpg"
          alt="Luxury Aromatic Candle Wellness Spa"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950 pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full text-center">
        
        {/* Glassmorphic overlay card container */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel-dark border border-white/10 rounded-3xl p-10 md:p-16 space-y-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle glowing halo */}
          <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-gold-400/10 blur-[50px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-gold-300/10 blur-[50px] pointer-events-none" />

          {/* Subtitle tag */}
          <div className="flex justify-center items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-400 animate-pulse-slow" />
            <span className="font-sans text-[10px] tracking-[0.35em] font-bold text-gold-300 uppercase block">
              INDULGENCE AWAITS
            </span>
          </div>

          {/* Title */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
            Begin Your Personal Ritual
          </h2>

          {/* Description */}
          <p className="font-sans text-neutral-300 text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto">
            Step away from the demands of modern styling and reset your senses. Connect directly with our personal Gulshan-2 concierge desk to tailor your bespoke visit, facial consult, or bridal package.
          </p>

          {/* Call-to-action Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <RippleButton
              variant="gold"
              onClick={handleBookNow}
              className="w-full sm:w-auto !px-8 !py-4 shadow-xl"
            >
              Book Priority Consultation <CalendarRange className="w-4 h-4 ml-1.5" />
            </RippleButton>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-[11px] tracking-widest font-bold text-neutral-300 hover:text-white uppercase transition-colors flex items-center gap-1 cursor-pointer py-3 px-6"
            >
              <MapPin className="w-4 h-4 text-gold-400" /> Locate Sanctuary
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
