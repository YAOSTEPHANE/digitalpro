"use client";

import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import FAQS from "@/app/faq";

export default function FAQPage() {
  return (
    <LuxPageLayout breadcrumb="FAQ">
      <LuxSectionHeader
        indexLabel="01"
        label="Centre d'aide"
        title="Les réponses utiles pour avancer rapidement sur votre projet"
        description="Délais, budget, méthodes, intégrations de paiement et maintenance : retrouvez ici l'essentiel avant de lancer votre projet."
      />
      <FAQS hideHeader />
    </LuxPageLayout>
  );
}
