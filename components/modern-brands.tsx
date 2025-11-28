"use client";

import { motion } from "framer-motion";
import Image3D from "@/components/ui/image-3d";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { Award, TrendingUp, Users, Star } from "lucide-react";

const brands = [
  {
    name: "TechCorp",
    logo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=200&fit=crop",
    description: "Leader en solutions technologiques",
    stat: "+250% de croissance"
  },
  {
    name: "DigitalStore",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop",
    description: "E-commerce innovant",
    stat: "1M+ de clients"
  },
  {
    name: "CreativeAgency",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop",
    description: "Agence créative de renom",
    stat: "500+ projets"
  },
  {
    name: "StartupHub",
    logo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=200&fit=crop",
    description: "Accélérateur de startups",
    stat: "50+ entreprises"
  },
];

const ModernBrands = () => {
  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background avec effet de particules */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-2 mb-6">
            <Award className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-300 font-medium">Nos Partenaires</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-blue-400 to-blue-500">
              Des marques qui nous font confiance
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Rejoignez les entreprises qui ont choisi digitalpro solutions pour leur transformation digitale
          </p>
        </motion.div>

        {/* Grille de marques avec cartes 3D */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardContainer className="inter-var h-full">
                <CardBody className="bg-gradient-to-br from-neutral-900/90 to-black border border-red-500/20 relative group/card w-full h-full rounded-2xl p-6 hover:border-red-500/40 transition-all">
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
                    className="text-xl font-bold text-white mb-2 text-center"
                  >
                    {brand.name}
                  </CardItem>
                  
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-400 text-sm mb-4 text-center"
                  >
                    {brand.description}
                  </CardItem>
                  
                  <CardItem translateZ="80" className="flex items-center justify-center gap-2">
                    <TrendingUp className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 text-sm font-medium">{brand.stat}</span>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>

        {/* Statistiques globales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Users, number: "500+", label: "Clients satisfaits" },
            { icon: Award, number: "1000+", label: "Projets réalisés" },
            { icon: Star, number: "98%", label: "Taux de satisfaction" },
            { icon: TrendingUp, number: "10+", label: "Années d'expérience" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-red-600/10 to-blue-600/10 border border-red-500/20 rounded-2xl p-6 text-center hover:border-red-500/40 transition-all"
            >
              <stat.icon className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-400">
                {stat.number}
              </div>
              <div className="text-sm text-neutral-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ModernBrands;


