"use client";

import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import ModernWebsiteDesign from "@/components/modern-website-design";

export default function SitesWebPage() {
  return (
    <LuxPageLayout>
      <LuxSectionHeader
        label="Sites web"
        title="Des interfaces rapides, élégantes et pensées pour convertir"
        description="Nous créons des expériences web mémorables avec un design précis, une architecture claire et un parcours client optimisé."
      />
      <ModernWebsiteDesign />
    </LuxPageLayout>
  );
}
