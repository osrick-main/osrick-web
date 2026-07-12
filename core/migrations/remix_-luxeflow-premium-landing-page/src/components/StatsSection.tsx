import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { Trophy, Users, HeartHandshake, Award } from "lucide-react";
import { SiteData } from "../types";

interface StatsSectionProps {
  siteData: SiteData;
}

export default function StatsSection({ siteData }: StatsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const getStatIcon = (index: number) => {
    switch (index % 4) {
      case 0:
        return <Users className="w-5 h-5 text-gold-400" />;
      case 1:
        return <Award className="w-5 h-5 text-gold-400" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gold-400" />;
      default:
        return <HeartHandshake className="w-5 h-5 text-gold-400" />;
    }
  };

  return (
    <section
      ref={containerRef}
      id="statistics"
      className="bg-neutral-950 text-white py-24 relative overflow-hidden"
    >
      {/* Decorative ambient background flares */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-gold-900/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-gold-950/10 blur-[100px] pointer-events-none" />

      {/* Infinite Marquee 1 (Scrolls Left) */}
      <div className="relative w-full overflow-hidden border-y border-neutral-900 py-5 bg-neutral-900/30 mb-16">
        <div className="flex w-[200%] animate-marquee">
          <div className="flex justify-around w-full shrink-0 font-serif text-xs md:text-sm tracking-[0.25em] text-gold-300 font-extralight uppercase">
            <span>Bespoke Styling Suite</span>
            <span className="text-neutral-700">•</span>
            <span>Ayurvedic Hot-Stone Therapy</span>
            <span className="text-neutral-700">•</span>
            <span>Hydro-Infused Active Facials</span>
            <span className="text-neutral-700">•</span>
            <span>Signature Bridal Artistry</span>
            <span className="text-neutral-700">•</span>
            <span>Premium Organic Botanicals</span>
          </div>
          <div className="flex justify-around w-full shrink-0 font-serif text-xs md:text-sm tracking-[0.25em] text-gold-300 font-extralight uppercase">
            <span>Bespoke Styling Suite</span>
            <span className="text-neutral-700">•</span>
            <span>Ayurvedic Hot-Stone Therapy</span>
            <span className="text-neutral-700">•</span>
            <span>Hydro-Infused Active Facials</span>
            <span className="text-neutral-700">•</span>
            <span>Signature Bridal Artistry</span>
            <span className="text-neutral-700">•</span>
            <span>Premium Organic Botanicals</span>
          </div>
        </div>
      </div>

      {/* Core Counters Panel */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
          <span className="font-sans text-[10px] tracking-[0.35em] font-bold text-gold-400 uppercase block">
            OUR PRESTIGE
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-light leading-tight">
            Reflecting Elite Benchmarks
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {siteData.heroStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              whileHover={{ y: -6, borderColor: "rgba(184, 134, 59, 0.4)" }}
              className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-850 flex flex-col items-center text-center space-y-4 transition-all duration-300 interactive-card cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                {getStatIcon(idx)}
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-3xl sm:text-4xl font-bold text-gold-300 flex justify-center items-baseline tracking-tight">
                  <CounterAnimate target={stat.value} isTriggered={isInView} />
                </h4>
                <p className="font-sans text-[10px] tracking-widest text-neutral-400 font-semibold uppercase">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Infinite Marquee 2 (Scrolls Right - opposite direction) */}
      <div className="relative w-full overflow-hidden border-y border-neutral-900 py-5 bg-neutral-900/30 mt-20">
        <div className="flex w-[200%] animate-marquee-reverse">
          <div className="flex justify-around w-full shrink-0 font-serif text-xs md:text-sm tracking-[0.25em] text-gold-400 font-extralight uppercase">
            <span>Gulshan VIP Suites</span>
            <span className="text-neutral-700">•</span>
            <span>Licensed Medical Aesthetic Specialists</span>
            <span className="text-neutral-700">•</span>
            <span>Caviar Cell Lift Therapy</span>
            <span className="text-neutral-700">•</span>
            <span>Bespoke Hand Grooming</span>
            <span className="text-neutral-700">•</span>
            <span>Premium Late Hospitality Bar</span>
          </div>
          <div className="flex justify-around w-full shrink-0 font-serif text-xs md:text-sm tracking-[0.25em] text-gold-400 font-extralight uppercase">
            <span>Gulshan VIP Suites</span>
            <span className="text-neutral-700">•</span>
            <span>Licensed Medical Aesthetic Specialists</span>
            <span className="text-neutral-700">•</span>
            <span>Caviar Cell Lift Therapy</span>
            <span className="text-neutral-700">•</span>
            <span>Bespoke Hand Grooming</span>
            <span className="text-neutral-700">•</span>
            <span>Premium Late Hospitality Bar</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Local Count-up logic component */
interface CounterAnimateProps {
  target: string;
  isTriggered: boolean;
}

function CounterAnimate({ target, isTriggered }: CounterAnimateProps) {
  const [val, setVal] = useState(0);

  const numericPart = target.replace(/[^0-9]/g, "");
  const suffix = target.replace(/[0-9]/g, "");
  const limit = parseInt(numericPart, 10) || 0;

  useEffect(() => {
    if (!isTriggered) return;

    let start = 0;
    const duration = 1200; // ms
    const increment = limit / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= limit) {
        setVal(limit);
        clearInterval(timer);
      } else {
        setVal(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isTriggered, limit]);

  return (
    <span>
      {val}
      <span className="text-white font-sans text-xl ml-0.5">{suffix}</span>
    </span>
  );
}
