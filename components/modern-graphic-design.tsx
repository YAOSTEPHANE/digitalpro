"use client";

import Link from "next/link";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import Image3D from "@/components/ui/image-3d";
import { Palette, Brush, Layers, Sparkles, Check, ArrowRight } from "lucide-react";
import type { BrandAccent } from "@/lib/brand";
import { accentSolidBgClass } from "@/lib/brand-styles";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";

const services: {
  icon: typeof Palette;
  title: string;
  tag: string;
  description: string;
  deliverables: string[];
  image: string;
  accent: BrandAccent;
}[] = [
  {
    icon: Palette,
    title: "Identité Visuelle & Logos",
    tag: "Branding",
    description:
      "Logos vectoriels, palettes chromatiques, typographies et brandbooks complets pour ancrer votre autorité.",
    deliverables: ["Logo principal & déclinaisons", "Charte graphique PDF", "Fichiers SVG / Print"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    accent: "blue",
  },
  {
    icon: Layers,
    title: "UI/UX & Design Systems",
    tag: "Interfaces Figma",
    description:
      "Maquettes interactives web & mobile, parcours utilisateurs fluides et bibliothèques de composants réutilisables.",
    deliverables: ["Wireframes & parcours", "Prototype Figma cliquable", "Composants états & responsive"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
    accent: "red",
  },
  {
    icon: Brush,
    title: "Social Media & Campagnes",
    tag: "Visuels Ads",
    description:
      "Templates Instagram, LinkedIn, TikTok et bannières publicitaires conçus pour capter l'attention dès la première seconde.",
    deliverables: ["Kits stories & carrousels", "Visuels Ads haute conversion", "Direction photo"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    accent: "blue",
  },
  {
    icon: Sparkles,
    title: "Design Print & Packaging",
    tag: "Édition",
    description:
      "Plaquettes commerciales, flyers, packaging produit et signalétique prêts pour l'impression haute définition.",
    deliverables: ["Préparation CMJN 300 DPI", "Mockups 3D réalistes", "Suivi imprimeur"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    accent: "red",
  },
];

const ModernGraphicDesign = () => {
  return (
    <div className="relative w-full py-6 md:py-10 overflow-hidden">
      <div className="lux-section-premium lux-section-spotlight relative">
        <LuxSectionHeader
          indexLabel="02"
          label="Atelier Créatif"
          title="Conception Graphique & Direction Artistique"
          description="Des identités visuelles distinctives et des interfaces Figma calibrées pour inspirer confiance au premier regard."
          align="center"
          accent="red"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <LuxReveal key={service.title} delay={index * 0.08} className="h-full flex">
              <CardContainer className="inter-var h-full w-full" containerClassName="w-full h-full">
                <CardBody className="lux-card-interactive relative group/card w-full h-full p-6 md:p-7 flex flex-col">
                  <CardItem translateZ="45" className="mb-4 w-full">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className={`p-3 rounded-xl ${accentSolidBgClass(service.accent)}`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 block font-medium">
                            {service.tag}
                          </span>
                          <h3 className="font-display text-2xl font-semibold text-slate-900">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </CardItem>

                  <CardItem translateZ="55" className="mb-4 w-full">
                    <Image3D
                      src={service.image}
                      alt={service.title}
                      width={520}
                      height={300}
                      className="rounded-xl w-full h-[220px] object-cover"
                    />
                  </CardItem>

                  <CardItem as="p" translateZ="45" className="text-slate-600 text-sm leading-relaxed mb-4 w-full">
                    {service.description}
                  </CardItem>

                  <CardItem translateZ="60" className="w-full space-y-1.5 mb-5 flex-grow">
                    {service.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs text-slate-700"
                      >
                        <Check className="w-3.5 h-3.5 text-[var(--brand-blue)] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </CardItem>

                  <CardItem translateZ="70" className="w-full mt-auto pt-3 border-t border-slate-100">
                    <Link
                      href={`/devis?service=${encodeURIComponent("Conception UI/UX")}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--brand-blue)] hover:text-slate-900 transition-colors"
                    >
                      Demander une direction artistique
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
