"use client";

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Award, TrendingUp, Users, Star } from "lucide-react";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";

const brands = [
  {
    name: "TechCorp CI",
    monogram: "TC",
    sector: "Solutions B2B",
    description: "Refonte portail corporate et tunnel d'acquisition automatisé",
    stat: "+250% de croissance",
    accent: "blue" as const,
  },
  {
    name: "DigitalStore",
    monogram: "DS",
    sector: "Retail & E-commerce",
    description: "Boutique omnicanale avec paiement Mobile Money instantané",
    stat: "1M+ de sessions",
    accent: "red" as const,
  },
  {
    name: "CreativeAgency",
    monogram: "CA",
    sector: "Studio & Production",
    description: "Design system complet et vitrine éditoriale haute performance",
    stat: "500+ livrables",
    accent: "blue" as const,
  },
  {
    name: "StartupHub",
    monogram: "SH",
    sector: "Accélérateur Tech",
    description: "Plateforme SaaS et accompagnement de lancement multi-marques",
    stat: "50+ entreprises",
    accent: "red" as const,
  },
];

const ModernBrands = () => {
  return (
    <div className="relative w-full py-6 md:py-10 overflow-hidden">
      <div className="lux-section-premium lux-section-spotlight relative">
        <LuxSectionHeader
          indexLabel="03"
          label="Confiance & Impact"
          title="Des partenaires qui accélèrent avec nous"
          description="Des organisations exigeantes qui s'appuient sur notre ingénierie pour leur croissance digitale."
          align="center"
          accent="red"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {brands.map((brand, index) => (
            <LuxReveal key={brand.name} delay={index * 0.08} className="h-full flex">
              <CardContainer className="inter-var h-full w-full" containerClassName="w-full h-full">
                <CardBody
                  className={`lux-card-interactive relative group/card w-full h-full p-6 flex flex-col text-center ${
                    brand.accent === "red" ? "lux-card-accent-red" : ""
                  }`}
                >
                  <CardItem translateZ="12" className="mb-4 mx-auto">
                    <div
                      className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center font-display text-2xl font-bold text-white shadow-md ${
                        brand.accent === "red" ? "brand-bg-red" : "brand-bg-blue"
                      }`}
                    >
                      {brand.monogram}
                    </div>
                  </CardItem>

                  <CardItem translateZ="14" className="w-full mb-1.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 block mb-1 font-semibold">
                      {brand.sector}
                    </span>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      {brand.name}
                    </h3>
                  </CardItem>

                  <CardItem as="p" translateZ="12" className="text-slate-600 text-[13px] leading-relaxed mb-4 flex-grow w-full">
                    {brand.description}
                  </CardItem>

                  <CardItem
                    translateZ="16"
                    className="w-full pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5"
                  >
                    <TrendingUp
                      className={`w-3.5 h-3.5 ${brand.accent === "red"
                        ? "text-[var(--brand-red)]"
                        : "text-[var(--brand-blue)]"
                        }`}
                    />
                    <span
                      className={`text-xs font-semibold ${brand.accent === "red"
                        ? "text-[var(--brand-red)]"
                        : "text-[var(--brand-blue)]"
                        }`}
                    >
                      {brand.stat}
                    </span>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </LuxReveal>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, number: "500+", label: "Clients accompagnés" },
            { icon: Award, number: "1000+", label: "Projets livrés" },
            { icon: Star, number: "98%", label: "Satisfaction client" },
            { icon: TrendingUp, number: "10+", label: "Années d'expertise" },
          ].map((stat, index) => (
            <LuxReveal key={stat.label} delay={0.15 + index * 0.06}>
              <div
                className={`lux-card-kpi p-5 text-center ${
                  index % 2 === 0 ? "brand-border-blue" : "brand-border-red"
                }`}
              >
                <stat.icon
                  className={`w-6 h-6 mx-auto mb-2.5 ${index % 2 === 0 ? "text-[var(--brand-blue)]" : "text-[var(--brand-red)]"
                    }`}
                />
                <div
                  className={`font-display text-3xl font-bold mb-1 tabular-nums ${index % 2 === 0 ? "text-[var(--brand-blue)]" : "text-[var(--brand-red)]"
                    }`}
                >
                  {stat.number}
                </div>
                <div className="text-xs text-slate-600">{stat.label}</div>
              </div>
            </LuxReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernBrands;
