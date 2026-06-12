"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import Image3D from "@/components/ui/image-3d";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ModernSlider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [centerPadding, setCenterPadding] = useState("60px");

  useEffect(() => {
    setIsMounted(true);

    const updateSettings = () => {
      const width = window.innerWidth;
      if (width <= 767) {
        setSlidesToShow(1);
        setCenterPadding("20px");
      } else if (width <= 1023) {
        setSlidesToShow(1.67);
        setCenterPadding("40px");
      } else {
        setSlidesToShow(3);
        setCenterPadding("60px");
      }
    };

    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, []);

  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    className: "w-full mx-auto cursor-pointer center-mode",
    centerMode: true,
    centerPadding,
  };

  const slides = [
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      alt: "Développement web - Sites web modernes et performants",
      title: "Développement Web",
      description: "Sites web modernes et performants",
    },
    {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      alt: "Applications mobiles - iOS et Android",
      title: "Applications Mobile",
      description: "iOS et Android natives",
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      alt: "SEO et Marketing digital - Augmentez votre visibilité",
      title: "SEO & Marketing",
      description: "Augmentez votre visibilité",
    },
    {
      src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      alt: "Conception UI/UX - Design centré utilisateur",
      title: "UI/UX Design",
      description: "Design centré utilisateur",
    },
    {
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      alt: "E-commerce - Solutions de vente en ligne",
      title: "E-commerce",
      description: "Solutions de vente en ligne",
    },
  ];

  return (
    <div className="relative py-12 md:py-16">
      <div className="lux-section-premium mb-10 md:mb-12 !p-8 md:!p-10">
        <LuxSectionHeader
          label="Portfolio"
          title="Nos réalisations"
          description="Découvrez nos projets et laissez-vous inspirer par des expériences digitales pensées pour performer."
          align="center"
        />
      </div>

      {isMounted ? (
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={slide.title} className="px-3 md:px-4">
              <LuxReveal delay={index * 0.05}>
                <div className="lux-card-interactive p-4 md:p-5 group">
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <Image3D
                      priority={index < 2}
                      src={slide.src}
                      alt={slide.alt}
                      width={600}
                      height={400}
                      className="rounded-xl w-full h-[320px] md:h-[380px] object-cover ring-1 ring-[rgba(81,102,153,0.2)] transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,9,14,0.75)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  </div>
                  <div className="text-center px-1">
                    <h3 className="font-display text-lg md:text-xl font-semibold text-[var(--lux-champagne)] mb-1.5">
                      {slide.title}
                    </h3>
                    <p className="lux-muted text-sm">{slide.description}</p>
                  </div>
                </div>
              </LuxReveal>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="flex gap-4 justify-center overflow-hidden">
          {slides.slice(0, 3).map((slide) => (
            <div key={slide.title} className="w-full max-w-sm shrink-0">
              <div className="lux-card-interactive p-5">
                <div className="animate-pulse bg-white/5 rounded-xl w-full h-[320px] mb-4" />
                <div className="text-center">
                  <div className="h-6 bg-white/5 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-4 bg-white/5 rounded w-1/2 mx-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModernSlider;
