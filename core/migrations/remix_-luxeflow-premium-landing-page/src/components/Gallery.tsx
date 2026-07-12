import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { SiteData, GalleryItem } from "../types";

interface GalleryProps {
  siteData: SiteData;
}

export default function Gallery({ siteData }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const categories = ["All", ...Array.from(new Set(siteData.gallery.map((g) => g.category)))];

  const filteredItems =
    activeCategory === "All"
      ? siteData.gallery
      : siteData.gallery.filter((g) => g.category === activeCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, filteredItems]);

  const handlePrev = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="py-24 md:py-32 bg-[#FCFAF7] border-y border-neutral-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-left space-y-4 max-w-lg">
            <span className="font-sans text-[10px] tracking-[0.35em] font-bold text-gold-600 uppercase block">
              VISUAL SANCTUARY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 leading-tight">
              A Glimpse of Absolute Radiance
            </h2>
          </div>
          
          {/* Gallery Category Pill Filters */}
          <div className="flex flex-wrap gap-1.5 justify-start md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedIdx(null); // Clear selected item to avoid index mismatches
                }}
                className={`px-4 py-2 rounded-full font-sans text-[9px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "text-neutral-900 bg-gold-200 border border-gold-300/50 shadow-sm"
                    : "text-neutral-500 bg-white hover:bg-neutral-50 border border-neutral-200/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Asymmetric Grid Layout */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item: GalleryItem, index: number) => {
              // Asymmetric tallness class mapping based on ID to simulate natural editorial layouts
              const heightClass =
                index % 3 === 0
                  ? "aspect-[3/4]"
                  : index % 3 === 1
                  ? "aspect-[1/1]"
                  : "aspect-[4/3]";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  key={item.id}
                  onClick={() => setSelectedIdx(index)}
                  className={`break-inside-avoid relative overflow-hidden rounded-2xl group border-4 border-white shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer interactive-card bg-neutral-100 ${heightClass}`}
                >
                  {/* Photo with zoom transition */}
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glassy Slide-Up Caption Box */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 text-left">
                    <Maximize2 className="absolute top-4 right-4 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                    <span className="font-sans text-[8px] tracking-widest text-gold-300 font-bold uppercase mb-1">
                      {item.category}
                    </span>
                    <h5 className="font-serif text-base font-medium text-white tracking-wide">
                      {item.caption}
                    </h5>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cinematic Lightbox Modal Overlay */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-9999 flex flex-col items-center justify-center p-4"
          >
            {/* Top Toolbar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white font-sans text-xs z-30">
              <span className="flex items-center gap-1.5 tracking-wider uppercase font-semibold text-[10px] text-neutral-400">
                <ImageIcon className="w-4 h-4 text-gold-400" /> 
                {filteredItems[selectedIdx].category}
              </span>
              <span className="font-mono text-neutral-400 text-[11px]">
                {selectedIdx + 1} / {filteredItems.length}
              </span>
              <button
                onClick={() => setSelectedIdx(null)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-white/15 rounded-full text-white transition-all cursor-pointer z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-white/15 rounded-full text-white transition-all cursor-pointer z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Central Slide Showcase */}
            <div className="max-w-4xl max-h-[75vh] w-full flex items-center justify-center relative px-12 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIdx}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="relative aspect-auto max-w-full"
                >
                  <img
                    src={filteredItems[selectedIdx].url}
                    alt={filteredItems[selectedIdx].caption}
                    className="max-h-[70vh] object-contain rounded-xl border border-white/10 shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Caption Footer */}
            <div className="absolute bottom-10 text-center max-w-md px-6 space-y-1.5 z-20">
              <h4 className="font-serif text-xl font-medium text-white tracking-wide">
                {filteredItems[selectedIdx].caption}
              </h4>
              <p className="font-sans text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                Tap outside or press ESC to dismiss
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
