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

const StarsBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars: Star[] = [];
    for (let i = 0; i < 60; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 24 + 14,
        delay: Math.random() * 6,
      });
    }
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.id % 3 === 0 ? "var(--brand-red-light)" : "var(--brand-blue-light)",
            boxShadow:
              star.id % 3 === 0
                ? `0 0 ${star.size * 3}px rgba(204, 38, 40, 0.45)`
                : `0 0 ${star.size * 3}px rgba(81, 102, 153, 0.45)`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.15, 0.7, 0.15],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;
