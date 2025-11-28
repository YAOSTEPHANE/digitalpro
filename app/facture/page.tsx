"use client";

import ModernNavbar from "@/components/modern-navbar";
import ModernBilling from "@/components/modern-billing";

const Facture = () => {
  return (
    <div className="w-full md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <ModernNavbar
        scrollToWebsiteDesign={() => {}}
        scrollToGraphicDesign={() => {}}
        scrollToShopifyStores={() => {}}
        scrollToBrands={() => {}}
        scrollToServices={() => {}}
      />
      <ModernBilling />
    </div>
  );
};

export default Facture;
