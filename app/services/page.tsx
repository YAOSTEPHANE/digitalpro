"use client";

import Link from "next/link";
import { ArrowRight, Compass, Layers, Target, LineChart, ShieldCheck } from "lucide-react";
import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";
import ModernServices from "@/components/modern-services";

const serviceTracks = [
  {
    num: "01",
    icon: Compass,
    title: "Acquisition",
    points: "SEO technique, contenus d'autorité et campagnes publicitaires pour attirer un trafic qualifié.",
    metric: "Visibilité Google & Ads",
    accent: "blue" as const,
  },
  {
    num: "02",
    icon: Layers,
    title: "Expérience",
    points: "Direction artistique, ergonomie mobile et architecture éditoriale pour guider l'attention.",
    metric: "UI/UX sur mesure",
    accent: "red" as const,
  },
  {
    num: "03",
    icon: Target,
    title: "Conversion",
    points: "Propositions de valeur claires, preuves sociales et tunnels courts qui génèrent des demandes.",
    metric: "Parcours optimisés",
    accent: "blue" as const,
  },
  {
    num: "04",
    icon: LineChart,
    title: "Pilotage",
    points: "Instrumentation analytics, maintenance proactive et itérations mensuelles basées sur la donnée.",
    metric: "Croissance continue",
    accent: "red" as const,
  },
];

export default function ServicesPage() {
  return (
    <LuxPageLayout breadcrumb="Services">
      <LuxSectionHeader
        indexLabel="01"
        label="Nos services"
        title="Des solutions digitales conçues pour accélérer votre croissance"
        description="Chaque prestation s'intègre dans un écosystème cohérent : visibilité qualifiée, expérience irréprochable et conversion mesurable."
        rightSlot={
          <div className="flex flex-wrap gap-3">
            <Link href="/devis" className="lux-btn-primary !px-5 !py-2.5 text-sm gap-2">
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/book" className="lux-btn-ghost !px-5 !py-2.5 text-sm">
              Prendre RDV
            </Link>
          </div>
        }
      />

      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceTracks.map((track, index) => {
            const Icon = track.icon;
            return (
              <LuxReveal key={track.title} delay={index * 0.06}>
                <article className="lux-card-interactive p-5 md:p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`lux-icon-badge ${
                        track.accent === "red" ? "lux-icon-badge-red" : ""
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          track.accent === "red"
                            ? "text-[var(--brand-red-light)]"
                            : "text-[var(--brand-blue-light)]"
                        }`}
                      />
                    </div>
                    <span className="font-mono text-xs lux-muted">{track.num}</span>
                  </div>
                  <h2 className="text-xl font-semibold lux-heading mb-2">{track.title}</h2>
                  <p className="lux-muted text-sm leading-relaxed flex-grow">{track.points}</p>
                  <div className="mt-4 pt-3 border-t border-[rgba(124,144,201,0.14)] text-[11px] font-medium text-[var(--brand-blue-light)]">
                    {track.metric}
                  </div>
                </article>
              </LuxReveal>
            );
          })}
        </div>
      </section>

      <div id="services">
        <ModernServices />
      </div>

      <LuxReveal delay={0.1} className="mt-10">
        <section className="lux-section-premium flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue-light)] mb-2">
              <ShieldCheck className="w-4 h-4" />
              Engagement Digitalpro
            </div>
            <h2 className="lux-heading text-2xl md:text-3xl mb-2">
              Vous hésitez sur le bon périmètre pour votre entreprise ?
            </h2>
            <p className="lux-muted text-sm md:text-base">
              Réservez une session stratégique gratuite de 30 minutes : nous cadrons vos priorités
              et vous recommandons uniquement les leviers utiles.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/book" className="lux-btn-primary gap-2 text-sm">
              Consultation gratuite
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/facture" className="lux-btn-ghost text-sm">
              Voir les tarifs
            </Link>
          </div>
        </section>
      </LuxReveal>
    </LuxPageLayout>
  );
}
