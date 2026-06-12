"use client";

import type { ReactNode } from "react";
import ModernNavbar from "@/components/modern-navbar";
import StarsBackground from "@/components/stars-background";

type LuxPageLayoutProps = {
  readonly children: ReactNode;
  readonly maxWidth?: "5xl" | "7xl";
  readonly className?: string;
};

const maxWidthClass = {
  "5xl": "max-w-5xl",
  "7xl": "max-w-7xl",
} as const;

export default function LuxPageLayout({
  children,
  maxWidth = "7xl",
  className = "",
}: LuxPageLayoutProps) {
  return (
    <div className={`lux-page-shell w-full min-h-screen relative overflow-hidden ${className}`}>
      <StarsBackground />
      <ModernNavbar
        scrollToWebsiteDesign={() => {}}
        scrollToGraphicDesign={() => {}}
        scrollToShopifyStores={() => {}}
        scrollToBrands={() => {}}
        scrollToServices={() => {}}
      />
      <div
        className={`mx-auto relative z-10 w-full px-4 md:px-6 pt-28 pb-16 ${maxWidthClass[maxWidth]}`}
      >
        {children}
      </div>
    </div>
  );
}
