"use client";

import { motion } from "framer-motion";
import Image3D from "@/components/ui/image-3d";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Quote } from "lucide-react";

const stores = [
  {
    image: "/images/image2.png",
    quote: "Digitalpro Solutions nous a montré comment commencer, quoi faire et comment le faire.",
    name: "Jason Scer",
    role: "CEO, TechStart"
  },
  {
    image: "/images/shop-2.jpeg",
    quote: "Nous n'avions aucune idée de par où commencer, mais Digitalpro Solutions nous a montré le chemin. Et nous avons pu créer quelque chose d'incroyable.",
    name: "John Prency",
    role: "Fondateur, E-Shop"
  },
  {
    image: "/images/s-2.webp",
    quote: "L'équipe de Digitalpro Solutions est incroyable. Ils nous ont aidés à créer une boutique magnifique dont nous sommes fiers.",
    name: "Miguel Martinez",
    role: "Directeur, FashionStore"
  },
];

const ModernShopify = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Background avec gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-600">
              Shopify Boutique
            </span>
          </h2>
          <p className="mt-4 text-lg font-normal text-neutral-700 max-w-lg text-center mx-auto">
            Des boutiques Shopify conçues pour convertir les visiteurs en clients
          </p>
        </motion.div>

        {/* Grille de témoignages avec cartes 3D */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stores.map((store, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardContainer className="inter-var h-full">
                <CardBody className="bg-white border border-neutral-200 relative group/card w-full h-full rounded-3xl p-8 hover:shadow-2xl transition-all">
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
                      <Quote className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                      <p className="text-neutral-800 font-medium text-lg leading-relaxed">
                        &quot;{store.quote}&quot;
                      </p>
                    </div>
                  </CardItem>
                  
                  <CardItem translateZ="80" className="mt-auto">
                    <div className="border-t border-neutral-200 pt-4">
                      <p className="text-neutral-900 font-bold text-lg">
                        {store.name}
                      </p>
                      <p className="text-neutral-600 text-sm">
                        {store.role}
                      </p>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernShopify;


