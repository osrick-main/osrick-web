import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { SiteData } from "../types";
import RippleButton from "./RippleButton";

interface NavbarProps {
  siteData: SiteData;
  onOpenCMS: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ siteData, onOpenCMS, activeTab, setActiveTab }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Determine if scroll is past threshold
      setIsScrolled(window.scrollY > 20);

      // Scroll progress percentage calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", tab: "home" },
    { name: "About", tab: "about" },
    { name: "Services", tab: "services" },
    { name: "Gallery", tab: "gallery" },
    { name: "Membership", tab: "membership" },
    { name: "Contact", tab: "contact" },
  ];

  const handleLinkClick = (tab: string) => {
    setMobileMenuOpen(false);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Promo Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 bg-neutral-950 text-white text-[10px] sm:text-xs font-sans tracking-[0.2em] text-center py-2.5 z-[60] border-b border-gold-400/20 uppercase font-semibold flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
        <span>Special Offer: <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-400 font-bold">20% Off Discount</span> at Asha Bridal Beauty Parlor</span>
        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
      </div>

      {/* Scroll Progress Bar at the top */}
      <div 
        className="fixed top-[36px] left-0 h-[3px] bg-gradient-to-r from-gold-500 via-gold-300 to-gold-600 z-[99] transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.nav
        id="navbar"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-[36px] left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-white/70 backdrop-blur-md shadow-sm border-b border-neutral-100"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Custom Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("home");
            }}
            className="flex items-center gap-1.5 focus:outline-none cursor-pointer group"
          >
            <motion.div
              whileHover={{ rotate: 18, scale: 1.1 }}
              className="w-8 h-8 rounded-full border border-gold-400 flex items-center justify-center text-gold-600 shadow bg-gold-50/50"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            <span className="font-serif text-xl tracking-[0.25em] font-medium text-neutral-900 group-hover:text-gold-600 transition-colors">
              {siteData.logo}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeTab === link.tab;
              return (
                <a
                  key={link.name}
                  href={`#${link.tab}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.tab);
                  }}
                  className={`font-sans text-[11px] tracking-widest font-semibold uppercase transition-colors relative py-1 group cursor-pointer ${
                    isActive ? "text-gold-600" : "text-neutral-600 hover:text-gold-600"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-gold-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </a>
              );
            })}
          </div>

          {/* Call-to-action Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenCMS}
              className="text-neutral-500 hover:text-gold-600 font-sans text-[10px] tracking-widest uppercase font-semibold cursor-pointer py-2 px-3 hover:bg-neutral-50 rounded transition-all"
            >
              Configure Design
            </button>
            <RippleButton
              variant="gold"
              onClick={() => handleLinkClick("membership")}
              className="!px-5 !py-2.5 text-[9px] font-semibold"
            >
              Reserve Suite <ArrowRight className="w-3 h-3 ml-1" />
            </RippleButton>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onOpenCMS}
              className="text-neutral-500 hover:text-gold-600 font-sans text-[9px] tracking-widest uppercase font-bold px-2 py-1.5 rounded bg-neutral-50 border border-neutral-100"
            >
              CMS
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 hover:text-gold-600 transition-colors focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="absolute top-full left-0 right-0 bg-white border-b border-neutral-100 shadow-xl overflow-hidden md:hidden z-40"
            >
              <div className="px-6 py-8 flex flex-col gap-6 text-center">
                {navLinks.map((link, idx) => {
                  const isActive = activeTab === link.tab;
                  return (
                    <motion.a
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      key={link.name}
                      href={`#${link.tab}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.tab);
                      }}
                      className={`font-sans text-xs tracking-[0.2em] font-semibold uppercase py-2 cursor-pointer border-b border-neutral-50 ${
                        isActive ? "text-gold-600" : "text-neutral-800 hover:text-gold-600"
                      }`}
                    >
                      {link.name}
                    </motion.a>
                  );
                })}
                <motion.div
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                  className="pt-2 flex flex-col gap-3"
                >
                  <RippleButton
                    variant="gold"
                    onClick={() => handleLinkClick("membership")}
                    className="w-full text-[10px]"
                  >
                    Reserve Suite <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </RippleButton>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
