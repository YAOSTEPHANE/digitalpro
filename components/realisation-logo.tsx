"use client";

import { useState } from "react";
import Image from "next/image";
import type { BrandAccent } from "@/lib/brand";

interface RealisationLogoProps {
  src: string;
  alt: string;
  monogram: string;
  accent: BrandAccent;
  logoBg?: "light" | "dark";
}

export default function RealisationLogo({
  src,
  alt,
  monogram,
  accent,
  logoBg = "light",
}: RealisationLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-sm text-white shadow-sm shrink-0 ${
          accent === "red" ? "brand-bg-red" : "brand-bg-blue"
        }`}
      >
        {monogram}
      </div>
    );
  }

  return (
    <div
      className={`h-12 min-w-[3rem] max-w-[9.5rem] px-2.5 py-1.5 rounded-xl border flex items-center justify-center shadow-2xs shrink-0 overflow-hidden transition-colors ${
        logoBg === "dark"
          ? "bg-black border-slate-800"
          : "bg-white border-slate-200/90"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        width={140}
        height={48}
        unoptimized
        onError={() => setHasError(true)}
        className="max-h-9 w-auto max-w-[8rem] object-contain"
      />
    </div>
  );
}
