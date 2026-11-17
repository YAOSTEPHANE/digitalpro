"use client";

import Image3D from "@/components/ui/image-3d";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Quote, Star, TrendingUp } from "lucide-react";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";

const stores = [
  {
    image: "/images/image2.png",
    quote: "Digitalpro Solutions nous a montré comment structurer notre catalogue, quoi automatiser et comment vendre dès la première semaine.",
    name: "Jason Scer",
    role: "CEO, TechStart",
    metric: "+135% conversion",
  },
  {
    image: "/images/shop-2.jpeg",
    quote: "Nous n'avions aucune idée de par où commencer, mais leur équipe nous a livré une boutique fluide avec paiement intégré qui génère des commandes chaque jour.",
    name: "John Prency",
    role: "Fondateur, E-Shop",
    metric: "Checkout < 40s",
  },
  {
    image: "/images/s-2.webp",
    quote: "L'équipe de Digitalpro Solutions est remarquable. Ils ont conçu une boutique élégante dont nos clients adorent l'expérience sur mobile.",
    name: "Miguel Martinez",
    role: "Directeur, FashionStore",
    metric: "+42% panier moyen",
  },
];

const ModernShopify = () => {
  return (
    <section className="relative w-full py-6 md:py-10 overflow-hidden">
      <div className="lux-section-premium lux-section-spotlight relative">
        <LuxSectionHeader
          indexLabel="02"
          label="Retours Marchands"
          title="Des boutiques conçues pour transformer le trafic en ventes"
          description="Shopify, Next.js Headless et tunnels optimisés mobile pour maximiser vos encaissements."
          align="center"
          accent="red"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stores.map((store, index) => (
            <LuxReveal key={store.name} delay={index * 0.08} className="h-full flex">
              <CardContainer className="inter-var h-full w-full" containerClassName="w-full h-full">
                <CardBody className="lux-card-interactive relative group/card w-full h-full p-6 flex flex-col">
                  <CardItem translateZ="45" className="mb-5 w-full">
                    <div className="relative overflow-hidden rounded-xl">
                      <Image3D
                        src={store.image}
                        alt={`Boutique ${store.name}`}
                        width={400}
                        height={260}
                        className="rounded-xl w-full h-[210px] object-cover"
                      />
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full brand-bg-red px-3 py-1 text-[11px] font-semibold shadow-md">
                        <TrendingUp className="w-3 h-3" />
                        {store.metric}
                      </span>
                    </div>
                  </CardItem>

                  <CardItem translateZ="55" className="mb-4 w-full flex-grow">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Quote className="w-6 h-6 text-[var(--brand-red)] flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                        &ldquo;{store.quote}&rdquo;
                      </p>
                    </div>
                  </CardItem>

                  <CardItem translateZ="65" className="w-full mt-auto pt-4 border-t border-slate-100">
                    <p className="text-slate-900 font-semibold text-base">{store.name}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{store.role}</p>
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
