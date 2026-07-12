import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Star, ShieldCheck, Award, Sparkles, Percent } from "lucide-react";
import { SiteData } from "../types";
import RippleButton from "./RippleButton";

interface HeroProps {
  siteData: SiteData;
  setActiveTab: (tab: string) => void;
}

export default function Hero({ siteData, setActiveTab }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse parallax coordinates calculation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const x = (e.clientX / clientWidth - 0.5) * 35; // Max 35px shift
      const y = (e.clientY / clientHeight - 0.5) * 35;
      setMousePos({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const handleNavigateToTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-[#FAF8F5]"
    >
      {/* Immersive Full-Screen Background Image (The Grand Spa Hall) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={siteData.heroImage}
          alt="Bespoke Luxury Spa Interior"
          className="w-full h-full object-cover scale-105 origin-center select-none"
          animate={{
            x: mousePos.x * 0.15,
            y: mousePos.y * 0.15,
          }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.6 }}
          referrerPolicy="no-referrer"
        />
        {/* Elite multi-layered luxury gradient overlay for perfect readability and premium feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/95 to-[#FAF8F5]/50 lg:to-[#FAF8F5]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Textual Vibe and Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left order-2 lg:order-1">
          
          {/* Elite Special Offer Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, translateY: -2 }}
            className="group relative inline-flex items-center gap-3 bg-neutral-950/95 backdrop-blur-md px-6 py-3 rounded-full border border-gold-400/50 shadow-[0_10px_30px_rgba(184,134,59,0.15)] max-w-fit cursor-pointer overflow-hidden transition-all duration-300 hover:border-gold-300 hover:shadow-[0_15px_40px_rgba(184,134,59,0.25)]"
          >
            {/* Shimmer reflection animation effect */}
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:animate-[marquee_2s_ease-in-out_infinite]" style={{ animationDuration: '1.5s' }} />

            {/* Glowing Golden Ring and Icon */}
            <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-neutral-950 shadow-md">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            </div>

            <div className="flex items-center gap-2.5">
              <span className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200">
                Special Offer
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400/60" />
              <span className="font-serif text-sm sm:text-base font-medium text-white tracking-wide italic flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-gold-300 shrink-0" />
                <span className="text-gold-100 font-sans not-italic font-extrabold tracking-tight">20% Off</span> 
                <span className="text-neutral-300 text-xs sm:text-sm font-sans not-italic font-light">Discount</span>
              </span>
            </div>

            {/* Tiny arrow hint */}
            <ArrowRight className="w-3.5 h-3.5 text-gold-400/70 group-hover:text-gold-200 transition-colors transform group-hover:translate-x-1 duration-300" />
          </motion.div>

          {/* Subtitle with gold flare */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <span className="w-6 h-[1px] bg-gold-500" />
            <span className="font-sans text-[10px] md:text-xs tracking-[0.35em] font-bold text-gold-600 uppercase">
              {siteData.heroSubtitle}
            </span>
          </motion.div>

          {/* Title Text Reveal */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-light leading-[1.15] text-neutral-900 tracking-tight"
            >
              {siteData.heroTitle}
            </motion.h2>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
            className="font-sans text-neutral-700 text-sm md:text-base font-light leading-relaxed max-w-xl"
          >
            {siteData.heroDescription}
          </motion.p>

          {/* Interactive Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <RippleButton
              variant="gold"
              onClick={() => handleNavigateToTab("services")}
              className="!px-8 !py-4 shadow-xl"
            >
              Explore Services <ArrowRight className="w-4 h-4 ml-1.5" />
            </RippleButton>
            <RippleButton
              variant="outline"
              onClick={() => handleNavigateToTab("about")}
              className="!px-8 !py-4 border-neutral-300 hover:bg-white"
            >
              Our Philosophy
            </RippleButton>
          </motion.div>

          {/* Active Statistics Block */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="grid grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-neutral-200/60 max-w-lg"
          >
            {siteData.heroStats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <h4 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 flex items-baseline">
                  <StatCounter value={stat.value} />
                </h4>
                <p className="font-sans text-[10px] md:text-xs text-neutral-500 font-medium tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Hero Framing & Mouse Parallax Graphics */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 relative h-[250px] sm:h-[350px] lg:h-[450px] w-full">
          
          {/* Parallax Layer 1: Gold Floating Frame */}
          <motion.div
            style={{ 
              x: mousePos.x * -0.4, 
              y: mousePos.y * -0.4 
            }}
            className="absolute inset-4 sm:inset-12 border border-gold-400/40 rounded-3xl pointer-events-none z-0"
          />

          {/* Parallax Layer 2: Glass floating tag */}
          <motion.div
            style={{ 
              x: mousePos.x * 0.6, 
              y: mousePos.y * 0.6 
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-20 right-4 sm:bottom-[-16px] sm:left-auto sm:right-[260px] z-20 glass-panel shadow-2xl rounded-2xl p-5 flex items-center gap-4 border border-white/80 hover:shadow-gold-500/10 transition-all cursor-default max-w-xs"
          >
            <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 shadow-sm shrink-0">
              <Award className="w-6 h-6 animate-pulse" style={{ animationDuration: "2s" }} />
            </div>
            <div>
              <p className="font-serif text-base font-semibold text-neutral-800">5★ Sanctuary</p>
              <p className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest font-semibold mt-0.5">Gulshan Elite Circle</p>
            </div>
          </motion.div>

          {/* Parallax Layer 3: VIP Floating Ribbon Card */}
          <motion.div
            style={{ 
              x: mousePos.x * -0.5, 
              y: mousePos.y * -0.5 
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="absolute -bottom-4 right-4 sm:right-12 z-20 bg-neutral-900 text-white shadow-2xl rounded-2xl p-5 flex flex-col gap-1 border border-neutral-800 max-w-[200px]"
          >
            <span className="text-[9px] tracking-[0.2em] text-gold-400 uppercase font-bold">Asha Signature</span>
            <p className="font-serif text-sm font-light text-neutral-100">Bespoke Wellness & Imperial Care</p>
          </motion.div>

          {/* Parallax Layer 4: Small top floating orb */}
          <motion.div
            style={{ 
              x: mousePos.x * -1.2, 
              y: mousePos.y * -1.2 
            }}
            className="absolute top-10 right-4 sm:right-16 w-10 h-10 rounded-full bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600/60 shadow-lg blur-[1px] opacity-80 z-20 animate-float"
          />
        </div>
      </div>
    </section>
  );
}

/* Internal StatCounter component with viewport tracking */
function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  // Parse target number and suffix (e.g. "15k+" -> target: 15, suffix: "k+")
  const numericString = value.replace(/[^0-9]/g, "");
  const suffix = value.replace(/[0-9]/g, "");
  const targetNumber = parseInt(numericString, 10) || 0;

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500; // ms
    const increment = targetNumber / (duration / 16); // 60 FPS

    let timer: any;
    const updateCount = () => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    };

    timer = setInterval(updateCount, 16);
    return () => clearInterval(timer);
  }, [isInView, targetNumber]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      <span className="text-gold-500 font-sans ml-0.5">{suffix}</span>
    </span>
  );
}
