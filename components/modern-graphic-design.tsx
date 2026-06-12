"use client";

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import Image3D from "@/components/ui/image-3d";
import { Palette, Brush, Layers, Sparkles } from "lucide-react";
import type { BrandAccent } from "@/lib/brand";
import { accentSolidBgClass } from "@/lib/brand-styles";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";

const ModernGraphicDesign = () => {
  const services: {
    icon: typeof Palette;
    title: string;
    description: string;
    image: string;
    accent: BrandAccent;
  }[] = [
    {
      icon: Palette,
      title: "Identité Visuelle",
      description: "Logos, chartes graphiques et identités de marque uniques",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
      accent: "blue",
    },
    {
      icon: Brush,
      title: "Design Print",
      description: "Affiches, flyers, brochures et supports de communication",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      accent: "red",
    },
    {
      icon: Layers,
      title: "Réseaux Sociaux",
      description: "Créations visuelles pour vos réseaux sociaux",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      accent: "blue",
    },
    {
      icon: Sparkles,
      title: "Packaging",
      description: "Design d'emballages attractifs et mémorables",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      accent: "red",
    },
  ];

  return (
    <div className="relative w-full py-20 overflow-hidden px-2">
      <div className="lux-section-premium lux-section-spotlight relative">
        <LuxSectionHeader
          label="Design"
          title="Conception Graphique"
          description="Nous créons des visuels époustouflants pour votre marque. Des logos aux publications sur les réseaux sociaux, nous avons tout ce qu'il vous faut."
          align="center"
          accent="red"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <LuxReveal key={service.title} delay={index * 0.1}>
              <CardContainer className="inter-var h-full">
                <CardBody className="lux-card-interactive relative group/card w-full h-full p-8">
                  <CardItem translateZ="50" className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-4 rounded-xl ${accentSolidBgClass(service.accent)}`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[var(--lux-champagne)]">
                        {service.title}
                      </h3>
                    </div>
                  </CardItem>

                  <CardItem translateZ="60" className="mb-4">
                    <Image3D
                      src={service.image}
                      alt={service.title}
                      width={500}
                      height={300}
                      className="rounded-xl w-full h-[250px] object-cover"
                    />
                  </CardItem>

                  <CardItem as="p" translateZ="60" className="lux-muted text-sm leading-relaxed">
                    {service.description}
                  </CardItem>
                </CardBody>
              </CardContainer>
            </LuxReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernGraphicDesign;
