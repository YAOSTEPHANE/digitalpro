"use client";

import LuxPageLayout from "@/components/lux-page-layout";
import ModernBilling from "@/components/modern-billing";

const Facture = () => {
  return (
    <LuxPageLayout breadcrumb="Tarifs & Facturation">
      <ModernBilling />
    </LuxPageLayout>
  );
};

export default Facture;
