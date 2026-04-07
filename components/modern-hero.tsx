"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Rocket,
  TrendingUp,
  ShieldCheck,
  Clock3,
  Brush,
} from "lucide-react";
import Link from "next/link";
import Image3D from "@/components/ui/image-3d";

const ModernHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const fullTitle = "Donnez du relief\nà votre présence\nsur le web";
  const [typedTitle, setTypedTitle] = useState("");

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

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedTitle(fullTitle.slice(0, index));
      if (index >= fullTitle.length) {
        window.clearInterval(timer);
      }
    }, 55);

    return () => window.clearInterval(timer);
  }, [fullTitle]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background animé avec gradient qui suit la souris */}
      <div 
        className="absolute inset-0 opacity-60 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.28), rgba(59, 130, 246, 0.18), transparent 62%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.16),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.18),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(220,38,38,0.14),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_90%_60%_at_50%_40%,#000_62%,transparent_100%)]" />
      <div className="absolute inset-0 hero-noise" />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold mb-6 leading-[1.04] pt-8 md:pt-16 tracking-tight"
        >
          <span className="inline-block whitespace-pre-line bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-blue-500 to-slate-900">
            {typedTitle}
            <span className="animate-pulse text-blue-600">|</span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-slate-700 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Nous concevons des expériences web élégantes, rapides et mesurables.
          Design, contenu, acquisition et conversion travaillent ensemble pour
          transformer vos visites en clients.
        </motion.p>

        {/* Boutons CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link
            href="/book"
            className="group relative px-8 py-4 rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-[0_8px_35px_rgba(79,70,229,0.45)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Réserver un échange
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-blue-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600 to-blue-600" />
          </Link>

          <Link
            href="/devis"
            className="group px-8 py-4 bg-white/80 border border-slate-200 rounded-full text-slate-900 font-semibold text-lg hover:border-cyan-300/60 hover:bg-white transition-all duration-300 backdrop-blur-sm"
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12"
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

        {/* Indicateurs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {[
            { number: "350+", label: "Lancements accompagnés", icon: Rocket },
            { number: "92%", label: "Objectifs atteints", icon: TrendingUp },
            { number: "48h", label: "Délai moyen de démarrage", icon: Clock3 },
            { number: "100%", label: "Design sur mesure", icon: Brush },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/85 border border-slate-200 rounded-2xl p-5 backdrop-blur-md hover:border-indigo-300/50 transition-all"
            >
              <stat.icon className="w-7 h-7 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
                {stat.number}
              </div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45, duration: 0.8 }}
          className="mt-8 flex items-center justify-center gap-2 text-slate-600 text-sm"
        >
          <ShieldCheck className="h-4 w-4 text-emerald-300" />
          <span>Accompagnement transparent et suivi continu du projet</span>
        </motion.div>
      </div>

      {/* Effet de vague en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent" />
    </section>
  );
};

export default ModernHero;


