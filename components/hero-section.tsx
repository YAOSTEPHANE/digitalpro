"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Rocket, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    // Générer les particules uniquement côté client
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: 3 + Math.random() * 2,
          delay: Math.random() * 2,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background animé avec gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.2), transparent 50%)`,
        }}
      />
      
      {/* Particules animées - uniquement après montage */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Grille animée */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* Badge animé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full px-6 py-2 mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span className="text-sm text-purple-300 font-medium">
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
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">
            Créez, développez
          </span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mt-2">
            et faites évoluer
          </span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mt-2">
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
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              Appelez-nous
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <Link
            href="/devis"
            className="group px-8 py-4 bg-transparent border-2 border-purple-500/50 rounded-full text-white font-semibold text-lg hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Demander un devis
              <Rocket className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
            </span>
          </Link>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
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
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm hover:border-purple-500/40 transition-all"
            >
              <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
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

export default HeroSection;

