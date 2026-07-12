import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SiteData } from "../types";

interface TestimonialsProps {
  siteData: SiteData;
}

export default function Testimonials({ siteData }: TestimonialsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [currentIdx, setCurrentIdx] = useState(0);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : siteData.testimonials.length - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev < siteData.testimonials.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative luxury circles */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-gold-100/30 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
          <span className="font-sans text-[10px] tracking-[0.35em] font-bold text-gold-600 uppercase block">
            VERIFIED EXPERIENCES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 leading-tight">
            Voices of Refinement
          </h2>
        </div>

        {/* Cinematic Review Showcase Carousel */}
        <div className="max-w-3xl mx-auto relative px-4 sm:px-12">
          
          {/* Quote Background Accent Icon */}
          <div className="absolute -top-12 left-4 sm:left-12 text-gold-100 opacity-60 z-0 select-none">
            <Quote className="w-24 h-24 stroke-[0.5px]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative z-10 text-center space-y-6"
            >
              {/* Rating stars */}
              <div className="flex justify-center items-center gap-1">
                {Array.from({ length: siteData.testimonials[currentIdx].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-serif text-lg sm:text-xl md:text-2xl font-light italic text-neutral-800 leading-relaxed max-w-2xl mx-auto px-4">
                "{siteData.testimonials[currentIdx].review}"
              </p>

              {/* Client Profile Details */}
              <div className="flex flex-col items-center space-y-3 pt-4">
                <img
                  src={siteData.testimonials[currentIdx].avatar}
                  alt={siteData.testimonials[currentIdx].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-neutral-950">
                    {siteData.testimonials[currentIdx].name}
                  </h4>
                  <p className="font-sans text-[9px] text-neutral-500 font-medium uppercase tracking-widest mt-0.5">
                    {siteData.testimonials[currentIdx].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-12 relative z-20">
            <button
              onClick={handlePrev}
              className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200/50 text-neutral-800 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-sans text-[10px] font-bold text-neutral-400 tracking-widest">
              {String(currentIdx + 1).padStart(2, "0")} / {String(siteData.testimonials.length).padStart(2, "0")}
            </span>
            <button
              onClick={handleNext}
              className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded-full border border-neutral-200/50 text-neutral-800 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Micro-Brand Verification */}
        <div className="mt-16 text-center border-t border-neutral-100 pt-8 max-w-md mx-auto">
          <p className="font-sans text-[9px] text-neutral-400 uppercase tracking-widest font-semibold">
            All reviews verified via real concierge bookings.
          </p>
        </div>
      </div>
    </section>
  );
}
