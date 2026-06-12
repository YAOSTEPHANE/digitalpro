"use client";

import { motion } from "framer-motion";

type LuxSectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  accent?: "blue" | "red";
  align?: "left" | "center";
  className?: string;
};

export default function LuxSectionHeader({
  label,
  title,
  description,
  accent = "blue",
  align = "left",
  className = "",
}: LuxSectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-10 md:mb-12 ${isCenter ? "text-center mx-auto max-w-3xl" : "max-w-2xl"} ${className}`}
    >
      <div className={`flex items-center gap-3 mb-4 ${isCenter ? "justify-center" : ""}`}>
        <span
          className={`lux-accent-line ${accent === "red" ? "lux-accent-line-red" : ""}`}
          aria-hidden
        />
        <p className="lux-label !tracking-[0.28em]">{label}</p>
      </div>
      <h2 className="lux-heading text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.08]">{title}</h2>
      {description ? (
        <p className={`mt-4 text-base md:text-lg lux-muted leading-relaxed font-light ${isCenter ? "" : "max-w-xl"}`}>
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
