"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ModernNavbar from "@/components/modern-navbar";
import { Spotlight } from "@/components/ui/spotlight";
import StarsBackground from "@/components/stars-background";
import ModernHero from "@/components/modern-hero";
import ModernSlider from "@/components/modern-slider";
import BlackFriday from "./black-friday";
import ServicesVideo from "@/components/services-video";
import DailyMarketingTips from "@/components/daily-marketing-tips";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";
import RealisationLogo from "@/components/realisation-logo";
import {
  REALISATIONS,
  REALISATION_FILTERS,
  type RealisationCategory,
} from "@/lib/realisations";
import {
  ArrowRight,
  AlertCircle,
  TrendingUp,
  BarChart3,
  ExternalLink,
  Layers,
  Gauge,
  CheckCircle2,
  Globe,
} from "lucide-react";

type BenchmarkMode = "digitalpro" | "classique";

const BENCHMARK_ROWS: Record<
  BenchmarkMode,
  { metric: string; value: string; note: string; score: number }[]
> = {
  digitalpro: [
    {
      metric: "Vitesse mobile (4G)",
      value: "< 1.3s",
      note: "Pré-rendu statique & images optimisées",
      score: 96,
    },
    {
      metric: "Clarté en 5 secondes",
      value: "95 / 100",
      note: "Positionnement visible dès le premier écran",
      score: 95,
    },
    {
      metric: "Parcours vers devis / RDV",
      value: "2 à 3 clics",
      note: "Simulateur, WhatsApp & tunnel pré-rempli",
      score: 92,
    },
  ],
  classique: [
    {
      metric: "Vitesse mobile (4G)",
      value: "4.8s+",
      note: "Scripts lourds et médias non compressés",
      score: 38,
    },
    {
      metric: "Clarté en 5 secondes",
      value: "42 / 100",
      note: "Discours générique noyé sans hiérarchie",
      score: 42,
    },
    {
      metric: "Parcours vers devis / RDV",
      value: "Formulaire caché",
      note: "Abandon élevé avant même la prise de contact",
      score: 35,
    },
  ],
};

