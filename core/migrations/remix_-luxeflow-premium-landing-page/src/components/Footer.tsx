import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock, ShieldAlert } from "lucide-react";
import { SiteData } from "../types";

interface FooterProps {
  siteData: SiteData;
  setActiveTab: (tab: string) => void;
}

export default function Footer({ siteData, setActiveTab }: FooterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const socialIcons = [
    { name: "Facebook", icon: <Facebook className="w-4 h-4" />, url: siteData.socialLinks.facebook },
    { name: "Instagram", icon: <Instagram className="w-4 h-4" />, url: siteData.socialLinks.instagram },
    { name: "Youtube", icon: <Youtube className="w-4 h-4" />, url: siteData.socialLinks.youtube },
  ];

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={containerRef}
      id="contact"
      className="bg-neutral-950 text-neutral-400 pt-20 pb-10 border-t border-neutral-900 relative overflow-hidden"
    >
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold-950/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-neutral-900 relative z-10 text-left">
        
        {/* Column 1: Brand details & socials */}
        <div className="space-y-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-serif text-2xl tracking-[0.25em] font-medium text-white hover:text-gold-400 transition-colors inline-block focus:outline-none"
          >
            {siteData.logo}
          </a>
          <p className="font-sans text-xs font-light leading-relaxed text-neutral-500">
            Bangladesh's premiere luxury destination for bespoke hairstyling, sensory spa therapies, and advanced skin aesthetics. Elevating standards since 2014.
          </p>
          
          {/* Social icons row */}
          <div className="flex items-center gap-3">
            {socialIcons.map((soc) => (
              <motion.a
                whileHover={{ rotate: 12, scale: 1.1, backgroundColor: "rgba(184, 134, 59, 0.25)", color: "#ffffff" }}
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 transition-colors"
              >
                {soc.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Column 2: Hours */}
        <div className="space-y-6">
          <h4 className="font-sans text-[10px] tracking-[0.2em] font-bold text-white uppercase">
            Hours of Operation
          </h4>
          <div className="space-y-3.5 text-xs font-light font-sans">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gold-500 flex-shrink-0" />
              <span>{siteData.contact.hours}</span>
            </div>
            <div className="p-3 bg-neutral-900/40 rounded-xl border border-neutral-850 text-[11px] text-neutral-500 leading-normal flex gap-2">
              <ShieldAlert className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
              <span>Priority reservations are highly recommended for weekend spa slots.</span>
            </div>
          </div>
        </div>

        {/* Column 3: Contacts */}
        <div className="space-y-6">
          <h4 className="font-sans text-[10px] tracking-[0.2em] font-bold text-white uppercase">
            Concierge Desk
          </h4>
          <ul className="space-y-4 text-xs font-light font-sans">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
              <span className="leading-snug">{siteData.contact.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
              <a href={`tel:${siteData.contact.phone}`} className="hover:text-white transition-colors">
                {siteData.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
              <a href={`mailto:${siteData.contact.email}`} className="hover:text-white transition-colors">
                {siteData.contact.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Quick navigation */}
        <div className="space-y-6">
          <h4 className="font-sans text-[10px] tracking-[0.2em] font-bold text-white uppercase">
            Quick Navigation
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 font-sans text-xs font-light">
            <button
              onClick={() => handleNavigate("about")}
              className="hover:text-white transition-colors text-left cursor-pointer"
            >
              Our Vibe
            </button>
            <button
              onClick={() => handleNavigate("services")}
              className="hover:text-white transition-colors text-left cursor-pointer"
            >
              Treatments
            </button>
            <button
              onClick={() => handleNavigate("gallery")}
              className="hover:text-white transition-colors text-left cursor-pointer"
            >
              Sanctuary
            </button>
            <button
              onClick={() => handleNavigate("membership")}
              className="hover:text-white transition-colors text-left cursor-pointer"
            >
              Memberships
            </button>
            <button
              onClick={() => handleNavigate("home")}
              className="hover:text-white transition-colors text-left cursor-pointer"
            >
              Prestige
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-white transition-colors text-left cursor-pointer"
            >
              Back To Top
            </button>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-left relative z-10 font-sans text-[11px] text-neutral-600">
        <p>© {new Date().getFullYear()} {siteData.siteName}. All Rights Reserved.</p>
        <p className="flex items-center gap-1">
          Designed with absolute elegance inspired by Persona
        </p>
      </div>
    </footer>
  );
}
