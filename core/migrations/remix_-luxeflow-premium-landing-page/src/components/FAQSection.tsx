import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, Plus, Minus, Sparkles } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Do you offer bridal/wedding day packages and what do they include?",
      answer: "Yes, we specialize in luxury bridal makeovers. Our bridal packages typically include a professional pre-wedding skin consultancy, personalized trial session, premium HD airbrush or traditional make-up, high-end hair styling, and professional draping services. We customize every package to ensure you feel stunning on your special day."
    },
    {
      id: 2,
      question: "How far in advance should I book my bridal or special event session?",
      answer: "We recommend booking bridal sessions 2 to 3 months in advance to secure your preferred date, as peak wedding seasons fill up rapidly. For regular treatments or party makeovers, booking 1 to 2 weeks in advance is usually sufficient."
    },
    {
      id: 3,
      question: "What is your pricing policy and are there hidden charges?",
      answer: "All our prices are completely transparent and listed clearly in our Services Menu (e.g., Clean-up at 150 BDT, Pearl Facial at 750 BDT). For complex facials or special polishing, options are dual-priced depending on premium ingredient tiers (e.g., Special Fair Polish at 800/1500 BDT). There are absolutely no hidden fees."
    },
    {
      id: 4,
      question: "Do you accept walk-ins, or is a reservation mandatory?",
      answer: "While we do accommodate walk-ins when possible, we highly advise booking an appointment in advance. This guarantees your exclusive slot with our skilled aesthetic expert and eliminates any waiting time so you can enjoy a seamless, relaxing experience."
    },
    {
      id: 5,
      question: "What is your cancellation or rescheduling policy?",
      answer: "We understand that plans can change. We kindly request that you notify us at least 24 hours prior to your scheduled slot to cancel or reschedule, so that we may offer the session to other patrons on our waitlist."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 relative z-10">
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200/60 px-3 py-1 rounded-full text-gold-700">
          <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
          <span className="font-sans text-[9px] uppercase tracking-[0.25em] font-bold text-gold-600">Assistance</span>
        </div>
        
        <h3 className="font-serif text-3xl md:text-4xl font-light text-neutral-900 leading-tight">
          Frequently Asked <span className="font-semibold italic text-gold-600">Questions</span>
        </h3>
        <p className="font-sans text-neutral-500 text-sm max-w-xl mx-auto font-light leading-relaxed">
          Clear answers to help you organize your luxurious bridal treatments, understand our transparent pricing, and schedule effortless sessions.
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`border rounded-2xl transition-all duration-300 ${
                isOpen
                  ? "bg-gradient-to-r from-white via-white to-gold-50/10 border-gold-300/65 shadow-md shadow-gold-500/5"
                  : "bg-white border-neutral-200/50 hover:border-neutral-300 shadow-sm"
              }`}
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full flex items-center justify-between text-left p-5 sm:p-6 font-serif text-base font-semibold text-neutral-900 focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    isOpen ? "bg-gold-100 text-gold-600" : "bg-neutral-50 text-neutral-400"
                  }`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="leading-snug pr-4">{item.question}</span>
                </div>
                
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                  isOpen ? "border-gold-400 bg-gold-50 text-gold-600 rotate-180" : "border-neutral-200 bg-neutral-50 text-neutral-500"
                }`}>
                  {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-0 font-sans text-xs sm:text-sm text-neutral-600 font-light leading-relaxed pl-[4.2rem] pr-6">
                      <p className="border-t border-neutral-100/80 pt-4">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
