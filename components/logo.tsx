"use client";

import Image from "next/image";
import { useState } from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

const Logo = ({ 
  className = "", 
  width = 120, 
  height = 120,
  showText = true 
}: LogoProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Pour la navbar, on peut masquer le texte si nécessaire
  const logoHeight = showText ? height : width;
  
  // Pour un logo rond, on utilise la même dimension pour width et height
  const logoSize = Math.min(width, showText ? logoHeight : width);
  const hasSizeClass = /\b(?:w-|h-|size-)/.test(className);
  const sizeStyle = hasSizeClass
    ? undefined
    : { width: logoSize, height: logoSize };
  
  // Si l'image n'existe pas, on affiche un fallback SVG simple
  if (imageError) {
    return (
      <div 
        className={`flex items-center justify-center bg-[var(--brand-blue)] rounded-full ${className}`}
        style={sizeStyle}
      >
        <span className="text-white font-bold text-sm">DP</span>
      </div>
    );
  }
  
  return (
    <div 
      className={`relative overflow-hidden rounded-full ${className}`} 
      style={sizeStyle}
    >
      <Image
        src="/logo/logo.png"
        alt="Digitalpro Solutions Logo"
        width={logoSize}
        height={logoSize}
        className="object-contain w-full h-full rounded-full"
        priority
        onError={() => setImageError(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      />
    </div>
  );
};

export default Logo;
