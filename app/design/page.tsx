"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Figma, Compass, PenTool, Sparkles, Check, Copy } from "lucide-react";
import { toast } from "sonner";
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
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = async (name: string, hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      toast.success(`Couleur ${name} (${hex}) copiée !`);
      setTimeout(() => setCopiedHex(null), 1800);
    } catch {
      toast.error("Copie automatique impossible.");
    }
  };

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
                  <div key={step.num} className="lux-card-subtle p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="w-4 h-4 text-[var(--brand-blue)]" />
                      <span className="font-mono text-[10px] font-semibold text-slate-500">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-display text-sm font-bold text-slate-900">{step.title}</h3>
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
              <div className="font-display text-2xl md:text-3xl text-slate-900 font-bold tracking-tight">
                Bricolage Grotesque · Titre Éditorial
              </div>
              <div className="text-sm text-slate-600 mt-1.5">
                Plus Jakarta Sans — Lisibilité UI, interfaces et données chiffrées.
              </div>
              <div className="font-mono text-xs text-[var(--brand-blue)] mt-1">
                JetBrains Mono — Indices techniques, métriques &amp; code.
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500 font-semibold">
                  Discipline Chromatique
                </p>
                <span className="text-[10px] text-slate-400">Cliquer pour copier</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { name: "Porcelain", hex: "#F7F9FC", cls: "bg-[#F7F9FC] text-slate-900 border-slate-200" },
                  { name: "Cobalt", hex: "#516699", cls: "bg-[#516699] text-white border-[#516699]" },
                  { name: "Crimson", hex: "#CC2628", cls: "bg-[#CC2628] text-white border-[#CC2628]" },
                  { name: "Ink", hex: "#0F172A", cls: "bg-[#0F172A] text-white border-[#0F172A]" },
                ].map((swatch) => {
                  const isCopied = copiedHex === swatch.hex;
                  return (
                    <button
                      key={swatch.name}
                      type="button"
                      onClick={() => handleCopyHex(swatch.name, swatch.hex)}
                      aria-label={`Copier la couleur ${swatch.name} ${swatch.hex}`}
                      className={`group/swatch rounded-xl border p-3 text-left text-[10px] font-mono transition-transform hover:-translate-y-0.5 ${swatch.cls}`}
                    >
                      <div className="flex items-center justify-between gap-1 font-semibold">
                        <span>{swatch.name}</span>
                        {isCopied ? (
                          <Check className="w-3 h-3 shrink-0" />
                        ) : (
                          <Copy className="w-3 h-3 opacity-55 group-hover/swatch:opacity-100 shrink-0 transition-opacity" />
                        )}
                      </div>
                      <div className="opacity-80 mt-1">{isCopied ? "Copié !" : swatch.hex}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </LuxReveal>

      <ModernGraphicDesign />
    </LuxPageLayout>
  );
}
