"use client";

import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import ModernShopify from "@/components/modern-shopify";

export default function ECommercePage() {
  return (
    <LuxPageLayout>
      <LuxSectionHeader
        label="E-commerce"
        title="Des boutiques performantes qui transforment le trafic en ventes"
        description="Architecture claire, expérience d'achat fluide et optimisation continue pour augmenter le panier moyen et le taux de conversion."
      />
      <ModernShopify />
    </LuxPageLayout>
  );
}
