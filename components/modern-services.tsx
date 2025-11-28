"use client";

import { motion } from "framer-motion";
import Image3D from "@/components/ui/image-3d";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { 
  Globe, 
  Smartphone, 
  TrendingUp, 
  Palette, 
  ShoppingCart, 
  Wrench,
  ArrowRight 
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "Développement Web",
    description: "Sites web modernes et performants adaptés à vos besoins",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    color: "from-red-500 to-red-600",
    link: "/contact"
  },
  {
    icon: Smartphone,
    title: "Applications Mobile",
    description: "Applications iOS et Android natives et cross-platform",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    color: "from-blue-500 to-blue-600",
    link: "/contact"
  },
  {
    icon: TrendingUp,
    title: "SEO & Marketing",
    description: "SEO, réseaux sociaux et stratégies de croissance digitale",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    color: "from-cyan-500 to-cyan-600",
    link: "/contact"
  },
  {
    icon: Palette,
    title: "Conception UI/UX",
    description: "Design centré utilisateur pour une expérience optimale",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
    color: "from-pink-500 to-pink-600",
    link: "/contact"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Solutions de vente en ligne complètes et performantes",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    color: "from-orange-500 to-orange-600",
    link: "/contact"
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Support technique et maintenance continue de vos solutions",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    color: "from-green-500 to-green-600",
    link: "/contact"
  },
];

const ModernServices = () => {
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
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-blue-400 to-blue-500">
              Optimisez votre entreprise
            </span>
            <br />
            <span className="text-white">grâce à nos services</span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto mt-4">
            De la conception de sites Web à la gestion des médias sociaux, nous offrons une large gamme de services pour vous aider à développer votre entreprise.
          </p>
        </motion.div>

        {/* Grille de services avec cartes 3D */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full flex"
            >
              <CardContainer className="inter-var h-full w-full">
                <CardBody className="bg-gradient-to-br from-neutral-900/90 to-black border border-red-500/20 relative group/card w-full h-full rounded-2xl p-6 hover:border-red-500/40 transition-all flex flex-col">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-white mb-2 flex-shrink-0"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`bg-gradient-to-r ${service.color} p-3 rounded-xl flex-shrink-0`}>
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
                    className="text-neutral-400 text-sm mb-6 flex-grow min-h-[60px]"
                  >
                    {service.description}
                  </CardItem>
                  
                  <CardItem translateZ="100" className="w-full mt-auto flex-shrink-0">
                    <Link
                      href={service.link}
                      className={`flex items-center justify-center gap-2 bg-gradient-to-r ${service.color} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 w-full`}
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4" />
                    </Link>
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

export default ModernServices;

