'use client'

import { useMemo, useState } from "react";
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
import { ArrowRight, Sparkles } from "lucide-react";

const demoEnvHints: Record<string, string> = {
  "ny-immobilier": "NEXT_PUBLIC_DEMO_WEB_URL",
  "enregistreur-caisse": "NEXT_PUBLIC_DEMO_MOBILE_URL",
};

const PLATFORM_BASE: Record<"vitrine" | "ecommerce" | "saas", number> = {
  vitrine: 180_000,
  ecommerce: 520_000,
  saas: 980_000,
};

const TIMELINE_MULTIPLIER: Record<"express" | "standard" | "premium", number> = {
  express: 1.3,
  standard: 1,
  premium: 1.6,
};

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState<"vitrine" | "ecommerce" | "saas">("vitrine");
  const [selectedTimeline, setSelectedTimeline] = useState<"express" | "standard" | "premium">("standard");
  const [selectedDemoId, setSelectedDemoId] = useState(demoApps[0]?.id ?? "");

  const quoteEstimate = useMemo(
    () => Math.round(PLATFORM_BASE[selectedPlatform] * TIMELINE_MULTIPLIER[selectedTimeline]),
    [selectedPlatform, selectedTimeline]
  );

  const processSteps = [
    {
      title: "Audit & positionnement",
      text: "Analyse de votre marché, de vos pages actuelles et de vos leviers d'acquisition.",
      accent: "blue" as const,
    },
    {
      title: "Direction créative",
      text: "Maquettes orientées conversion avec identité visuelle cohérente et contenus utiles.",
      accent: "red" as const,
    },
    {
      title: "Développement & performance",
      text: "Intégration rapide, animations fluides, SEO technique et optimisation mobile.",
      accent: "blue" as const,
    },
    {
      title: "Suivi & croissance",
      text: "Mesure continue, ajustements mensuels et itérations sur les éléments clés.",
      accent: "red" as const,
    },
  ];

  const learningBlocks = [
    {
      title: "Pourquoi votre site ne convertit pas",
      text: "Nous identifions les points de friction qui bloquent vos demandes: message flou, pages lentes, CTA mal placés ou parcours trop long.",
    },
    {
      title: "Ce qui augmente vraiment les demandes",
      text: "Positionnement clair, preuve sociale, structure orientée décision, vitesse mobile et formulaires courts sont les leviers les plus efficaces.",
    },
    {
      title: "Comment piloter les résultats",
      text: "Vous suivez les bons indicateurs: trafic qualifié, taux de conversion, coût d'acquisition et qualité des leads.",
    },
  ];

  const activeDemo = demoApps.find((demo) => demo.id === selectedDemoId) ?? demoApps[0];

  return (
    <div className="lux-page-shell w-full md:items-center md:justify-center relative overflow-hidden">
      <StarsBackground />
      <ModernNavbar
        scrollToWebsiteDesign={() => {}}
        scrollToGraphicDesign={() => {}}
        scrollToShopifyStores={() => {}}
        scrollToBrands={() => {}}
        scrollToServices={() => {}}
      />

      <Spotlight className="hidden md:flex md:-top-80 left-80 opacity-35" fill="#516699" />

      <ModernHero />

      <div className="p-4 mx-auto relative z-10 w-full px-2 max-w-7xl">
        <div className="w-full pt-12">
          <ModernSlider />
        </div>

        <section className="mt-16 mb-12 px-2">
          <div className="lux-section-premium lux-section-spotlight">
            <LuxSectionHeader
              label="Notre approche"
              title="Une méthode claire pour un site qui marque les esprits"
              description="Quatre étapes structurées, de l'audit à la croissance, pour transformer votre présence en ligne."
            />
            <div className="lux-process-grid">
              {processSteps.map((step, index) => (
                <LuxReveal key={step.title} delay={index * 0.08}>
                  <article className="lux-card-interactive p-5 md:p-6 h-full">
                    <span
                      className={`lux-step-badge mb-4 ${step.accent === "red" ? "lux-step-badge-red" : ""}`}
                    >
                      {index + 1}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-[var(--lux-champagne)] mb-2">
                      {step.title}
                    </h3>
                    <p className="lux-muted text-sm leading-relaxed">{step.text}</p>
                  </article>
                </LuxReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14 px-2">
          <div className="lux-section-premium">
            <LuxSectionHeader
              label="Comprendre pour mieux décider"
              title="Un site utile informe, rassure et fait agir"
              accent="red"
            />
            <div className="grid md:grid-cols-3 gap-4">
              {learningBlocks.map((item, index) => (
                <LuxReveal key={item.title} delay={index * 0.1}>
                  <article className="lux-card-interactive p-5 md:p-6 h-full">
                    <div
                      className={`mb-3 h-0.5 w-8 rounded-full ${index % 2 === 0 ? "bg-[var(--brand-blue-light)]" : "bg-[var(--brand-red-light)]"}`}
                    />
                    <h3 className="font-display text-lg font-semibold text-[var(--lux-champagne)] mb-2">
                      {item.title}
                    </h3>
                    <p className="lux-muted text-sm leading-relaxed">{item.text}</p>
                  </article>
                </LuxReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14 px-2">
          <div className="lux-section-premium">
            <LuxSectionHeader
              label="Démos interactives"
              title="Testez nos applications SaaS en direct"
              description="Applications en ligne, utilisables immédiatement sans compte. Explorez l'interface et le niveau de finition avant de lancer votre projet."
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {demoApps.map((demo, index) => (
                <LuxReveal key={demo.id} delay={index * 0.12}>
                  <article className="lux-card-interactive overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(81,102,153,0.15)] px-5 py-3">
                      <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${accentBadgeClass(demo.accent)}`}>
                        {demo.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(81,102,153,0.35)] bg-[rgba(81,102,153,0.08)] px-2.5 py-1 text-[10px] font-semibold text-[var(--brand-blue-light)]">
                        <span
                          className={`h-1.5 w-1.5 rounded-full animate-pulse ${demo.accent === "red" ? "bg-[var(--brand-red)]" : "bg-[var(--brand-blue-light)]"}`}
                        />
                        LIVE
                      </span>
                    </div>

                    <div className="p-4">
                      <DemoIframe
                        url={demo.liveUrl}
                        title={demo.title}
                        poster={demo.media}
                        posterAlt={demo.mediaAlt}
                        envHint={demoEnvHints[demo.id] ?? "NEXT_PUBLIC_DEMO_*_URL"}
                        embedAllowed={demo.embedAllowed}
                        className="h-[360px] md:h-[420px]"
                      />
                    </div>

                    <div className="px-5 pb-5">
                      <h3 className="font-display text-xl font-semibold text-[var(--lux-champagne)]">{demo.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed lux-muted">{demo.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {demo.bullets.map((item) => (
                          <span key={item} className="lux-chip">
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-3">
                        {demo.liveUrl ? (
                          <a
                            href={demo.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lux-btn-primary !px-5 !py-2.5 text-sm"
                          >
                            Ouvrir l&apos;app live
                          </a>
                        ) : null}
                        <a href={demo.cta} className="lux-btn-ghost !px-5 !py-2.5 text-sm">
                          {demo.ctaLabel}
                        </a>
                      </div>
                    </div>
                  </article>
                </LuxReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14 px-2">
          <div className="lux-section-premium lux-section-spotlight">
            <LuxSectionHeader
              label="Expérience immersive"
              title="Naviguez dans nos applications comme un vrai utilisateur"
              accent="red"
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <LuxReveal className="xl:col-span-2">
                <article className="lux-card-interactive p-5 md:p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {demoApps.map((demo) => (
                      <button
                        key={demo.id}
                        type="button"
                        onClick={() => setSelectedDemoId(demo.id)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                          selectedDemoId === demo.id
                            ? accentChipActiveClass(demo.accent)
                            : "lux-chip hover:border-[rgba(81,102,153,0.4)]"
                        }`}
                      >
                        {demo.title}
                      </button>
                    ))}
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
                        className="h-[520px] md:h-[600px]"
                      />
                      <p className="mt-4 text-sm lux-muted leading-relaxed">{activeDemo.description}</p>
                    </>
                  ) : null}
                </article>
              </LuxReveal>

              <LuxReveal delay={0.15}>
                <article className="lux-card-interactive p-5 md:p-6 h-full flex flex-col">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(81,102,153,0.35)] bg-[rgba(81,102,153,0.08)] px-3 py-1.5 w-fit">
                    <Sparkles className="h-3.5 w-3.5 text-[var(--brand-blue-light)]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue-light)]">
                      Simulateur
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[var(--lux-champagne)]">
                    Estimation de projet
                  </h3>
                  <p className="mt-2 text-sm lux-muted">
                    Mini simulateur pour chiffrer votre site ou application en temps réel.
                  </p>
                  <div className="mt-5 space-y-5 flex-1">
                    <div>
                      <p className="mb-2 lux-label !tracking-[0.2em]">Type de projet</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: "vitrine", label: "Site vitrine" },
                          { id: "ecommerce", label: "E-commerce" },
                          { id: "saas", label: "SaaS" },
                        ].map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setSelectedPlatform(option.id as "vitrine" | "ecommerce" | "saas")}
                            className={`rounded-full border px-3 py-1.5 text-xs transition ${
                              selectedPlatform === option.id ? "lux-chip-active" : "lux-chip"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 lux-label !tracking-[0.2em]">Accompagnement</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: "express", label: "Express" },
                          { id: "standard", label: "Standard" },
                          { id: "premium", label: "Premium+" },
                        ].map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setSelectedTimeline(option.id as "express" | "standard" | "premium")}
                            className={`rounded-full border px-3 py-1.5 text-xs transition ${
                              selectedTimeline === option.id ? "lux-chip-active" : "lux-chip"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-[rgba(81,102,153,0.25)] bg-[rgba(255,255,255,0.03)] p-5 backdrop-blur-sm">
                      <p className="lux-label !tracking-[0.2em]">Estimation instantanée</p>
                      <p className="mt-2 lux-stat-number text-3xl md:text-4xl">
                        {quoteEstimate.toLocaleString("fr-FR")}{" "}
                        <span className="text-lg font-normal text-[var(--lux-muted)]">FCFA</span>
                      </p>
                      <p className="mt-1 text-[11px] lux-muted">Fourchette indicative · devis personnalisé sur demande</p>
                      <a href="/devis" className="lux-btn-primary mt-4 !px-4 !py-2.5 text-sm inline-flex items-center gap-2">
                        Lancer mon devis complet
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              </LuxReveal>
            </div>
          </div>
        </section>

        <BlackFriday />
        <DailyMarketingTips />
        <ServicesVideo
          videoId="VOTRE_ID_YOUTUBE"
          title="Découvrez nos services en vidéo"
          description="Une présentation complète de nos solutions digitales pour transformer votre entreprise"
        />

        <section className="my-16 px-2">
          <LuxReveal>
            <div className="lux-section-premium relative overflow-hidden">
              <div className="lux-orb lux-orb-blue w-[280px] h-[280px] -top-20 -right-16 opacity-40" />
              <div className="lux-orb lux-orb-red w-[200px] h-[200px] bottom-0 left-1/4 opacity-30" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(81,102,153,0.16),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(204,38,40,0.1),transparent_40%)]" />
              <div className="absolute inset-0 lux-noise" />
              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="lux-accent-line" aria-hidden />
                  <p className="lux-label !tracking-[0.28em]">Prêt à démarrer</p>
                </div>
                <h2 className="lux-heading text-3xl md:text-5xl lg:text-[3.25rem] leading-[1.06]">
                  Passez d&apos;une vitrine classique à une présence digitale mémorable
                </h2>
                <p className="mt-5 text-base md:text-lg lux-muted leading-relaxed font-light max-w-2xl">
                  Nous construisons votre nouveau site avec une identité forte, des performances solides et un parcours
                  pensé pour convertir.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="/book" className="lux-btn-primary group inline-flex items-center gap-2">
                    Planifier un rendez-vous
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a href="/devis" className="lux-btn-ghost">
                    Obtenir un devis détaillé
                  </a>
                </div>
              </div>
            </div>
          </LuxReveal>
        </section>
      </div>
    </div>
  );
}
