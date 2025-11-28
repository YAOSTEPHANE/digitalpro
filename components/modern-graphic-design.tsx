"use client";

import { motion } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import Image3D from "@/components/ui/image-3d";
import { Palette, Brush, Layers, Sparkles } from "lucide-react";

const ModernGraphicDesign = () => {
  const services = [
    {
      icon: Palette,
      title: "Identité Visuelle",
      description: "Logos, chartes graphiques et identités de marque uniques",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Brush,
      title: "Design Print",
      description: "Affiches, flyers, brochures et supports de communication",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Layers,
      title: "Réseaux Sociaux",
      description: "Créations visuelles pour vos réseaux sociaux",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Sparkles,
      title: "Packaging",
      description: "Design d'emballages attractifs et mémorables",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      color: "from-green-500 to-emerald-500"
    },
  ];

  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-black" />
      
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
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-red-500 to-blue-300">
              Conception Graphique
            </span>
          </h2>
          <p className="mt-4 text-lg font-normal text-neutral-300 max-w-lg text-center mx-auto">
            Nous créons des visuels époustouflants pour votre marque. Des logos
            aux publications sur les réseaux sociaux, nous avons tout ce qu&apos;il
            vous faut.
          </p>
        </motion.div>

        {/* Grille de services avec cartes 3D */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardContainer className="inter-var h-full">
                <CardBody className={`bg-gradient-to-br ${service.color} relative group/card w-full h-full rounded-3xl p-8 hover:shadow-2xl transition-all`}>
                  <CardItem translateZ="50" className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
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
                  
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-white/90 text-sm leading-relaxed"
                  >
                    {service.description}
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernGraphicDesign;


