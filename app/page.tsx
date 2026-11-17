"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ModernNavbar from "@/components/modern-navbar";
import { Spotlight } from "@/components/ui/spotlight";
import StarsBackground from "@/components/stars-background";
import ModernHero from "@/components/modern-hero";
import ModernSlider from "@/components/modern-slider";
import BlackFriday from "./black-friday";
import ServicesVideo from "@/components/services-video";
import DailyMarketingTips from "@/components/daily-marketing-tips";
import DemoIframe from "@/components/demo-iframe";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";
import { demoApps } from "@/lib/demo-apps";
import { accentBadgeClass, accentChipActiveClass } from "@/lib/brand-styles";
import {
  ArrowRight,
  Sparkles,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Check,
  Clock3,
  ExternalLink,
  Layers,
} from "lucide-react";

const demoEnvHints: Record<string, string> = {
  "ny-immobilier": "NEXT_PUBLIC_DEMO_WEB_URL",
  "enregistreur-caisse": "NEXT_PUBLIC_DEMO_MOBILE_URL",
};

type PlatformKey = "vitrine" | "ecommerce" | "saas" | "mobile";
type TimelineKey = "express" | "standard" | "premium";

const PLATFORM_BASE: Record<PlatformKey, { price: number; weeks: string; label: string }> = {
  vitrine: { price: 180_000, weeks: "2 à 3 semaines", label: "Site vitrine" },
  ecommerce: { price: 520_000, weeks: "3 à 5 semaines", label: "E-commerce" },
  saas: { price: 980_000, weeks: "5 à 8 semaines", label: "SaaS / App Web" },
  mobile: { price: 650_000, weeks: "4 à 7 semaines", label: "App Mobile" },
};

const TIMELINE_MULTIPLIER: Record<TimelineKey, { mult: number; label: string; note: string }> = {
  standard: { mult: 1, label: "Standard", note: "Rythme équilibré" },
  express: { mult: 1.25, label: "Express", note: "Livraison accélérée" },
  premium: { mult: 1.55, label: "Premium+", note: "Direction dédiée + SLA" },
};

