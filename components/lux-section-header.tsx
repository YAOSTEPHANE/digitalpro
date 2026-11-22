"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type LuxSectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  accent?: "blue" | "red";
  align?: "left" | "center";
  tone?: "light" | "dark";
  indexLabel?: string;
  rightSlot?: ReactNode;
  className?: string;
};

export default function LuxSectionHeader({
  label,
  title,
  description,
  accent = "blue",
  align = "left",
  tone = "light",
  indexLabel,
  rightSlot,
  className = "",
}: LuxSectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = tone === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-10 md:mb-12 ${
        isCenter
          ? "text-center mx-auto max-w-3xl"
          : rightSlot
            ? "flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            : "max-w-3xl"
      } ${className}`}
    >
      <div className={isCenter ? "" : "max-w-2xl"}>
        <div
          className={`inline-flex items-center gap-2.5 mb-4 rounded-full px-3.5 py-1.5 backdrop-blur-md ${
            isDark
              ? "border border-white/15 bg-white/10"
              : "border border-[rgba(81,102,153,0.2)] bg-white/95 shadow-xs"
          } ${isCenter ? "justify-center" : ""}`}
        >
          {indexLabel ? (
            <>
              <span
                className={`font-mono text-[10px] font-bold ${
                  isDark ? "text-white/90" : "text-slate-700"
                }`}
              >
                {indexLabel}
              </span>
              <span
                className={`h-3 w-px ${isDark ? "bg-white/20" : "bg-slate-200"}`}
                aria-hidden
              />
            </>
          ) : null}
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              accent === "red"
                ? "bg-[var(--brand-red)]"
                : isDark
                  ? "bg-sky-300"
                  : "bg-[var(--brand-blue)]"
            }`}
            aria-hidden
          />
          <p
            className={`lux-label !tracking-[0.2em] !text-[10px] ${
              isDark ? "!text-white/90" : ""
            }`}
          >
            {label}
          </p>
        </div>

        <h2
          className={`lux-heading text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] tracking-[-0.028em] ${
            isDark ? "!text-white" : ""
          }`}
        >
          {title}
        </h2>

        {description ? (
          <p
            className={`lux-lead mt-4 ${isDark ? "!text-slate-300" : ""} ${
              isCenter ? "mx-auto max-w-2xl" : "max-w-xl"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>

      {!isCenter && rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
    </motion.div>
  );
}
