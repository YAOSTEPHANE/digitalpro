"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUp,
  Music2,
  Copy,
  Check,
  ExternalLink,
  X,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { siteVersionLabel } from "@/lib/version";

type LegalModalType = "mentions" | "confidentialite" | "cgv" | null;

const LEGAL_CONTENT: Record<
  Exclude<LegalModalType, null>,
  { title: string; subtitle: string; sections: { heading: string; body: string }[] }
> = {
  mentions: {
    title: "Mentions légales",
    subtitle: "Informations réglementaires · Digitalpro Solutions",
    sections: [
      {
        heading: "Éditeur du site",
        body: "digitalpro solutions — Agence d'intelligence numérique et de développement web basée au Boulevard Koffi Gadaud, Cocody, Abidjan, Côte d'Ivoire.",
      },
      {
        heading: "Contact officiel",
        body: "Email : digitalprosolutions27@gmail.com · Téléphone : +225 07 48 97 60 31. Direction de publication : Digitalpro Solutions.",
      },
      {
        heading: "Propriété intellectuelle",
        body: "L'ensemble des créations visuelles, interfaces, maquettes, textes et architectures présentés sur ce site sont la propriété exclusive de digitalpro solutions.",
      },
    ],
  },
  confidentialite: {
    title: "Politique de confidentialité",
    subtitle: "Protection & usage responsable de vos données",
    sections: [
      {
        heading: "Collecte des données",
        body: "Les informations recueillies via nos formulaires (contact, devis, rendez-vous, retours clients) servent uniquement à l'étude et au suivi de votre projet digital.",
      },
      {
        heading: "Confidentialité & sécurité",
        body: "Aucune donnée n'est vendue ou transmise à des tiers commerciaux. Vos échanges restent strictement confidentiels entre vous et notre équipe.",
      },
      {
        heading: "Vos droits",
        body: "Vous pouvez demander l'accès, la rectification ou la suppression de vos coordonnées à tout moment par email à digitalprosolutions27@gmail.com.",
      },
    ],
  },
  cgv: {
    title: "Conditions Générales de Prestation",
    subtitle: "Cadre de collaboration & livrables",
    sections: [
      {
        heading: "Devis & démarrage",
        body: "Chaque mission fait l'objet d'un devis détaillé précisant le périmètre, les jalons de livraison et les modalités d'acompte avant lancement.",
      },
      {
        heading: "Validation & révisions",
        body: "Nos livrables incluent des phases de validation collaborative afin de garantir une adéquation totale avec votre image de marque et vos objectifs.",
      },
      {
        heading: "Propriété & support",
        body: "À règlement complet, vous disposez des droits d'exploitation convenus sur votre plateforme, avec possibilité d'un suivi évolutif et maintenance dédiée.",
      },
    ],
  },
};

