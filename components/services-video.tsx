"use client";

import { useState, useRef } from "react";
import {
  Volume2,
  VolumeX,
  ExternalLink,
  Play,
  Pause,
  Globe,
  Smartphone,
  TrendingUp,
  ArrowRight,
  RotateCcw,
  Maximize2,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";

interface ServicesVideoProps {
  videoUrl?: string;
  videoId?: string;
  title?: string;
  description?: string;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

const ServicesVideo = ({
  videoId,
  videoUrl,
  title = "Découvrez notre savoir-faire en mouvement",
  description = "Une immersion rapide dans nos interfaces, architectures web et standards de finition.",
}: ServicesVideoProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const hasCustomYouTubeId =
    Boolean(videoId) && videoId !== "VOTRE_ID_YOUTUBE" && !videoUrl;
  const youtubeUrl = hasCustomYouTubeId
    ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=1&modestbranding=1&rel=0&showinfo=0&mute=${
        isMuted ? 1 : 0
      }`
    : videoUrl;

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      if (iframeRef.current && hasCustomYouTubeId) {
        const currentSrc = iframeRef.current.src;
        iframeRef.current.src = currentSrc.includes("&mute=1")
          ? currentSrc.replace("&mute=1", "&mute=0")
          : currentSrc.replace("&mute=0", "&mute=1");
      }
      return next;
    });
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      void videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    void videoRef.current.play();
    setIsPlaying(true);
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  };

  const handleFullscreen = () => {
    const target = videoRef.current ?? playerContainerRef.current;
    if (!target) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (target.requestFullscreen) {
      void target.requestFullscreen();
    }
  };

  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const serviceCards = [
    {
      icon: Globe,
      title: "Développement Web",
      text: "Sites web modernes, ultra-rapides et pensés pour la conversion sur mobile comme desktop.",
      accent: "blue" as const,
      href: "/sites-web",
      linkClass: "text-[var(--brand-blue)] hover:text-slate-900",
    },
    {
      icon: Smartphone,
      title: "Applications & SaaS",
      text: "Applications métiers, solutions POS et apps iOS/Android fiables et évolutives.",
      accent: "red" as const,
      href: "/technologies",
      linkClass: "text-[var(--brand-red)] hover:text-slate-900",
    },
    {
      icon: TrendingUp,
      title: "SEO & Growth",
      text: "Référencement naturel, tracking analytique et campagnes sociales pilotées par le ROI.",
      accent: "blue" as const,
      href: "/services",
      linkClass: "text-[var(--brand-blue)] hover:text-slate-900",
    },
  ];

  return (
    <section id="showreel" className="relative w-full py-12 md:py-16 overflow-hidden px-2 scroll-mt-28">
      <div className="lux-section-premium lux-section-spotlight relative">
        <LuxSectionHeader
          indexLabel="06"
          label="Showreel"
          title={title}
          description={description}
          align="center"
        />

        <LuxReveal
          delay={0.12}
          className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden lux-browser-frame"
        >
          <div className="lux-browser-chrome justify-between">
            <div className="flex items-center gap-2">
              <span className="lux-browser-dot bg-[var(--brand-red)]" />
              <span className="lux-browser-dot bg-[rgba(81,102,153,0.45)]" />
              <span className="lux-browser-dot bg-slate-300" />
              <span className="ml-2 text-[11px] font-mono text-slate-600">
                digitalpro-showreel.mp4
              </span>
            </div>
            <div className="flex items-center gap-2">
              {!youtubeUrl && duration > 0 ? (
                <span className="hidden sm:inline font-mono text-[11px] text-slate-500 tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              ) : null}
              <span className="lux-chip !py-0.5 !px-2.5 text-[10px]">Showreel HD</span>
            </div>
          </div>

          <div ref={playerContainerRef} className="relative w-full aspect-video bg-slate-950">
            {youtubeUrl ? (
              <>
                <iframe
                  ref={iframeRef}
                  className="absolute top-0 left-0 w-full h-full"
                  src={youtubeUrl}
                  title="Nos services - digitalpro solutions"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setVideoLoaded(true)}
                />
                {!videoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                    <div className="text-center">
                      <div className="w-12 h-12 border-2 border-[var(--brand-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                      <p className="text-slate-600 text-sm">Chargement de la vidéo...</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-contain bg-slate-950"
                  src="/demos/showreel-digitalpro.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                  onLoadedData={() => setVideoLoaded(true)}
                />

                {/* Barre de progression interactive */}
                <div
                  onClick={handleSeek}
                  role="slider"
                  aria-label="Progression du showreel"
                  aria-valuemin={0}
                  aria-valuemax={Math.round(duration)}
                  aria-valuenow={Math.round(currentTime)}
                  tabIndex={0}
                  className="absolute bottom-0 left-0 right-0 h-2 bg-white/20 cursor-pointer z-10 hover:h-2.5 transition-all"
                >
                  <div
                    className="h-full bg-[var(--brand-red)] transition-all duration-150"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </>
            )}

            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
              {!youtubeUrl ? (
                <>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={handleRestart}
                    className="rounded-full border border-slate-200 bg-white/95 p-2.5 text-slate-900 shadow-md backdrop-blur-md transition hover:border-[var(--brand-blue)]"
                    aria-label="Rejouer depuis le début"
                    title="Rejouer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={togglePlay}
                    className="rounded-full border border-slate-200 bg-white/95 p-2.5 text-slate-900 shadow-md backdrop-blur-md transition hover:border-[var(--brand-blue)]"
                    aria-label={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </motion.button>
                </>
              ) : null}

              <motion.button
                type="button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={toggleMute}
                className="rounded-full border border-slate-200 bg-white/95 p-2.5 text-slate-900 shadow-md backdrop-blur-md transition hover:border-[var(--brand-blue)]"
                aria-label={isMuted ? "Activer le son" : "Couper le son"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </motion.button>

              {!youtubeUrl ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleFullscreen}
                  className="rounded-full border border-slate-200 bg-white/95 p-2.5 text-slate-900 shadow-md backdrop-blur-md transition hover:border-[var(--brand-blue)]"
                  aria-label="Afficher en plein écran"
                  title="Plein écran"
                >
                  <Maximize2 className="w-4 h-4" />
                </motion.button>
              ) : null}
            </div>
          </div>
        </LuxReveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {serviceCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <LuxReveal key={card.title} delay={0.18 + index * 0.08}>
                <div
                  className={`lux-card-interactive p-6 h-full flex flex-col ${
                    card.accent === "blue" ? "brand-border-blue" : "brand-border-red"
                  }`}
                >
                  <div
                    className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                      card.accent === "blue" ? "lux-icon-badge" : "lux-icon-badge lux-icon-badge-red"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        card.accent === "blue" ? "text-[var(--brand-blue)]" : "text-[var(--brand-red)]"
                      }`}
                    />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-slate-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">{card.text}</p>
                  <Link
                    href={card.href}
                    className={`text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors ${card.linkClass}`}
                  >
                    Explorer <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </LuxReveal>
            );
          })}
        </div>

        <LuxReveal delay={0.35} className="mt-10 text-center">
          <Link
            href="/devis"
            className="lux-btn-accent inline-flex items-center gap-2 text-sm md:text-base px-8 py-3.5"
          >
            Demander un devis gratuit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </LuxReveal>
      </div>
    </section>
  );
};

export default ServicesVideo;
