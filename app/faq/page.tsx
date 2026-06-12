"use client";

import LuxPageLayout from "@/components/lux-page-layout";
import LuxSectionHeader from "@/components/lux-section-header";
import FAQS from "@/app/faq";

export default function FAQPage() {
  return (
    <LuxPageLayout>
      <LuxSectionHeader
        label="FAQ"
        title="Les réponses utiles pour avancer rapidement sur votre projet"
        description="Délais, budget, méthodes, maintenance : retrouvez ici les questions les plus fréquentes avant le lancement."
      />
      <FAQS />
    </LuxPageLayout>
  );
}
