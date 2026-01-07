"use client";
import { useState, useEffect } from "react";
import { AlignJustify, X, MapPin } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";
import DropDownMenu from "./drop-down-menu";
import TimeWeather from "./time-weather";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/seo";

interface NavbarProps {
  scrollToWebsiteDesign?: () => void;
  scrollToGraphicDesign?: () => void;
  scrollToShopifyStores?: () => void;
  scrollToBrands?: () => void;
  scrollToServices?: () => void;
}

const ModernNavbar = ({
  scrollToWebsiteDesign,
  scrollToGraphicDesign,
  scrollToShopifyStores,
  scrollToBrands,
  scrollToServices,
}: NavbarProps) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropDown = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  const closeDropDown = () => {
    setIsDropDownVisible(false);
  };

  const navItems = [
    { label: "Services", href: "/services", id: "services" },
    { label: "Sites Web", href: "/sites-web", id: "sites" },
    { label: "Design", href: "/design", id: "design" },
    { label: "E-commerce", href: "/e-commerce", id: "ecommerce" },
    { label: "Technologies", href: "/technologies", id: "tech" },
  ];

  const quickLinks = [
    { label: "Devis", href: "/devis" },
    { label: "Rendez-vous", href: "/book" },
    { label: "Facturation", href: "/facture" },
    { label: "Site IA", href: "/ia-site" },
    { label: "Retours", href: "/retours" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 border-b border-neutral-800"
          : "bg-black/90"
      }`}
    >
      {/* Barre supérieure : Localisation, Heure et Météo */}
      <div className="hidden xl:block border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            {/* Localisation */}
            <div className="flex items-center gap-2 text-white/80 text-base">
              <MapPin className="w-5 h-5 text-white/60" />
              <span>{siteConfig.contact.address}</span>
            </div>
            
            {/* Heure et Météo */}
            <TimeWeather />
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              href="/"
              className="flex items-center group relative"
            >
              <Logo 
                className="w-8 h-8 md:w-12 md:h-12 object-contain"
                width={48}
                height={48}
              />
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
            {/* Navigation principale */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="relative px-4 py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors whitespace-nowrap rounded-lg group no-underline focus:outline-none focus:ring-0"
                >
                  <span className="relative z-10 border-b-2 border-transparent hover:border-blue-500 transition-colors duration-300 pb-0.5">
                    {item.label}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Link>
              ))}
            </div>

            {/* Liens rapides */}
            <div className="flex items-center gap-2">
              {quickLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors whitespace-nowrap rounded-lg group no-underline focus:outline-none focus:ring-0"
                >
                  <span className="relative z-10 border-b-2 border-transparent hover:border-blue-500 transition-colors duration-300 pb-0.5">
                    {link.label}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Link>
              ))}
            </div>

            {/* Bouton Contact */}
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm hover:from-violet-700 hover:to-cyan-700 transition-all whitespace-nowrap ml-2 rounded-lg no-underline focus:outline-none focus:ring-0"
            >
              Contact
            </Link>
          </div>

          {/* Menu Mobile */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href="/contact"
              className="px-4 py-2 bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-medium text-sm hover:from-violet-700 hover:to-cyan-700 transition-all rounded-lg"
            >
              Contact
            </Link>
            <button
              onClick={toggleDropDown}
              className="w-10 h-10 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
            >
              {isDropDownVisible ? (
                <X className="w-6 h-6" />
              ) : (
                <AlignJustify className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu déroulant mobile */}
      <AnimatePresence>
        {isDropDownVisible && (
          <DropDownMenu 
            scrollToServices={scrollToServices}
            scrollToWebsiteDesign={scrollToWebsiteDesign}
            scrollToGraphicDesign={scrollToGraphicDesign}
            scrollToShopifyStores={scrollToShopifyStores}
            scrollToBrands={scrollToBrands}
            onClose={closeDropDown}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ModernNavbar;
