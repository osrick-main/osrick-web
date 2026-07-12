import { useState, useEffect } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "motion/react";

// Custom type structure & initial dataset
import { SiteData, initialSiteData } from "./types";

// Modular page components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomeHighlights from "./components/HomeHighlights";
import FAQSection from "./components/FAQSection";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import StatsSection from "./components/StatsSection";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import CMSEditor from "./components/CMSEditor";

export default function App() {
  const [siteData, setSiteData] = useState<SiteData>(initialSiteData);
  const [cmsOpen, setCmsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("home");

  // Initialize buttery-smooth Lenis kinetic scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium kinetic bezier curve
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen font-sans bg-[#FAF8F5] text-neutral-850 selection:bg-gold-200 selection:text-neutral-900 overflow-x-hidden antialiased">
      {/* Premium Luxury Preloading Entrance */}
      <Preloader brandName={siteData.siteName} />

      {/* Gold Halo Custom Mouse Follower */}
      <CustomCursor />

      {/* Sticky Blurred Navbar & Scroll Depth Indicator */}
      <Navbar
        siteData={siteData}
        onOpenCMS={() => setCmsOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Landing Page Content Grid */}
      <main className="relative z-10 min-h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === "home" && (
              <>
                <Hero siteData={siteData} setActiveTab={setActiveTab} />
                <HomeHighlights siteData={siteData} setActiveTab={setActiveTab} />
                <StatsSection siteData={siteData} />
                <Testimonials siteData={siteData} />
                <FAQSection />
              </>
            )}

            {activeTab === "about" && (
              <div className="pt-20">
                <About siteData={siteData} />
              </div>
            )}

            {activeTab === "services" && (
              <div className="pt-20">
                <Services siteData={siteData} />
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="pt-20">
                <Gallery siteData={siteData} />
              </div>
            )}

            {activeTab === "membership" && (
              <div className="pt-20">
                <Pricing siteData={siteData} />
              </div>
            )}

            {activeTab === "contact" && (
              <div className="pt-20">
                <CTA siteData={siteData} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 9. Premium Four-Column Footer */}
      <Footer siteData={siteData} setActiveTab={setActiveTab} />

      {/* 10. Floating Interactive Live-CMS Control Panel Drawer */}
      <CMSEditor siteData={siteData} onChange={setSiteData} />
    </div>
  );
}
