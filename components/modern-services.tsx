"use client";

import Image3D from "@/components/ui/image-3d";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import {
  Globe,
  Smartphone,
  TrendingUp,
  Palette,
  ShoppingCart,
  Wrench,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";
import type { BrandAccent } from "@/lib/brand";
import { accentSolidBgClass } from "@/lib/brand-styles";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";

const services = [
  {
    icon: Globe,
    title: "Développement Web",
    tag: "Sites & Plateformes",
    description: "Sites vitrines prestige, portails corporate et applications web Next.js ultra-rapides.",
    deliverables: ["Architecture SEO native", "Score Lighthouse 95+", "Interface responsive"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    accent: "blue" as BrandAccent,
    link: "/sites-web",
    devisService: "Développement de site web",
  },
  {
    icon: Smartphone,
    title: "Applications Mobile",
    tag: "iOS & Android",
    description: "Applications mobiles et solutions métier temps réel conçues pour l'usage quotidien.",
    deliverables: ["Expérience tactile fluide", "Notifications push", "Synchronisation API"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    accent: "red" as BrandAccent,
    link: "/devis?service=Développement+d'application+mobile",
    devisService: "Développement d'application mobile",
  },
  {
    icon: TrendingUp,
    title: "SEO & Marketing",
    tag: "Acquisition",
    description: "Référencement Google, campagnes Meta/TikTok Ads et pilotage analytique orienté ROI.",
    deliverables: ["Audit mots-clés & technique", "Tracking GA4 / Pixel", "Rapports de conversion"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    accent: "blue" as BrandAccent,
    link: "/devis?service=SEO+%26+Référencement",
    devisService: "SEO & Référencement",
  },
  {
    icon: Palette,
    title: "Conception UI/UX",
    tag: "Direction Artistique",
    description: "Design centré utilisateur, identités de marque distinctives et prototypes Figma.",
    deliverables: ["Design System cohérent", "Prototypage interactif", "Identité & charte"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
    accent: "red" as BrandAccent,
    link: "/design",
    devisService: "Conception UI/UX",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    tag: "Vente en ligne",
    description: "Boutiques Shopify et plateformes sur mesure optimisées pour le panier moyen.",
    deliverables: ["Wave / Orange Money / Cartes", "Checkout en 1 page", "Relance paniers"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    accent: "blue" as BrandAccent,
    link: "/e-commerce",
    devisService: "E-commerce",
  },
  {
    icon: Wrench,
    title: "Maintenance & Cloud",
    tag: "Fiabilité 24/7",
    description: "Support technique réactif, sécurité continue, sauvegardes et évolutions mensuelles.",
    deliverables: ["Monitoring proactif", "Sauvegardes chiffrées", "Interventions prioritaires"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    accent: "red" as BrandAccent,
    link: "/technologies",
    devisService: "Maintenance informatique",
  },
];

const ModernServices = () => {
  return (
    <div className="relative w-full py-6 md:py-10 overflow-hidden">
      <div className="lux-section-premium lux-section-spotlight relative">
        <LuxSectionHeader
          indexLabel="02"
          label="Nos Expertises"
          title="Optimisez votre entreprise grâce à nos services"
          description="De la direction artistique au déploiement full-stack et à l'acquisition, chaque pôle collabore pour maximiser votre impact."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <LuxReveal key={service.title} delay={index * 0.06} className="h-full flex">
              <CardContainer className="inter-var h-full w-full" containerClassName="w-full h-full">
                <CardBody
                  className={`lux-card-interactive relative group/card w-full h-full p-6 flex flex-col ${
                    service.accent === "red" ? "lux-card-accent-red" : ""
                  }`}
                >
                  <CardItem translateZ="14" className="w-full mb-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl flex-shrink-0 ${accentSolidBgClass(service.accent)}`}>
                        <service.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 block font-semibold">
                          {service.tag}
                        </span>
                        <h3 className="font-display text-xl font-bold text-slate-900">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </CardItem>

                  <CardItem translateZ="16" className="mb-4 w-full flex-shrink-0">
                    <div className="relative overflow-hidden rounded-xl">
                      <Image3D
                        src={service.image}
                        alt={service.title}
                        width={420}
                        height={240}
                        className="rounded-xl w-full h-[185px] object-cover"
                      />
                    </div>
                  </CardItem>

                  <CardItem as="p" translateZ="12" className="text-slate-600 text-sm leading-relaxed mb-4 w-full">
                    {service.description}
                  </CardItem>

                  <CardItem translateZ="14" className="w-full mb-5 space-y-1.5 flex-grow">
                    {service.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-[13px] text-slate-700"
                      >
                        <Check className="w-3.5 h-3.5 text-[var(--brand-blue)] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </CardItem>

                  <CardItem translateZ="16" className="w-full mt-auto pt-3 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      href={service.link}
                      className={`flex-1 gap-2 !py-2.5 !px-4 text-xs ${
                        service.accent === "red" ? "lux-btn-accent" : "lux-btn-primary"
                      }`}
                    >
                      Explorer
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/devis?service=${encodeURIComponent(service.devisService)}`}
                      className="lux-btn-ghost !px-3.5 !py-2 text-xs"
                    >
                      Devis
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

export default ModernServices;
