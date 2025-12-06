"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

const ChristmasMessage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Afficher le message après un court délai
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4"
        >
          <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-blue-600 border-2 border-yellow-400 rounded-2xl shadow-2xl overflow-hidden">
            {/* Effet de brillance animé */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            
            {/* Contenu */}
            <div className="relative p-6 md:p-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                {/* Icône de Noël */}
                <div className="flex-shrink-0">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="text-4xl"
                  >
                    🎄
                  </motion.div>
                </div>

                {/* Message */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                    Joyeux Noël !
                  </h3>
                  <p className="text-white/90 text-sm md:text-base">
                    Toute l&apos;équipe de Digitalpro Solutions vous souhaite de merveilleuses fêtes de fin d&apos;année ! 🎅✨
                  </p>
                </div>
              </div>

              {/* Bouton de fermeture */}
              <button
                onClick={() => setIsVisible(false)}
                className="flex-shrink-0 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all"
                aria-label="Fermer le message"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Flocons de neige décoratifs */}
            <div className="absolute top-2 left-4 text-white/30 text-xl animate-bounce" style={{ animationDelay: '0s' }}>❄️</div>
            <div className="absolute top-4 right-8 text-white/30 text-lg animate-bounce" style={{ animationDelay: '0.5s' }}>❄️</div>
            <div className="absolute bottom-2 right-4 text-white/30 text-xl animate-bounce" style={{ animationDelay: '1s' }}>❄️</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChristmasMessage;






