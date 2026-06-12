"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Clock3,
  Brush,
} from "lucide-react";
import Link from "next/link";
import Image3D from "@/components/ui/image-3d";
import TrustMarquee from "@/components/trust-marquee";

const ModernHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 40 });
  const fullTitle = "L'excellence digitale\nà portée de\nmarque";
  const [typedTitle, setTypedTitle] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedTitle(fullTitle.slice(0, index));
      if (index >= fullTitle.length) {
        window.clearInterval(timer);
      }
    }, 48);

    return () => window.clearInterval(timer);
  }, [fullTitle]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-8">
      <div className="lux-orb lux-orb-blue w-[420px] h-[420px] -top-32 -left-24 opacity-60" />
      <div className="lux-orb lux-orb-red w-[320px] h-[320px] top-1/4 -right-20 opacity-50" />
      <div className="lux-orb lux-orb-blue w-[200px] h-[200px] bottom-32 left-1/4 opacity-30 animate-lux-pulse" />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(81, 102, 153, 0.2), transparent 58%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(81,102,153,0.14),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(204,38,40,0.1),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(81,102,153,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(81,102,153,0.07)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_90%_60%_at_50%_40%,#000_55%,transparent_100%)]" />
      <div className="absolute inset-0 lux-noise" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[rgba(81,102,153,0.4)] bg-[rgba(255,255,255,0.05)] px-5 py-2.5 backdrop-blur-xl shadow-[0_0_30px_rgba(81,102,153,0.12)]"
        >
          <Sparkles className="h-4 w-4 text-[var(--brand-blue-light)]" />
          <span className="lux-label !tracking-[0.22em]">Agence premium · Abidjan</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-semibold mb-6 leading-[1.02] tracking-tight"
        >
          <span className="inline-block whitespace-pre-line lux-gradient-text">
            {typedTitle}
            <span className="animate-pulse text-[var(--brand-red)]">|</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg md:text-xl lux-muted max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Nous créons des expériences web d&apos;exception — design raffiné, performance
          mesurable et parcours pensés pour convertir une audience exigeante.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/book" className="lux-btn-primary group gap-2 text-base px-8 py-4">
            Réserver un échange privé
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/devis" className="lux-btn-ghost gap-2 text-base px-8 py-4">
            Demander un devis sur mesure
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-14"
        >
          {[
            {
              src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
              alt: "Développement web",
            },
            {
              src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop",
              alt: "Applications mobiles",
            },
            {
              src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
              alt: "SEO et Marketing",
            },
            {
              src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop",
              alt: "UI/UX Design",
            },
          ].map((img, index) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.75 + index * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="lux-card-interactive p-2"
            >
              <Image3D
                src={img.src}
                alt={img.alt}
                width={300}
                height={300}
                className="rounded-xl w-full h-[180px] md:h-[220px] object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {[
            { number: "350+", label: "Lancements accompagnés", icon: Sparkles },
            { number: "92%", label: "Objectifs atteints", icon: TrendingUp },
            { number: "48h", label: "Délai moyen de démarrage", icon: Clock3 },
            { number: "100%", label: "Design sur mesure", icon: Brush },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.08 }}
              className="lux-card-interactive p-5 md:p-6 text-center"
            >
              <stat.icon className="w-6 h-6 text-[var(--brand-blue-light)] mx-auto mb-3" />
              <div className="lux-stat-number mb-1">
                {stat.number}
              </div>
              <div className="text-sm lux-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex items-center justify-center gap-2 lux-muted text-sm"
        >
          <ShieldCheck className="h-4 w-4 text-[var(--brand-red)]" />
          <span>Accompagnement discret, transparent et orienté résultats</span>
        </motion.div>
        <TrustMarquee />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--lux-bg)] via-[var(--lux-bg)]/90 to-transparent pointer-events-none" />
    </section>
  );
};

export default ModernHero;
