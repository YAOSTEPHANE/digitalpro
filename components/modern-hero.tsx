"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Rocket, TrendingUp, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image3D from "@/components/ui/image-3d";

const ModernHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background animé avec gradient qui suit la souris */}
      <div 
        className="absolute inset-0 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(220, 38, 38, 0.4), rgba(37, 99, 235, 0.3), transparent 60%)`,
        }}
      />
      
      {/* Grille animée */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* Badge animé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-blue-600/20 border border-red-500/30 rounded-full px-6 py-2 mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-red-400 animate-pulse" />
          <span className="text-sm text-red-300 font-medium">
            Agence d&apos;intelligence numérique
          </span>
          <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
        </motion.div>

        {/* Titre principal avec effet de texte animé */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-red-200 to-blue-200">
            Créez, développez
          </span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-300 to-blue-400 mt-2">
            et faites évoluer
          </span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-red-400 mt-2">
            votre entreprise
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Des solutions sur mesure pour votre entreprise. Nous sommes une équipe
          de créatifs qui sont ravis de vous aider à développer votre
          entreprise.
        </motion.p>

        {/* Boutons CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/book"
            className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-blue-600 rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              Appelez-nous
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-red-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <Link
            href="/devis"
            className="group px-8 py-4 bg-transparent border-2 border-red-500/50 rounded-full text-white font-semibold text-lg hover:border-red-500 hover:bg-red-500/10 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Demander un devis
              <Rocket className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
            </span>
          </Link>
        </motion.div>

        {/* Images 3D en showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16"
        >
          {[
            {
              src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
              alt: "Développement web"
            },
            {
              src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop",
              alt: "Applications mobiles"
            },
            {
              src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
              alt: "SEO et Marketing"
            },
            {
              src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop",
              alt: "UI/UX Design"
            }
          ].map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image3D
                src={img.src}
                alt={img.alt}
                width={300}
                height={300}
                className="rounded-2xl w-full h-[200px] md:h-[250px] object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { number: "500+", label: "Projets réalisés", icon: Rocket },
            { number: "98%", label: "Clients satisfaits", icon: TrendingUp },
            { number: "24/7", label: "Support disponible", icon: Zap },
            { number: "10+", label: "Années d'expérience", icon: Sparkles },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-red-600/10 to-blue-600/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm hover:border-red-500/40 transition-all"
            >
              <stat.icon className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-400">
                {stat.number}
              </div>
              <div className="text-sm text-neutral-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Effet de vague en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent" />
    </div>
  );
};

export default ModernHero;


