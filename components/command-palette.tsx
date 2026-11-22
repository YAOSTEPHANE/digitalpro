"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  X,
  ArrowUpRight,
  Copy,
  Phone,
  MessageCircle,
  CornerDownLeft,
  Compass,
} from "lucide-react";
import { toast } from "sonner";
import {
  HOME_ANCHOR_LINKS,
  MAIN_NAV_LINKS,
  SECONDARY_NAV_ITEMS,
  SERVICE_NAV_ITEMS,
} from "@/lib/navigation";
import { siteConfig } from "@/lib/seo";

interface CommandEntry {
  id: string;
  group: "Actions rapides" | "Pôles d'expertise" | "Pages" | "Sections Accueil";
  label: string;
  description: string;
  badge?: string;
  accent?: "blue" | "red";
  icon: typeof Search;
  keywords: string[];
  onSelect: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleGlobalKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!open);
      }
    };

    const handleCustomOpen = () => onOpenChange(true);

    window.addEventListener("keydown", handleGlobalKey);
    window.addEventListener("digitalpro:open-search", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleGlobalKey);
      window.removeEventListener("digitalpro:open-search", handleCustomOpen);
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setSelectedIndex(0);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 40);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const navigateTo = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [onOpenChange, router]
  );

  const copyText = useCallback(
    async (label: string, value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        toast.success(`${label} copié dans le presse-papier !`);
      } catch {
        toast.error("Copie automatique impossible.");
      } finally {
        onOpenChange(false);
      }
    },
    [onOpenChange]
  );

  const entries: CommandEntry[] = useMemo(() => {
    const actionEntries: CommandEntry[] = [
      {
        id: "act-whatsapp",
        group: "Actions rapides",
        label: "Discuter sur WhatsApp",
        description: "Réponse rapide avec l'équipe Digitalpro Solutions",
        badge: "Direct",
        accent: "blue",
        icon: MessageCircle,
        keywords: ["whatsapp", "chat", "message", "direct"],
        onSelect: () => {
          onOpenChange(false);
          window.open(
            "https://wa.me/2250748976031?text=Bonjour%20digitalpro%20solutions%2C%20je%20souhaite%20discuter%20d'un%20projet.",
            "_blank",
            "noopener,noreferrer"
          );
        },
      },
      {
        id: "act-call",
        group: "Actions rapides",
        label: "Appeler +225 07 48 97 60 31",
        description: "Ligne studio · Abidjan, Cocody",
        icon: Phone,
        keywords: ["appeler", "telephone", "numero", "appel"],
        onSelect: () => {
          onOpenChange(false);
          window.location.href = `tel:${siteConfig.contact.phone}`;
        },
      },
      {
        id: "act-copy-email",
        group: "Actions rapides",
        label: "Copier l'email professionnel",
        description: siteConfig.contact.email,
        icon: Copy,
        keywords: ["email", "mail", "copier", "gmail"],
        onSelect: () => void copyText("Email", siteConfig.contact.email),
      },
    ];

    const serviceEntries: CommandEntry[] = SERVICE_NAV_ITEMS.map((item) => ({
      id: item.id,
      group: "Pôles d'expertise",
      label: item.label,
      description: item.description,
      badge: item.badge,
      accent: item.accent,
      icon: item.icon,
      keywords: item.keywords,
      onSelect: () => navigateTo(item.href),
    }));

    const pageEntries: CommandEntry[] = [...SECONDARY_NAV_ITEMS, ...MAIN_NAV_LINKS].map((item) => ({
      id: item.id,
      group: "Pages",
      label: item.label,
      description: item.description,
      badge: item.badge,
      accent: item.accent,
      icon: item.icon,
      keywords: item.keywords,
      onSelect: () => navigateTo(item.href),
    }));

    const anchorEntries: CommandEntry[] = HOME_ANCHOR_LINKS.map((item) => ({
      id: item.id,
      group: "Sections Accueil",
      label: item.label,
      description: item.description,
      badge: item.badge,
      accent: item.accent,
      icon: item.icon,
      keywords: item.keywords,
      onSelect: () => navigateTo(item.href),
    }));

    return [...serviceEntries, ...pageEntries, ...anchorEntries, ...actionEntries];
  }, [copyText, navigateTo, onOpenChange]);

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (entry) =>
        entry.label.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q) ||
        entry.group.toLowerCase().includes(q) ||
        entry.keywords.some((k) => k.includes(q))
    );
  }, [entries, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      if (filteredEntries.length === 0) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredEntries.length);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredEntries.length) % filteredEntries.length);
      } else if (event.key === "Enter") {
        event.preventDefault();
        filteredEntries[selectedIndex]?.onSelect();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filteredEntries, selectedIndex, onOpenChange]);

  useEffect(() => {
    const activeEl = listRef.current?.querySelector<HTMLElement>(
      `[data-command-index="${selectedIndex}"]`
    );
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const grouped = useMemo(() => {
    const map = new Map<CommandEntry["group"], { entry: CommandEntry; flatIndex: number }[]>();
    filteredEntries.forEach((entry, flatIndex) => {
      const existing = map.get(entry.group) ?? [];
      existing.push({ entry, flatIndex });
      map.set(entry.group, existing);
    });
    return Array.from(map.entries());
  }, [filteredEntries]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-slate-900/45 px-4 pt-16 sm:pt-24 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Recherche rapide Digitalpro"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.24)]"
          >
            <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50/70 px-5 py-4">
              <Search className="h-5 w-5 text-[var(--brand-blue)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un service, réalisation, tarif, devis ou action..."
                className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-900"
                >
                  Effacer
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="Fermer la recherche"
                className="rounded-full border border-slate-200 bg-white p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={listRef}
              className="max-h-[60vh] overflow-y-auto px-3 py-3 custom-scrollbar space-y-4"
            >
              {grouped.length === 0 ? (
                <div className="py-10 text-center">
                  <Compass className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-800">
                    Aucun résultat pour &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Essayez : Sites Web, E-commerce, Devis, Wave, SEO ou WhatsApp.
                  </p>
                </div>
              ) : (
                grouped.map(([groupName, items]) => (
                  <div key={groupName}>
                    <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {groupName}
                    </p>
                    <div className="space-y-1">
                      {items.map(({ entry, flatIndex }) => {
                        const Icon = entry.icon;
                        const active = flatIndex === selectedIndex;
                        return (
                          <button
                            key={entry.id}
                            type="button"
                            data-command-index={flatIndex}
                            onMouseEnter={() => setSelectedIndex(flatIndex)}
                            onClick={entry.onSelect}
                            className={`w-full flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 text-left transition-all ${
                              active
                                ? "bg-[#eef2f9] border border-[rgba(81,102,153,0.3)]"
                                : "border border-transparent hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                                  active
                                    ? entry.accent === "red"
                                      ? "bg-[var(--brand-red)] border-[var(--brand-red)] text-white"
                                      : "bg-[var(--brand-blue)] border-[var(--brand-blue)] text-white"
                                    : "bg-slate-50 border-slate-200 text-[var(--brand-blue)]"
                                }`}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-slate-900 truncate">
                                  {entry.label}
                                </div>
                                <div className="text-xs text-slate-500 truncate">
                                  {entry.description}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {entry.badge ? (
                                <span
                                  className={`hidden sm:inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                                    entry.accent === "red"
                                      ? "bg-[rgba(204,38,40,0.1)] text-[var(--brand-red)]"
                                      : "bg-[rgba(81,102,153,0.1)] text-[var(--brand-blue)]"
                                  }`}
                                >
                                  {entry.badge}
                                </span>
                              ) : null}
                              <ArrowUpRight
                                className={`h-4 w-4 transition-transform ${
                                  active ? "text-[var(--brand-blue)] translate-x-0.5" : "text-slate-300"
                                }`}
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-50/80 px-5 py-2.5 text-[11px] text-slate-500">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-700">
                    ↑↓
                  </kbd>
                  Naviguer
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-700">
                    <CornerDownLeft className="h-2.5 w-2.5" />
                  </kbd>
                  Ouvrir
                </span>
              </div>
              <span className="inline-flex items-center gap-1">
                <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-700">
                  Esc
                </kbd>
                Fermer
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
