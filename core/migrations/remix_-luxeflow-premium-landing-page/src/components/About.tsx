import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, Shield, Heart, Award, CheckCircle } from "lucide-react";
import { SiteData } from "../types";

interface AboutProps {
  siteData: SiteData;
}

export default function About({ siteData }: AboutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Elegant feature-specific icons mapper
  const getFeatureIcon = (index: number) => {
    switch (index % 4) {
      case 0:
        return <Sparkles className="w-5 h-5 text-gold-500 animate-pulse-slow" />;
      case 1:
        return <Shield className="w-5 h-5 text-gold-500" />;
      case 2:
        return <Heart className="w-5 h-5 text-gold-500" />;
      default:
        return <Award className="w-5 h-5 text-gold-500" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-24 md:py-32 bg-[#FCFAF7] border-y border-neutral-100 relative overflow-hidden"
    >
      {/* Background aesthetics */}
      <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] rounded-full bg-gold-200/10 blur-[130px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        >
          {/* Left Column: Portrait photo with floating luxury border */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 relative flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl group">
              {/* Secondary Floating Border Offset */}
              <div className="absolute -inset-4 border border-gold-300/40 rounded-3xl -translate-x-2 translate-y-2 pointer-events-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-700 z-0" />
              
              {/* Primary Image Cover with Lift */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white aspect-[3/4] z-10 transition-transform duration-700 group-hover:-translate-y-2">
                <motion.img
                  src={siteData.aboutImage}
                  alt="Therapeutic Facemassage Wellness"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>

              {/* Float Card Badge */}
              <div className="absolute -bottom-6 -right-6 glass-panel p-4 rounded-xl shadow-xl border border-white/50 z-20 hover:scale-105 transition-transform duration-300 interactive-card">
                <p className="font-serif text-2xl font-bold text-neutral-900 tracking-wide">12+</p>
                <p className="font-sans text-[8px] text-neutral-500 font-semibold uppercase tracking-widest mt-0.5">Years of Legacy</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Text & Staggered Feature Cards */}
          <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
            
            {/* Tagline section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-gold-600 uppercase block">
                WHO WE ARE
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 leading-[1.15] tracking-tight">
                {siteData.aboutTitle}
              </h3>
            </motion.div>

            {/* Paragraph body description */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-neutral-600 text-sm md:text-base font-light leading-relaxed max-w-2xl"
            >
              {siteData.aboutDescription}
            </motion.p>

            {/* Custom Features Grid with Lift Hover */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
            >
              {siteData.aboutFeatures.map((feat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="p-5 bg-white/70 backdrop-blur rounded-xl border border-neutral-200/40 shadow-sm hover:shadow-md hover:border-gold-300/30 transition-all duration-300 flex gap-4 text-left interactive-card cursor-default"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-50/70 border border-gold-200/50 flex items-center justify-center">
                    {getFeatureIcon(index)}
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-sans text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                      Feature #{index + 1}
                    </h5>
                    <p className="font-sans text-xs text-neutral-600 font-light leading-snug">
                      {feat}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
