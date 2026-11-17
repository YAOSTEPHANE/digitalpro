"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Layers,
  Globe,
  Palette,
  ShoppingBag,
  Cpu,
  FileSpreadsheet,
  Calendar,
  Receipt,
  MessageSquareHeart,
  HelpCircle,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { siteConfig } from "@/lib/seo";

interface DropDownMenuProps {
  scrollToServices?: () => void;
  scrollToWebsiteDesign?: () => void;
  scrollToGraphicDesign?: () => void;
  scrollToShopifyStores?: () => void;
  scrollToBrands?: () => void;
  onClose?: () => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ onClose }) => {
  const pathname = usePathname();

  const serviceSubItems = [
    {
      label: "Sites Web",
      desc: "Vitrines & plateformes sur mesure",
      href: "/sites-web",
      icon: Globe,
    },
    {
      label: "Design & UI/UX",
      desc: "Identité visuelle & interfaces",
      href: "/design",
      icon: Palette,
    },
    {
      label: "E-commerce",
      desc: "Boutiques Shopify & paiements",
      href: "/e-commerce",
      icon: ShoppingBag,
    },
    {
      label: "Technologies",
      desc: "Stack moderne & haute performance",
      href: "/technologies",
      icon: Cpu,
    },
  ];

  const mainLinks = [
    { label: "Accueil", href: "/", icon: Home },
    { label: "Tous les Services", href: "/services", icon: Layers },
    { label: "Demander un Devis", href: "/devis", icon: FileSpreadsheet },
    { label: "Prendre Rendez-vous", href: "/book", icon: Calendar },
    { label: "Tarifs & Facturation", href: "/facture", icon: Receipt },
    { label: "Retours Clients", href: "/retours", icon: MessageSquareHeart },
    { label: "FAQ", href: "/faq", icon: HelpCircle },
    { label: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <motion.div
      className="fixed inset-x-0 top-16 md:top-[4.5rem] bottom-0 z-50 overflow-y-auto border-t border-slate-200 bg-[#f7f9fc]/98 px-5 py-8 text-slate-900 backdrop-blur-2xl custom-scrollbar"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-4xl space-y-6 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="lux-label mb-1">Navigation</p>
            <h2 className="lux-heading text-2xl">Explorer Digitalpro</h2>
          </div>
          <span className="lux-glass-pill text-[11px]">Abidjan · Cocody</span>
        </div>

        <div className="lux-card-interactive p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-slate-900">
              Pôles d&apos;expertise
            </h3>
            <Link
              href="/services"
              onClick={onClose}
              className="text-xs font-semibold text-[var(--brand-blue)] inline-flex items-center gap-1"
            >
              Vue d&apos;ensemble <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {serviceSubItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-start gap-3 rounded-xl border p-3.5 transition-all ${
                    active
                      ? "border-[var(--brand-blue)] bg-[#eef2f9]"
                      : "border-slate-200 bg-slate-50/70 hover:border-[var(--brand-blue)] hover:bg-white"
                  }`}
                >
                  <div className="lux-icon-badge p-2 shrink-0">
                    <Icon className="w-4 h-4 text-[var(--brand-blue)]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">{item.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mainLinks.map((item, index) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`group lux-card-interactive flex items-center justify-between p-4 ${
                    active ? "border-[var(--brand-blue)] bg-[#eef2f9]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="lux-icon-badge p-2">
                      <Icon className="w-4 h-4 text-[var(--brand-blue)]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900 group-hover:text-[var(--brand-blue)] transition-colors">
                      {item.label}
                    </span>
                  </div>
                  {active ? (
                    <span className="h-2 w-2 rounded-full bg-[var(--brand-red)]" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-blue)] font-semibold">
              Ligne directe
            </p>
            <p className="text-sm text-slate-600">{siteConfig.contact.address}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="tel:+2250748976031"
              className="lux-btn-ghost !px-4 !py-2 text-xs gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
              +225 07 48 97 60 31
            </a>
            <Link href="/devis" onClick={onClose} className="lux-btn-primary !px-4 !py-2 text-xs">
              Démarrer un projet
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DropDownMenu;
