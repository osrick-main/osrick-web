import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile/touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const cursor = cursorRef.current;
    const glow = glowRef.current;

    if (!cursor || !glow) return;

    // Use GSAP quickTo for buttery-smooth mouse tracking without frame drops
    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const xToGlow = gsap.quickTo(glow, "x", { duration: 0.4, ease: "power2.out" });
    const yToGlow = gsap.quickTo(glow, "y", { duration: 0.4, ease: "power2.out" });

    // Center offsets
    const cursorOffset = 6; // 12px / 2
    const glowOffset = 24; // 48px / 2

    const handleMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX - cursorOffset);
      yToCursor(e.clientY - cursorOffset);

      xToGlow(e.clientX - glowOffset);
      yToGlow(e.clientY - glowOffset);
    };

    const handleMouseLeaveWindow = () => {
      gsap.to([cursor, glow], { opacity: 0, duration: 0.3 });
    };

    const handleMouseEnterWindow = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
      gsap.to(glow, { opacity: 0.6, duration: 0.3 });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Attach listeners to detect hovering over interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .interactive-card, .swiper-button, .editable-trigger'
      );
      
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    addHoverListeners();

    // Re-bind hover listeners periodically because elements might re-render from the CMS Editor
    const intervalId = setInterval(addHoverListeners, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clearInterval(intervalId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-gold-600 rounded-full pointer-events-none z-9999 mix-blend-difference"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          transition: isClicking ? "transform 0.1s" : "none",
          scale: isClicking ? 0.7 : 1,
        }}
      />
      
      {/* Luxury amber-gold magnetic glow halo */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-9998 transition-all duration-300"
        style={{
          width: "48px",
          height: "48px",
          border: isHovered ? "1px solid rgba(184, 134, 59, 0.4)" : "1px solid rgba(184, 134, 59, 0.15)",
          background: isHovered ? "rgba(184, 134, 59, 0.08)" : "rgba(184, 134, 59, 0.02)",
          boxShadow: isHovered ? "0 0 15px rgba(184, 134, 59, 0.3)" : "none",
          transform: "translate3d(-100px, -100px, 0)",
          scale: isHovered ? 1.5 : isClicking ? 0.85 : 1,
        }}
      />
    </>
  );
}
