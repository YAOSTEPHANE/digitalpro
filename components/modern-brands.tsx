"use client";

import Image3D from "@/components/ui/image-3d";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Award, TrendingUp, Users, Star } from "lucide-react";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";

const brands = [
  {
    name: "TechCorp",
    logo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop",
    description: "Leader en solutions technologiques",
    stat: "+250% de croissance",
  },
  {
    name: "DigitalStore",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop",
    description: "E-commerce innovant",
    stat: "1M+ de clients",
  },
  {
    name: "CreativeAgency",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop",
    description: "Agence créative de renom",
    stat: "500+ projets",
  },
  {
    name: "StartupHub",
    logo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=200&fit=crop",
    description: "Accélérateur de startups",
    stat: "50+ entreprises",
  },
];

const ModernBrands = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden px-2">
      <div className="lux-section-premium lux-section-spotlight relative">
        <LuxSectionHeader
          label="Nos Partenaires"
          title="Des marques qui nous font confiance"
          description="Rejoignez les entreprises qui ont choisi digitalpro solutions pour leur transformation digitale"
          align="center"
          accent="red"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <LuxReveal key={brand.name} delay={index * 0.1}>
              <CardContainer className="inter-var h-full">
                <CardBody className="lux-card-interactive relative group/card w-full h-full p-6 brand-border-blue">
                  <CardItem translateZ="50" className="mb-4">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <Image3D
                        src={brand.logo}
                        alt={brand.name}
                        width={96}
                        height={96}
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                  </CardItem>

                  <CardItem
                    translateZ="60"
                    className="text-xl font-bold text-[var(--lux-champagne)] mb-2 text-center"
                  >
                    {brand.name}
                  </CardItem>

                  <CardItem as="p" translateZ="60" className="lux-muted text-sm mb-4 text-center">
                    {brand.description}
                  </CardItem>

                  <CardItem translateZ="80" className="flex items-center justify-center gap-2">
                    <TrendingUp
                      className={`w-4 h-4 ${index % 2 === 0 ? "text-[var(--brand-blue-light)]" : "text-[var(--brand-red-light)]"}`}
                    />
                    <span
                      className={`text-sm font-medium ${index % 2 === 0 ? "text-[var(--brand-blue-light)]" : "text-[var(--brand-red-light)]"}`}
                    >
                      {brand.stat}
                    </span>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </LuxReveal>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, number: "500+", label: "Clients satisfaits" },
            { icon: Award, number: "1000+", label: "Projets réalisés" },
            { icon: Star, number: "98%", label: "Taux de satisfaction" },
            { icon: TrendingUp, number: "10+", label: "Années d'expérience" },
          ].map((stat, index) => (
            <LuxReveal key={stat.label} delay={0.4 + index * 0.1}>
              <div
                className={`lux-card-interactive p-6 text-center ${index % 2 === 0 ? "brand-border-blue" : "brand-border-red"}`}
              >
                <stat.icon
                  className={`w-8 h-8 mx-auto mb-3 ${index % 2 === 0 ? "text-[var(--brand-blue-light)]" : "text-[var(--brand-red-light)]"}`}
                />
                <div
                  className={`text-3xl font-bold mb-2 ${index % 2 === 0 ? "text-[var(--brand-blue-light)]" : "text-[var(--brand-red-light)]"}`}
                >
                  {stat.number}
                </div>
                <div className="text-sm lux-muted">{stat.label}</div>
              </div>
            </LuxReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernBrands;
