"use client";

import { useState } from "react";
import { ExternalLink, MonitorPlay, Sparkles } from "lucide-react";

type DemoIframeProps = {
  readonly url: string;
  readonly title: string;
  readonly poster: string;
  readonly posterAlt: string;
  readonly envHint: string;
  readonly embedAllowed?: boolean;
  readonly className?: string;
};

export default function DemoIframe({
  url,
  title,
  poster,
  posterAlt,
  envHint,
  embedAllowed = true,
  className = "h-[420px] md:h-[480px]",
}: DemoIframeProps) {
  const [loaded, setLoaded] = useState(false);
  const [showLiveEmbed, setShowLiveEmbed] = useState(embedAllowed);

  if (!url) {
    return (
      <div className={`lux-browser-frame ${className}`}>
        <BrowserChrome title="Démo indisponible" />
        <UnavailablePoster poster={poster} posterAlt={posterAlt} envHint={envHint} />
      </div>
    );
  }

  if (!showLiveEmbed) {
    return (
      <div className={`lux-browser-frame flex flex-col ${className}`}>
        <BrowserChrome title={title} live />
        <div className="relative flex-1 min-h-0 overflow-hidden">
          <img
            src={poster}
            alt={posterAlt}
            className="absolute inset-0 h-full w-full object-cover object-top"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,9,14,0.95)] via-[rgba(8,9,14,0.55)] to-[rgba(8,9,14,0.25)]" />
          <div className="absolute inset-0 lux-noise opacity-20" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-8 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(81,102,153,0.4)] bg-[rgba(81,102,153,0.12)] px-4 py-2 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[var(--brand-blue-light)]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-blue-light)]">
                Aperçu interactif
              </span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-[var(--lux-champagne)] font-light">
              Cette application s&apos;ouvre en plein écran pour une expérience fluide et sécurisée.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-primary inline-flex items-center gap-2 !px-5 !py-3 text-sm"
              >
                <MonitorPlay className="h-4 w-4" />
                Explorer la démo live
              </a>
              {embedAllowed ? (
                <button
                  type="button"
                  onClick={() => setShowLiveEmbed(true)}
                  className="lux-btn-ghost !px-5 !py-3 text-sm"
                >
                  Charger ici
                </button>
              ) : null}
            </div>

            {!embedAllowed ? (
              <p className="mt-4 max-w-xs text-[11px] leading-relaxed lux-muted">
                L&apos;intégration directe est désactivée par la politique de sécurité du site cible.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`lux-browser-frame flex flex-col ${className}`}>
      <BrowserChrome title={title} live onBack={embedAllowed ? () => setShowLiveEmbed(false) : undefined} />
      <div className="relative flex-1 min-h-0 bg-[#0c0e14]">
        {!loaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[rgba(10,11,16,0.96)]">
            <img
              src={poster}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-top opacity-20"
            />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="h-8 w-8 rounded-full border-2 border-[var(--brand-blue)] border-t-transparent animate-spin" />
              <p className="text-sm lux-muted">Chargement de la démo…</p>
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
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 bottom-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-[rgba(81,102,153,0.4)] bg-[rgba(8,9,14,0.88)] px-3.5 py-2 text-[11px] font-medium text-[var(--lux-champagne)] backdrop-blur-md transition hover:border-[var(--brand-blue-light)] hover:bg-[rgba(81,102,153,0.15)]"
        >
          Plein écran
          <ExternalLink className="h-3 w-3 text-[var(--brand-blue-light)]" />
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
    <div className="relative flex h-[calc(100%-2.75rem)] items-center justify-center bg-[rgba(255,255,255,0.02)]">
      <img
        src={poster}
        alt={posterAlt}
        className="absolute inset-0 h-full w-full object-cover opacity-15"
        loading="lazy"
      />
      <div className="relative z-10 mx-4 rounded-2xl border border-[rgba(81,102,153,0.3)] bg-[rgba(14,16,24,0.94)] px-6 py-5 text-center backdrop-blur-xl">
        <p className="text-sm font-medium text-[var(--lux-champagne)]">Démo live bientôt disponible</p>
        <p className="mt-2 text-xs lux-muted">
          Ajoutez{" "}
          <code className="rounded bg-white/5 px-1 text-[var(--brand-blue-light)]">{envHint}</code> dans{" "}
          <code className="rounded bg-white/5 px-1">.env.local</code>
        </p>
      </div>
    </div>
  );
}

type BrowserChromeProps = {
  title: string;
  live?: boolean;
  onBack?: () => void;
};

function BrowserChrome({ title, live = false, onBack }: BrowserChromeProps) {
  return (
    <div className="lux-browser-chrome shrink-0">
      <span className="lux-browser-dot bg-[var(--brand-red)]" />
      <span className="lux-browser-dot bg-[rgba(81,102,153,0.6)]" />
      <span className="lux-browser-dot bg-[rgba(81,102,153,0.35)]" />
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="ml-1 rounded px-2 py-0.5 text-[10px] text-[var(--lux-muted)] transition hover:bg-white/5 hover:text-[var(--lux-champagne)]"
        >
          Aperçu
        </button>
      ) : null}
      <span className="ml-1 flex-1 truncate text-[11px] text-[var(--lux-muted)] font-mono">{title}</span>
      {live ? (
        <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(81,102,153,0.35)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--brand-blue-light)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-red)] animate-pulse" />
          Live
        </span>
      ) : null}
    </div>
  );
}
