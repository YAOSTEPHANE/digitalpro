"use client";

import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";
import ModernBrands from "@/components/modern-brands";

export default function TechnologiesPage() {
  const principles = [
    "Choix d'outils éprouvés et maintenables sur le long terme",
    "Priorité aux performances réelles sur mobile et desktop",
    "Architecture claire pour faciliter les évolutions futures",
    "Sécurité, sauvegarde et supervision dès la mise en ligne",
  ];

  return (
    <LuxPageLayout>
      <LuxSectionHeader
        label="Technologies"
        title="Une stack moderne choisie pour la vitesse, la fiabilité et la maintenance"
        description="Nous sélectionnons les outils les plus adaptés à vos objectifs pour garantir une base technique solide et durable."
      />

      <LuxReveal>
        <section className="mb-12 lux-section-premium">
          <h2 className="text-2xl font-semibold lux-heading mb-4">Nos principes techniques</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {principles.map((item) => (
              <p
                key={item}
                className="lux-muted text-sm rounded-xl lux-card-interactive p-4"
              >
                {item}
              </p>
            ))}
          </div>
        </section>
      </LuxReveal>

      <ModernBrands />
    </LuxPageLayout>
  );
}
