"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  rotation: number;
  delay: number;
  duration: number;
  length: number;
}

const StarsBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Générer des étoiles aléatoires uniquement côté client
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
        });
      }
      setStars(newStars);
    };

    // Générer des étoiles filantes uniquement côté client
    const generateShootingStars = () => {
      const newShootingStars: ShootingStar[] = [];
      // Augmenter le nombre d'étoiles filantes
      for (let i = 0; i < 15; i++) {
        // Générer des trajectoires diagonales plus réalistes
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        // Direction aléatoire mais cohérente (principalement vers le bas-droite)
        const angle = (Math.PI / 4) + (Math.random() - 0.5) * (Math.PI / 2);
        const distance = 30 + Math.random() * 50;
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;
        const length = 40 + Math.random() * 60;
        
        newShootingStars.push({
          id: i,
          startX,
          startY,
          endX,
          endY,
          rotation: (angle * 180) / Math.PI,
          delay: Math.random() * 15,
          duration: 0.8 + Math.random() * 1.2,
          length,
        });
      }
      setShootingStars(newShootingStars);
    };

    generateStars();
    generateShootingStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Étoiles filantes - uniquement après montage */}
      {isMounted && shootingStars.map((star) => {
        // Calculer la distance en pixels pour l'animation
        const deltaX = star.endX - star.startX;
        const deltaY = star.endY - star.startY;
        
        return (
          <motion.div
            key={`shooting-${star.id}`}
            className="absolute pointer-events-none"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              transformOrigin: "top left",
            }}
            animate={{
              x: [0, `${deltaX}vw`],
              y: [0, `${deltaY}vh`],
              opacity: [0, 1, 0.9, 0],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: 3 + Math.random() * 7,
              ease: "easeOut",
            }}
          >
            {/* Traînée de l'étoile filante */}
            <div
              className="absolute w-0.5 bg-gradient-to-b from-white via-blue-200 to-transparent rounded-full"
              style={{
                height: `${star.length}px`,
                transform: `rotate(${star.rotation}deg)`,
                transformOrigin: "top center",
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(147, 197, 253, 0.6)",
              }}
            />
            {/* Point lumineux de l'étoile */}
            <motion.div
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: "0",
                top: "0",
                transform: `translate(-50%, -50%)`,
                boxShadow: "0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(147, 197, 253, 0.8)",
              }}
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: star.duration / 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default StarsBackground;

