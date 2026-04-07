"use client";

import ModernNavbar from "@/components/modern-navbar";
import ModernBilling from "@/components/modern-billing";

const Facture = () => {
  return (
    <div className="w-full md:items-center md:justify-center bg-slate-50 antialiased relative overflow-hidden">
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