const ADDON_OPTIONS = [
  { id: "seo", label: "SEO & Analytics", cost: 85_000 },
  { id: "payment", label: "Mobile Money / Stripe", cost: 110_000 },
  { id: "design-system", label: "Design System Figma", cost: 140_000 },
  { id: "ai-bot", label: "Assistant IA intégré", cost: 120_000 },
] as const;

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey>("vitrine");
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineKey>("standard");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["seo"]);
  const [selectedDemoId, setSelectedDemoId] = useState(
    demoApps.find((d) => d.embedAllowed)?.id ?? demoApps[0]?.id ?? ""
  );

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

  const addonsCost = useMemo(
    () =>
      ADDON_OPTIONS.reduce(
        (sum, addon) => (selectedAddons.includes(addon.id) ? sum + addon.cost : sum),
        0
      ),
    [selectedAddons]
  );

  const quoteEstimate = useMemo(
    () =>
      Math.round(
        PLATFORM_BASE[selectedPlatform].price * TIMELINE_MULTIPLIER[selectedTimeline].mult +
          addonsCost
      ),
    [selectedPlatform, selectedTimeline, addonsCost]
  );

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const processSteps = [
    {
      num: "01",
      duration: "Jours 1–3",
      title: "Audit & positionnement",
      text: "Analyse de votre marché, des frictions actuelles et des leviers d'acquisition prioritaires.",
      deliverables: ["Diagnostic UX/SEO", "Architecture cible"],
      accent: "blue" as const,
    },
    {
      num: "02",
      duration: "Jours 4–9",
      title: "Direction créative",
      text: "Maquettes Figma orientées conversion, hiérarchie éditoriale et identité visuelle mémorable.",
      deliverables: ["Prototype interactif", "Design System"],
      accent: "red" as const,
    },
    {
      num: "03",
      duration: "Jours 10–18",
      title: "Ingénierie & performance",
      text: "Développement Next.js / React rapide, animations fluides, sécurité et SEO technique natif.",
      deliverables: ["Core Web Vitals 95+", "Responsive total"],
      accent: "blue" as const,
    },
    {
      num: "04",
      duration: "Continu",
      title: "Pilotage & croissance",
      text: "Mise en ligne supervisée, tracking des conversions et itérations mensuelles mesurées.",
      deliverables: ["Tableau KPI", "Support dédié"],
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

  const activeDemo = demoApps.find((demo) => demo.id === selectedDemoId) ?? demoApps[0];

  const devisHref = `/devis?type=${encodeURIComponent(
    PLATFORM_BASE[selectedPlatform].label
  )}&tier=${encodeURIComponent(
    TIMELINE_MULTIPLIER[selectedTimeline].label
  )}&estimate=${quoteEstimate}`;

  return (
    <div className="lux-page-shell w-full md:items-center md:justify-center relative overflow-hidden">
      <StarsBackground />
      <ModernNavbar />

      <Spotlight className="hidden md:flex md:-top-80 left-80 opacity-20" fill="#516699" />

      <ModernHero />

      <main className="mx-auto relative z-10 w-full px-3 md:px-6 max-w-7xl">
        <ModernSlider />

        {/* Section 02 : Approche */}
        <section className="my-12 px-2">
          <div className="lux-section-premium lux-section-spotlight">
            <LuxSectionHeader
              indexLabel="02"
              label="Notre méthode"
              title="Une ingénierie claire pour un site qui marque les esprits"
              description="Quatre jalons transparents, de l'audit stratégique à l'optimisation continue."
              rightSlot={
                <Link href="/services" className="lux-btn-ghost !px-5 !py-2.5 text-xs gap-1.5">
                  Voir nos services
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              }
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {processSteps.map((step, index) => (
                <LuxReveal key={step.title} delay={index * 0.07}>
                  <article className="lux-card-interactive p-5 md:p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className={`lux-step-badge ${
                          step.accent === "red" ? "lux-step-badge-red" : ""
                        }`}
                      >
                        {step.num}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">{step.duration}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-grow">
                      {step.text}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                      {step.deliverables.map((del) => (
                        <span key={del} className="lux-chip !text-[10px] !px-2.5 !py-0.5">
                          {del}
                        </span>
                      ))}
                    </div>
                  </article>
                </LuxReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section 03 : Comprendre pour décider */}
        <section className="my-12 px-2">
          <div className="lux-section-premium">
            <LuxSectionHeader
              indexLabel="03"
              label="Vision stratégique"
              title="Un site utile informe, rassure et fait agir"
              description="Chaque interface est conçue autour des mécanismes réels de confiance et de décision."
              accent="red"
            />
            <div className="grid md:grid-cols-3 gap-5">
              {learningBlocks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <LuxReveal key={item.title} delay={index * 0.08}>
                    <article className="lux-card-interactive p-6 h-full flex flex-col">
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
                      <h3 className="font-display text-xl font-semibold text-slate-900 mb-2.5">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                        {item.problem}
                      </p>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
                        <span className="font-semibold text-[var(--brand-blue)]">Impact : </span>
                        {item.impact}
                      </div>
                    </article>
                  </LuxReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 04 : Studio Démos Live + Simulateur Avancé */}
        <section id="simulateur" className="my-12 px-2 scroll-mt-28">
          <div className="lux-section-premium lux-section-spotlight">
            <LuxSectionHeader
              indexLabel="04"
              label="Studio Interactif"
              title="Testez nos applications en direct & estimez votre projet"
              description="Explorez nos applications déployées en production avec contrôle multi-écrans, puis chiffrez votre projet en temps réel."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {demoApps.map((demo) => {
                const isSelected = selectedDemoId === demo.id;
                return (
                  <div
                    key={demo.id}
                    className={`lux-card-interactive p-5 flex flex-col justify-between transition-all ${
                      isSelected ? "border-[var(--brand-blue)] ring-1 ring-[var(--brand-blue)]/20" : ""
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${accentBadgeClass(
                            demo.accent
                          )}`}
                        >
                          {demo.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-[var(--brand-blue)]">
                          <span
                            className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                              demo.accent === "red"
                                ? "bg-[var(--brand-red)]"
                                : "bg-[var(--brand-blue)]"
                            }`}
                          />
                          EN PRODUCTION
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-slate-900">
                        {demo.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {demo.description}
                      </p>
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {demo.bullets.map((bullet) => (
                          <span key={bullet} className="lux-chip text-[11px]">
                            {bullet}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedDemoId(demo.id)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                          isSelected
                            ? accentChipActiveClass(demo.accent)
                            : "lux-btn-ghost !px-4 !py-2 !text-xs"
                        }`}
                      >
                        {isSelected ? "Affichée ci-dessous" : "Charger dans l'aperçu"}
                      </button>
                      <div className="flex items-center gap-3">
                        {demo.liveUrl ? (
                          <a
                            href={demo.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-blue)] hover:text-slate-900 transition-colors"
                          >
                            Ouvrir <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : null}
                        <Link href={demo.cta} className="lux-btn-ghost !px-3.5 !py-1.5 text-xs">
                          {demo.ctaLabel}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
              <LuxReveal className="xl:col-span-7">
                <article className="lux-card-interactive p-4 md:p-5 h-full flex flex-col">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      {demoApps.map((demo) => (
                        <button
                          key={demo.id}
                          type="button"
                          onClick={() => setSelectedDemoId(demo.id)}
                          className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                            selectedDemoId === demo.id
                              ? accentChipActiveClass(demo.accent)
                              : "lux-chip hover:border-[var(--brand-blue)]"
                          }`}
                        >
                          {demo.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {activeDemo ? (
                    <>
                      <DemoIframe
                        url={activeDemo.liveUrl}
                        title={activeDemo.title}
                        poster={activeDemo.media}
                        posterAlt={activeDemo.mediaAlt}
                        envHint={demoEnvHints[activeDemo.id] ?? "NEXT_PUBLIC_DEMO_*_URL"}
                        embedAllowed={activeDemo.embedAllowed}
                        showViewportControls
                        className="h-[460px] md:h-[540px]"
                      />
                      <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                        {activeDemo.description}
                      </p>
                    </>
                  ) : null}
                </article>
              </LuxReveal>

              <LuxReveal delay={0.12} className="xl:col-span-5">
                <article className="lux-card-interactive p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                      <Sparkles className="h-3.5 w-3.5 text-[var(--brand-blue)]" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                        Simulateur interactif
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-semibold text-slate-900">
                      Estimez votre investissement
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600">
                      Sélectionnez votre type de solution et vos options clés pour une estimation
                      instantanée.
                    </p>

                    <div className="mt-5 space-y-5">
                      <div>
                        <p className="mb-2 lux-label !tracking-[0.2em]">Type de plateforme</p>
                        <div className="grid grid-cols-2 gap-2">
                          {(Object.keys(PLATFORM_BASE) as PlatformKey[]).map((key) => {
                            const active = selectedPlatform === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setSelectedPlatform(key)}
                                className={`rounded-xl border px-3 py-2 text-left text-xs transition-all ${
                                  active
                                    ? "border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white font-semibold shadow-sm"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-[var(--brand-blue)] hover:text-slate-950"
                                }`}
                              >
                                <div>{PLATFORM_BASE[key].label}</div>
                                <div className="text-[10px] opacity-80 mt-0.5 tabular-nums">
                                  dès {PLATFORM_BASE[key].price.toLocaleString("fr-FR")} F
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 lux-label !tracking-[0.2em]">Niveau d&apos;accompagnement</p>
                        <div className="grid grid-cols-3 gap-2">
                          {(Object.keys(TIMELINE_MULTIPLIER) as TimelineKey[]).map((key) => {
                            const active = selectedTimeline === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                onClick={() => setSelectedTimeline(key)}
                                className={`rounded-xl border px-2.5 py-2 text-center text-xs transition-all ${
                                  active
                                    ? "border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white font-semibold shadow-sm"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-[var(--brand-blue)] hover:text-slate-950"
                                }`}
                              >
                                <div>{TIMELINE_MULTIPLIER[key].label}</div>
                                <div className="text-[10px] opacity-80 mt-0.5">
                                  {TIMELINE_MULTIPLIER[key].note}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 lux-label !tracking-[0.2em]">Modules complémentaires</p>
                        <div className="grid grid-cols-2 gap-2">
                          {ADDON_OPTIONS.map((addon) => {
                            const active = selectedAddons.includes(addon.id);
                            return (
                              <button
                                key={addon.id}
                                type="button"
                                onClick={() => toggleAddon(addon.id)}
                                className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left text-[11px] transition-all ${
                                  active
                                    ? "border-[var(--brand-blue)] bg-[#eef2f9] text-slate-900 font-semibold"
                                    : "border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-950"
                                }`}
                              >
                                <span className="truncate">{addon.label}</span>
                                <span
                                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                                    active
                                      ? "bg-[var(--brand-blue)] text-white"
                                      : "bg-slate-200 text-slate-400"
                                  }`}
                                >
                                  <Check className="w-2.5 h-2.5" />
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="lux-label !tracking-[0.2em]">Estimation indicative</p>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--brand-blue)]">
                        <Clock3 className="w-3.5 h-3.5" />
                        {PLATFORM_BASE[selectedPlatform].weeks}
                      </span>
                    </div>
                    <p className="mt-2 lux-stat-number text-3xl md:text-4xl tabular-nums">
                      {quoteEstimate.toLocaleString("fr-FR")}{" "}
                      <span className="text-base font-normal text-slate-500">FCFA</span>
                    </p>
                    <p className="mt-1 text-[11px] text-slate-600">
                      Inclut hébergement guidé, tests multi-écrans &amp; prise en main.
                    </p>
                    <Link
                      href={devisHref}
                      className="lux-btn-primary mt-4 w-full !px-5 !py-3 text-sm inline-flex items-center justify-center gap-2"
                    >
                      Valider ce chiffrage en devis
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </LuxReveal>
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
            <div className="lux-section-premium relative overflow-hidden">
              <div className="lux-orb lux-orb-blue w-[280px] h-[280px] -top-20 -right-16 opacity-60" />
              <div className="lux-orb lux-orb-red w-[200px] h-[200px] bottom-0 left-1/4 opacity-40" />
              <div className="absolute inset-0 lux-noise" />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 mb-4 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 shadow-2xs">
                    <Layers className="w-3.5 h-3.5 text-[var(--brand-blue)]" />
                    <p className="lux-label !tracking-[0.24em]">Prêt à démarrer</p>
                  </div>
                  <h2 className="lux-heading text-3xl md:text-5xl leading-[1.06]">
                    Passez d&apos;une vitrine classique à une présence digitale mémorable
                  </h2>
                  <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
                    Construisons votre prochaine plateforme avec une direction artistique forte, une
                    vitesse exemplaire et un tunnel calibré pour convertir.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <Link
                    href="/book"
                    className="lux-btn-primary group inline-flex items-center justify-center gap-2 px-7 py-3.5"
                  >
                    Planifier un rendez-vous
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link href="/devis" className="lux-btn-ghost text-center px-7 py-3.5">
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
