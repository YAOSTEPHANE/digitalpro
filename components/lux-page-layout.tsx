"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronRight, Home, Search } from "lucide-react";
import ModernNavbar from "@/components/modern-navbar";
import StarsBackground from "@/components/stars-background";
import { getSuggestedNextLinks } from "@/lib/navigation";

type LuxPageLayoutProps = {
  readonly children: ReactNode;
  readonly maxWidth?: "5xl" | "7xl";
  readonly className?: string;
  readonly breadcrumb?: string;
  readonly hideSuggestions?: boolean;
};

const maxWidthClass = {
  "5xl": "max-w-5xl",
  "7xl": "max-w-7xl",
} as const;

export default function LuxPageLayout({
  children,
  maxWidth = "7xl",
  className = "",
  breadcrumb,
  hideSuggestions = false,
}: LuxPageLayoutProps) {
  const pathname = usePathname();

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const card = target?.closest<HTMLElement>(".lux-card-interactive");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const suggestions = !hideSuggestions ? getSuggestedNextLinks(pathname) : [];

  return (
    <div className={`lux-page-shell w-full min-h-screen relative overflow-hidden ${className}`}>
      <StarsBackground />
      <ModernNavbar />
      <main
        id="main-content"
        className={`mx-auto relative z-10 w-full px-4 md:px-6 pt-24 sm:pt-28 xl:pt-36 pb-20 ${maxWidthClass[maxWidth]}`}
      >
        {breadcrumb ? (
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <nav
              aria-label="Fil d'Ariane"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(81,102,153,0.18)] bg-white/92 px-3.5 py-1.5 text-xs text-slate-600 shadow-xs backdrop-blur-md"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 font-medium hover:text-[var(--brand-blue)] transition-colors"
              >
                <Home className="h-3.5 w-3.5 text-[var(--brand-blue)]" />
                <span>Accueil</span>
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-55" />
              <span className="text-slate-900 font-semibold">{breadcrumb}</span>
            </nav>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("digitalpro:open-search"))}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/92 px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:border-[var(--brand-blue)] hover:text-slate-900 transition-colors shadow-xs backdrop-blur-md"
            >
              <Search className="h-3.5 w-3.5 text-[var(--brand-blue)]" />
              <span>Accès rapide</span>
              <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
                ⌘K
              </kbd>
            </button>
          </div>
        ) : null}

        {children}

        {suggestions.length > 0 ? (
          <section
            aria-label="Continuer l'exploration"
            className="mt-16 pt-12 border-t border-slate-200/80"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <p className="lux-label mb-1.5">Parcours recommandé</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                  Continuer l&apos;exploration
                </h2>
              </div>
              <Link
                href="/services"
                className="text-xs font-semibold text-[var(--brand-blue)] hover:text-slate-900 inline-flex items-center gap-1 transition-colors group w-fit"
              >
                Tous les services
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suggestions.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`group lux-card-interactive p-5 flex items-start justify-between gap-3 ${
                      item.accent === "red" ? "lux-card-accent-red" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2.5 rounded-xl border shrink-0 ${
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
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display text-base font-bold text-slate-900 group-hover:text-[var(--brand-blue)] transition-colors">
                            {item.label}
                          </span>
                          {item.badge ? (
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                              {item.badge}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[var(--brand-blue)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1 transition-all" />
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
