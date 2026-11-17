"use client";

import Link from "next/link";
import { ArrowRight, Figma, Compass, PenTool, Sparkles } from "lucide-react";
import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";
import ModernGraphicDesign from "@/components/modern-graphic-design";

const creativeSteps = [
  {
    num: "01",
    icon: Compass,
    title: "Immersion & Brief",
    text: "Analyse de votre positionnement, de votre audience et de vos repères esthétiques.",
  },
  {
    num: "02",
    icon: Sparkles,
    title: "Moodboard & Direction",
    text: "Exploration typographique, palette chromatique disciplinée et principes graphiques.",
  },
  {
    num: "03",
    icon: Figma,
    title: "Prototypes Figma",
    text: "Maquettes interactives haute fidélité validées écran par écran avant production.",
  },
  {
    num: "04",
    icon: PenTool,
    title: "Kit & Transmission",
    text: "Livraison des sources vectorielles, guidelines et composants prêts pour vos équipes.",
  },
];

export default function DesignPage() {
  return (
    <LuxPageLayout breadcrumb="Design & UI/UX">
      <LuxSectionHeader
        indexLabel="01"
        label="Design & Direction Artistique"
        title="Une identité visuelle forte, claire et immédiatement reconnaissable"
        description="De la direction artistique aux interfaces Figma, chaque détail est pensé pour renforcer votre autorité de marque et fluidifier l'expérience utilisateur."
        accent="red"
        rightSlot={
          <Link
            href="/devis?service=Conception+d'identité+visuelle"
            className="lux-btn-accent !px-5 !py-2.5 text-sm gap-2"
          >
            Démarrer mon identité
            <ArrowRight className="w-4 h-4" />
          </Link>
        }
      />

      {/* Aperçu Design System */}
      <LuxReveal className="mb-10">
        <section className="lux-section-premium grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="lux-chip text-[11px]">Standard Studio Digitalpro</span>
            <h2 className="lux-heading text-2xl md:text-3xl">
              La cohérence visuelle comme multiplicateur de confiance
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Une marque crédible se reconnaît en moins d&apos;une seconde. Nous bâtissons des
              systèmes graphiques disciplinés où typographie éditoriale, contrastes maîtrisés et
              rythme d&apos;espacement servent directement la lisibilité et l&apos;acte d&apos;achat.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {creativeSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="lux-card-interactive p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="w-4 h-4 text-[var(--brand-blue)]" />
                      <span className="font-mono text-[10px] text-slate-500">{step.num}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">{step.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-snug">{step.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 lux-card-interactive p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-mono font-semibold text-[var(--brand-blue)]">
                brand-tokens.figma
              </span>
              <span className="lux-chip !py-0.5 text-[10px]">Aperçu Système</span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-2 font-semibold">
                Typographie &amp; Hiérarchie
              </p>
              <div className="font-display text-3xl text-slate-900 font-semibold">
                Cormorant Garamond · Titre Éditorial
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Outfit Geometric Sans — Lisibilité UI, interfaces et données chiffrées.
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-2 font-semibold">
                Discipline Chromatique
              </p>
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  { name: "Porcelain", hex: "#F7F9FC", cls: "bg-[#F7F9FC] text-slate-900 border-slate-200" },
                  { name: "Cobalt", hex: "#516699", cls: "bg-[#516699] text-white border-[#516699]" },
                  { name: "Crimson", hex: "#CC2628", cls: "bg-[#CC2628] text-white border-[#CC2628]" },
                  { name: "Ink", hex: "#0F172A", cls: "bg-[#0F172A] text-white border-[#0F172A]" },
                ].map((swatch) => (
                  <div
                    key={swatch.name}
                    className={`rounded-xl border p-3 text-[10px] font-mono ${swatch.cls}`}
                  >
                    <div className="font-semibold">{swatch.name}</div>
                    <div className="opacity-80 mt-1">{swatch.hex}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </LuxReveal>

      <ModernGraphicDesign />
    </LuxPageLayout>
  );
}
