"use client";

import { useState, useEffect } from "react";
import {
  AlignJustify,
  X,
  MapPin,
  ChevronDown,
  Facebook,
  Globe,
  Palette,
  ShoppingBag,
  Cpu,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsDropDownVisible(false);
  }, [pathname]);

  const serviceSubItems = [
    {
      label: "Sites Web",
      description: "Vitrines haute couture & plateformes SaaS",
      href: "/sites-web",
      id: "sites",
      icon: Globe,
    },
    {
      label: "Design & UI/UX",
      description: "Identité visuelle, Figma & direction artistique",
      href: "/design",
      id: "design",
      icon: Palette,
    },
    {
      label: "E-commerce",
      description: "Boutiques Shopify & paiements locaux/Stripe",
      href: "/e-commerce",
      id: "ecommerce",
      icon: ShoppingBag,
    },
    {
      label: "Technologies",
      description: "Stack Next.js, IA, performance & sécurité",
      href: "/technologies",
      id: "tech",
      icon: Cpu,
    },
  ];

  const isServiceActive =
    pathname === "/services" ||
    serviceSubItems.some((item) => item.href === pathname);

  const quickLinks = [
    { label: "Devis", href: "/devis" },
    { label: "Rendez-vous", href: "/book" },
    { label: "Facturation", href: "/facture" },
    { label: "Retours", href: "/retours" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[rgba(81,102,153,0.18)] bg-white/95 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
          : "border-b border-[rgba(81,102,153,0.1)] bg-white/80 backdrop-blur-xl"
      }`}
    >
      <div
        className="lux-scroll-progress"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden
      />

      <div
        className={`hidden xl:block border-b border-slate-200/70 transition-all duration-300 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0 border-b-0" : "max-h-14 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2 text-slate-600 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
              <span>{siteConfig.contact.address}</span>
            </div>
            <TimeWeather />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem] gap-4">
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <Logo
              className="w-9 h-9 md:w-11 md:h-11 object-contain ring-1 ring-[rgba(81,102,153,0.22)] group-hover:ring-[var(--brand-blue)] transition-all"
              width={44}
              height={44}
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-lg md:text-xl font-bold tracking-tight text-slate-900">
                digitalpro
              </span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-[var(--brand-blue)] font-semibold mt-0.5">
                Solutions
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
            <div className="flex items-center gap-1 rounded-full border border-slate-200/90 bg-slate-50/90 px-2 py-1 backdrop-blur-md">
              <div className="relative group">
                <Link
                  href="/services"
                  className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors whitespace-nowrap rounded-full flex items-center gap-1.5 ${
                    isServiceActive
                      ? "bg-white text-[var(--brand-blue-dark)] shadow-xs font-semibold"
                      : "text-slate-700 hover:text-slate-950 hover:bg-white/70"
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[var(--brand-blue)] transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                <div className="absolute left-0 top-full pt-3 opacity-0 pointer-events-none translate-y-1 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-200">
                  <div className="w-[460px] rounded-2xl border border-slate-200 bg-white/98 backdrop-blur-2xl p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
                    <div className="grid grid-cols-2 gap-2">
                      {serviceSubItems.map((subItem) => {
                        const Icon = subItem.icon;
                        const active = pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                              active
                                ? "border-[var(--brand-blue)] bg-[#eef2f9]"
                                : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <div className="lux-icon-badge p-2 shrink-0">
                              <Icon className="w-4 h-4 text-[var(--brand-blue)]" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-900">
                                {subItem.label}
                              </div>
                              <div className="text-[11px] leading-snug text-slate-600 mt-0.5">
                                {subItem.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between px-2">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
                        Accompagnement stratégique complet
                      </span>
                      <Link
                        href="/services"
                        className="text-xs font-semibold text-[var(--brand-blue)] hover:text-slate-900 inline-flex items-center gap-1 transition-colors"
                      >
                        Tous nos services <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {quickLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 text-sm font-medium transition-all whitespace-nowrap rounded-full ${
                      active
                        ? "bg-white text-[var(--brand-blue-dark)] shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-950 hover:bg-white/70"
                    }`}
                  >
                    {link.label}
                    {active ? (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-[var(--brand-red)]" />
                    ) : null}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2 ml-1">
              <a
                href="https://www.facebook.com/profile.php?id=61574110564242"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Digitalpro solutions"
                className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] transition-all flex items-center justify-center shadow-xs"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className={`lux-btn-primary !px-5 !py-2 text-sm gap-1.5 ${
                  pathname === "/contact" ? "ring-2 ring-[var(--brand-blue)]/30" : ""
                }`}
              >
                Contact
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-2.5">
            <Link href="/devis" className="lux-btn-ghost !px-3.5 !py-2 text-xs">
              Devis
            </Link>
            <Link href="/contact" className="lux-btn-primary !px-4 !py-2 text-xs">
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setIsDropDownVisible((prev) => !prev)}
              aria-label={isDropDownVisible ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isDropDownVisible}
              className="w-10 h-10 flex items-center justify-center text-slate-800 border border-slate-200 bg-white hover:bg-slate-50 transition-colors rounded-full shadow-xs"
            >
              {isDropDownVisible ? <X className="w-5 h-5" /> : <AlignJustify className="w-5 h-5" />}
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
            onClose={() => setIsDropDownVisible(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ModernNavbar;
