"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  TrendingUp, 
  Target, 
  Share2, 
  BarChart3,
  Calendar,
  ArrowRight,
  Sparkles,
  ShoppingCart
} from "lucide-react";
import Link from "next/link";
import Image3D from "@/components/ui/image-3d";

// Base de conseils en marketing digital (365 conseils pour chaque jour de l'année)
const marketingTips = [
  {
    day: 1,
    title: "Optimisez votre présence sur les réseaux sociaux",
    content: "Publiez du contenu de qualité régulièrement. La cohérence est la clé pour construire une communauté engagée. Utilisez les meilleurs moments de publication pour maximiser votre portée.",
    category: "Réseaux Sociaux",
    icon: Share2,
    color: "from-red-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop"
  },
  {
    day: 2,
    title: "Créez du contenu à valeur ajoutée",
    content: "Ne vendez pas directement, éduquez votre audience. Le contenu éducatif génère plus d'engagement et établit votre expertise dans votre domaine.",
    category: "Contenu",
    icon: Lightbulb,
    color: "from-blue-500 to-red-500",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2d70a?w=800&h=600&fit=crop"
  },
  {
    day: 3,
    title: "Analysez vos données régulièrement",
    content: "Les données sont votre meilleur allié. Analysez vos métriques chaque semaine pour comprendre ce qui fonctionne et ajuster votre stratégie en conséquence.",
    category: "Analytics",
    icon: BarChart3,
    color: "from-red-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
  },
  {
    day: 4,
    title: "Définissez vos objectifs SMART",
    content: "Spécifiques, Mesurables, Atteignables, Réalistes et Temporels. Des objectifs clairs vous guident vers le succès et permettent de mesurer vos progrès.",
    category: "Stratégie",
    icon: Target,
    color: "from-blue-500 to-red-500",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
  },
  {
    day: 5,
    title: "Investissez dans le SEO",
    content: "Le référencement naturel est un investissement à long terme. Optimisez vos mots-clés, créez du contenu de qualité et obtenez des backlinks de qualité pour améliorer votre visibilité.",
    category: "SEO",
    icon: TrendingUp,
    color: "from-red-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
  },
  {
    day: 6,
    title: "Personnalisez votre communication",
    content: "Chaque client est unique. Utilisez les données pour personnaliser vos messages et offres. La personnalisation augmente significativement les taux de conversion.",
    category: "Personnalisation",
    icon: Target,
    color: "from-blue-500 to-red-500",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
  },
  {
    day: 7,
    title: "Utilisez l'email marketing stratégiquement",
    content: "L'email reste l'un des canaux les plus rentables. Segmentez votre liste, testez vos sujets et créez des emails qui apportent de la valeur à vos abonnés.",
    category: "Email Marketing",
    icon: Share2,
    color: "from-red-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1593642532400-2682810df47a?w=800&h=600&fit=crop"
  },
  {
    day: 8,
    title: "Créez des campagnes vidéo engageantes",
    content: "La vidéo domine le marketing digital. Créez des vidéos courtes, captivantes et qui racontent une histoire. Les vidéos génèrent plus d'engagement que tout autre format.",
    category: "Vidéo",
    icon: Sparkles,
    color: "from-blue-500 to-red-500",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=600&fit=crop"
  },
  {
    day: 9,
    title: "Optimisez pour mobile d'abord",
    content: "Plus de 60% du trafic web vient du mobile. Assurez-vous que votre site et vos campagnes sont optimisés pour mobile avant tout autre appareil.",
    category: "Mobile",
    icon: Target,
    color: "from-red-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
  },
  {
    day: 10,
    title: "Construisez votre liste d'emails",
    content: "Votre liste d'emails est un actif précieux. Offrez quelque chose de valeur en échange d'un email : un ebook, un webinar, ou un guide gratuit.",
    category: "Email Marketing",
    icon: Share2,
    color: "from-blue-500 to-red-500",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
  },
  // Ajoutez plus de conseils selon vos besoins...
];

