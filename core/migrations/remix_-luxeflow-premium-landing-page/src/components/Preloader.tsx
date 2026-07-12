import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader({ brandName = "Asha Bridal" }: { brandName?: string }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Premium high-fidelity delay before fading out
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          id="preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-neutral-950 z-9999 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Moving background subtle dark-glow flares */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-950/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-900/10 blur-[120px] pointer-events-none" />

          <div className="relative text-center space-y-6 max-w-sm px-4">
            {/* Logo Text Reveal */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="font-serif text-3xl font-extralight tracking-[0.25em] text-white uppercase"
              >
                {brandName}
              </motion.h1>
            </div>

            {/* Custom high-contrast line element */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "120px", opacity: 0.5 }}
              transition={{ duration: 1.4, ease: "easeInOut", delay: 0.5 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto"
            />

            {/* Subtext info */}
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 0.6 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.7 }}
                className="font-sans text-[9px] tracking-[0.4em] uppercase text-gold-200"
              >
                Refining Personal Sophistication
              </motion.p>
            </div>
          </div>

          {/* Luxury loading status loader bar */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-neutral-900 rounded-full overflow-hidden">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-gold-400 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
