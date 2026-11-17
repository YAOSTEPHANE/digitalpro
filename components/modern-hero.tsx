"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Clock3,
  Brush,
  Globe,
  Smartphone,
  BarChart3,
  Layers,
} from "lucide-react";
import Link from "next/link";
import Image3D from "@/components/ui/image-3d";
import TrustMarquee from "@/components/trust-marquee";

const craftPillars = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=420&fit=crop",
    alt: "Architecture & Développement web",
    tag: "Web & SaaS",
    metric: "99/100 Perf",
    title: "Sites haute performance",
    href: "/sites-web",
    icon: Globe,
    accent: "blue" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=420&fit=crop",
    alt: "Applications mobiles et WebApps",
    tag: "Mobile & POS",
    metric: "iOS · Android",
    title: "Apps & solutions métier",
    href: "/services",
    icon: Smartphone,
    accent: "red" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=420&fit=crop",
    alt: "SEO et Marketing d'acquisition",
    tag: "SEO & Growth",
    metric: "+240% Portée",
    title: "Acquisition mesurable",
    href: "/e-commerce",
    icon: BarChart3,
    accent: "blue" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=420&fit=crop",
    alt: "UI/UX Design & Branding",
    tag: "UI/UX Studio",
    metric: "100% Sur mesure",
    title: "Identité mémorable",
    href: "/design",
    icon: Layers,
    accent: "red" as const,
  },
];

const stats = [
  { number: "350+", label: "Lancements accompagnés", icon: Sparkles },
  { number: "92%", label: "Objectifs atteints", icon: TrendingUp },
  { number: "48h", label: "Délai moyen de démarrage", icon: Clock3 },
  { number: "100%", label: "Design sur mesure", icon: Brush },
];

const ModernHero = () => {
  const [pointer, setPointer] = useState({ x: 50, y: 36 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden pt-28 xl:pt-36 pb-10"
    >
      <div className="lux-orb lux-orb-blue w-[460px] h-[460px] -top-32 -left-24 opacity-70" />
      <div className="lux-orb lux-orb-red w-[340px] h-[340px] top-1/4 -right-24 opacity-55" />

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(620px circle at ${pointer.x}% ${pointer.y}%, rgba(81, 102, 153, 0.085), transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 lux-grid-backdrop [mask-image:radial-gradient(ellipse_85%_55%_at_50%_35%,#000_45%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 lux-noise" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-7 inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-slate-200/90 bg-white/95 px-4 py-2 backdrop-blur-xl shadow-xs"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="lux-label !tracking-[0.2em]">
            Studio d&apos;ingénierie digitale · Abidjan
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:inline text-[11px] font-medium text-slate-600">
            Web · SaaS · E-commerce · IA
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-semibold mb-6 leading-[0.98] tracking-tight max-w-5xl mx-auto"
        >
          <span className="lux-gradient-text">L&apos;excellence digitale</span>
          <br />
          <span className="text-slate-900">à portée de </span>
          <span className="relative inline-block text-slate-900">
            marque
            <span
              className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[var(--brand-red)]"
              aria-hidden
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Nous concevons des plateformes web, applications SaaS et boutiques e-commerce
          d&apos;exception — direction artistique raffinée, vitesse irréprochable et parcours
          pensés pour convertir.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14"
        >
          <Link
            href="/book"
            className="lux-btn-primary group gap-2 text-sm md:text-base px-7 py-3.5 w-full sm:w-auto"
          >
            Réserver un échange privé
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/devis"
            className="lux-btn-ghost gap-2 text-sm md:text-base px-7 py-3.5 w-full sm:w-auto"
          >
            Demander un devis sur mesure
          </Link>
          <a
            href="#simulateur"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-blue)] hover:text-slate-900 transition-colors"
          >
            Simuler un budget
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Studio Craft Bento */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.36 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-10 text-left"
        >
          {craftPillars.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group lux-card-interactive p-2.5 flex flex-col"
              >
                <div className="relative overflow-hidden rounded-xl h-44 w-full">
                  <Image3D
                    src={card.src}
                    alt={card.alt}
                    width={420}
                    height={320}
                    priority={index < 2}
                    containerClassName="w-full h-full"
                    className="w-full h-full rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-900 shadow-xs backdrop-blur-md">
                      {card.tag}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-xs ${
                        card.accent === "red"
                          ? "bg-[var(--brand-red)] text-white"
                          : "bg-[var(--brand-blue)] text-white"
                      }`}
                    >
                      {card.metric}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-2 pt-3 pb-1.5">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[var(--brand-blue)]" />
                    <span className="text-sm font-semibold text-slate-900 group-hover:text-[var(--brand-blue)] transition-colors">
                      {card.title}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* KPI Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-6xl mx-auto"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="lux-card-interactive px-4 py-5 text-center flex flex-col items-center justify-center"
              >
                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(81,102,153,0.18)] bg-[rgba(81,102,153,0.08)]">
                  <Icon className="w-4 h-4 text-[var(--brand-blue)]" />
                </div>
                <div className="lux-stat-number tabular-nums mb-1">{stat.number}</div>
                <div className="text-xs md:text-sm text-slate-600">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 text-slate-600 text-xs shadow-2xs"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-[var(--brand-red)]" />
          <span>Accompagnement discret, transparence totale et résultats mesurables</span>
        </motion.div>

        <TrustMarquee />
      </div>
    </section>
  );
};

export default ModernHero;
