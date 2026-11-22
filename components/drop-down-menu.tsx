"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Phone,
  Search,
  MessageCircle,
  Copy,
  Check,
  Globe,
  Calendar,
  FileText,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { siteConfig } from "@/lib/seo";
import {
  MAIN_NAV_LINKS,
  SECONDARY_NAV_ITEMS,
  SERVICE_NAV_ITEMS,
} from "@/lib/navigation";

interface DropDownMenuProps {
  onClose: () => void;
  scrollToServices?: () => void;
  scrollToWebsiteDesign?: () => void;
  scrollToGraphicDesign?: () => void;
  scrollToShopifyStores?: () => void;
  scrollToBrands?: () => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ onClose }) => {
  const pathname = usePathname();
  const [filterText, setFilterText] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const normalizedQuery = filterText.trim().toLowerCase();

  const filteredServices = useMemo(() => {
    if (!normalizedQuery) return SERVICE_NAV_ITEMS;
    return SERVICE_NAV_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.keywords.some((k) => k.includes(normalizedQuery))
    );
  }, [normalizedQuery]);

  const allMainPages = useMemo(
    () => [...MAIN_NAV_LINKS, ...SECONDARY_NAV_ITEMS],
    []
  );

  const filteredMain = useMemo(() => {
    if (!normalizedQuery) return allMainPages;
    return allMainPages.filter(
      (item) =>
        item.label.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.keywords.some((k) => k.includes(normalizedQuery))
    );
  }, [allMainPages, normalizedQuery]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setCopiedEmail(true);
      toast.success("Email copié dans le presse-papier !");
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      toast.error("Copie automatique impossible.");
    }
  };

  return (
    <motion.div
      className="lg:hidden fixed inset-x-0 top-16 md:top-[4.5rem] bottom-0 z-[55] overflow-y-auto border-t border-slate-200 bg-[#f7f9fc] px-4 sm:px-6 py-5 text-slate-900 shadow-[0_24px_60px_rgba(15,23,42,0.16)] custom-scrollbar"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-4xl space-y-5 pb-16">
        {/* En-tête + Barre de filtre rapide */}
        <div className="space-y-3 border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="lux-label mb-1">Navigation Studio</p>
              <h2 className="lux-heading text-2xl">Explorer Digitalpro</h2>
            </div>
            <span className="lux-glass-pill text-[11px] shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Abidjan · Disponible
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-[var(--brand-blue)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filtrer : Sites Web, E-commerce, Devis, Wave, FAQ..."
              className="w-full h-11 rounded-2xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[var(--brand-blue)] focus:ring-2 focus:ring-[rgba(81,102,153,0.16)] transition-all"
            />
            {filterText ? (
              <button
                type="button"
                onClick={() => setFilterText("")}
                aria-label="Effacer le filtre"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Actions prioritaires 1-tap */}
        {!normalizedQuery ? (
          <div className="grid grid-cols-3 gap-2.5">
            <Link
              href="/devis"
              onClick={onClose}
              className="lux-card-interactive lux-card-accent-red min-h-[44px] flex flex-col items-center justify-center gap-1.5 p-3.5 text-center"
            >
              <FileText className="w-4 h-4 text-[var(--brand-red)]" />
              <span className="text-xs font-semibold text-slate-900">Devis gratuit</span>
            </Link>
            <Link
              href="/book"
              onClick={onClose}
              className="lux-card-interactive min-h-[44px] flex flex-col items-center justify-center gap-1.5 p-3.5 text-center"
            >
              <Calendar className="w-4 h-4 text-[var(--brand-blue)]" />
              <span className="text-xs font-semibold text-slate-900">RDV 30 min</span>
            </Link>
            <Link
              href="/#nos-realisations"
              onClick={onClose}
              className="lux-card-interactive min-h-[44px] flex flex-col items-center justify-center gap-1.5 p-3.5 text-center"
            >
              <Globe className="w-4 h-4 text-[var(--brand-blue)]" />
              <span className="text-xs font-semibold text-slate-900">Réalisations</span>
            </Link>
          </div>
        ) : null}

        {/* Pôles d'expertise */}
        {filteredServices.length > 0 ? (
          <div className="lux-card-interactive p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3.5">
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
              {filteredServices.map((item) => {
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
                    <div
                      className={`p-2 shrink-0 rounded-lg border ${
                        item.accent === "red"
                          ? "lux-icon-badge lux-icon-badge-red"
                          : "lux-icon-badge"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          item.accent === "red"
                            ? "text-[var(--brand-red)]"
                            : "text-[var(--brand-blue)]"
                        }`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold text-slate-900">
                          {item.label}
                        </span>
                        {item.badge ? (
                          <span className="rounded-full bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-600 shrink-0">
                            {item.badge}
                          </span>
                        ) : null}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5 leading-snug">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Pages principales */}
        {filteredMain.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filteredMain.map((item, index) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group lux-card-interactive min-h-[44px] flex items-center justify-between p-3.5 ${
                      item.accent === "red" ? "lux-card-accent-red" : ""
                    } ${active ? "border-[var(--brand-blue)] bg-[#eef2f9]" : ""}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="lux-icon-badge p-2 shrink-0">
                        <Icon className="w-4 h-4 text-[var(--brand-blue)]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-sm font-bold text-slate-900 group-hover:text-[var(--brand-blue)] transition-colors">
                            {item.label}
                          </span>
                          {item.badge ? (
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                              {item.badge}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {active ? (
                      <span className="h-2 w-2 rounded-full bg-[var(--brand-red)] shrink-0" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 shrink-0 transition-colors" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : null}

        {filteredServices.length === 0 && filteredMain.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm font-semibold text-slate-900">
              Aucune rubrique trouvée pour &ldquo;{filterText}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => setFilterText("")}
              className="mt-3 lux-btn-ghost !px-4 !py-1.5 text-xs"
            >
              Réinitialiser la recherche
            </button>
          </div>
        ) : null}

        {/* Ligne directe studio */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-blue)] font-semibold">
              Ligne directe Studio
            </p>
            <p className="text-xs sm:text-sm text-slate-600">{siteConfig.contact.address}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="lux-btn-ghost !px-3.5 !py-2 text-xs gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
              Appeler
            </a>
            <a
              href="https://wa.me/2250748976031"
              target="_blank"
              rel="noopener noreferrer"
              className="lux-btn-ghost !px-3.5 !py-2 text-xs gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              WhatsApp
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="lux-btn-ghost !px-3.5 !py-2 text-xs gap-1.5"
            >
              {copiedEmail ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
              )}
              Email
            </button>
            <Link href="/devis" onClick={onClose} className="lux-btn-primary !px-4 !py-2 text-xs">
              Démarrer
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DropDownMenu;
