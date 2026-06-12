"use client";

import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import ModernGraphicDesign from "@/components/modern-graphic-design";

export default function DesignPage() {
  return (
    <LuxPageLayout>
      <LuxSectionHeader
        label="Design"
        title="Une identité visuelle forte, claire et immédiatement reconnaissable"
        description="De la direction artistique aux interfaces, chaque détail est pensé pour renforcer votre marque et améliorer l'expérience utilisateur."
      />
      <ModernGraphicDesign />
    </LuxPageLayout>
  );
}
