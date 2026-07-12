import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check, Sparkles, HelpCircle } from "lucide-react";
import { SiteData, PricingPlan } from "../types";
import RippleButton from "./RippleButton";

interface PricingProps {
  siteData: SiteData;
}

export default function Pricing({ siteData }: PricingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleSelectPlan = (planName: string) => {
    const contactEl = document.querySelector("#contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getCardStyle = (plan: PricingPlan) => {
    if (plan.popular) {
      return "bg-neutral-950 text-white border-2 border-gold-500 shadow-2xl shadow-gold-500/10 scale-105 z-10";
    }
    if (plan.name.toLowerCase().includes("onyx") || plan.name.toLowerCase().includes("elite")) {
      return "bg-[#111111] text-neutral-200 border border-neutral-800 shadow-xl z-0";
    }
    return "bg-white text-neutral-800 border border-neutral-200/40 shadow-md z-0";
  };

  return (
    <section
      ref={containerRef}
      id="membership"
      className="py-24 md:py-32 bg-[#FCFAF7] border-y border-neutral-100 relative overflow-hidden"
    >
      {/* Absolute Decorative Ambient Lights */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-gold-200/20 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full bg-gold-100/30 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto space-y-4 mb-20">
          <span className="font-sans text-[10px] tracking-[0.35em] font-bold text-gold-600 uppercase block">
            AURA CIRCLES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 leading-tight">
            Elite Membership Circles
          </h2>
          <p className="font-sans text-neutral-500 text-xs md:text-sm font-light">
            Secure absolute priority. Align your routine styling and body wellness with our exclusive annually-billed circles, unlocking VIP benefits.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {siteData.pricing.map((plan: PricingPlan, idx: number) => (
            <motion.div
              key={plan.id}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              whileHover={{ y: plan.popular ? -10 : -6 }}
              className={`relative rounded-3xl p-8 md:p-10 flex flex-col h-full transition-all duration-500 interactive-card ${getCardStyle(
                plan
              )}`}
            >
              {/* Popular Shimmer Banner */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-600 to-gold-400 text-white font-sans text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: "6s" }} /> MOST COVETED
                </div>
              )}

              {/* Plan Header */}
              <div className="space-y-4 pb-6 border-b border-neutral-100/10 text-left">
                <h4 className="font-serif text-2xl font-semibold tracking-wide">
                  {plan.name}
                </h4>
                <p className={`font-sans text-xs font-light leading-relaxed ${plan.popular ? "text-neutral-400" : "text-neutral-500"}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline pt-2">
                  <span className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-gold-500">
                    {plan.price}
                  </span>
                  <span className={`font-sans text-[10px] uppercase tracking-widest font-bold ml-1.5 ${plan.popular ? "text-neutral-400" : "text-neutral-500"}`}>
                    / {plan.period}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="py-8 space-y-4 flex-1 text-left">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                      plan.popular ? "bg-gold-500/20 text-gold-300" : "bg-gold-50 text-gold-600"
                    }`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className={`font-sans text-xs font-light leading-snug ${
                      plan.popular ? "text-neutral-300" : "text-neutral-600"
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <div className="pt-4 text-center">
                <RippleButton
                  variant={plan.popular ? "gold" : "primary"}
                  onClick={() => handleSelectPlan(plan.name)}
                  className="w-full !py-3.5"
                >
                  {plan.buttonText}
                </RippleButton>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Informational Help Banner */}
        <div className="mt-16 bg-white/40 border border-neutral-200/50 rounded-2xl p-6 max-w-xl mx-auto flex items-start gap-4 text-left">
          <HelpCircle className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-sans text-xs font-bold uppercase tracking-wider text-neutral-800">Frequently Asked Question</h5>
            <p className="font-sans text-[11px] text-neutral-500 font-light leading-relaxed">
              <b>Are memberships fully transferable?</b> Yes, members of our Royal Gold and Imperial tiers may transfer guest passes or authorize spouse bookings in our private suites via direct hotline call.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