export default function Home() {
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);
  const [benchmarkMode, setBenchmarkMode] = useState<BenchmarkMode>("digitalpro");
  const [realisationFilter, setRealisationFilter] = useState<RealisationCategory>("all");

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

  const filteredRealisations = useMemo(
    () =>
      realisationFilter === "all"
        ? REALISATIONS
        : REALISATIONS.filter((item) => item.category === realisationFilter),
    [realisationFilter]
  );

  const filterCounts = useMemo(() => {
    const counts: Record<RealisationCategory, number> = {
      all: REALISATIONS.length,
      tech: 0,
      corporate: 0,
      "education-commerce": 0,
    };
    REALISATIONS.forEach((item) => {
      counts[item.category] += 1;
    });
    return counts;
  }, []);

  const processSteps = [
    {
      num: "01",
      duration: "Jours 1–3",
      title: "Audit & positionnement",
      text: "Analyse de votre marché, des frictions actuelles et des leviers d'acquisition prioritaires.",
      deliverables: ["Diagnostic UX/SEO", "Architecture cible"],
      clientEffort: "1 atelier de 45 min",
      outcome: "Feuille de route claire + arborescence validée avant de coder.",
      accent: "blue" as const,
    },
    {
      num: "02",
      duration: "Jours 4–9",
      title: "Direction créative",
      text: "Maquettes Figma orientées conversion, hiérarchie éditoriale et identité visuelle mémorable.",
      deliverables: ["Prototype interactif", "Design System"],
      clientEffort: "Revue interactive sur lien Figma",
      outcome: "Validation écran par écran avec zéro surprise au rendu final.",
      accent: "red" as const,
    },
    {
      num: "03",
      duration: "Jours 10–18",
      title: "Ingénierie & performance",
      text: "Développement Next.js / React rapide, animations fluides, sécurité et SEO technique natif.",
      deliverables: ["Core Web Vitals 95+", "Responsive total"],
      clientEffort: "Prévisualisation live privée",
      outcome: "Plateforme rapide sur 4G mobile, sécurisée et prête pour Google.",
      accent: "blue" as const,
    },
    {
      num: "04",
      duration: "Continu",
      title: "Pilotage & croissance",
      text: "Mise en ligne supervisée, tracking des conversions et itérations mensuelles mesurées.",
      deliverables: ["Tableau KPI", "Support dédié"],
      clientEffort: "Formation équipe de 30 min",
      outcome: "Autonomie complète et suivi continu des résultats business.",
      accent: "red" as const,
    },
  ];

  const learningBlocks = [
    {
      icon: AlertCircle,
      badge: "Diagnostic",
      title: "Pourquoi un site classique ne convertit pas",
      problem: "Message flou, temps de chargement mobile élevé, CTA noyés ou parcours trop lourd.",
      impact: "Audit précis des points de rupture dès la première semaine.",
      accent: "red" as const,
    },
    {
      icon: TrendingUp,
      badge: "Conversion",
      title: "Ce qui déclenche la prise de décision",
      problem: "Positionnement clair en 5 secondes, preuves sociales vérifiables et ergonomie tactile.",
      impact: "Jusqu'à 2.4x plus de demandes qualifiées sur le même trafic.",
      accent: "blue" as const,
    },
    {
      icon: BarChart3,
      badge: "Pilotage",
      title: "Comment mesurer le retour sur investissement",
      problem: "Suivi en temps réel des leads, sources d'acquisition et coût par opportunité.",
      impact: "Décisions business appuyées sur des données fiables.",
      accent: "blue" as const,
    },
  ];

  const activeStep = processSteps[activeProcessIndex] ?? processSteps[0];

  return (
    <div className="lux-page-shell w-full md:items-center md:justify-center relative overflow-hidden">
      <StarsBackground />
      <ModernNavbar />

      <Spotlight className="hidden md:flex md:-top-80 left-80 opacity-20" fill="#516699" />

      <ModernHero />

      <main id="main-content" className="mx-auto relative z-10 w-full px-3 md:px-6 max-w-7xl">
        <ModernSlider />

        {/* Section 02 : Approche interactive */}
        <section id="methode" className="my-12 px-2 scroll-mt-28">
          <div className="lux-section-premium lux-section-spotlight">
            <LuxSectionHeader
              indexLabel="02"
              label="Notre méthode"
              title="Une ingénierie claire pour un site qui marque les esprits"
              description="Cliquez sur chaque jalon pour consulter son livrable concret et votre implication."
              rightSlot={
                <Link href="/services" className="lux-btn-ghost !px-5 !py-2.5 text-xs gap-1.5">
                  Voir nos services
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              }
            />
            <div className="relative">
              <div
                aria-hidden
                className="hidden lg:block absolute top-11 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[rgba(81,102,153,0.18)] via-[rgba(81,102,153,0.45)] to-[rgba(204,38,40,0.28)] pointer-events-none"
              />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {processSteps.map((step, index) => {
                  const isActive = activeProcessIndex === index;
                  const cardVariantClass = isActive
                    ? step.accent === "red"
                      ? "lux-card-featured lux-card-featured-red"
                      : "lux-card-featured"
                    : step.accent === "red"
                      ? "lux-card-interactive lux-card-accent-red"
                      : "lux-card-interactive";

                  return (
                    <LuxReveal key={step.title} delay={index * 0.07}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setActiveProcessIndex(index)}
                        onMouseEnter={() => setActiveProcessIndex(index)}
                        className={`${cardVariantClass} p-5 md:p-6 h-full w-full text-left flex flex-col`}
                      >
                        <div className="flex items-center justify-between mb-5 w-full">
                          <span
                            className={`lux-step-badge ${
                              step.accent === "red" ? "lux-step-badge-red" : ""
                            }`}
                          >
                            {step.num}
                          </span>
                          <span className="font-mono text-[11px] font-medium text-slate-500">
                            {step.duration}
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-grow">
                          {step.text}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 w-full">
                          {step.deliverables.map((del) => (
                            <span key={del} className="lux-chip !text-[10px] !px-2.5 !py-0.5">
                              {del}
                            </span>
                          ))}
                        </div>
                      </button>
                    </LuxReveal>
                  );
                })}
              </div>
            </div>

            {/* Détail du jalon actif */}
            <div className="mt-5 lux-card-subtle p-4 md:p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.num}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        activeStep.accent === "red"
                          ? "text-[var(--brand-red)]"
                          : "text-[var(--brand-blue)]"
                      }`}
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-xs font-bold uppercase tracking-wider text-slate-900">
                          Phase {activeStep.num} · {activeStep.title}
                        </span>
                        <span className="rounded-full bg-white border border-slate-200 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                          Implication : {activeStep.clientEffort}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">{activeStep.outcome}</p>
                    </div>
                  </div>
                  <Link
                    href="/book"
                    className="lux-btn-primary !px-4 !py-2 text-xs gap-1.5 shrink-0 self-start md:self-center"
                  >
                    Démarrer par la phase 01
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Section 03 : Comprendre pour décider + comparatif */}
        <section id="comparatif" className="my-12 px-2 scroll-mt-28">
          <div className="lux-section-tinted">
            <LuxSectionHeader
              indexLabel="03"
              label="Vision stratégique"
              title="Un site utile informe, rassure et fait agir"
              description="Comparez l'impact d'une architecture conçue sur mesure face à un site vitrine standard."
              accent="red"
              rightSlot={
                <div
                  className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-xs"
                  role="group"
                  aria-label="Comparatif approche"
                >
                  <button
                    type="button"
                    onClick={() => setBenchmarkMode("digitalpro")}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      benchmarkMode === "digitalpro"
                        ? "bg-[var(--brand-blue)] text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Standard Digitalpro
                  </button>
                  <button
                    type="button"
                    onClick={() => setBenchmarkMode("classique")}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      benchmarkMode === "classique"
                        ? "bg-[var(--brand-red)] text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Site classique
                  </button>
                </div>
              }
            />

            {/* Barre de benchmark interactive */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {BENCHMARK_ROWS[benchmarkMode].map((row) => (
                <div key={row.metric} className="lux-card-kpi p-4">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                      <Gauge
                        className={`w-3.5 h-3.5 ${
                          benchmarkMode === "digitalpro"
                            ? "text-[var(--brand-blue)]"
                            : "text-[var(--brand-red)]"
                        }`}
                      />
                      {row.metric}
                    </span>
                    <span
                      className={`font-display text-sm font-bold tabular-nums ${
                        benchmarkMode === "digitalpro"
                          ? "text-[var(--brand-blue)]"
                          : "text-[var(--brand-red)]"
                      }`}
                    >
                      {row.value}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden mb-2.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        benchmarkMode === "digitalpro"
                          ? "bg-[var(--brand-blue)]"
                          : "bg-[var(--brand-red)]"
                      }`}
                      style={{ width: `${row.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-600">{row.note}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {learningBlocks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <LuxReveal key={item.title} delay={index * 0.08}>
                    <article
                      className={`lux-card-interactive p-6 h-full flex flex-col ${
                        item.accent === "red" ? "lux-card-accent-red" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`lux-icon-badge ${
                            item.accent === "red" ? "lux-icon-badge-red" : ""
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              item.accent === "red"
                                ? "text-[var(--brand-red)]"
                                : "text-[var(--brand-blue)]"
                            }`}
                          />
                        </div>
                        <span className="lux-chip text-[10px] uppercase tracking-wider">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-slate-900 mb-2.5">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                        {item.problem}
                      </p>
                      <div
                        className={`rounded-xl border border-slate-200/90 border-l-2 bg-slate-50 p-3.5 text-xs text-slate-700 ${
                          item.accent === "red"
                            ? "border-l-[var(--brand-red)]"
                            : "border-l-[var(--brand-blue)]"
                        }`}
                      >
                        <span
                          className={`font-semibold ${
                            item.accent === "red"
                              ? "text-[var(--brand-red)]"
                              : "text-[var(--brand-blue)]"
                          }`}
                        >
                          Impact :{" "}
                        </span>
                        {item.impact}
                      </div>
                    </article>
                  </LuxReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 04 : Nos réalisations en ligne */}
        <section id="nos-realisations" className="my-12 px-2 scroll-mt-28">
          <div className="lux-section-premium lux-section-spotlight">
            <LuxSectionHeader
              indexLabel="04"
              label="Nos réalisations"
              title="Nos réalisations en ligne"
              description="Découvrez les sites vitrines, portails corporate et applications SaaS conçus et déployés en production par Digitalpro Solutions."
              rightSlot={
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs">
                    <Globe className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
                    <span className="font-mono tabular-nums">{REALISATIONS.length}</span> projets en production
                  </span>
                  <Link href="/devis" className="lux-btn-primary !px-5 !py-2.5 text-xs gap-1.5">
                    Lancer votre projet
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              }
            />

            {/* Filtres par catégorie */}
            <div
              className="flex flex-wrap items-center gap-2 mb-8"
              role="group"
              aria-label="Filtrer nos réalisations"
            >
              {REALISATION_FILTERS.map((tab) => {
                const active = realisationFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setRealisationFilter(tab.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                      active
                        ? "lux-chip-active"
                        : "lux-chip hover:border-[var(--brand-blue)]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`font-mono text-[10px] ${
                        active ? "text-white/80" : "text-slate-500"
                      }`}
                    >
                      ({filterCounts[tab.id]})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Grille des réalisations */}
            <AnimatePresence mode="wait">
              <motion.div
                key={realisationFilter}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredRealisations.map((item) => (
                  <article
                    key={item.id}
                    className={`lux-card-interactive overflow-hidden h-full flex flex-col group ${
                      item.accent === "red" ? "lux-card-accent-red" : ""
                    }`}
                  >
                    <div className="lux-browser-chrome !py-2 !px-3.5 justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="lux-browser-dot bg-[var(--brand-red)] shrink-0" />
                        <span className="lux-browser-dot bg-[rgba(81,102,153,0.45)] shrink-0" />
                        <span className="lux-browser-dot bg-slate-300 shrink-0" />
                        <span className="ml-1.5 font-mono text-[11px] text-slate-600 truncate">
                          {item.domain}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        En ligne
                      </span>
                    </div>

                    <div className="p-5 md:p-6 flex flex-col flex-grow">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <RealisationLogo
                          src={item.logo}
                          alt={`Logo ${item.title}`}
                          monogram={item.monogram}
                          accent={item.accent}
                          logoBg={item.logoBg}
                        />
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <span className="font-mono text-[11px] font-semibold text-slate-400">
                            {item.num}
                          </span>
                          <span className="lux-chip !text-[10px] uppercase tracking-wider">
                            {item.tag}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-[var(--brand-blue)] transition-colors">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="focus:outline-none"
                        >
                          {item.title}
                        </a>
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed mt-2 mb-4 flex-grow">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {item.bullets.map((bullet) => (
                          <span key={bullet} className="lux-chip !text-[11px] !px-2.5 !py-0.5">
                            {bullet}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`!px-4 !py-2 text-xs gap-1.5 ${
                            item.accent === "red" ? "lux-btn-accent" : "lux-btn-primary"
                          }`}
                        >
                          Visiter le site
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <Link
                          href={`/devis?service=${encodeURIComponent(
                            item.devisService
                          )}&offre=${encodeURIComponent(`Projet inspiré de ${item.title}`)}`}
                          className="text-xs font-semibold text-slate-500 hover:text-[var(--brand-blue)] transition-colors"
                        >
                          Projet similaire
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Bandeau de clôture */}
            <div className="lux-card-subtle mt-8 p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-display text-lg font-bold text-slate-900">
                  Vous souhaitez concevoir une plateforme du même niveau ?
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Recevez une proposition chiffrée sous 24h ou échangez 30 minutes avec notre équipe.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 shrink-0">
                <Link href="/devis" className="lux-btn-primary !px-5 !py-2.5 text-xs gap-1.5">
                  Demander un devis
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/book" className="lux-btn-ghost !px-5 !py-2.5 text-xs">
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
          </div>
        </section>

        <BlackFriday />
        <DailyMarketingTips />
        <ServicesVideo
          title="Découvrez nos services en mouvement"
          description="Une présentation immersive de nos réalisations digitales pour propulser votre marque."
        />

        {/* CTA final */}
        <section className="my-12 px-2 pb-10">
          <LuxReveal>
            <div className="lux-section-dark-cta relative overflow-hidden">
              <div className="lux-orb lux-orb-blue w-[280px] h-[280px] -top-20 -right-16 opacity-35" />
              <div className="lux-orb lux-orb-red w-[200px] h-[200px] bottom-0 left-1/4 opacity-25" />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 mb-4 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
                    <Layers className="w-3.5 h-3.5 text-sky-300" />
                    <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/90">
                      Prêt à démarrer
                    </p>
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.06] tracking-[-0.028em] text-white">
                    Passez d&apos;une vitrine classique à une présence digitale mémorable
                  </h2>
                  <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed">
                    Construisons votre prochaine plateforme avec une direction artistique forte, une
                    vitesse exemplaire et un tunnel calibré pour convertir.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <Link
                    href="/book"
                    className="lux-btn-light group inline-flex items-center justify-center gap-2 px-7 py-3.5"
                  >
                    Planifier un rendez-vous
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link href="/devis" className="lux-btn-dark-ghost text-center px-7 py-3.5">
                    Obtenir un devis détaillé
                  </Link>
                </div>
              </div>
            </div>
          </LuxReveal>
        </section>
      </main>
    </div>
  );
}
