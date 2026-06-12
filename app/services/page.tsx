"use client";

import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";
import ModernServices from "@/components/modern-services";

export default function ServicesPage() {
  const serviceTracks = [
    {
      title: "Acquisition",
      points: "SEO, contenu et campagnes pour attirer un trafic qualifié.",
    },
    {
      title: "Expérience",
      points: "Design, ergonomie et structure de pages pour guider la lecture.",
    },
    {
      title: "Conversion",
      points: "Offres, preuves et appels à l'action pour générer plus de demandes.",
    },
    {
      title: "Suivi",
      points: "Mesure continue et itérations mensuelles basées sur les données.",
    },
  ];

  return (
    <LuxPageLayout>
      <LuxSectionHeader
        label="Nos services"
        title="Des solutions digitales conçues pour accélérer votre croissance"
        description="Chaque service est pensé pour s'intégrer dans une stratégie globale : visibilité, expérience utilisateur et conversion."
      />

      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceTracks.map((track, index) => (
            <LuxReveal key={track.title} delay={index * 0.08}>
              <article className="lux-card-interactive p-5 h-full">
                <h2 className="text-xl font-semibold lux-heading mb-2">{track.title}</h2>
                <p className="lux-muted text-sm leading-relaxed">{track.points}</p>
              </article>
            </LuxReveal>
          ))}
        </div>
      </section>

      <div id="services">
        <ModernServices />
      </div>
    </LuxPageLayout>
  );
}
