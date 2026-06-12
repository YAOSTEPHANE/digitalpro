"use client";
import { useState, useEffect } from "react";
import { AlignJustify, X, MapPin, ChevronDown, Facebook } from "lucide-react";
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropDown = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  const closeDropDown = () => {
    setIsDropDownVisible(false);
  };

  const serviceSubItems = [
    { label: "Sites Web", href: "/sites-web", id: "sites" },
    { label: "Design", href: "/design", id: "design" },
    { label: "E-commerce", href: "/e-commerce", id: "ecommerce" },
    { label: "Technologies", href: "/technologies", id: "tech" },
  ];

  const navItems = [
    { label: "Services", href: "/services", id: "services", hasSubmenu: true },
    { label: "FAQ", href: "/faq", id: "faq", hasSubmenu: false },
  ];

  const quickLinks = [
    { label: "Devis", href: "/devis" },
    { label: "Rendez-vous", href: "/book" },
    { label: "Facturation", href: "/facture" },
    { label: "Retours", href: "/retours" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[rgba(81,102,153,0.28)] bg-[rgba(8,9,14,0.94)] backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
          : "border-b border-[rgba(81,102,153,0.12)] bg-[rgba(8,9,14,0.75)] backdrop-blur-xl"
      }`}
    >
      <div
        className="lux-scroll-progress"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden
      />
      <div className="hidden xl:block border-b border-[rgba(81,102,153,0.12)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2 lux-muted text-sm">
              <MapPin className="w-4 h-4 text-[var(--brand-blue-light)]" />
              <span>{siteConfig.contact.address}</span>
            </div>
            <TimeWeather />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center group relative">
              <Logo
                className="w-8 h-8 md:w-12 md:h-12 object-contain"
                width={48}
                height={48}
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  <Link
                    href={item.href}
                    className="relative px-4 py-2.5 text-sm font-medium text-[var(--lux-champagne)] hover:text-white transition-colors whitespace-nowrap rounded-lg flex items-center gap-1.5 no-underline"
                  >
                    <span className="relative z-10 border-b border-transparent group-hover:border-[var(--brand-blue-light)] transition-colors duration-300 pb-0.5">
                      {item.label}
                    </span>
                    {item.hasSubmenu && (
                      <ChevronDown className="w-4 h-4 text-[var(--brand-blue-light)] transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>

                  {item.hasSubmenu && (
                    <div className="absolute left-0 top-full pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                      <div className="min-w-[220px] rounded-2xl border border-[rgba(81,102,153,0.22)] bg-[rgba(14,16,24,0.96)] backdrop-blur-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                        {serviceSubItems.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            className="block px-3 py-2.5 rounded-lg text-sm text-[var(--lux-champagne)] hover:text-white hover:bg-[rgba(81,102,153,0.1)] transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium text-[var(--lux-muted)] hover:text-[var(--lux-champagne)] transition-colors whitespace-nowrap rounded-lg group"
                >
                  <span className="relative z-10 border-b border-transparent group-hover:border-[var(--brand-blue-light)] transition-colors duration-300 pb-0.5">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-2">
              <a
                href="https://www.facebook.com/profile.php?id=61574110564242"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Digitalpro solutions"
                className="w-10 h-10 rounded-full border border-[rgba(81,102,153,0.25)] text-[var(--lux-champagne)] hover:border-[var(--brand-blue-light)] hover:bg-[rgba(81,102,153,0.1)] transition-all flex items-center justify-center"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <Link href="/contact" className="lux-btn-primary !px-5 !py-2.5 text-sm">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <Link href="/contact" className="lux-btn-primary !px-4 !py-2 text-sm">
              Contact
            </Link>
            <button
              type="button"
              onClick={toggleDropDown}
              className="w-10 h-10 flex items-center justify-center text-[var(--lux-champagne)] border border-[rgba(81,102,153,0.25)] hover:bg-[rgba(81,102,153,0.08)] transition-colors rounded-full"
            >
              {isDropDownVisible ? <X className="w-6 h-6" /> : <AlignJustify className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

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
