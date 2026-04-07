"use client";

import ModernNavbar from "@/components/modern-navbar";
import StarsBackground from "@/components/stars-background";
import ModernWebsiteDesign from "@/components/modern-website-design";

export default function SitesWebPage() {
  const scrollToServices = () => {};
  const scrollToWebsiteDesign = () => {};
  const scrollToGraphicDesign = () => {};
  const scrollToShopifyStores = () => {};
  const scrollToBrands = () => {};

  return (
    <div className="w-full md:items-center md:justify-center bg-slate-50 antialiased relative overflow-hidden">
      <StarsBackground />
      <ModernNavbar
        scrollToServices={scrollToServices}
        scrollToWebsiteDesign={scrollToWebsiteDesign}
        scrollToGraphicDesign={scrollToGraphicDesign}
        scrollToShopifyStores={scrollToShopifyStores}
        scrollToBrands={scrollToBrands}
      />

      <div className="p-4 mx-auto relative z-10 w-full px-2 pt-28 max-w-7xl">
        <section className="mb-10 px-2">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-cyan-50/50 to-indigo-50/50 p-7 md:p-10 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-700 mb-3">
              Sites web
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
              Des interfaces rapides, élégantes et pensées pour convertir
            </h1>
            <p className="mt-4 text-slate-600 max-w-3xl">
              Nous créons des expériences web mémorables avec un design précis,
              une architecture claire et un parcours client optimisé.
            </p>
          </div>
        </section>
        <ModernWebsiteDesign />
      </div>
    </div>
  );
}



