"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ExternalLink,
  MonitorPlay,
  Sparkles,
  Monitor,
  Tablet,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

type ViewportMode = "desktop" | "tablet" | "mobile";

type DemoIframeProps = {
  readonly url: string;
  readonly title: string;
  readonly poster: string;
  readonly posterAlt: string;
  readonly envHint: string;
  readonly embedAllowed?: boolean;
  readonly showViewportControls?: boolean;
  readonly className?: string;
};

const VIEWPORT_WIDTHS: Record<ViewportMode, string> = {
  desktop: "w-full",
  tablet: "w-full max-w-[768px] mx-auto border-x border-slate-200",
  mobile: "w-full max-w-[390px] mx-auto border-x border-slate-200",
};

export default function DemoIframe({
  url,
  title,
  poster,
  posterAlt,
  envHint,
  embedAllowed = true,
  showViewportControls = false,
  className = "h-[420px] md:h-[480px]",
}: DemoIframeProps) {
  const [loaded, setLoaded] = useState(false);
  const [showLiveEmbed, setShowLiveEmbed] = useState(embedAllowed);
  const [viewport, setViewport] = useState<ViewportMode>("desktop");

  if (!url) {
    return (
      <div className={`lux-browser-frame flex flex-col ${className}`}>
        <BrowserChrome title="Démo indisponible" />
        <UnavailablePoster poster={poster} posterAlt={posterAlt} envHint={envHint} />
      </div>
    );
  }

  if (!showLiveEmbed) {
    return (
      <div className={`lux-browser-frame flex flex-col ${className}`}>
        <BrowserChrome title={title} live />
        <div className="relative flex-1 min-h-0 overflow-hidden bg-slate-50">
          <Image
            src={poster}
            alt={posterAlt}
            fill
            unoptimized
            className="object-cover object-top opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-slate-50/75" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(81,102,153,0.25)] bg-white px-4 py-1.5 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[var(--brand-blue)]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                Application en production
              </span>
            </div>

            <h4 className="font-display text-xl md:text-2xl font-semibold text-slate-900 mb-2">
              {title}
            </h4>
            <p className="max-w-sm text-sm leading-relaxed text-slate-600">
              Pour garantir une expérience fluide et sécurisée, cette plateforme s&apos;explore dans
              un onglet dédié.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-primary inline-flex items-center gap-2 !px-5 !py-2.5 text-sm"
              >
                <MonitorPlay className="h-4 w-4" />
                Explorer l&apos;application live
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              {embedAllowed ? (
                <button
                  type="button"
                  onClick={() => setShowLiveEmbed(true)}
                  className="lux-btn-ghost !px-5 !py-2.5 text-sm"
                >
                  Charger ici
                </button>
              ) : null}
            </div>

            {!embedAllowed ? (
              <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-blue)]" />
                Protection de domaine active (frame-ancestors)
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`lux-browser-frame flex flex-col ${className}`}>
      <BrowserChrome
        title={title}
        live
        onBack={embedAllowed ? () => setShowLiveEmbed(false) : undefined}
        viewport={showViewportControls ? viewport : undefined}
        onViewportChange={showViewportControls ? setViewport : undefined}
      />
      <div className="relative flex-1 min-h-0 bg-slate-100 overflow-hidden flex justify-center">
        <div className={`relative h-full transition-all duration-300 ${VIEWPORT_WIDTHS[viewport]}`}>
          {!loaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-50/95">
              <Image
                src={poster}
                alt=""
                fill
                unoptimized
                aria-hidden
                className="object-cover object-top opacity-10"
              />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="h-8 w-8 rounded-full border-2 border-[var(--brand-blue)] border-t-transparent animate-spin" />
                <p className="text-sm text-slate-600">Chargement de la démo live…</p>
              </div>
            </div>
          )}
          <iframe
            src={url}
            title={title}
            className="h-full w-full border-0 bg-white"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 bottom-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-3.5 py-2 text-[11px] font-semibold text-slate-800 shadow-md backdrop-blur-md transition hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]"
        >
          Plein écran
          <ExternalLink className="h-3 w-3 text-[var(--brand-blue)]" />
        </a>
      </div>
    </div>
  );
}

function UnavailablePoster({
  poster,
  posterAlt,
  envHint,
}: {
  poster: string;
  posterAlt: string;
  envHint: string;
}) {
  return (
    <div className="relative flex flex-1 items-center justify-center bg-slate-50">
      <Image
        src={poster}
        alt={posterAlt}
        fill
        unoptimized
        className="object-cover opacity-15"
      />
      <div className="relative z-10 mx-4 rounded-2xl border border-slate-200 bg-white/95 px-6 py-5 text-center shadow-md backdrop-blur-xl">
        <p className="text-sm font-semibold text-slate-900">Démo live bientôt disponible</p>
        <p className="mt-2 text-xs text-slate-600">
          Configurez{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[var(--brand-blue)]">
            {envHint}
          </code>{" "}
          dans <code className="rounded bg-slate-100 px-1">.env.local</code>
        </p>
      </div>
    </div>
  );
}

type BrowserChromeProps = {
  title: string;
  live?: boolean;
  onBack?: () => void;
  viewport?: ViewportMode;
  onViewportChange?: (mode: ViewportMode) => void;
};

function BrowserChrome({
  title,
  live = false,
  onBack,
  viewport,
  onViewportChange,
}: BrowserChromeProps) {
  return (
    <div className="lux-browser-chrome shrink-0 justify-between">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span className="lux-browser-dot bg-[var(--brand-red)] shrink-0" />
        <span className="lux-browser-dot bg-[rgba(81,102,153,0.45)] shrink-0" />
        <span className="lux-browser-dot bg-slate-300 shrink-0" />
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="ml-1 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600 transition hover:text-slate-900 shrink-0"
          >
            Aperçu
          </button>
        ) : null}
        <span className="ml-1 truncate text-[11px] text-slate-600 font-mono">{title}</span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {viewport && onViewportChange ? (
          <div className="hidden sm:flex items-center gap-0.5 rounded-lg border border-slate-200 bg-white p-0.5">
            {(
              [
                { id: "desktop" as const, icon: Monitor, label: "Vue Desktop" },
                { id: "tablet" as const, icon: Tablet, label: "Vue Tablette" },
                { id: "mobile" as const, icon: Smartphone, label: "Vue Mobile" },
              ] as const
            ).map((mode) => {
              const Icon = mode.icon;
              const active = viewport === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onViewportChange(mode.id)}
                  aria-label={mode.label}
                  title={mode.label}
                  className={`rounded-md p-1 transition-colors ${active
                    ? "bg-[var(--brand-blue)] text-white"
                    : "text-slate-500 hover:text-slate-900"
                    }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              );
            })}
          </div>
        ) : null}

        {live ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--brand-blue)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-red)] animate-pulse" />
            Live
          </span>
        ) : null}
      </div>
    </div>
  );
}