const DailyMarketingTips = () => {
  const [currentTip, setCurrentTip] = useState<{
    title: string;
    content: string;
    category: string;
    day: number;
    image: string;
    color: string;
    icon?: any;
  }>({
    title: 'Chargement...',
    content: 'Génération de votre conseil du jour...',
    category: 'Marketing Digital',
    day: 1,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    color: 'from-red-500 to-blue-500',
  });
  const [dayOfYear, setDayOfYear] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Calculer le jour de l'année (1-365)
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    setDayOfYear(day);

    // Récupérer le conseil depuis l'API IA
    const fetchTip = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/marketing-tip?day=${day}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tip');
        }
        const tip = await response.json();
        
        // Mapper l'icône selon la catégorie
        const categoryIcons: Record<string, any> = {
          'Réseaux Sociaux': Share2,
          'SEO': TrendingUp,
          'Email Marketing': Share2,
          'Contenu': Lightbulb,
          'Publicité': Target,
          'Analytics': BarChart3,
          'Stratégie': Target,
          'Mobile': Target,
          'E-commerce': ShoppingCart,
          'Vidéo': Sparkles,
          'Influence Marketing': Share2,
          'Marketing Automation': Sparkles,
        };
        
        tip.icon = categoryIcons[tip.category] || Lightbulb;
        setCurrentTip(tip);
      } catch (error) {
        console.error('Error fetching tip:', error);
        // Fallback vers un conseil local
        const tipIndex = (day - 1) % marketingTips.length;
        setCurrentTip(marketingTips[tipIndex]);
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, []);

  const IconComponent = currentTip.icon || Lightbulb;

  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-2 mb-6">
            <Calendar className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-sm text-red-300 font-semibold">CONSEIL DU JOUR</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-blue-400 to-blue-500">
              Marketing Digital
            </span>
            <br />
            <span className="text-white">Conseil du Jour #{dayOfYear}</span>
          </h2>

          <p className="text-xl text-neutral-300 max-w-2xl mx-auto mt-4">
            Chaque jour, découvrez un nouveau conseil pour améliorer votre stratégie digitale
          </p>
        </motion.div>

        {/* Carte du conseil */}
        {loading ? (
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-neutral-900/90 to-black border border-red-500/30 rounded-3xl p-12 text-center">
              <div className="animate-pulse">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-blue-500 rounded-2xl mx-auto mb-6" />
                <div className="h-8 bg-neutral-700 rounded-lg w-3/4 mx-auto mb-4" />
                <div className="h-4 bg-neutral-700 rounded-lg w-full mb-2" />
                <div className="h-4 bg-neutral-700 rounded-lg w-5/6 mx-auto" />
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            key={currentTip.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-br from-neutral-900/90 to-black border border-red-500/30 rounded-3xl overflow-hidden relative group hover:border-red-500/60 transition-all duration-300">
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-blue-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-0">
              {/* Colonne gauche - Image */}
              <div className="relative h-64 md:h-[500px] overflow-hidden">
                <Image3D
                  src={currentTip.image}
                  alt={currentTip.title}
                  width={800}
                  height={600}
                  className="!w-full !h-full !object-cover !rounded-none"
                  containerClassName="!w-full !h-full !absolute !inset-0 !rounded-none"
                />
                {/* Overlay avec gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent md:bg-gradient-to-b md:from-black/60 md:via-black/40 md:to-transparent" />
                
                {/* Badge de catégorie sur l'image */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-gradient-to-r from-red-600/90 to-blue-600/90 border border-red-500/50 rounded-full px-4 py-2 backdrop-blur-sm">
                  <IconComponent className="w-4 h-4 text-white" />
                  <span className="text-sm text-white font-medium">{currentTip.category}</span>
                </div>

                {/* Icône principale sur l'image */}
                <div className={`absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br ${currentTip.color} rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Colonne droite - Contenu */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                {/* Titre */}
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  {currentTip.title}
                </h3>

                {/* Contenu */}
                <p className="text-base md:text-lg text-neutral-300 leading-relaxed mb-6 md:mb-8">
                  {currentTip.content}
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <Link
                    href="/contact"
                    className="group flex items-center gap-2 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    Besoin d&apos;aide ?
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/devis"
                    className="group flex items-center gap-2 bg-transparent border-2 border-red-500/50 hover:border-red-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-red-500/10"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
            </div>

            {/* Indicateur de jour */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 text-neutral-600 text-sm font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm z-20">
              Jour {dayOfYear}/365
            </div>
          </div>
        </motion.div>
        )}

        {/* Section archives/conseils précédents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-400 mb-4">
            Retrouvez tous nos conseils et guides complets
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-medium"
          >
            Consulter nos ressources
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default DailyMarketingTips;