export default function ModernFooter() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(null);
  const [activeLegal, setActiveLegal] = useState<LegalModalType>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 450);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!activeLegal) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveLegal(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [activeLegal]);

  const copyValue = async (type: "email" | "phone", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(type);
      toast.success(type === "email" ? "Email copié !" : "Numéro copié !");
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error("Impossible de copier automatiquement.");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/profile.php?id=61574110564242",
      label: "Facebook",
      hoverClass: "hover:border-[#1877F2] hover:bg-[#1877F2]/10 hover:text-[#1877F2]",
    },
    {
      icon: Music2,
      href: "https://www.tiktok.com/@digitalprosolutions1?lang=fr",
      label: "TikTok",
      hoverClass: "hover:border-slate-900 hover:bg-slate-900/5 hover:text-slate-900",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/digitalpro_solutions1/",
      label: "Instagram",
      hoverClass: "hover:border-[#E4405F] hover:bg-[#E4405F]/10 hover:text-[#E4405F]",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/111682979/",
      label: "LinkedIn",
      hoverClass: "hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]",
    },
  ];

  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  return (
    <>
      <footer className="relative w-full border-t border-slate-200/90 bg-gradient-to-b from-[#f1f5f9] to-[#e9eef7] overflow-hidden">
        <div className="lux-divider" />

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
          {/* Bandeau d'appel rapide */}
          <div className="mb-12 lux-section-dark-cta !p-6 md:!p-9">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-sky-300 mb-2">
                  Collaboration sur mesure
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white">
                  Un projet digital ambitieux à Abidjan ou à l&apos;international ?
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link href="/book" className="lux-btn-dark-ghost !px-5 !py-2.5 text-sm">
                  Réserver 30 min
                </Link>
                <Link href="/devis" className="lux-btn-light !px-5 !py-2.5 text-sm gap-2">
                  Demander un devis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Colonne 1 : Logo et Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <Link href="/" className="flex items-center gap-3 group w-fit">
                <Logo
                  className="w-14 h-14 ring-1 ring-[rgba(81,102,153,0.25)] group-hover:scale-105 transition-transform"
                  width={56}
                  height={56}
                />
                <div>
                  <span className="font-display text-xl font-bold lux-gradient-text block">
                    digitalpro solutions
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--brand-blue)] font-semibold">
                    Studio Digital · Abidjan
                  </span>
                </div>
              </Link>
              <p className="text-slate-600 text-sm leading-relaxed">
                Agence d&apos;intelligence numérique spécialisée en SEO, UI/UX, e-commerce et
                développement web haute performance. Des solutions sur mesure conçues pour convertir.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-[var(--brand-blue)] font-medium shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Réponse garantie sous 24h ouvrées</span>
              </div>
            </motion.div>

            {/* Colonne 2 : Services */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <h3 className="text-slate-900 font-bold tracking-tight mb-4 text-lg font-display">
                Services
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/services"
                    className="text-slate-900 hover:text-[var(--brand-blue)] transition-colors text-sm font-semibold flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-red)]" />
                    Vue d&apos;ensemble
                  </Link>
                </li>
                {[
                  { name: "Sites Web", href: "/sites-web" },
                  { name: "Design & UI/UX", href: "/design" },
                  { name: "E-commerce", href: "/e-commerce" },
                  { name: "Technologies", href: "/technologies" },
                ].map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="pl-3.5 text-slate-600 hover:text-[var(--brand-blue)] transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-[var(--brand-blue)] group-hover:w-3 transition-all duration-300" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Colonne 3 : Liens Utiles */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              <h3 className="text-slate-900 font-bold tracking-tight mb-4 text-lg font-display">
                Liens Utiles
              </h3>
              <ul className="space-y-2.5">
                {[
                  { name: "Accueil", href: "/" },
                  { name: "À propos de nous", href: "/a-propos" },
                  { name: "Demander un devis", href: "/devis" },
                  { name: "Prendre rendez-vous", href: "/book" },
                  { name: "Tarifs & Facturation", href: "/facture" },
                  { name: "Retours Clients", href: "/retours" },
                  { name: "FAQ", href: "/faq" },
                  { name: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-600 hover:text-[var(--brand-blue)] transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-[var(--brand-blue)] group-hover:w-3 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent("digitalpro:open-search"))}
                    className="text-slate-600 hover:text-[var(--brand-blue)] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[var(--brand-blue)] group-hover:w-3 transition-all duration-300" />
                    Recherche rapide (⌘K)
                  </button>
                </li>
              </ul>
            </motion.div>

            {/* Colonne 4 : Contact */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
            >
              <h3 className="text-slate-900 font-bold tracking-tight mb-4 text-lg font-display">
                Contact direct
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs sm:text-[13px] shadow-2xs">
                  <a
                    href="mailto:digitalprosolutions27@gmail.com"
                    className="flex items-center gap-2 text-slate-700 hover:text-[var(--brand-blue)] transition-colors truncate"
                  >
                    <Mail className="w-4 h-4 text-[var(--brand-blue)] shrink-0" />
                    <span className="truncate">digitalprosolutions27@gmail.com</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => copyValue("email", "digitalprosolutions27@gmail.com")}
                    className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors shrink-0"
                    aria-label="Copier l'email"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </li>
                <li className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs sm:text-[13px] shadow-2xs">
                  <a
                    href="tel:+2250748976031"
                    className="flex items-center gap-2 text-slate-700 hover:text-[var(--brand-blue)] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[var(--brand-blue)] shrink-0" />
                    <span>+225 07 48 97 60 31</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => copyValue("phone", "+2250748976031")}
                    className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors shrink-0"
                    aria-label="Copier le numéro"
                  >
                    {copiedField === "phone" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </li>
                <li className="flex items-start gap-2.5 text-slate-600 text-xs sm:text-[13px] px-1 pt-1">
                  <MapPin className="w-4 h-4 text-[var(--brand-red)] mt-0.5 shrink-0" />
                  <span>
                    Bvd Koffi Gadaud, Cocody
                    <br />
                    Abidjan, Côte d&apos;Ivoire
                  </span>
                </li>
              </ul>

              <div className="mt-6">
                <h4 className="text-slate-900 font-semibold mb-3 text-xs uppercase tracking-[0.2em]">
                  Réseaux
                </h4>
                <div className="flex gap-2.5">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.94 }}
                        className={`w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 shadow-2xs transition-all ${social.hoverClass}`}
                        aria-label={social.label}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section Carte */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 pt-8 border-t border-slate-200/80"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-slate-900 font-semibold text-lg font-display">
                  Notre Studio à Abidjan
                </h3>
                <p className="text-slate-600 text-xs flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
                  Boulevard Koffi Gadaud, Cocody, Abidjan, Côte d&apos;Ivoire
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=5.3603,-4.0269"
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-ghost !px-4 !py-2 text-xs gap-1.5 w-fit"
              >
                Ouvrir dans Google Maps
                <ExternalLink className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
              </a>
            </div>
            <div className="relative w-full h-56 md:h-64 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.5!2d-4.0269!3d5.3603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjEnMzcuMSJOIDTCsDAxJzM2LjgiVw!5e0!3m2!1sfr!2sci!4v1234567890123!5m2!1sfr!2sci"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Localisation digitalpro solutions - Bvd Koffi Gadaud, Cocody, Abidjan"
              />
            </div>
          </motion.div>

          {/* Bas de page */}
          <div className="border-t border-slate-200/80 mt-10 pt-7">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left flex flex-wrap items-center justify-center md:justify-start gap-3">
                <p className="text-slate-600 text-xs">
                  © {currentYear} digitalpro solutions. Tous droits réservés.
                </p>
                <span className="lux-version-badge" title="Design system">
                  {siteVersionLabel}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-5 text-xs">
                {[
                  { id: "mentions" as const, label: "Mentions légales" },
                  { id: "confidentialite" as const, label: "Politique de confidentialité" },
                  { id: "cgv" as const, label: "CGV" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveLegal(item.id)}
                    className="text-slate-600 hover:text-[var(--brand-blue)] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bouton scroll to top avec anneau de progression */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              onClick={scrollToTop}
              className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-[0_10px_28px_rgba(15,23,42,0.12)] backdrop-blur-xl hover:scale-105 transition-transform z-40"
              aria-label="Retour en haut"
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48" aria-hidden>
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  fill="none"
                  stroke="rgba(81,102,153,0.16)"
                  strokeWidth="2"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  fill="none"
                  stroke="var(--brand-blue)"
                  strokeWidth="2"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - scrollProgress)}
                  strokeLinecap="round"
                />
              </svg>
              <ArrowUp className="w-4 h-4 relative z-10" />
            </motion.button>
          )}
        </AnimatePresence>
      </footer>

      {/* Modal Mentions / Confidentialité / CGV */}
      <AnimatePresence>
        {activeLegal ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/45 backdrop-blur-sm p-4"
            onClick={() => setActiveLegal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-[0_28px_70px_rgba(15,23,42,0.2)]"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="lux-label mb-1">Informations légales</p>
                  <h3 className="lux-heading text-2xl">{LEGAL_CONTENT[activeLegal].title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{LEGAL_CONTENT[activeLegal].subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveLegal(null)}
                  className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-slate-900 transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {LEGAL_CONTENT[activeLegal].sections.map((section) => (
                  <div
                    key={section.heading}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <h4 className="text-sm font-semibold text-slate-900 mb-1">
                      {section.heading}
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-600">{section.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveLegal(null)}
                  className="lux-btn-primary !px-5 !py-2 text-xs"
                >
                  Compris
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
