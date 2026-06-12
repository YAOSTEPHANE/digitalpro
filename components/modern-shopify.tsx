"use client";

import Image3D from "@/components/ui/image-3d";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Quote } from "lucide-react";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";

const stores = [
  {
    image: "/images/image2.png",
    quote: "Digitalpro Solutions nous a montré comment commencer, quoi faire et comment le faire.",
    name: "Jason Scer",
    role: "CEO, TechStart",
  },
  {
    image: "/images/shop-2.jpeg",
    quote: "Nous n'avions aucune idée de par où commencer, mais Digitalpro Solutions nous a montré le chemin. Et nous avons pu créer quelque chose d'incroyable.",
    name: "John Prency",
    role: "Fondateur, E-Shop",
  },
  {
    image: "/images/s-2.webp",
    quote: "L'équipe de Digitalpro Solutions est incroyable. Ils nous ont aidés à créer une boutique magnifique dont nous sommes fiers.",
    name: "Miguel Martinez",
    role: "Directeur, FashionStore",
  },
];

const ModernShopify = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden px-2">
      <div className="lux-section-premium lux-section-spotlight relative">
        <LuxSectionHeader
          label="E-commerce"
          title="Shopify Boutique"
          description="Des boutiques Shopify conçues pour convertir les visiteurs en clients"
          align="center"
          accent="red"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stores.map((store, index) => (
            <LuxReveal key={store.name} delay={index * 0.1}>
              <CardContainer className="inter-var h-full">
                <CardBody className="lux-card-interactive relative group/card w-full h-full p-8 flex flex-col">
                  <CardItem translateZ="50" className="mb-6">
                    <Image3D
                      src={store.image}
                      alt={`Boutique ${store.name}`}
                      width={400}
                      height={300}
                      className="rounded-xl w-full h-[250px] object-cover"
                    />
                  </CardItem>

                  <CardItem translateZ="60" className="mb-4">
                    <div className="flex items-start gap-3">
                      <Quote className="w-8 h-8 text-[var(--brand-red-light)] flex-shrink-0 mt-1" />
                      <p className="text-[var(--lux-champagne)] font-medium text-lg leading-relaxed">
                        &quot;{store.quote}&quot;
                      </p>
                    </div>
                  </CardItem>

                  <CardItem translateZ="80" className="mt-auto">
                    <div className="border-t border-[rgba(81,102,153,0.22)] pt-4">
                      <p className="text-[var(--lux-champagne)] font-bold text-lg">{store.name}</p>
                      <p className="lux-muted text-sm">{store.role}</p>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </LuxReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernShopify;
