"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ServicesVideoProps {
  videoUrl?: string; // URL YouTube complète
  videoId?: string; // ID de la vidéo YouTube (ex: "dQw4w9WgXcQ")
  title?: string;
  description?: string;
}

const ServicesVideo = ({ 
  videoId, // Remplacez par l'ID de votre vidéo YouTube
  videoUrl,
  title = "Découvrez nos services en vidéo",
  description = "Une présentation complète de nos solutions digitales pour transformer votre entreprise"
}: ServicesVideoProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Si vous avez une vidéo YouTube, remplacez cet ID par le vôtre
  // Pour trouver l'ID : https://www.youtube.com/watch?v=VIDEO_ID
  // Exemple : Si votre URL est https://www.youtube.com/watch?v=abc123xyz, alors videoId = "abc123xyz"
  const defaultVideoId = videoId || "jNQXAC9IVRw"; // Vidéo de démonstration - REMPLACEZ PAR LA VÔTRE
  
  // Construire l'URL YouTube avec les paramètres optimisés
  const baseUrl = videoUrl || `https://www.youtube.com/embed/${defaultVideoId}?enablejsapi=1&controls=1&modestbranding=1&rel=0&showinfo=0&autoplay=0&loop=0&playlist=${defaultVideoId}`;
  const youtubeUrl = `${baseUrl}&mute=${isMuted ? 1 : 0}`;

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      // Mettre à jour le paramètre mute de l'iframe YouTube
      if (iframeRef.current) {
        const currentSrc = iframeRef.current.src;
        const newSrc = currentSrc.includes('&mute=1') 
          ? currentSrc.replace('&mute=1', '&mute=0')
          : currentSrc.replace('&mute=0', '&mute=1');
        iframeRef.current.src = newSrc;
      }
      return newMuted;
    });
  };

  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background avec effet de particules */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500">
              {title}
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Conteneur vidéo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl"
        >
          {/* Vidéo YouTube intégrée */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              ref={iframeRef}
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
              src={youtubeUrl}
              title="Nos services - digitalpro solutions"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setVideoLoaded(true)}
            />
            
            {/* Overlay de chargement */}
            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 rounded-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-neutral-400">Chargement de la vidéo...</p>
                </div>
              </div>
            )}
          </div>

          {/* Contrôle du volume */}
          {videoLoaded && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 rounded-full p-3 text-white transition-all z-10"
              aria-label={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </motion.button>
          )}
        </motion.div>

        {/* Description des services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-500/40 transition-all">
            <div className="text-4xl mb-3">🌐</div>
            <h3 className="text-xl font-semibold text-white mb-2">Développement Web</h3>
            <p className="text-neutral-400 text-sm mb-4">
              Sites web modernes et performants adaptés à vos besoins. Technologies de pointe pour une expérience utilisateur optimale.
            </p>
            <Link 
              href="/contact" 
              className="text-purple-400 hover:text-purple-300 text-sm font-medium inline-flex items-center gap-1"
            >
              En savoir plus <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/20 rounded-xl p-6 text-center hover:border-blue-500/40 transition-all">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-xl font-semibold text-white mb-2">Applications Mobile</h3>
            <p className="text-neutral-400 text-sm mb-4">
              Applications iOS et Android natives et cross-platform. Solutions mobiles innovantes pour votre entreprise.
            </p>
            <Link 
              href="/contact" 
              className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1"
            >
              En savoir plus <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-cyan-600/10 to-purple-600/10 border border-cyan-500/20 rounded-xl p-6 text-center hover:border-cyan-500/40 transition-all">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="text-xl font-semibold text-white mb-2">Marketing Digital</h3>
            <p className="text-neutral-400 text-sm mb-4">
              SEO, réseaux sociaux et stratégies de croissance digitale. Augmentez votre visibilité en ligne.
            </p>
            <Link 
              href="/contact" 
              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium inline-flex items-center gap-1"
            >
              En savoir plus <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/devis"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105"
          >
            Demander un devis gratuit
            <ExternalLink className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesVideo;
