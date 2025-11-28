"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import Image3D from "@/components/ui/image-3d";
import { motion } from "framer-motion";

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
    window.addEventListener('resize', updateSettings);
    return () => window.removeEventListener('resize', updateSettings);
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
      description: "Sites web modernes et performants"
    },
    {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      alt: "Applications mobiles - iOS et Android",
      title: "Applications Mobile",
      description: "iOS et Android natives"
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      alt: "SEO et Marketing digital - Augmentez votre visibilité",
      title: "SEO & Marketing",
      description: "Augmentez votre visibilité"
    },
    {
      src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      alt: "Conception UI/UX - Design centré utilisateur",
      title: "UI/UX Design",
      description: "Design centré utilisateur"
    },
    {
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      alt: "E-commerce - Solutions de vente en ligne",
      title: "E-commerce",
      description: "Solutions de vente en ligne"
    },
  ];

  return (
    <div className="relative py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-blue-400 to-blue-500">
            Nos Réalisations
          </span>
        </h2>
        <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
          Découvrez nos projets et laissez-vous inspirer
        </p>
      </motion.div>

      {isMounted ? (
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-red-600/10 to-blue-600/10 border border-red-500/20 rounded-3xl p-6 backdrop-blur-sm hover:border-red-500/40 transition-all">
                  <Image3D
                    priority={index < 2}
                    src={slide.src}
                    alt={slide.alt}
                    width={600}
                    height={400}
                    className="rounded-2xl w-full h-[350px] md:h-[400px] object-cover mb-4"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">{slide.title}</h3>
                    <p className="text-neutral-400 text-sm">{slide.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      ) : (
        // Placeholder pendant le chargement pour éviter l'erreur d'hydratation
        <div className="flex gap-4 justify-center">
          {slides.slice(0, 3).map((slide, index) => (
            <div key={index} className="w-full max-w-sm">
              <div className="bg-gradient-to-br from-red-600/10 to-blue-600/10 border border-red-500/20 rounded-3xl p-6 backdrop-blur-sm">
                <div className="animate-pulse bg-neutral-800 rounded-2xl w-full h-[350px] mb-4" />
                <div className="text-center">
                  <div className="h-6 bg-neutral-800 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-4 bg-neutral-800 rounded w-1/2 mx-auto" />
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


