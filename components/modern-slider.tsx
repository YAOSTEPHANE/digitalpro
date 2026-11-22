"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Pause, Play, ArrowUpRight } from "lucide-react";
import Image3D from "@/components/ui/image-3d";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    src: "/images/studio/web-architecture.webp",
    alt: "Développement web - Sites web modernes et performants",
    category: "Web Architecture",
    metric: "Score Lighthouse 99/100",
    title: "Développement Web",
    description: "Sites vitrines et plateformes rapides pensés pour convertir",
    href: "/sites-web",
  },
  {
    src: "/images/studio/mobile-apps.webp",
    alt: "Applications mobiles - iOS et Android",
    category: "Mobile & SaaS",
    metric: "Temps réel · Multi-écrans",
    title: "Applications Mobile",
    description: "Expériences iOS, Android et web-apps fluides au quotidien",
    href: "/services",
  },
  {
    src: "/images/studio/analytics-growth.webp",
    alt: "SEO et Marketing digital - Augmentez votre visibilité",
    category: "Acquisition & SEO",
    metric: "+180% Trafic qualifié",
    title: "SEO & Marketing",
    description: "Référencement Google, contenu stratégique et suivi KPI",
    href: "/services",
  },
  {
    src: "/images/studio/ui-ux-studio.webp",
    alt: "Conception UI/UX - Design centré utilisateur",
    category: "Direction Artistique",
    metric: "Design Systems Figma",
    title: "UI/UX Design",
    description: "Interfaces raffinées et identités visuelles distinctives",
    href: "/design",
  },
  {
    src: "/images/studio/ecommerce-commerce.webp",
    alt: "E-commerce - Solutions de vente en ligne",
    category: "Commerce Digital",
    metric: "Mobile Money & Cartes",
    title: "E-commerce",
    description: "Boutiques Shopify & sur-mesure optimisées pour le panier moyen",
    href: "/e-commerce",
  },
];

const ModernSlider = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [centerPadding, setCenterPadding] = useState("60px");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const updateSettings = () => {
      const width = window.innerWidth;
      if (width <= 767) {
        setSlidesToShow(1);
        setCenterPadding("16px");
      } else if (width <= 1023) {
        setSlidesToShow(1);
        setCenterPadding("110px");
      } else {
        setSlidesToShow(3);
        setCenterPadding("48px");
      }
    };

    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, []);

  const togglePlay = () => {
    if (!sliderRef.current) return;
    if (isPaused) {
      sliderRef.current.slickPlay();
      setIsPaused(false);
    } else {
      sliderRef.current.slickPause();
      setIsPaused(true);
    }
  };

  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow,
    autoplay: !isPaused,
    speed: 700,
    autoplaySpeed: 3800,
    pauseOnHover: true,
    className: "w-full mx-auto cursor-grab active:cursor-grabbing center-mode",
    centerMode: true,
    centerPadding,
    beforeChange: (_current: number, next: number) => setActiveSlide(next),
  };

  return (
    <section id="realisations" className="relative py-8 md:py-12 px-2 scroll-mt-28">
      <div className="lux-section-premium lux-section-spotlight !px-4 !py-7 md:!p-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
          <LuxSectionHeader
            indexLabel="01"
            label="Portfolio"
            title="Savoir-faire & réalisations"
            description="Explorez nos domaines d'intervention et découvrez le niveau de finition que nous livrons à chaque client."
            className="!mb-0"
          />
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 font-mono text-xs font-semibold text-slate-700 tabular-nums mr-1 shadow-2xs">
              {String((activeSlide % slides.length) + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => sliderRef.current?.slickPrev()}
              aria-label="Réalisation précédente"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] transition-all shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPaused ? "Reprendre le carrousel" : "Mettre en pause"}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[var(--brand-blue)] hover:border-[var(--brand-blue)] transition-all shadow-2xs"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => sliderRef.current?.slickNext()}
              aria-label="Réalisation suivante"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] transition-all shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isMounted ? (
          <>
            <Slider ref={sliderRef} {...settings}>
              {slides.map((slide, index) => (
                <div key={slide.title} className="px-2 md:px-3 py-2">
                  <LuxReveal delay={index * 0.04}>
                    <Link href={slide.href} className="block lux-card-interactive p-4 md:p-5 group">
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        <Image3D
                          priority={index < 2}
                          src={slide.src}
                          alt={slide.alt}
                          width={600}
                          height={400}
                          className="rounded-xl w-full h-[250px] md:h-[310px] object-cover ring-1 ring-slate-200"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                          <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-900 shadow-xs backdrop-blur-md">
                            {slide.category}
                          </span>
                          <span className="rounded-full bg-[var(--brand-blue)] px-2.5 py-1 text-[10px] font-semibold text-white shadow-xs">
                            {slide.metric}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-3 px-1">
                        <div>
                          <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-[var(--brand-blue)] transition-colors">
                            {slide.title}
                          </h3>
                          <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                            {slide.description}
                          </p>
                        </div>
                        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[var(--brand-blue)] group-hover:bg-[var(--brand-blue)] group-hover:text-white group-hover:border-[var(--brand-blue)] transition-all">
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </LuxReveal>
                </div>
              ))}
            </Slider>

            <div className="mt-6 flex items-center justify-center gap-2">
              {slides.map((slide, idx) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => sliderRef.current?.slickGoTo(idx)}
                  aria-label={`Aller à ${slide.title}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === idx
                      ? "w-8 bg-[var(--brand-blue)]"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex gap-4 justify-center overflow-hidden">
            {slides.slice(0, 3).map((slide) => (
              <div key={slide.title} className="w-full max-w-sm shrink-0">
                <div className="lux-card-interactive p-5">
                  <div className="animate-pulse bg-slate-100 rounded-xl w-full h-[270px] mb-4" />
                  <div className="h-5 bg-slate-100 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-slate-100 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ModernSlider;
