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
    description: "Sites web modernes et performants adaptés à vos besoins",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    accent: "blue" as BrandAccent,
    link: "/contact",
  },
  {
    icon: Smartphone,
    title: "Applications Mobile",
    description: "Applications iOS et Android natives et cross-platform",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    accent: "red" as BrandAccent,
    link: "/contact",
  },
  {
    icon: TrendingUp,
    title: "SEO & Marketing",
    description: "SEO, réseaux sociaux et stratégies de croissance digitale",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    accent: "blue" as BrandAccent,
    link: "/contact",
  },
  {
    icon: Palette,
    title: "Conception UI/UX",
    description: "Design centré utilisateur pour une expérience optimale",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
    accent: "red" as BrandAccent,
    link: "/contact",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Solutions de vente en ligne complètes et performantes",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    accent: "blue" as BrandAccent,
    link: "/contact",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Support technique et maintenance continue de vos solutions",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    accent: "red" as BrandAccent,
    link: "/contact",
  },
];

const ModernServices = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden px-2">
      <div className="lux-section-premium lux-section-spotlight relative">
        <LuxSectionHeader
          label="Services"
          title="Optimisez votre entreprise grâce à nos services"
          description="De la conception de sites Web à la gestion des médias sociaux, nous offrons une large gamme de services pour vous aider à développer votre entreprise."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <LuxReveal key={service.title} delay={index * 0.1} className="h-full flex">
              <CardContainer className="inter-var h-full w-full">
                <CardBody className="lux-card-interactive relative group/card w-full h-full p-6 flex flex-col">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-[var(--lux-champagne)] mb-2 flex-shrink-0"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl flex-shrink-0 ${accentSolidBgClass(service.accent)}`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="line-clamp-2">{service.title}</span>
                    </div>
                  </CardItem>

                  <CardItem translateZ="60" className="mb-4 flex-shrink-0">
                    <Image3D
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={250}
                      className="rounded-xl w-full h-[200px] object-cover"
                    />
                  </CardItem>

                  <CardItem
                    as="p"
                    translateZ="60"
                    className="lux-muted text-sm mb-6 flex-grow min-h-[60px]"
                  >
                    {service.description}
                  </CardItem>

                  <CardItem translateZ="100" className="w-full mt-auto flex-shrink-0">
                    <Link
                      href={service.link}
                      className={`flex items-center justify-center gap-2 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 w-full ${accentSolidBgClass(service.accent)}`}
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4" />
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
