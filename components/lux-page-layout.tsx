"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import ModernNavbar from "@/components/modern-navbar";
import StarsBackground from "@/components/stars-background";

type LuxPageLayoutProps = {
  readonly children: ReactNode;
  readonly maxWidth?: "5xl" | "7xl";
  readonly className?: string;
  readonly breadcrumb?: string;
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
}: LuxPageLayoutProps) {
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

  return (
    <div className={`lux-page-shell w-full min-h-screen relative overflow-hidden ${className}`}>
      <StarsBackground />
      <ModernNavbar />
      <main
        className={`mx-auto relative z-10 w-full px-4 md:px-6 pt-28 xl:pt-36 pb-20 ${maxWidthClass[maxWidth]}`}
      >
        {breadcrumb ? (
          <nav
            aria-label="Fil d'Ariane"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(81,102,153,0.18)] bg-white/85 px-3.5 py-1.5 text-xs text-slate-600 shadow-xs backdrop-blur-md"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-[var(--brand-blue)] transition-colors"
            >
              <Home className="h-3.5 w-3.5 text-[var(--brand-blue)]" />
              <span>Accueil</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <span className="text-slate-900 font-semibold">{breadcrumb}</span>
          </nav>
        ) : null}
        {children}
      </main>
    </div>
  );
}
