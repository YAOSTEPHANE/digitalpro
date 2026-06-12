"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX, ExternalLink } from "lucide-react";
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

const ServicesVideo = ({
  videoId,
  videoUrl,
  title = "Découvrez nos services en vidéo",
  description = "Une présentation complète de nos solutions digitales pour transformer votre entreprise",
}: ServicesVideoProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const defaultVideoId = videoId || "jNQXAC9IVRw";
  const baseUrl =
    videoUrl ||
    `https://www.youtube.com/embed/${defaultVideoId}?enablejsapi=1&controls=1&modestbranding=1&rel=0&showinfo=0&autoplay=0&loop=0&playlist=${defaultVideoId}`;
  const youtubeUrl = `${baseUrl}&mute=${isMuted ? 1 : 0}`;

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (iframeRef.current) {
        const currentSrc = iframeRef.current.src;
        const newSrc = currentSrc.includes("&mute=1")
          ? currentSrc.replace("&mute=1", "&mute=0")
          : currentSrc.replace("&mute=0", "&mute=1");
        iframeRef.current.src = newSrc;
      }
      return newMuted;
    });
  };

  const serviceCards = [
    {
      emoji: "🌐",
      title: "Développement Web",
      text: "Sites web modernes et performants adaptés à vos besoins. Technologies de pointe pour une expérience utilisateur optimale.",
      accent: "blue" as const,
      linkClass: "text-[var(--brand-blue-light)] hover:text-[var(--brand-blue)]",
    },
    {
      emoji: "📱",
      title: "Applications Mobile",
      text: "Applications iOS et Android natives et cross-platform. Solutions mobiles innovantes pour votre entreprise.",
      accent: "red" as const,
      linkClass: "text-[var(--brand-red-light)] hover:text-[var(--brand-red)]",
    },
    {
      emoji: "📈",
      title: "Marketing Digital",
      text: "SEO, réseaux sociaux et stratégies de croissance digitale. Augmentez votre visibilité en ligne.",
      accent: "blue" as const,
      linkClass: "text-[var(--brand-blue-light)] hover:text-[var(--brand-blue)]",
    },
  ];

  return (
    <div className="relative w-full py-20 overflow-hidden px-2">
      <div className="lux-section-premium lux-section-spotlight relative">
        <LuxSectionHeader
          label="Vidéo"
          title={title}
          description={description}
          align="center"
        />

        <LuxReveal delay={0.15} className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden lux-browser-frame">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              ref={iframeRef}
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
              src={youtubeUrl}
              title="Nos services - digitalpro solutions"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setVideoLoaded(true)}
            />

            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--lux-bg-soft)] rounded-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-[var(--brand-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="lux-muted">Chargement de la vidéo...</p>
                </div>
              </div>
            )}
          </div>

          {videoLoaded && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className="absolute bottom-4 right-4 rounded-full border border-[rgba(81,102,153,0.35)] bg-[rgba(8,9,14,0.85)] p-3 text-[var(--brand-white)] backdrop-blur-md transition hover:border-[var(--brand-blue-light)] z-10"
              aria-label={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
          )}
        </LuxReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {serviceCards.map((card, index) => (
            <LuxReveal key={card.title} delay={0.25 + index * 0.08}>
            <div
              className={`lux-card-interactive p-6 text-center h-full ${
                card.accent === "blue" ? "brand-border-blue" : "brand-border-red"
              }`}
            >
              <div className="text-4xl mb-3">{card.emoji}</div>
              <h3 className="font-display text-xl font-semibold text-[var(--lux-champagne)] mb-2">
                {card.title}
              </h3>
              <p className="lux-muted text-sm mb-4 leading-relaxed">{card.text}</p>
              <Link
                href="/contact"
                className={`text-sm font-medium inline-flex items-center gap-1 ${card.linkClass}`}
              >
                En savoir plus <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            </LuxReveal>
          ))}
        </div>

        <LuxReveal delay={0.5} className="mt-12 text-center">
          <Link href="/devis" className="lux-btn-accent inline-flex items-center gap-2 text-base px-8 py-4">
            Demander un devis gratuit
            <ExternalLink className="w-5 h-5" />
          </Link>
        </LuxReveal>
      </div>
    </div>
  );
};

export default ServicesVideo;
