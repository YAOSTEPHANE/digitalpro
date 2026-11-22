"use client";

import { useState, useEffect, useRef } from "react";
import {
  AlignJustify,
  X,
  MapPin,
  ChevronDown,
  Facebook,
  ArrowUpRight,
  Sparkles,
  Search,
  Globe,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import DropDownMenu from "./drop-down-menu";
import TimeWeather from "./time-weather";
import CommandPalette from "./command-palette";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/seo";
import { MAIN_NAV_LINKS, SERVICE_NAV_ITEMS } from "@/lib/navigation";

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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const servicesWrapRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    setIsServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isDropDownVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropDownVisible(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropDownVisible]);

  useEffect(() => {
    if (!isServicesOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        servicesWrapRef.current &&
        !servicesWrapRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isServicesOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openServicesMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const scheduleCloseServicesMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  const isServiceActive =
    pathname === "/services" ||
    SERVICE_NAV_ITEMS.some((item) => item.href === pathname);

  const quickLinks = MAIN_NAV_LINKS.filter((item) => item.id !== "services");

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "border-b border-[rgba(81,102,153,0.18)] bg-white/95 backdrop-blur-2xl shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
          : "border-b border-[rgba(81,102,153,0.1)] bg-white/85 backdrop-blur-xl"
          }`}
      >
        <div
          className="lux-scroll-progress"
          style={{ width: `${scrollProgress * 100}%` }}
          aria-hidden
        />

        {/* Barre supérieure d'informations studio (desktop XL) */}
        <div
          className={`hidden xl:block border-b border-slate-200/70 transition-all duration-300 overflow-hidden ${scrolled ? "max-h-0 opacity-0 border-b-0" : "max-h-14 opacity-100"
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4 text-slate-600 text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
                  <span>{siteConfig.contact.address}</span>
                </span>
                <span className="h-3 w-px bg-slate-200" aria-hidden />
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Réponse sous 2h · Projets sur mesure
                </span>
              </div>
              <TimeWeather />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[4.5rem] gap-3">
            {/* Marque */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0"
            >
              <Logo
                className="w-9 h-9 md:w-11 md:h-11 object-contain ring-1 ring-[rgba(81,102,153,0.22)] group-hover:ring-[var(--brand-blue)] transition-all"
                width={44}
                height={44}
              />
              <div className="flex flex-col leading-none">
                <span className="font-display text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-slate-900">
                  digitalpro
                </span>
                <span className="text-[9px] uppercase tracking-[0.24em] text-[var(--brand-blue)] font-semibold mt-0.5">
                  Solutions
                </span>
              </div>
            </Link>

            {/* Navigation Desktop */}
            <div className="hidden lg:flex items-center gap-2.5 flex-1 justify-end">
              <div className="flex items-center gap-1 rounded-full border border-slate-200/90 bg-slate-50/90 px-1.5 py-1 backdrop-blur-md">
                {/* Services + Mega-Menu cliquable et accessible */}
                <div
                  ref={servicesWrapRef}
                  className="relative"
                  onMouseEnter={openServicesMenu}
                  onMouseLeave={scheduleCloseServicesMenu}
                >
                  <div
                    className={`relative flex items-center rounded-full transition-colors ${isServiceActive || isServicesOpen
                      ? "bg-white text-[var(--brand-blue-dark)] shadow-xs font-semibold"
                      : "text-slate-700 hover:text-slate-950 hover:bg-white/70"
                      }`}
                  >
                    <Link
                      href="/services"
                      className="pl-3.5 pr-1 py-1.5 text-sm font-medium whitespace-nowrap"
                    >
                      Services
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen((prev) => !prev)}
                      aria-expanded={isServicesOpen}
                      aria-label="Afficher le sous-menu Services"
                      className="pr-2.5 pl-0.5 py-1.5 text-[var(--brand-blue)] rounded-r-full"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isServicesOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-full pt-3 z-50"
                      >
                        <div className="w-[650px] rounded-3xl border border-slate-200 bg-white/98 backdrop-blur-2xl p-5 shadow-[0_28px_70px_rgba(15,23,42,0.16)]">
                          <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-7 grid grid-cols-1 gap-2">
                              {SERVICE_NAV_ITEMS.map((subItem) => {
                                const Icon = subItem.icon;
                                const active = pathname === subItem.href;
                                return (
                                  <Link
                                    key={subItem.id}
                                    href={subItem.href}
                                    onClick={() => setIsServicesOpen(false)}
                                    className={`group flex items-start justify-between gap-3 p-3 rounded-2xl border transition-all ${active
                                      ? "border-[var(--brand-blue)] bg-[#eef2f9]"
                                      : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                                      }`}
                                  >
                                    <div className="flex items-start gap-3">
                                      <div
                                        className={`p-2 rounded-xl border shrink-0 ${subItem.accent === "red"
                                          ? "lux-icon-badge lux-icon-badge-red"
                                          : "lux-icon-badge"
                                          }`}
                                      >
                                        <Icon
                                          className={`w-4 h-4 ${subItem.accent === "red"
                                            ? "text-[var(--brand-red)]"
                                            : "text-[var(--brand-blue)]"
                                            }`}
                                        />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <span className="font-display text-sm font-bold text-slate-900">
                                            {subItem.label}
                                          </span>
                                          {subItem.badge ? (
                                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                                              {subItem.badge}
                                            </span>
                                          ) : null}
                                        </div>
                                        <div className="text-xs leading-snug text-slate-600 mt-0.5">
                                          {subItem.description}
                                        </div>
                                      </div>
                                    </div>
                                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[var(--brand-blue)] shrink-0 mt-1 transition-colors" />
                                  </Link>
                                );
                              })}
                            </div>

                            <div className="col-span-5 flex flex-col justify-between rounded-2xl border border-slate-200 bg-gradient-to-br from-[#f8faff] to-[#eef2f9] p-5">
                              <div>
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-blue)] border border-slate-200 mb-3">
                                  <Sparkles className="w-3 h-3 text-[var(--brand-red)]" />
                                  Studio Express
                                </div>
                                <h3 className="font-display text-lg font-bold text-slate-900 leading-snug">
                                  Chiffrez votre projet en 30 secondes
                                </h3>
                                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                  Parcourez nos 9 plateformes en production ou planifiez un point de 30 min offert.
                                </p>
                              </div>

                              <div className="space-y-2.5 mt-4">
                                <Link
                                  href="/#nos-realisations"
                                  onClick={() => setIsServicesOpen(false)}
                                  className="lux-btn-primary w-full !py-2 !px-3 text-xs gap-1.5"
                                >
                                  <Globe className="w-3.5 h-3.5" />
                                  Voir nos réalisations
                                </Link>
                                <Link
                                  href="/book"
                                  onClick={() => setIsServicesOpen(false)}
                                  className="lux-btn-ghost w-full !py-2 !px-3 text-xs gap-1.5"
                                >
                                  <Calendar className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
                                  Réserver 30 min
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between px-2">
                            <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
                              Architecture, UI/UX &amp; acquisition sur mesure
                            </span>
                            <Link
                              href="/services"
                              onClick={() => setIsServicesOpen(false)}
                              className="text-xs font-semibold text-[var(--brand-blue)] hover:text-slate-900 inline-flex items-center gap-1 transition-colors"
                            >
                              Tous nos services <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                {quickLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors whitespace-nowrap rounded-full ${active
                        ? "text-[var(--brand-blue-dark)] font-semibold"
                        : "text-slate-600 hover:text-slate-950"
                        }`}
                    >
                      {active ? (
                        <motion.span
                          layoutId="navbar-active-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-white shadow-xs border border-slate-200/70"
                        />
                      ) : null}
                      <span className="relative z-10">{link.label}</span>
                      {active ? (
                        <span
                          aria-hidden
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 h-1 w-1 rounded-full bg-[var(--brand-red)]"
                        />
                      ) : null}
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 ml-1">
                <button
                  type="button"
                  onClick={() => setIsCommandOpen(true)}
                  aria-label="Recherche rapide (Ctrl+K)"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 hover:border-[var(--brand-blue)] hover:text-slate-900 transition-all shadow-xs"
                >
                  <Search className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
                  <span className="hidden xl:inline text-[11px] font-medium">Rechercher</span>
                  <kbd className="hidden xl:inline-flex items-center rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
                    ⌘K
                  </kbd>
                </button>

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
                  className={`lux-btn-primary !px-5 !py-2 text-sm gap-1.5 ${pathname === "/contact" ? "ring-2 ring-[var(--brand-blue)]/30" : ""
                    }`}
                >
                  Contact
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Actions Mobile & Tablette */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsDropDownVisible(false);
                  setIsCommandOpen(true);
                }}
                aria-label="Rechercher sur le site"
                className="w-9 h-9 flex items-center justify-center text-slate-700 border border-slate-200 bg-white hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] transition-colors rounded-full shadow-xs"
              >
                <Search className="w-4 h-4" />
              </button>
              <Link
                href="/devis"
                className="hidden sm:inline-flex lux-btn-ghost !px-3.5 !py-2 text-xs"
              >
                Devis
              </Link>
              <Link href="/contact" className="lux-btn-primary !px-3.5 !py-2 text-xs">
                Contact
              </Link>
              <button
                type="button"
                onClick={() => setIsDropDownVisible((prev) => !prev)}
                aria-label={isDropDownVisible ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isDropDownVisible}
                className={`h-9 px-3 flex items-center gap-1.5 border transition-colors rounded-full shadow-xs text-xs font-semibold ${isDropDownVisible
                  ? "border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white"
                  : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                  }`}
              >
                {isDropDownVisible ? (
                  <>
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">Fermer</span>
                  </>
                ) : (
                  <>
                    <AlignJustify className="w-4 h-4" />
                    <span className="hidden sm:inline">Menu</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

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

      <CommandPalette open={isCommandOpen} onOpenChange={setIsCommandOpen} />
    </>
  );
};

export default ModernNavbar;
