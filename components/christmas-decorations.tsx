"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Composant pour les flocons de neige
const Snowflake = ({ delay, duration, left }: { delay: number; duration: number; left: number }) => {
  return (
    <motion.div
      className="absolute text-white text-xl pointer-events-none"
      style={{ left: `${left}%` }}
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: "calc(100vh + 100px)",
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      ❄️
    </motion.div>
  );
};

// Composant pour un sapin de Noël
const ChristmasTree = ({ left, size }: { left: number; size: "small" | "medium" | "large" }) => {
  const sizeClasses = {
    small: "w-16 h-20",
    medium: "w-24 h-32",
    large: "w-32 h-40",
  };

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} pointer-events-none`}
      style={{ left: `${left}%`, bottom: "0" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: [0, -5, 0],
      }}
      transition={{
        scale: { duration: 0.5 },
        opacity: { duration: 0.5 },
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {/* Corps du sapin */}
      <div className="relative w-full h-full">
        {/* Niveau 1 (bas) */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/3 bg-green-600 clip-path-triangle"></div>
        {/* Niveau 2 (milieu) */}
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-2/3 h-1/3 bg-green-700 clip-path-triangle"></div>
        {/* Niveau 3 (haut) */}
        <div className="absolute bottom-2/3 left-1/2 transform -translate-x-1/2 w-1/2 h-1/3 bg-green-800 clip-path-triangle"></div>
        {/* Étoile au sommet */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-yellow-400 text-xl">⭐</div>
        {/* Boules de Noël */}
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-blue-500 rounded-full"></div>
        <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-500 rounded-full"></div>
      </div>
    </motion.div>
  );
};

// Composant pour les guirlandes lumineuses
const Garland = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-20 pointer-events-none z-40 overflow-hidden">
      <div className="relative w-full h-full">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-4"
            style={{ left: `${i * 5}%` }}
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Composant principal des décorations de Noël
const ChristmasDecorations = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [snowflakes, setSnowflakes] = useState<Array<{ delay: number; duration: number; left: number }>>([]);

  useEffect(() => {
    setIsMounted(true);
    
    // Générer des flocons de neige aléatoires
    const generateSnowflakes = () => {
      const newSnowflakes = [];
      for (let i = 0; i < 50; i++) {
        newSnowflakes.push({
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 2,
          left: Math.random() * 100,
        });
      }
      setSnowflakes(newSnowflakes);
    };

    generateSnowflakes();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Flocons de neige */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {snowflakes.map((snowflake, index) => (
          <Snowflake
            key={index}
            delay={snowflake.delay}
            duration={snowflake.duration}
            left={snowflake.left}
          />
        ))}
      </div>

      {/* Guirlandes lumineuses en haut */}
      <Garland />

      {/* Sapins de Noël en bas */}
      <div className="fixed bottom-0 left-0 right-0 h-40 pointer-events-none z-30 overflow-hidden">
        <ChristmasTree left={5} size="small" />
        <ChristmasTree left={25} size="medium" />
        <ChristmasTree left={50} size="large" />
        <ChristmasTree left={75} size="medium" />
        <ChristmasTree left={90} size="small" />
      </div>

    </>
  );
};

export default ChristmasDecorations;

